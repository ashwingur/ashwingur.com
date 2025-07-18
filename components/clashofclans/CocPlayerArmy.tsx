import Image from "next/image";
import React from "react";
import { Player, PlayerItemLevel } from "../../shared/interfaces/coc.interface";
import clsx from "clsx";

interface CocPlayerArmyProps {
  player: Player;
}

interface ArmyItemsCategoryProps {
  items: PlayerItemLevel[];
  category: string;
  showLevel: boolean;
}

interface ArmyItemIconProps {
  playerItemLevel: PlayerItemLevel;
  showLevel: boolean;
  rarity?: "common" | "epic";
}

export const ArmyItemIcon = ({
  playerItemLevel,
  showLevel,
  rarity,
}: ArmyItemIconProps) => {
  const icon_name: string = playerItemLevel.name.replaceAll(" ", "_");
  let iconBgClass = "bg-black/20";
  if (rarity == "common") {
    iconBgClass = "bg-blue-400/50";
  } else if (rarity == "epic") {
    iconBgClass = "bg-purple-700/70";
  }
  return (
    <div
      className={clsx(
        "relative flex w-12 items-center rounded-md border-2 border-black font-clash font-thin md:w-14 lg:w-16",
        iconBgClass,
      )}
    >
      <Image
        unoptimized
        src={`/assets/coc/troops/icons/${icon_name}.webp`}
        alt={playerItemLevel.name}
        width={0}
        height={0}
        className="h-auto w-full"
      />
      {showLevel && (
        <div
          className={clsx(
            "absolute bottom-[0px] left-[0px] flex items-center justify-center rounded-md shadow-[0_0px_3px_1px_rgba(0,0,0,0.3)] shadow-white md:bottom-1 md:left-1 md:h-6",
            playerItemLevel.level != playerItemLevel.maxLevel
              ? "bg-black/40"
              : "bg-yellow-400/80",
          )}
        >
          <p className="m-[2px] min-w-4 text-center text-xs text-white">
            {playerItemLevel.level}
          </p>
        </div>
      )}
    </div>
  );
};

const ArmyItemsCategory = ({
  items,
  category,
  showLevel,
}: ArmyItemsCategoryProps) => {
  if (items.length == 0) {
    return <></>;
  }
  const items_elements = items.map((item, index) => {
    let rarity: "common" | "epic" | undefined = undefined;
    if (category == "Hero Equipment") {
      if (item.maxLevel == 27) {
        rarity = "epic";
      } else {
        rarity = "common";
      }
    }
    return (
      <ArmyItemIcon
        key={index}
        playerItemLevel={item}
        showLevel={showLevel}
        rarity={rarity}
      />
    );
  });

  return (
    <div className="mx-4 my-4 rounded-lg border-2 border-black bg-[#5d6b96] p-4 dark:bg-[#384672]">
      <div className="clash-font-style mb-4 text-xl">{category}</div>
      <div className="flex flex-row flex-wrap gap-1">{items_elements}</div>
    </div>
  );
};

const siege_machine_names = [
  "Wall Wrecker",
  "Battle Blimp",
  "Stone Slammer",
  "Siege Barracks",
  "Log Launcher",
  "Flame Flinger",
  "Battle Drill",
  "Troop Launcher",
];

export const super_troop_names = [
  "Super Barbarian",
  "Super Archer",
  "Super Giant",
  "Sneaky Goblin",
  "Super Wall Breaker",
  "Rocket Balloon",
  "Super Wizard",
  "Super Dragon",
  "Inferno Dragon",
  "Super Miner",
  "Super Minion",
  "Super Valkyrie",
  "Super Witch",
  "Ice Hound",
  "Super Bowler",
  "Super Hog Rider",
  "Super Yeti",
];

const pet_names = [
  "L.A.S.S.I",
  "Electro Owl",
  "Mighty Yak",
  "Unicorn",
  "Frosty",
  "Diggy",
  "Poison Lizard",
  "Phoenix",
  "Spirit Fox",
  "Angry Jelly",
  "Sneezy",
];

const CocPlayerArmy = ({ player }: CocPlayerArmyProps) => {
  const normal_troops = player.troops.filter(
    (item) =>
      !(
        siege_machine_names.includes(item.name) ||
        super_troop_names.includes(item.name) ||
        pet_names.includes(item.name) ||
        item.village == "builderBase"
      ),
  );

  const siege_machines = player.troops.filter((item) =>
    siege_machine_names.includes(item.name),
  );

  const super_troops = player.troops.filter((item) =>
    super_troop_names.includes(item.name),
  );

  const pets = player.troops.filter((item) => pet_names.includes(item.name));

  const builder_troops = player.troops.filter(
    (item) => item.village == "builderBase",
  );

  return (
    <div>
      <ArmyItemsCategory
        items={normal_troops}
        category="Troops"
        showLevel={true}
      />
      {/* <ArmyItemsCategory
        items={super_troops}
        category="Super Troops"
        showLevel={false}
      /> */}
      <ArmyItemsCategory
        items={siege_machines}
        category="Siege Machines"
        showLevel={true}
      />
      <ArmyItemsCategory
        items={builder_troops}
        category="Builder Base"
        showLevel={true}
      />
      <ArmyItemsCategory
        items={player.spells}
        category="Spells"
        showLevel={true}
      />
      <ArmyItemsCategory
        items={player.heroes}
        category="Heroes"
        showLevel={true}
      />
      <ArmyItemsCategory
        items={player.heroEquipment.sort((a, b) => b.level - a.level)}
        category="Hero Equipment"
        showLevel={true}
      />
      <ArmyItemsCategory items={pets} category="Pets" showLevel={true} />
    </div>
  );
};

export default CocPlayerArmy;
