import clsx from "clsx";
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
    .filter((p) => p.war !== null)
    .map((p) => p.name);
  const cwlWarAttacksTodo = clan.memberList
    .filter((p) => p.cwl_war?.attack_todo === true)
    .map((p) => p.name);

  return (
    <div className={clsx("rounded-lg border-2 border-black", className)}>
      <h3 className="clash-font-style my-4 text-center text-3xl font-thin">
        Clan Members To-Do
      </h3>
      <div>
        <h4>War Attacks</h4>
        <div>{warAttacksTodo}</div>
      </div>
      <div>
        <h4>CWL War Attacks</h4>
        <div>{cwlWarAttacksTodo}</div>
      </div>
    </div>
  );
};

export default ClanMembersTodo;
