import clsx from "clsx";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface LoadingIconProps {
  className?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ className }) => (
  <AiOutlineLoading className={clsx(className ?? "text-xl", "animate-spin")} />
);

export default LoadingIcon;
