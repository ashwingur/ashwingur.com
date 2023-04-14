import React from "react";

interface CocButtonProps {
  text: String;
  onClick?: () => void;
  outerColour: string;
  middleColour: string;
  innerColour: string;
  className?: String;
}

const CocSmallButton = ({
  text,
  onClick,
  outerColour,
  middleColour,
  innerColour,
  className,
}: CocButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${outerColour} relative clash-font-style p-1 rounded-xl border-2 border-black z-0 hover:text-sm transition-all`}
    >
      <div className="absolute flex w-full h-[90%] top-0 left-0 right-0 z-[-1]">
        <div
          className={
            middleColour + " w-full h-full rounded-lg mx-[2px] my-[2px]"
          }
        ></div>
      </div>
      <div className="absolute flex w-full h-[50%] top-0 left-0 right-0 z-[-1]">
        <div
          className={innerColour + " w-full h-full rounded-lg mx-1 mt-1"}
        ></div>
      </div>
      <div className="">{text}</div>
    </button>
  );
};

export default CocSmallButton;
