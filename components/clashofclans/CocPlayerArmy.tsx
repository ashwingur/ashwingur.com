import Image from "next/image";
import React from "react";
import { Player, PlayerItemLevel } from "../../shared/interfaces/coc.interface";

interface CocPlayerArmyProps {
  player: Player;
}

const ArmyItemIcon = ({ name, level, maxLevel }: PlayerItemLevel) => {
  const icon_name: string = name.replaceAll(" ", "_");
  console.log(`og: ${name}, icon: ${icon_name}`);
  return (
    <div className="border-black border-2 inline-block rounded-md relative">
      <Image
        src={`/assets/coc/troops/icons/${icon_name}.png`}
        alt={name}
        width={64}
        height={64}
      />
      <div
        className={
          "inline-block absolute bottom-1 left-1 rounded-md w-6 h-6 shadow-[0_0px_3px_1px_rgba(0,0,0,0.3)] shadow-white" +
          (level != maxLevel ? " bg-black" : " bg-yellow-500")
        }
      >
        <div className="text-white px-[2px] text-center">{level}</div>
      </div>
    </div>
  );
};

const CocPlayerArmy = ({ player }: CocPlayerArmyProps) => {
  const player_troops = player.troops.map((item, index) => (
    <div key={index} className="font-clash font-thin">
      <ArmyItemIcon {...item} />
    </div>
  ));

  return (
    <div className="">
      <div className="flex flex-row flex-wrap gap-1 px-4 md:px-8">
        {player_troops}
      </div>
    </div>
  );
};

export default CocPlayerArmy;
