import clsx from "clsx";
import React from "react";
import {
  CwlWarRoundSchema,
  FullClanSchema,
} from "shared/validations/ClashOfClansSchemas";
import { array, z } from "zod";

interface ClanWarLeagueInfoProps {
  className?: string;
  clan: z.infer<typeof FullClanSchema>;
}

const ClanWarLeagueInfo: React.FC<ClanWarLeagueInfoProps> = ({
  className,
  clan,
}) => {
  const rounds: z.infer<typeof CwlWarRoundSchema>[][] = [];
  const ROUND_SIZE = 4;
  for (
    let i = 0;
    i < (clan.cwl_war_rounds ? clan.cwl_war_rounds.length : 0);
    i += ROUND_SIZE
  ) {
    rounds.push(clan.cwl_war_rounds?.slice(i, i + ROUND_SIZE) ?? []);
  }

  const roundCards = rounds.map((r, index) => {
    const matches = r.map((m, idx) => (
      <div key={idx}>
        {m.clan} VS {m.opponent}
      </div>
    ));
    return (
      <div
        className="rounded-lg border-2 border-black bg-purple-900/70 p-4"
        key={index}
      >
        <h4 className="text-center">Round {index + 1}</h4>
        <div>{matches}</div>
      </div>
    );
  });

  return (
    <div
      className={clsx(
        className,
        "coc-font-style rounded-lg border-2 border-black bg-gradient-to-b from-[#9f815e] to-[#7d643c]",
      )}
    >
      <h3 className="my-4 text-center text-2xl">Clan War League</h3>
      <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 md:p-4 2xl:grid-cols-4">
        {roundCards}
      </div>
    </div>
  );
};

export default ClanWarLeagueInfo;
