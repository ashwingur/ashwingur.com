import clsx from "clsx";
import Link from "next/link";
import React from "react";
import {
  CwlWarRoundSchema,
  FullClanSchema,
} from "shared/validations/ClashOfClansSchemas";
import { z } from "zod";
import { RiSwordFill } from "react-icons/ri";

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
      <Link
        key={idx}
        className="flex justify-between rounded-md px-4 py-1 text-sm transition-all hover:bg-black/30"
        href={`/ClashOfClans/clanwarleague/${m.war_tag.replace("#", "")}`}
      >
        <p className="w-36">{m.clan}</p>
        <p>VS</p>
        <p className="w-36 text-end">{m.opponent}</p>
      </Link>
    ));
    let state = "Wars Ended";
    if (r[0].state === "inWar") {
      state = "Current Wars";
    } else if (r[0].state === "preparation") {
      state = "Preparation";
    }
    return (
      <div
        className={clsx(
          "rounded-lg border-2 border-black pt-4",
          state === "Wars Ended" && "bg-zinc-700",
          state === "Current Wars" && "bg-orange-800",
          state === "Preparation" && "bg-purple-900/70",
        )}
        key={index}
      >
        <h4 className="text-center">
          Round {index + 1} - {state}
        </h4>
        <div>{matches}</div>
      </div>
    );
  });

  const performanceCards = clan.memberList
    .filter((p) => p.cwl_war && p.cwl_war.attack_limit > 0)
    .map((p, index) => {
      if (p.cwl_war) {
        return (
          <Link
            className={clsx(
              "relative rounded-lg border-2 border-black p-2 transition-all",
              p.cwl_war.attack_todo
                ? "bg-orange-900 hover:bg-orange-950/70"
                : "bg-zinc-800 hover:bg-zinc-800/70",
            )}
            key={index}
            href={`/ClashOfClans/player/${p.tag.replace("#", "")}`}
          >
            <h4 className="text-center">{p.name}</h4>
            {p.cwl_war.attack_todo && (
              <RiSwordFill className="absolute right-2 top-2" />
            )}
            <p className="">
              <span className="">Attacks:</span> {p.cwl_war.attacks}/
              {p.cwl_war.attack_limit}
            </p>
            <p>
              <span className="">Stars:</span> {p.cwl_war.total_stars}/
              {p.cwl_war.attack_limit * 3}
            </p>
            <p>
              <span className="">Destruction:</span>{" "}
              {p.cwl_war.total_destruction}%
            </p>
            <p>
              <span className="">Attacks Received:</span> {p.cwl_war.defends}
            </p>
            {p.cwl_war.attacks > 0 && (
              <p>
                <span className="">Average Duration:</span>{" "}
                {Math.round(p.cwl_war.total_duration / p.cwl_war.attacks)}s
              </p>
            )}
          </Link>
        );
      } else {
        return <div key={index}></div>;
      }
    });

  return (
    <div
      className={clsx(
        className,
        "coc-font-style rounded-lg border-2 border-black bg-gradient-to-b from-[#9f815e] to-[#7d643c]",
      )}
    >
      <h3 className="mt-4 text-center text-2xl">Clan War League</h3>
      <h3 className="mt-2 text-center text-lg">Rounds</h3>
      <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 md:px-4 2xl:grid-cols-4">
        {roundCards}
      </div>
      <h3 className="mb-2 mt-2 text-center text-lg">Player Performance</h3>
      <div className="grid gap-2 px-4 pb-4 lg:grid-cols-2 xl:grid-cols-4">
        {performanceCards}
      </div>
    </div>
  );
};

export default ClanWarLeagueInfo;
