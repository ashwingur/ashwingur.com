import React, { ReactNode } from "react";
import clsx from "clsx";

interface CardProps<T> {
  firstLayer: boolean;
  children: ReactNode;
  className?: string;
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
      <div className={firstLayer ? "card-top-2" : "card-hover-top-2"} />
      {React.Children.map(children, (child, index) => (
        <div key={index} className="z-10">
          {child}
        </div>
      ))}
      <div className={firstLayer ? "card-bottom-2" : "card-hover-bottom-2"} />
      <div className={firstLayer ? "card-bottom" : "card-hover-bottom"} />
    </div>
  );
};

export default Card;
