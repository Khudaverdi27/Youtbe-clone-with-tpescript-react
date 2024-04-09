import { Children, ReactNode, useState } from "react";
import Button from "./buttons";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

type largeSideBarProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};
function LargeSideBarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: largeSideBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const visibleChildren = childrenArray.slice(0, visibleItemCount);
  const showExpandBtn = isExpanded ? childrenArray : childrenArray.length > 0;
  const BtnIcon = isExpanded ? IoChevronDown : IoChevronUp;
  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandBtn && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          className="flex items-center justify-center rounded-lg w-full p-3 gap-4"
          variant={"ghost"}
        >
          <BtnIcon className="size-6 shrink-0" />
          <div className="whitespace-nowrap">
            {isExpanded ? "Show less" : "Show more"}
          </div>
        </Button>
      )}
    </div>
  );
}

export default LargeSideBarSection;
