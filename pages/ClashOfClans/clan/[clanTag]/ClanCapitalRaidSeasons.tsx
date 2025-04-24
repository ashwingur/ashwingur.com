import CocButton from "@components/clashofclans/CocButton";
import CocNavBar from "@components/clashofclans/CocNavBar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { SpinningCircles } from "react-loading-icons";
import {
  formatToISO8601,
  usePaginatedClanCapitalRaidSeasons,
} from "shared/queries/clashofclans";

const ClanCapitalRaidSeasons = () => {
  const router = useRouter();
  const clanTag =
    typeof router.query?.clanTag === "string"
      ? router.query.clanTag
      : undefined;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = usePaginatedClanCapitalRaidSeasons(5, clanTag);

  // Create refs to persist latest values between renders
  const isFetchingNextPageRef = useRef(isFetchingNextPage);
  const hasNextPageRef = useRef(hasNextPage);

  // Update refs when values change
  useEffect(() => {
    isFetchingNextPageRef.current = isFetchingNextPage;
    hasNextPageRef.current = hasNextPage;
  }, [isFetchingNextPage, hasNextPage]);

  // Scroll handler for infinite loading
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    const threshold = 500; // px from bottom

    if (
      scrollHeight - currentScroll <= threshold &&
      !isFetchingNextPageRef.current &&
      hasNextPageRef.current
    ) {
      fetchNextPage();
    }
  };

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // In case content doesn't fill screen initially
  useEffect(() => {
    handleScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const raids = data?.pages.flatMap((page) => page.items) || [];

  const raidCards = raids.map((r, idx) => {
    const startDate = new Date(formatToISO8601(r.startTime));

    const formattedStartDate = startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const RaidStat: React.FC<{ name: string; icon: string; value: number }> = ({
      name,
      icon,
      value,
    }) => {
      return (
        <div className="rounded-lg border-2 border-black bg-[#a8a197] p-2">
          <p className="text-sm md:text-xl">{name}:</p>
          <div className="flex items-center gap-1">
            <div className="relative h-8 w-8">
              <Image src={icon} alt={name} className="object-contain" fill />
            </div>
            <p>{value.toLocaleString()}</p>
          </div>
        </div>
      );
    };

    return (
      <div
        className="rounded-lg border-2 border-black bg-[#bebeb6] p-2"
        key={idx}
      >
        <h3 className="mb-2 text-center text-lg">{formattedStartDate}</h3>
        {r.members && (
          <h3 className="mb-2 text-center text-sm">
            Participants: {r.members.length}
          </h3>
        )}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
          <RaidStat
            name="Capital Total Loot"
            icon="/assets/coc/clancapital/CapitalGold.webp"
            value={r.capitalTotalLoot}
          />
          <RaidStat
            name="Raids Completed"
            icon="/assets/coc/clancapital/RaidSwords.webp"
            value={r.raidsCompleted}
          />
          <RaidStat
            name="Total Attacks"
            icon="/assets/coc/clancapital/RaidSwords.webp"
            value={r.totalAttacks}
          />
          <RaidStat
            name="Enemy Districts Destroyed"
            icon="/assets/coc/clancapital/DistrictHall.webp"
            value={r.capitalTotalLoot}
          />
          <RaidStat
            name="Offensive Reward"
            icon="/assets/coc/clancapital/RaidMedal.webp"
            value={r.offensiveReward}
          />
          <RaidStat
            name="Defensive Reward"
            icon="/assets/coc/clancapital/RaidMedal.webp"
            value={r.defensiveReward}
          />
        </div>
        {r.attackLog.length > 0 && (
          <>
            <h3 className="mb-2 mt-4 text-center text-sm">Clans Attacked</h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {r.attackLog.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={`/ClashOfClans/clan/${item.defender.tag.replace("#", "")}`}
                    className="flex justify-between rounded-lg border-2 border-black bg-[#a4a4a4] p-2 transition-all hover:bg-black/40"
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8">
                        <Image
                          unoptimized
                          src={item.defender.badgeUrls.small}
                          alt={"Clan Badge"}
                          className="object-contain"
                          fill
                        />
                      </div>
                      <p>{item.defender.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8">
                        <Image
                          unoptimized
                          src="/assets/coc/clancapital/RaidSwords.webp"
                          alt={"Clan Badge"}
                          className="object-contain"
                          fill
                        />
                      </div>

                      <p className="mr-2 w-4 text-end">{item.attackCount}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
        {r.defenseLog.length > 0 && (
          <>
            <h3 className="mb-2 mt-4 text-center text-sm">Clans Defended</h3>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {r.defenseLog.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={`/ClashOfClans/clan/${item.attacker.tag.replace("#", "")}`}
                    className="flex justify-between rounded-lg border-2 border-black bg-[#a4a4a4] p-2 transition-all hover:bg-black/40"
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8">
                        <Image
                          unoptimized
                          src={item.attacker.badgeUrls.small}
                          alt={"Clan Badge"}
                          className="object-contain"
                          fill
                        />
                      </div>
                      <p>{item.attacker.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8">
                        <Image
                          unoptimized
                          src="/assets/coc/clancapital/RaidSwords.webp"
                          alt={"Clan Badge"}
                          className="object-contain"
                          fill
                        />
                      </div>

                      <p className="mr-2 w-4 text-end">{item.attackCount}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  });

  return (
    <div className="bg-clash min-h-screen pb-4 pt-20">
      <CocNavBar />
      <div className="coc-font-style mx-4 rounded-lg border-2 border-black bg-gradient-to-b from-[#389350] to-[#256336] xl:mx-auto xl:w-4/5">
        <h2 className="mt-4 text-center text-2xl">Clan Capital Raids</h2>
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
        {raids.length === 0 && !isFetchingNextPage && !isLoading && (
          <p className="p-4 text-center text-xl">No raid data available</p>
        )}
        {error instanceof Error && (
          <p className="text-center text-xl text-red-300">{error.message}</p>
        )}
        <div className="flex flex-col gap-2 p-4 lg:gap-4">{raidCards}</div>
        {(isFetchingNextPage || isLoading) && (
          <SpinningCircles className="mx-auto my-4" />
        )}
      </div>
    </div>
  );
};

export default ClanCapitalRaidSeasons;
