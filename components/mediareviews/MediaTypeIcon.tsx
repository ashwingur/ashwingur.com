import React from "react";
import {
  FaBook,
  FaClapperboard,
  FaItunesNote,
  FaQuestion,
  FaTv,
} from "react-icons/fa6";
import { IoGameController } from "react-icons/io5";

interface MediaTypeIconProps {
  media_type: "Movie" | "Book" | "Show" | "Game" | "Music";
  className?: string;
}

const MediaTypeIcon: React.FC<MediaTypeIconProps> = ({
  media_type,
  className,
}) => {
  const icon = (media_type: MediaTypeIconProps["media_type"]) => {
    switch (media_type) {
      case "Movie":
        return <FaClapperboard />;
      case "Book":
        return <FaBook />;
      case "Show":
        return <FaTv />;
      case "Game":
        return <IoGameController />;
      case "Music":
        return <FaItunesNote />;
      default:
        return <FaQuestion />;
    }
  };

  return React.cloneElement(icon(media_type), { className });
};

export default MediaTypeIcon;
