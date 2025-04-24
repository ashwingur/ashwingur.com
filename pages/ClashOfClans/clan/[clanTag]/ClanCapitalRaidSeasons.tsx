import CocNavBar from "@components/clashofclans/CocNavBar";
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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePaginatedClanCapitalRaidSeasons(10, clanTag);

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
        <div>
          <p>{name}</p>
        </div>
      );
    };

    return (
      <div
        className="rounded-lg border-2 border-black bg-gradient-to-b from-[#c6c6c6] to-[#7b7b7b] p-2"
        key={idx}
      >
        <h3 className="text-center text-lg">{formattedStartDate}</h3>
        <div>
          <RaidStat
            name="Capital Gold Looted"
            icon="/assets/coc/clancapital/CapitalGold.webp"
            value={r.capitalTotalLoot}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="bg-clash min-h-screen pb-4 pt-20">
      <CocNavBar />
      <div className="coc-font-style mx-4 rounded-lg border-2 border-black bg-gradient-to-b from-[#389350] to-[#256336] xl:mx-auto xl:w-4/5">
        <h2 className="mt-4 text-center text-2xl">Clan Capital Raids</h2>
        <div className="flex flex-col gap-2 p-4">{raidCards}</div>
        {(isFetchingNextPage || isLoading) && (
          <SpinningCircles className="mx-auto my-4" />
        )}
      </div>
    </div>
  );
};

export default ClanCapitalRaidSeasons;
