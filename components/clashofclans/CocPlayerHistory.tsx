import DateTimeRangePicker from "@components/DateTimeRangePicker";
import GenericListbox from "@components/GenericListBox";
import clsx from "clsx";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { SpinningCircles } from "react-loading-icons";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { usePlayerHistory } from "shared/queries/clashofclans";
import { createTimeOptions, TimeOption } from "shared/timeoptions";
import {
  CocPlayerHistorySchema,
  AchievementSchema,
} from "shared/validations/ClashOfClansSchemas";
import { z } from "zod";
import CocButton from "./CocButton";
import { ArmyItemIcon, super_troop_names } from "./CocPlayerArmy";

interface CocPlayerHistoryProps {
  tag: string;
}

interface ChartProps {
  data: ChartData[];
}

interface ChartData {
  time: number;
  y: number;
}

interface PlayerItemCategoryProps {
  nameKey: "troops" | "heroes" | "spells" | "heroEquipment";
  title: string;
  className?: string;
}

interface PlayerAchievementCategoryProps {
  achievements: z.infer<typeof AchievementSchema>[];
  title: string;
  className?: string;
}

type CocPlayerHistory = z.infer<typeof CocPlayerHistorySchema>;

// Extract the keys where the value is a number
type NumericKeys = {
  [K in keyof CocPlayerHistory]: CocPlayerHistory[K] extends number ? K : never;
}[keyof CocPlayerHistory]; // This will give us the keys where the value is of type number

interface RootCategoryProps {
  keys: NumericKeys[];
  title: string;
  className?: string;
}

const rootCategoryKeys: NumericKeys[] = [
  "townHallLevel",
  "expLevel",
  "trophies",
  "bestTrophies",
  "warStars",
  "attackWins",
  "defenseWins",
  "builderHallLevel",
  "builderBaseTrophies",
  "bestBuilderBaseTrophies",
  "donations",
  "donationsReceived",
  "clanCapitalContributions",
];

const achievementsInfo = [
  { name: "Bigger Coffers", info: "Gold Storage Level" },
  { name: "Get those Goblins!", info: "Campaign Map Stars" },
  { name: "Get even more Goblins!", info: "Campaign Map Stars" },
  { name: "Nice and Tidy", info: "Obstacles Removed" },
  { name: "Gold Grab", info: "Gold Stolen" },
  { name: "Elixir Escapade", info: "Elixir Stolen" },
  { name: "Heroic Heist", info: "Dark Elixir Stolen" },
  { name: "League All-Star", info: "Highest Trophy League" },
  { name: "Unbreakable", info: "Successful Defends" },
  { name: "Friend in Need", info: "Troops Donated" },
  { name: "Mortar Mauler", info: "Mortars Destroyed" },
  { name: "X-Bow Exterminator", info: "X-Bows Destroyed" },
  { name: "Firefighter", info: "Inferno Towers Destroyed" },
  { name: "War Hero", info: "Clan War Stars" },
  { name: "Clan War Wealth", info: "Clan Castle Gold Collected" },
  { name: "Anti-Artillery", info: "Eagle Artilleries Destroyed" },
  { name: "Sharing is caring", info: "Spells Donated" },
  { name: "Games Champion", info: "Clan Games Points" },
  { name: "Well Seasoned", info: "Season Challenges Points" },
  { name: "Empire Builder", info: "Clan Castle Level" },
  { name: "Wall Buster", info: "Walls Destroyed" },
  { name: "Humiliator", info: "Town Halls Destroyed" },
  { name: "Union Buster", info: "Builder Huts Destroyed" },
  { name: "Conqueror", info: "Multiplayer Battles Won" },
  { name: "Un-Build It", info: "Builder Halls Destroyed" },
  { name: "War League Legend", info: "War League Stars" },
  { name: "Shattered and Scattered", info: "Scattershots Destroyed" },
  { name: "Not So Easy This Time", info: "Weaponised Town Halls Destroyed" },
  { name: "Bust This!", info: "Weaponised Builder Huts Destroyed" },
  { name: "Superb Work", info: "Super Troops Boosted" },
  { name: "Siege Sharer", info: "Siege Machines Donated" },
  { name: "Aggressive Capitalism", info: "Capital Gold Looted" },
  { name: "Most Valuable Clanmate", info: "Capital Gold Contributions" },
  { name: "Counterspell", info: "Spell Towers Destroyed" },
  { name: "Monolith Masher", info: "Monoliths Destroyed" },
  {
    name: "Multi-Archer Tower Terminator",
    info: "Multi-Archer Towers Destroyed",
  },
  { name: "Ricochet Cannon Crusher", info: "Ricochet Cannons Destroyed" },
  { name: "Firespitter Finisher", info: "Firespitters Destroyed" },
  { name: "Multi-Gear Tower Trampler", info: "Multi-Gear Towers Destroyed" },
];

