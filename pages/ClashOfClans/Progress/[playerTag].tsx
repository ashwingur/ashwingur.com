import CocNavBar from "@components/clashofclans/CocNavBar";
import CocPlayerHistory from "@components/clashofclans/CocPlayerHistory";
import router, { useRouter } from "next/router";
import React from "react";

const ProgressPage = () => {
  const router = useRouter();
  const playerTag =
    typeof router.query?.playerTag === "string"
      ? router.query.playerTag
      : undefined;
  return (
    <div className="bg-clash">
      <CocNavBar />

      {playerTag && <CocPlayerHistory tag={playerTag} />}
    </div>
  );
};

export default ProgressPage;
