import { ElementType } from "react";
import {
  FiBook,
  FiClock,
  FiFile,
  FiHome,
  FiMove,
  FiMusic,
  FiPlay,
  FiRadio,
  FiRepeat,
  FiVideo,
} from "react-icons/fi";
import { buttonStyles } from "./buttons";
import { twMerge } from "tailwind-merge";
import { MdSubscriptions } from "react-icons/md";
import LargeSideBarSection from "./LargeSideBarSection";
import LargeSideBarItem from "./LargeSideBarItem";
import { FaCartPlus, FaGamepad, FaHistory } from "react-icons/fa";
import { AiFillTrophy } from "react-icons/ai";
import { FaNewspaper, FaShirt } from "react-icons/fa6";
import { playlists, subscriptions } from "../data/sidebar";
import { useSideBarContext } from "../context/sidebarContext";
import { PageHeaderTitle } from "../layout/PageHeader";

function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSideBarContext();
  return (
    <>
      <aside
        className={`shrink-0 scrollbar-hidden overflow-y-auto pb-4 flex flex-col ml-1  ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSideBarItem Icon={FiHome} title={"Home"} url={"/"} />
        <SmallSideBarItem Icon={FiRepeat} title={"Shorts"} url={"/shorts"} />
        <SmallSideBarItem
          Icon={MdSubscriptions}
          title={"Subscriptions"}
          url={"/subscriptions"}
        />
        <SmallSideBarItem Icon={FiBook} title={"Library"} url={"/library"} />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        ></div>
      )}
      <aside
        className={`min-w-56 lg:sticky scrollbar-hidden  absolute top-0 overflow-y-auto pb-4 px-2   flex-col  ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderTitle toggle={close} />
        </div>
        <LargeSideBarSection>
          <LargeSideBarItem
            isActive
            IconOrImgUrl={FiHome}
            title={"Home"}
            url={"/"}
          />
          <LargeSideBarItem
            IconOrImgUrl={MdSubscriptions}
            title={"Subscriptions"}
            url={"/subscriptions"}
          />
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection visibleItemCount={5}>
          <LargeSideBarItem
            IconOrImgUrl={FiBook}
            title="Library"
            url="/library"
          />
          <LargeSideBarItem
            IconOrImgUrl={FaHistory}
            title="History"
            url="/history"
          />
          <LargeSideBarItem
            IconOrImgUrl={FiPlay}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSideBarItem
            IconOrImgUrl={FiClock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargeSideBarItem
              key={playlist.id}
              IconOrImgUrl={FiVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargeSideBarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Explore">
          <LargeSideBarItem
            IconOrImgUrl={FiFile}
            title="Trending"
            url="/trending"
          />
          <LargeSideBarItem
            IconOrImgUrl={FaCartPlus}
            title="Shopping"
            url="/shopping"
          />
          <LargeSideBarItem IconOrImgUrl={FiMusic} title="Music" url="/music" />
          <LargeSideBarItem
            IconOrImgUrl={FiMove}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSideBarItem IconOrImgUrl={FiRadio} title="Live" url="/live" />
          <LargeSideBarItem
            IconOrImgUrl={FaGamepad}
            title="Gaming"
            url="/gaming"
          />
          <LargeSideBarItem
            IconOrImgUrl={FaNewspaper}
            title="News"
            url="/news"
          />
          <LargeSideBarItem
            IconOrImgUrl={AiFillTrophy}
            title="Sports"
            url="/sports"
          />
          <LargeSideBarItem
            IconOrImgUrl={FiBook}
            title="Learning"
            url="/learning"
          />
          <LargeSideBarItem
            IconOrImgUrl={FaShirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSideBarItem
            IconOrImgUrl={FiMusic}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSideBarSection>
      </aside>
    </>
  );
}

export default Sidebar;

export interface SmallSideBarItemProps {
  Icon: ElementType;
  title: string;
  url: string;
}

function SmallSideBarItem({ Icon, title, url }: SmallSideBarItemProps) {
  return (
    <a
      className={
        (twMerge(buttonStyles({ variant: "ghost" })),
        "py-4 px-1 flex flex-col items-center justify-center rounded-lg gap-1 ")
      }
      href={url}
    >
      <Icon className={"size-6"} />
      <div className="text-sm">{title}</div>
    </a>
  );
}
