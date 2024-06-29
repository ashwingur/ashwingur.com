import clsx from "clsx";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface LoadingIconProps {
  className?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ className }) => (
  <AiOutlineLoading className={clsx(className ?? "animate-spin text-xl")} />
);

export default LoadingIcon;
