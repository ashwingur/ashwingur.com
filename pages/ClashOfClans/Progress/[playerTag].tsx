import CocNavBar from "@components/clashofclans/CocNavBar";
import CocPlayerHistory from "@components/clashofclans/CocPlayerHistory";
import { useRouter } from "next/router";
import React from "react";
import { useIncrementViewCount } from "shared/queries/clashofclans";

const ProgressPage = () => {
  const router = useRouter();
  const playerTag =
    typeof router.query?.playerTag === "string"
      ? router.query.playerTag
      : undefined;
  useIncrementViewCount(playerTag);

  return (
    <div className="bg-clash">
      <CocNavBar />

      {playerTag && <CocPlayerHistory tag={playerTag} />}
    </div>
  );
};

export default ProgressPage;
