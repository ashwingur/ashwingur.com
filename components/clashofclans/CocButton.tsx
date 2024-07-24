import React from "react";

interface CocButtonProps {
  text: String;
  onClick?: () => void;
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
      className={`${className} ${outerColour} clash-font-style relative z-0 rounded-xl border-2 border-black p-4 text-xl transition-all hover:text-base`}
    >
      <div className="absolute left-0 right-0 top-0 z-[-1] flex h-[90%] w-full">
        <div
          className={
            middleColour + " mx-[2px] my-[2px] h-full w-full rounded-lg"
          }
        ></div>
      </div>
      <div className="absolute left-0 right-0 top-0 z-[-1] flex h-[50%] w-full">
        <div
          className={innerColour + " mx-2 mt-2 h-full w-full rounded-lg"}
        ></div>
      </div>
      <div className="">{text}</div>
    </button>
  );
};

export default CocButton;
