import clsx from "clsx";
import React, { ReactNode, HTMLAttributes } from "react";

interface CardProps<T = {}> extends HTMLAttributes<HTMLDivElement> {
  firstLayer: boolean; // First layer is bg-hover, 2nd layer is bg-muted
  children?: ReactNode;
  customProps?: T;
}

const Card = <T extends {}>({
  firstLayer,
  children,
  className = "",
  customProps,
  ...props
}: CardProps<T>): JSX.Element => {
  return (
    <div
      className={clsx(
        "relative",
        firstLayer ? "card" : "card-hover",
        className
      )}
      {...props}
    >
      <div className={firstLayer ? "card-top" : "card-hover-top"} />
      {children}
      <div className={firstLayer ? "card-bottom" : "card-hover-bottom"} />
    </div>
  );
};

export default Card;
