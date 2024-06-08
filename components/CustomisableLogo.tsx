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
        "logo w-10 h-10 rounded-xl flex items-center justify-center text-3xl font-bold hover:rounded-md transition-all select-none",
        className
      )}
    >
      {letter}
    </div>
  );
};

export default CustomisableLogo;
