import React from "react";
import { ClanWar } from "../../shared/interfaces/coc.interface";
import Image from "next/image";
import Link from "next/link";
import { formatToISO8601 } from "shared/queries/clashofclans";
import { z } from "zod";
import { WarSchema } from "shared/validations/ClashOfClansSchemas";

interface CocWarStatusProps {
  clanWar: z.input<typeof WarSchema>;
}

const ClanStatus = (
  name: string,
  tag: string,
  teamSize: number,
  stars: number,
  attacks: number,
  attacksPerMember: number,
) => {
  return (
    <div className="clash-font-style flex flex-col gap-2">
      <Link href={`/ClashOfClans/clan/${tag.substring(1)}`}>
        <div className="text-yellow-100">{name}</div>
      </Link>
      <div className="flex items-center gap-2">
        <div className="relative h-6 w-6 md:h-8 md:w-8">
          <Image
            unoptimized
            src={`/assets/coc/stars/silver_star.png`}
            alt={`Star`}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div>
          {stars}/{3 * teamSize}
        </div>
      </div>
      <div className="coc-font-style flex items-center gap-2 md:text-xl">
        <div className="relative h-6 w-6 md:h-8 md:w-8">
          <Image
            unoptimized
            src={`/assets/coc/sword.png`}
            alt={`Sword`}
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div>
          {attacks}/{attacksPerMember * teamSize}
        </div>
      </div>
    </div>
  );
};

const CocWarStatus = ({ clanWar }: CocWarStatusProps) => {
  const warState = clanWar.state.replace(/([A-Z]+)/g, " $1");

  console.log(clanWar.attacksPerMember, clanWar.teamSize);

  const myClanStatus = ClanStatus(
    clanWar.clan.name ?? "",
    clanWar.clan.tag ?? "",
    clanWar.teamSize ?? clanWar.clan.members?.length ?? 0,
    clanWar.clan.stars,
    clanWar.clan.attacks,
    clanWar.attacksPerMember ?? 1,
  );

  const otherClanStatus = ClanStatus(
    clanWar.opponent.name ?? "",
    clanWar.opponent.tag ?? "",
    clanWar.teamSize ?? clanWar.opponent.members?.length ?? 0,
    clanWar.opponent.stars,
    clanWar.opponent.attacks,
    clanWar.attacksPerMember ?? 1,
  );

  function formatDurationFromNow(toDate: Date | string | number): string {
    const now = new Date();
    const target = new Date(toDate);

    const durationMs = target.getTime() - now.getTime();
    const totalMinutes = Math.max(0, Math.floor(durationMs / (1000 * 60))); // Prevent negative values

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}H ${minutes}M`;
  }

  const startTimeString = formatDurationFromNow(
    formatToISO8601(clanWar.startTime ?? clanWar.warStartTime ?? ""),
  );
  const endTimeString = formatDurationFromNow(
    formatToISO8601(clanWar.endTime ?? ""),
  );
  console.log(warState);

  return (
    <div>
      <div className="mt-4 flex flex-col items-center gap-2 rounded-lg border-2 border-white bg-black/30 p-2">
        <div className="flex gap-4 md:gap-16">
          {myClanStatus}
          {otherClanStatus}
        </div>
        <div className="text-center">
          {warState !== "in War" && (
            <p className="coc-font-style">
              <span className="text-red-500">{startTimeString}</span>
            </p>
          )}
          {warState === "in War" && (
            <p className="coc-font-style">
              <span className="text-red-500">{endTimeString}</span>
            </p>
          )}

          <p className="coc-font-style capitalize">
            <span className="text-red-500">{warState}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CocWarStatus;
