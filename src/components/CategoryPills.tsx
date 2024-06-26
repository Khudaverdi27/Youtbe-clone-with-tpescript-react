import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Button from "./buttons";
import { useEffect, useRef, useState } from "react";

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) {
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const [translate, setTranslate] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current == null) return;
    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container === null) return;
      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);
  return (
    <div ref={containerRef} className="overflow-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category, index) => (
          <Button
            onClick={() => onSelect(category)}
            key={index}
            variant={selectedCategory === category ? "dark" : "default"}
            className="rounded-lg whitespace-nowrap py-1 px-3"
          >
            {category}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 ">
          <Button
            onClick={() =>
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) {
                  return 0;
                } else {
                  return newTranslate;
                }
              })
            }
            size={"icon"}
            className="aspect-square w-auto p-1.5 "
            variant={"ghost"}
          >
            <BiChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24  flex justify-end">
          <Button
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current === null) return translate;
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;

                if (newTranslate + width >= edge) {
                  return edge - width;
                } else {
                  return newTranslate;
                }
              });
            }}
            size={"icon"}
            className="aspect-square w-auto p-1.5 "
            variant={"ghost"}
          >
            <BiChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}

export default CategoryPills;
