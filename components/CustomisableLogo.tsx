import clsx from "clsx";
import React from "react";

interface CustomisableLogoProps {
  letter?: string;
  className?: string;
}

const CustomisableLogo: React.FC<CustomisableLogoProps> = ({
  letter = "A",
  className = "bg-primary text-text-primary",
}) => {
  return (
    <div
      className={clsx(
        "logo w-8 h-8 lg:h-10 lg:w-10 text-2xl lg:text-3xl rounded-xl flex items-center justify-center font-bold hover:rounded-md transition-all select-none",
        className
      )}
    >
      {letter}
    </div>
  );
};

export default CustomisableLogo;