function achievementMapper(achievement: string): string | null {
  return achievementsInfo.find((i) => i.name === achievement)?.info ?? null;
}

const CocPlayerHistory: React.FC<CocPlayerHistoryProps> = ({ tag }) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [selectedStatistic, setSelectedStatistic] = useState("");
  const timeOptions = createTimeOptions({
    hoursOptions: [],
    daysOptions: [7, 31, 90, 180],
    yearsOptions: [1],
    includeCustom: true,
    customStartTime: new Date(new Date().getTime() - 7 * 24 * 3600 * 1000),
  });
  // Listbox props
  const [selectedTimeOption, setSelectedTimeOption] = useState(timeOptions[1]);
  const displayTimeOption = (option: TimeOption) => option.display;
  const handleSelectedTimeChange = (timeOption: TimeOption) => {
    setSelectedTimeOption(timeOption);
  };

  // Date range picker prop
  const onDateTimeChange = (
    startLessThanEnd: boolean,
    start?: Date,
    end?: Date,
  ) => {
    if (start && end) {
      setSelectedTimeOption((prev) => ({
        ...prev,
        startTime: start,
        endTime: end,
      }));
    }
  };

  const { isLoading, isError, data, error } = usePlayerHistory(
    tag,
    selectedTimeOption.startTime,
    selectedTimeOption.endTime,
  );

  useEffect(() => {
    if (selectedStatistic === "" && data && data.history.length > 0) {
      setSelectedStatistic("Trophies");
      setChartData(
        data.history.map((entry) => {
          return {
            time: new Date(entry.timestamp).getTime(),
            y: entry.trophies,
          };
        }),
      );
    }
  }, [data, selectedStatistic]);

  if (isError) {
    return (
      <div className="pt-24">
        <p className="text-center font-coc text-xl text-error">
          Error fetching player history: {(error as Error).message}
        </p>
      </div>
    );
  }
  if (isLoading || data === undefined) {
    return (
      <div className="pt-24">
        <SpinningCircles className="mx-auto mt-8" />;
      </div>
    );
  }

  const scrollToTitle = () => {
    if (titleRef.current) {
      const y =
        titleRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active) {
      return (
        <div className="flex flex-col items-center rounded-md bg-gradient-to-b from-[#293968] to-[#637ac6] p-2 text-white">
          <p className="label text-lg">{moment(label).format("DD-MM-YY")}</p>
          <p className="text-sm">{payload?.[0].value?.toLocaleString()}</p>
          <p className="max-w-48 text-center text-xs lg:max-w-none">
            {selectedStatistic}
          </p>
        </div>
      );
    }

    return null;
  };

  const ProgressChart = (chartProps: ChartProps) => {
    const max = Math.max(...chartProps.data.map((o) => o.y));
    const min = Math.min(...chartProps.data.map((o) => o.y));
    const tickDigits = max.toString().length;
    const delta = max - min + 1;
    let yLabelWidth = 80;
    if (tickDigits >= 8) {
      yLabelWidth = 140;
    } else if (tickDigits >= 5) {
      yLabelWidth = 100;
    }
    return (
      <ResponsiveContainer
        width="95%"
        height={500}
        className={"clash-font-style font-thin"}
      >
        <AreaChart
          data={chartProps.data}
          margin={{ bottom: 40, left: 10, right: 40 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="white" stopOpacity={0.7} />
              <stop offset="95%" stopColor="white" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="white" strokeDasharray="6" />
          <XAxis
            dataKey="time"
            name="Time"
            stroke="white"
            tickFormatter={(unixTime) => moment(unixTime).format("DD-MM-YY")}
            height={100}
            angle={40}
            dy={30}
            style={{ fontSize: "0.7rem" }}
          />
          <YAxis
            width={yLabelWidth}
            dx={-4}
            allowDecimals={false}
            tickFormatter={(tick) => {
              return tick.toLocaleString();
            }}
            domain={[min <= 2 && max <= 2 ? 0 : "auto", "auto"]}
            stroke="white"
          />
          <Tooltip content={CustomTooltip} animationDuration={150} />
          <Area
            type="monotone"
            dataKey="y"
            stroke="white"
            strokeWidth={5}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  const RootCategory: React.FC<RootCategoryProps> = ({
    keys,
    title,
    className,
  }) => {
    const items = keys.map((item, index) => {
      return (
        <button
          className="coc-font-style rounded-md border-2 border-black bg-[#7e72a7] p-2 text-sm transition-all hover:bg-black/40 md:text-base"
          key={index}
          onClick={() => {
            scrollToTitle();
            setSelectedStatistic(
              item
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (match) => match.toUpperCase()),
            );
            setChartData(
              data.history.map((entry) => {
                return {
                  y: entry[item],
                  time: new Date(entry.timestamp).getTime(),
                };
              }),
            );
          }}
        >
          {item
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (match) => match.toUpperCase())}
        </button>
      );
    });
    return (
      <div
        className={clsx(
          className,
          "coc-font-style flex w-full flex-col items-center rounded-md border-2 border-black px-4 py-2",
        )}
      >
        <h3 className="m-4">{title}</h3>
        <div className="flex flex-wrap gap-2">{items}</div>
      </div>
    );
  };

  const PlayerItemCategory: React.FC<PlayerItemCategoryProps> = ({
    nameKey,
    title,
    className,
  }) => {
    const history = data.history;
    const items = history[history.length - 1][nameKey]
      .filter((item) => !super_troop_names.includes(item.name))
      .map((item, index) => {
        return (
          <button
            className="flex transition-all hover:bg-black/50"
            key={index}
            onClick={() => {
              scrollToTitle();
              setSelectedStatistic(`${item.name} Level`);
              setChartData(
                history.map((entry) => {
                  const i = entry[nameKey].find((i) => i.name === item.name);
                  return {
                    time: new Date(entry.timestamp).getTime(),
                    y: i ? i.level : 0,
                  };
                }),
              );
            }}
          >
            <ArmyItemIcon
              playerItemLevel={{
                name: item.name,
                level: item.level,
                maxLevel: 0,
                village: "",
              }}
              showLevel={false}
            />
          </button>
        );
      });
    return (
      <div
        className={clsx(
          className,
          "coc-font-style flex w-full flex-col items-center rounded-md border-2 border-black px-4 py-2",
        )}
      >
        <h3 className="m-4">{title}</h3>
        <div className="flex flex-wrap gap-2">{items}</div>
      </div>
    );
  };

  const PlayerAchievementCategory: React.FC<PlayerAchievementCategoryProps> = ({
    achievements,
    title,
    className,
  }) => {
    const items = achievements
      .filter((item) => !!achievementMapper(item.name))
      .map((item, index) => {
        return (
          <button
            className="coc-font-style rounded-md border-2 border-black bg-[#7e72a7] p-2 text-sm transition-all hover:bg-black/40 md:text-base"
            key={index}
            onClick={() => {
              scrollToTitle();
              setSelectedStatistic(
                `${item.name} (${achievementMapper(item.name)})`,
              );
              setChartData(
                data.history.map((entry) => {
                  const i = entry.achievements.find(
                    (i) => i.name === item.name,
                  );
                  return {
                    time: new Date(entry.timestamp).getTime(),
                    y: i ? i.value : 0,
                  };
                }),
              );
            }}
          >
            {achievementMapper(item.name)}
          </button>
        );
      });
    return (
      <div
        className={clsx(
          className,
          "coc-font-style flex w-full flex-col items-center rounded-md border-2 border-black px-4 py-2",
        )}
      >
        <h3 className="m-4">{title}</h3>
        <div className="flex flex-wrap gap-2">{items}</div>
      </div>
    );
  };

  return (
    <div className="font-clash font-thin">
      <h2 className="clash-font-style pt-20 text-center font-thin md:mb-0">
        Player Progress - {data.name}
      </h2>
      <div className="mx-auto mb-4 flex items-center justify-center gap-2 pt-8 md:gap-4">
        <div className="flex w-40 items-center justify-center md:h-16 md:w-60">
          <Link href={`/ClashOfClans/player/${tag}`} className="">
            <CocButton
              className="w-40 hover:w-36 md:w-60 md:hover:w-56"
              text="Profile"
              innerColour="bg-orange-500"
              middleColour="bg-orange-600"
              outerColour="bg-orange-700"
              textClassName="text-xs md:text-base md:hover:text-sm"
            />
          </Link>
        </div>
        <div className="flex w-40 items-center justify-center md:h-16 md:w-60">
          <Link href={"/ClashOfClans/Progress"}>
            <CocButton
              className="w-40 hover:w-36 md:w-60 md:hover:w-56"
              text={"Clan Members"}
              innerColour="bg-green-500"
              middleColour="bg-green-600"
              outerColour="bg-green-700"
              textClassName="text-xs md:text-base md:hover:text-sm"
            />
          </Link>
        </div>
      </div>
      <div className="z-20 flex flex-col items-center">
        <h3 className="coc-font-style mb-2 text-2xl">Time Filter</h3>
        <GenericListbox<TimeOption>
          selectedValue={selectedTimeOption}
          onSelectedValueChange={handleSelectedTimeChange}
          options={timeOptions}
          displayValue={displayTimeOption}
          maxHeightClass="lg:max-h-none"
        />
        {selectedTimeOption.id === 0 && (
          <div>
            <DateTimeRangePicker
              onDateTimeChange={onDateTimeChange}
              className="z-20 mb-4 mt-2"
              defaultStartTime={timeOptions[0].startTime}
              defaultEndTime={timeOptions[0].endTime}
            />
            {selectedTimeOption.startTime > selectedTimeOption.endTime && (
              <p className="text-center font-bold text-error">
                Start date must be less than end date
              </p>
            )}
          </div>
        )}
      </div>
      {chartData.length > 0 && (
        <>
          <h3
            className="coc-font-style mb-4 mt-6 px-4 text-center text-xl md:text-2xl lg:text-3xl"
            ref={titleRef}
          >
            {selectedStatistic}
          </h3>
          <div className="mx-auto lg:w-4/5">
            <ProgressChart data={chartData} />
          </div>
        </>
      )}
      {data.history.length == 0 && (
        <p className="text-center font-coc text-2xl text-error">
          No data for this player between the given timestamps.
        </p>
      )}
      {data.history.length > 0 && (
        <div className="mx-auto p-4 lg:w-4/5">
          <RootCategory
            keys={rootCategoryKeys}
            title={"General"}
            className="mt-4 bg-[#465172]"
          />
          <PlayerAchievementCategory
            achievements={data.history[0].achievements}
            title="Achievements"
            className="mt-4 bg-[#465172]"
          />
          <PlayerItemCategory
            nameKey={"troops"}
            title="Troops"
            className="mt-4 bg-[#5d6b96]"
          />
          <PlayerItemCategory
            nameKey={"spells"}
            title="Spells"
            className="mt-4 bg-[#5d6b96]"
          />
          <PlayerItemCategory
            nameKey={"heroes"}
            title="Heroes"
            className="mt-4 bg-[#5d6b96]"
          />
          <PlayerItemCategory
            nameKey={"heroEquipment"}
            title="Hero Equipment"
            className="mt-4 bg-[#5d6b96]"
          />
        </div>
      )}
    </div>
  );
};

export default CocPlayerHistory;
