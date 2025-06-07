import CocButton from "@components/clashofclans/CocButton";
import CocLoadingOrError from "@components/clashofclans/CocLoadingOrError";
import CocNavBar from "@components/clashofclans/CocNavBar";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SpinningCircles } from "react-loading-icons";
import { formatToISO8601, useGetClanWarLog } from "shared/queries/clashofclans";
import Image from "next/image";
import clsx from "clsx";

const WarLog = () => {
  const router = useRouter();
  const clanTag =
    typeof router.query?.clanTag === "string"
      ? router.query.clanTag
      : undefined;

  const { data, isLoading, error } = useGetClanWarLog(clanTag);

  const warLogCards = data?.items.map((log, index) => {
    let bgColourClass = "bg-[#b5ce8a]";
    if (log.result == "tie") {
      bgColourClass = "bg-[#c2c2b8]";
    } else if (log.result == "lose") {
      bgColourClass = "bg-[#be8180]";
    }
    const endDate = new Date(formatToISO8601(log.endTime));
    const daysAgo = Math.round(
      (Date.now() - endDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    return (
      <div
        key={index}
        className={clsx(
          "flex flex-col rounded-lg border-2 border-black p-2 md:relative md:flex-none",
          bgColourClass,
        )}
      >
        <p
          style={{ textShadow: "none" }}
          className="text-center md:absolute md:top-1/2 md:-translate-y-1/2"
        >
          {daysAgo}d ago
        </p>
        <div className="flex flex-col justify-center md:flex-row">
          <div className="flex items-center justify-between md:flex-col">
            <p className="max-w-36 text-lg md:max-w-none">{log.clan.name}</p>
            <div className="flex items-center gap-2">
              <p
                style={{ textShadow: "none" }}
                className="font-coc font-thin text-slate-700 shadow-none"
              >
                {log.clan.destructionPercentage.toFixed(2)}%
              </p>
              <div className="flex items-center gap-1">
                <div className="relative size-6 md:size-8">
                  <Image
                    src="/assets/coc/stars/silver_star.png"
                    alt="Sword"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <p>{log.clan.stars}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex">
              <div className="relative size-8 md:size-8">
                <Image
                  src={log.clan.badgeUrls.medium}
                  alt="Clan Badge"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              {log.opponent.badgeUrls && (
                <div className="relative size-8 md:size-8">
                  <Image
                    src={log.opponent.badgeUrls.medium}
                    alt="Opponent Badge"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              )}
            </div>
            <p className="text-yellow-100">
              {log.teamSize} VS {log.teamSize}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 md:flex-col">
            <p className="max-w-36 text-lg md:max-w-none">
              {log.opponent.name}
            </p>
            <div className="flex items-center gap-2 md:flex-row-reverse">
              <p
                style={{ textShadow: "none" }}
                className="font-coc font-thin text-slate-700 shadow-none"
              >
                {log.opponent.destructionPercentage?.toFixed(2)}%
              </p>
              <div className="flex items-center gap-1">
                <div className="relative size-6 md:size-8">
                  <Image
                    src="/assets/coc/stars/silver_star.png"
                    alt="Sword"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <p>{log.opponent.stars}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="bg-clash min-h-screen pb-4 pt-20">
      <CocNavBar />
      <div className="coc-font-style mx-4 rounded-lg border-2 border-black bg-gradient-to-b from-[#389350] to-[#256336] xl:mx-auto xl:w-4/5">
        <h2 className="mt-4 text-center text-2xl">War Log</h2>
        <div className="mx-auto mt-2 flex w-40 items-center justify-center md:h-16 md:w-60">
          <Link href={`/ClashOfClans/clan/${(clanTag ?? "").replace("#", "")}`}>
            <CocButton
              className="w-40 hover:w-36 md:w-60 md:hover:w-56"
              text={"Clan"}
              innerColour="bg-purple-500"
              middleColour="bg-purple-600"
              outerColour="bg-purple-700"
              textClassName="text-xs md:text-base md:hover:text-sm"
            />
          </Link>
        </div>
        {data && data.items.length === 0 && !isLoading && (
          <p className="p-4 text-center text-xl">No war log data available</p>
        )}
        {error instanceof Error && (
          <p className="py-4 text-center text-xl text-red-300">
            Unable to fetch war log, or war log is private.
          </p>
        )}
        <div className="flex flex-col gap-2 p-4">{warLogCards}</div>
        {isLoading && <SpinningCircles className="mx-auto my-4" />}
      </div>
    </div>
  );
};

export default WarLog;
