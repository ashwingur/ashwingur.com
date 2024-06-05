import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const TronConnecting: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-3xl mt-8">
      <div>Connecting to server...</div>
      <AiOutlineLoading className="text-4xl animate-spin mt-4" />
    </div>
  );
};

export default TronConnecting;
