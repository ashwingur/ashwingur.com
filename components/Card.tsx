import React, { ReactElement, ReactNode } from "react";
import clsx from "clsx";

interface CardProps<T> {
  firstLayer: boolean;
  children?: ReactNode;
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
      {/* Instead of directly putting {children} here we loop through because we also want to add a z-index value which will help us with styling background effects and layering them easily */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElement<any>, {
            className: clsx(child.props.className, "relative z-10"),
          });
        }
        return child;
      })}
      <div className={firstLayer ? "card-bottom-2" : "card-hover-bottom-2"} />
      <div className={firstLayer ? "card-bottom" : "card-hover-bottom"} />
    </div>
  );
};

export default Card;
