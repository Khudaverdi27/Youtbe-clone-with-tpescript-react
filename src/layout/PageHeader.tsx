import {
  FiArrowLeft,
  FiBell,
  FiMenu,
  FiMic,
  FiSearch,
  FiUpload,
  FiUser,
} from "react-icons/fi";
import logo from "../assets/react.svg";
import Button from "../components/buttons";
import { useState } from "react";
import { useSideBarContext } from "../context/sidebarContext";
function PageHeader() {
  const [showWidthFullSearch, setShowWidthFullSearch] = useState(false);
  const { toggle } = useSideBarContext();
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderTitle hidden={showWidthFullSearch} toggle={toggle} />
      <form
        className={`gap-4 flex-grow   justify-center ${
          showWidthFullSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {showWidthFullSearch && (
          <Button
            onClick={() => setShowWidthFullSearch(false)}
            variant={"ghost"}
            type="button"
            size={"icon"}
            className="shrink-0"
          >
            <FiArrowLeft />
          </Button>
        )}

        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            className="rounded-l-full  py-1 px-4 text-lg border border-secondary-border shadow-inner shadow-secondary w-full  focus:border-blue-500 outline-none"
            placeholder="search"
          />
          <Button className="py-2 px-4 rounded-r-full border border-secondary-border border-l-0 shrink-0">
            <FiSearch />
          </Button>
        </div>
        <Button type="button" size={"icon"} className="shrink-0">
          <FiMic />
        </Button>
      </form>

      <div
        className={`md:gap-2 shrink-0 ${
          showWidthFullSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setShowWidthFullSearch(true)}
          variant={"ghost"}
          size={"icon"}
          className="md:hidden"
        >
          <FiSearch />
        </Button>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <FiMic />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <FiUpload />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <FiBell />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <FiUser />
        </Button>
      </div>
    </div>
  );
}

export default PageHeader;

type PageHeaderType = {
  hidden?: boolean;
  toggle?: () => void;
};

export function PageHeaderTitle({ hidden = false, toggle }: PageHeaderType) {
  return (
    <div
      className={` gap-4 shrink-0 items-center ${hidden ? "hidden" : "flex"}`}
    >
      <Button onClick={toggle}>
        <FiMenu />
      </Button>
      <a href="/">
        <img className="h-6" src={logo} alt="logo" />
      </a>
    </div>
  );
}
PageHeaderTitle;
