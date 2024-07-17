import React from "react";
import {
  FaBook,
  FaClapperboard,
  FaItunesNote,
  FaQuestion,
} from "react-icons/fa6";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { IoGameController } from "react-icons/io5";
import { IconBaseProps } from "react-icons";

interface MediaTypeIconProps {
  media_type: "SELECT" | "Movie" | "Book" | "Show" | "Game" | "Music" | string;
  className?: string;
  iconBaseProps?: IconBaseProps;
}

const MediaTypeIcon: React.FC<MediaTypeIconProps> = ({
  media_type,
  className,
  iconBaseProps,
}) => {
  const icon = (media_type: MediaTypeIconProps["media_type"]) => {
    switch (media_type) {
      case "Movie":
        return <FaClapperboard {...iconBaseProps} />;
      case "Book":
        return <FaBook {...iconBaseProps} />;
      case "Show":
        return <PiTelevisionSimpleBold {...iconBaseProps} />;
      case "Game":
        return <IoGameController {...iconBaseProps} />;
      case "Music":
        return <FaItunesNote {...iconBaseProps} />;
      default:
        return <FaQuestion {...iconBaseProps} />;
    }
  };

  return React.cloneElement(icon(media_type), { className });
};

export default MediaTypeIcon;
