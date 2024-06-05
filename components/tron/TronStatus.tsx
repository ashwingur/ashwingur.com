import React from "react";

interface TronStatusProps {
  connectedUsers: number;
  latency: number | null;
}

const TronStatus: React.FC<TronStatusProps> = ({ connectedUsers, latency }) => {
  return (
    <div className="flex gap-8 justify-center mt-2 md:mt-4 mb-2 font-mono">
      <div>Total Online: {connectedUsers}</div>
      <div className="w-20">ms: {latency ?? "NA"}</div>
    </div>
  );
};

export default TronStatus;
