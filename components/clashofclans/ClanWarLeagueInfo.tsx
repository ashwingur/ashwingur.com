import clsx from "clsx";
import Link from "next/link";
import React from "react";
import {
  CwlWarRoundSchema,
  FullClanSchema,
} from "shared/validations/ClashOfClansSchemas";
import { z } from "zod";
import { RiSwordFill } from "react-icons/ri";
import WarPerformanceChart, { WarDataItem } from "./WarPerformanceChart";
import { FaStar } from "react-icons/fa";

interface ClanWarLeagueInfoProps {
  className?: string;
  clan: z.input<typeof FullClanSchema>;
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
    const matches = r.map((m, idx) => {
      let clanBgClass = "bg-blue-900";
      let opponentBgClass = "bg-blue-900";
      if (m.state === "inWar") {
        clanBgClass = "bg-orange-800";
        opponentBgClass = "bg-orange-800";
      } else if (m.state === "preparation") {
      } else if (m.clan_stars > m.opponent_stars) {
        clanBgClass = "bg-green-800";
        opponentBgClass = "bg-red-800";
      } else if (
        m.clan_stars === m.opponent_stars &&
        m.clan_destruction_percentage > m.opponent_destruction_percentage
      ) {
        clanBgClass = "bg-green-800";
        opponentBgClass = "bg-red-800";
      } else {
        clanBgClass = "bg-red-800";
        opponentBgClass = "bg-green-800";
      }
      return (
        <Link
          key={idx}
          className="group flex justify-between rounded-md px-4 py-1 text-xs transition-all"
          href={`/ClashOfClans/clanwarleague/${m.war_tag.replace("#", "")}`}
        >
          <div
            className={clsx(
              "flex w-1/2 items-center justify-between rounded-l-lg border border-white px-2 py-1 transition-all group-hover:bg-opacity-30",
              clanBgClass,
            )}
          >
            <p>{m.clan}</p>
            <p className="">{m.clan_stars}</p>
          </div>
          <div
            className={clsx(
              "flex w-1/2 items-center justify-between rounded-r-lg border border-white px-2 py-1 transition-all group-hover:bg-opacity-30",
              opponentBgClass,
            )}
          >
            <p className="">{m.opponent_stars}</p>
            <p>{m.opponent}</p>
          </div>
        </Link>
      );
    });
    let state = "Complete";
    if (r[0].state === "inWar") {
      state = "In War";
    } else if (r[0].state === "preparation") {
      state = "Preparation";
    }
    return (
      <div
        className={clsx(
          "rounded-lg border-2 border-black bg-zinc-700 pb-1 pt-4",
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
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((p, index) => {
      if (p.cwl_war) {
        return (
          <Link
            className={clsx(
              "relative rounded-lg border-2 border-black px-2 py-1 text-sm transition-all",
              p.cwl_war.attack_todo
                ? "bg-orange-900 hover:bg-orange-950/70"
                : "bg-zinc-800 hover:bg-zinc-800/70",
            )}
            key={index}
            href={`/ClashOfClans/player/${p.tag.replace("#", "")}`}
          >
            <h4 className="coc-font-style text-center text-xl">{p.name}</h4>
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

  const leaderboard: {
    clan: string;
    tag: string;
    stars: number;
    destruction: number;
  }[] = [];

  const addToLeaderBoard = (
    clan: string,
    tag: string,
    stars: number,
    destruction: number,
    win: boolean,
  ) => {
    const existing = leaderboard.find((entry) => entry.tag === tag);
    if (existing) {
      existing.stars += stars;
      if (win) existing.stars += 10;
      existing.destruction += destruction;
    } else {
      leaderboard.push({
        clan,
        tag,
        stars: stars + (win ? 10 : 0), // 10 bonus stars for a win
        destruction,
      });
    }
  };

  clan.cwl_war_rounds
    ?.filter((r) => r.state === "inWar" || r.state === "warEnded")
    .forEach((round) => {
      addToLeaderBoard(
        round.clan,
        round.clan_tag,
        round.clan_stars,
        round.clan_destruction_percentage,
        round.state === "warEnded" &&
          (round.clan_stars > round.opponent_stars ||
            (round.clan_stars === round.opponent_stars &&
              round.clan_destruction_percentage >
                round.opponent_destruction_percentage)),
      );
      addToLeaderBoard(
        round.opponent,
        round.opponent_tag,
        round.opponent_stars,
        round.opponent_destruction_percentage,
        round.state === "warEnded" &&
          (round.opponent_stars > round.clan_stars ||
            (round.clan_stars === round.opponent_stars &&
              round.clan_destruction_percentage <
                round.opponent_destruction_percentage)),
      );
    });

  leaderboard.sort((a, b) => {
    if (b.stars !== a.stars) {
      return b.stars - a.stars; // Sort by stars descending
    }
    return b.destruction - a.destruction; // Tie-breaker: destruction descending
  });

  const leaderboardCards = leaderboard.map((c, idx) => {
    return (
      <Link
        className={clsx(
          "flex justify-between rounded-lg border border-white px-2 py-1 transition-all",
          idx === 0 && "bg-yellow-600 hover:bg-yellow-600/60",
          idx === 1 && "bg-neutral-400 hover:bg-neutral-400/60",
          idx === 2 && "bg-amber-800 hover:bg-amber-800/50",
          idx >= 3 && "bg-zinc-800 hover:bg-zinc-800/60",
        )}
        key={idx}
        href={`/ClashOfClans/clan/${c.tag.replace("#", "")}`}
      >
        <p className="flex">
          <span className="block w-6">{idx + 1}.</span> {c.clan}
        </p>
        <p className="flex items-center gap-1">
          {c.stars} <FaStar />
        </p>
      </Link>
    );
  });

  const attackChartData: WarDataItem[] = clan.memberList
    .filter((p) => p.cwl_war && p.cwl_war.attack_limit > 0)
    .map((p) => ({
      name: p.name,
      remaining: (p.cwl_war?.attack_limit ?? 0) - (p.cwl_war?.attacks ?? 0),
      used: p.cwl_war?.attacks ?? 0,
    }))
    .sort((a, b) => b.used - a.used);
  const starChartData: WarDataItem[] = clan.memberList
    .filter((p) => p.cwl_war && p.cwl_war.attack_limit > 0)
    .map((p) => ({
      name: p.name,
      remaining:
        (p.cwl_war?.attack_limit ?? 0) * 3 - (p.cwl_war?.total_stars ?? 0),
      used: p.cwl_war?.total_stars ?? 0,
    }))
    .sort((a, b) => b.used - a.used);
  const destructionChartData: WarDataItem[] = clan.memberList
    .filter((p) => p.cwl_war && p.cwl_war.attack_limit > 0)
    .map((p) => ({
      name: p.name,
      remaining:
        (p.cwl_war?.attack_limit ?? 0) * 100 -
        (p.cwl_war?.total_destruction ?? 0),
      used: p.cwl_war?.total_destruction ?? 0,
    }))
    .sort((a, b) => b.used - a.used);
  const averageDurationChartData: WarDataItem[] = clan.memberList
    .filter((p) => p.cwl_war && p.cwl_war.attack_limit > 0)
    .map((p) => ({
      name: p.name,
      remaining:
        180 -
        Math.round(
          (p.cwl_war?.total_duration ?? 0) /
            Math.max(p.cwl_war?.attacks ?? 1, 1),
        ),
      used: Math.round(
        (p.cwl_war?.total_duration ?? 0) / Math.max(p.cwl_war?.attacks ?? 1, 1),
      ),
    }))
    .sort((a, b) => b.used - a.used);

  return (
    <div
      className={clsx(
        className,
        "coc-font-style rounded-lg border-2 border-black bg-gradient-to-b from-[#9f815e] to-[#7d643c]",
      )}
    >
      <h3 className="mt-4 text-center text-2xl">Clan War League</h3>
      {leaderboard.length > 0 && (
        <>
          <h3 className="mt-2 text-center text-lg">Leaderboard</h3>
          <div className="mt-1 px-2">
            <div className="mx-auto flex w-full flex-col gap-1 rounded-lg border-2 border-black bg-[#5e4b36] p-2 md:max-w-96 lg:gap-2">
              {leaderboardCards}
            </div>
          </div>
        </>
      )}
      <h3 className="mt-4 text-center text-lg">Rounds</h3>
      <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 md:px-4 2xl:grid-cols-4">
        {roundCards}
      </div>
      <h3 className="mb-2 mt-2 text-center text-lg">
        Player Performance - {clan.name}
      </h3>
      {performanceCards.length > 0 ? (
        <>
          <div className="grid lg:grid-cols-2 2xl:grid-cols-4">
            <WarPerformanceChart data={attackChartData} chartTitle="Attacks" />
            <WarPerformanceChart data={starChartData} chartTitle="Stars" />
            <WarPerformanceChart
              data={destructionChartData}
              chartTitle="Destruction %"
            />
            <WarPerformanceChart
              data={averageDurationChartData}
              chartTitle="Average Attack Duration"
            />
          </div>
          <div className="grid gap-2 px-4 pb-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {performanceCards}
          </div>
        </>
      ) : (
        <p className="pb-2 text-center">No war data</p>
      )}
    </div>
  );
};

export default ClanWarLeagueInfo;
