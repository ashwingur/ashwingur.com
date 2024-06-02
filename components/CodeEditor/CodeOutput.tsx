import clsx from "clsx";
import { useTheme } from "next-themes";
import React from "react";

interface CodeOutputProps {
  className?: string;
}

const CodeOutput = ({ className }: CodeOutputProps) => {
  return (
    <div className={clsx(className)}>
      <div className="h-16 mt-4">
        <button className="bg-sky-200 dark:bg-[#2e1065] hover:bg-blue-400 dark:hover:bg-violet-800 rounded-lg py-3 px-4 font-bold mx-auto transition-all w-24 text-center">
          Run
        </button>
      </div>
      <div className="bg-[#f0f0f0] dark:bg-[#151515] h-[80vh]"></div>
    </div>
  );
};

export default CodeOutput;
