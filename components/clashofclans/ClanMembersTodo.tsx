import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { FullClanSchema } from "shared/validations/ClashOfClansSchemas";
import { z } from "zod";

interface ClanMembersTodoProps {
  clan: z.input<typeof FullClanSchema>;
  className?: string;
}

const ClanMembersTodo: React.FC<ClanMembersTodoProps> = ({
  clan,
  className,
}) => {
  const warAttacksTodo = clan.memberList
    .filter((p) => p.war !== null && p.war.attacks < 2)
    .sort((a, b) => {
      if (a.war?.attacks !== b.war?.attacks) {
        return (b.war?.attacks ?? 0) - (a.war?.attacks ?? 0);
      }
      return a.name.localeCompare(b.name);
    })
    .map((p, idx) => {
      return (
        <Link
          key={idx}
          className="rounded-md border border-white bg-[#494f72] px-2 py-1 text-xs transition-all hover:bg-black/50 lg:text-sm"
          href={`/ClashOfClans/player/${p.tag.replace("#", "")}`}
        >
          {p.name} — {p.war?.attacks}/2
        </Link>
      );
    });

  const cwlWarAttacksTodo = clan.memberList
    .filter((p) => p.cwl_war?.attack_todo === true)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((p, idx) => {
      return (
        <Link
          key={idx}
          className="rounded-md border border-white bg-[#494f72] px-2 py-1 text-xs transition-all hover:bg-black/50 lg:text-sm"
          href={`/ClashOfClans/player/${p.tag.replace("#", "")}`}
        >
          {p.name} — 0/1
        </Link>
      );
    });
  const capitalRaidAttacksTodo = clan.memberList
    .filter((p) => p.clan_capital !== null)
    .sort((a, b) => {
      if (a.clan_capital?.attacks !== b.clan_capital?.attacks) {
        return (b.clan_capital?.attacks ?? 0) - (a.clan_capital?.attacks ?? 0);
      }
      return a.name.localeCompare(b.name);
    })
    .map((p, idx) => {
      return (
        <Link
          key={idx}
          className="rounded-md border border-white bg-[#494f72] p-1 px-2 text-xs transition-all hover:bg-black/50 lg:text-sm"
          href={`/ClashOfClans/player/${p.tag.replace("#", "")}`}
        >
          {p.name} — {p.clan_capital?.attacks}/6
        </Link>
      );
    });

  console.log(clan.memberList);

  const numTodos =
    cwlWarAttacksTodo.length +
    capitalRaidAttacksTodo.length +
    warAttacksTodo.length;

  return (
    <div
      className={clsx(
        "coc-font-style rounded-lg border-2 border-black bg-[#694b84]",
        className,
        numTodos === 0 && "hidden",
      )}
    >
      <h3 className="clash-font-style mb-2 mt-4 text-center text-2xl font-thin">
        Clan Members To-Do
      </h3>
      <p></p>
      {warAttacksTodo.length > 0 && (
        <div className="px-4 py-2">
          <h4>War Attacks</h4>
          <div className="my-1 flex flex-wrap gap-2">{warAttacksTodo}</div>
        </div>
      )}
      {cwlWarAttacksTodo.length > 0 && (
        <div className="px-4 py-2">
          <h4 className="">CWL War Attacks</h4>
          <div className="my-1 flex flex-wrap gap-2">{cwlWarAttacksTodo}</div>
        </div>
      )}
      {capitalRaidAttacksTodo.length > 0 && (
        <div className="px-4 py-2">
          <h4>Clan Capital Raid Attacks</h4>
          <div className="my-1 flex flex-wrap gap-2">
            {capitalRaidAttacksTodo}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClanMembersTodo;
