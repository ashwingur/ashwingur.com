import { useRouter } from "next/router";
import React from "react";
import CocNavBar from "../../../components/clashofclans/CocNavBar";

const PlayerTag = () => {
  const router = useRouter();

  return (
    <div className="bg-clash">
      <CocNavBar />
    </div>
  );
};

export default PlayerTag;
