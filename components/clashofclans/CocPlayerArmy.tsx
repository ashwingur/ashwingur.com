import Image from "next/image";
import React from "react";
import { Player, PlayerItemLevel } from "../../shared/interfaces/coc.interface";

interface CocPlayerArmyProps {
  player: Player;
}

interface ArmyItemsCategoryProps {
  items: PlayerItemLevel[];
  category: string;
}

const ArmyItemIcon = ({ name, level, maxLevel }: PlayerItemLevel) => {
  const icon_name: string = name.replaceAll(" ", "_");
  console.log(`og: ${name}, icon: ${icon_name}`);
  return (
    <div className="border-black border-2 inline-block rounded-md relative font-clash font-thin">
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

const ArmyItemsCategory = ({ items, category }: ArmyItemsCategoryProps) => {
  const items_elements = items.map((item, index) => (
    <ArmyItemIcon key={index} {...item} />
  ));

  return (
    <div className="bg-[#5d6b96] p-4 mx-4 md:mx-8 rounded-lg my-4">
      <div className=" clash-font-style text-xl mb-4">{category}</div>
      <div className="flex flex-row flex-wrap gap-1 ">{items_elements}</div>
    </div>
  );
};

const CocPlayerArmy = ({ player }: CocPlayerArmyProps) => {
  const player_troops = player.troops.map((item, index) => (
    <ArmyItemIcon key={index} {...item} />
  ));

  const player_spells = player.spells.map((item, index) => (
    <ArmyItemIcon key={index} {...item} />
  ));

  return (
    <div>
      <div className="bg-[#5d6b96] p-4 mx-4 md:mx-8 rounded-lg">
        <div className=" clash-font-style text-xl mb-4">Home Troops</div>
        <div className="flex flex-row flex-wrap gap-1 ">{player_troops}</div>
      </div>
      <div className="bg-[#5d6b96] p-4 mx-4 md:mx-8 rounded-lg my-4">
        <div className=" clash-font-style text-xl mb-4">Spells</div>
        <div className="flex flex-row flex-wrap gap-1 ">{player_spells}</div>
      </div>
      <ArmyItemsCategory items={player.heroes} category="Heroes" />
    </div>
  );
};

export default CocPlayerArmy;
