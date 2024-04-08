import { useEffect, useRef, useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import formatTimeAgo from "../utils/formatTimeAgo";

type VideGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMAT = new Intl.NumberFormat(undefined, { notation: "compact" });

function VideGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideGridItemProps) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current === null) return;
    if (videoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [videoPlaying]);
  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setVideoPlaying(true)}
      onMouseLeave={() => setVideoPlaying(false)}
    >
      <a className="relative aspect-video" href={`watch?v=${id}`}>
        <img
          src={thumbnailUrl}
          className="block size-full object-cover rounded-xl"
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          className={`block object-cover h-full absolute inset-0 transition-opacity duration-200 ${
            videoPlaying ? "opacity-100" : "opacity-0"
          }`}
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
        />
      </a>
      <div className="flex gap-2">
        <a href={`@/${channel.id} `} className="shrink-0">
          <img src={channel.profileUrl} className="size-12 rounded-full" />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`@/${channel.id} `} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMAT.format(views)} Views ● {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideGridItem;
