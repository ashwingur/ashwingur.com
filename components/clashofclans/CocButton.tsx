import React from "react";

interface CocButtonProps {
  text: String;
  onClick: () => void;
  outerColour: string;
  middleColour: string;
  innerColour: string;
  className?: String;
}

const CocButton = ({
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
      className={`${className} ${outerColour} relative clash-font-style p-4 rounded-xl border-2 border-black z-0 text-xl hover:text-base transition-all`}
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
          className={innerColour + " w-full h-full rounded-lg mx-2 mt-2"}
        ></div>
      </div>
      <div className="">{text}</div>
    </button>
  );
};

export default CocButton;
