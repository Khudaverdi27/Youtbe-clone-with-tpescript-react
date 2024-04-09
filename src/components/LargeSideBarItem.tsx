import { twMerge } from "tailwind-merge";
import { buttonStyles } from "./buttons";
import { ElementType } from "react";

interface LargeSideBarItemProps {
  isActive?: boolean;
  title: string;
  url: string;
  IconOrImgUrl: ElementType | string;
}
function LargeSideBarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSideBarItemProps) {
  return (
    <a
      className={
        (twMerge(buttonStyles({ variant: "ghost" })),
        `flex items-center justify-start rounded-lg w-full p-3 gap-4 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : ""
        }`)
      }
      href={url}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img className="size-6 rounded-full" src={IconOrImgUrl} alt="" />
      ) : (
        <IconOrImgUrl className={"size-6"} />
      )}

      <div className="text-ellipsis overflow-hidden whitespace-nowrap">
        {title}
      </div>
    </a>
  );
}

export default LargeSideBarItem;
