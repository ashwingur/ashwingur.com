import DateTimeRangePicker from "@components/DateTimeRangePicker";
import GenericListbox from "@components/GenericListBox";
import clsx from "clsx";
import moment from "moment-timezone";
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
import {
  formatToISO8601,
  useGoldPass,
  usePlayerHistory,
} from "shared/queries/clashofclans";
import { createTimeOptions, TimeOption } from "shared/timeoptions";
import {
  CocPlayerHistorySchema,
  AchievementSchema,
} from "shared/validations/ClashOfClansSchemas";
import { z } from "zod";
import CocButton from "./CocButton";
import { ArmyItemIcon, super_troop_names } from "./CocPlayerArmy";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";
import { useRouter } from "next/router";
import Image from "next/image";

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

type SelectedStat = {
  statType:
    | "root"
    | "achievement"
    | "troops"
    | "heroes"
    | "spells"
    | "heroEquipment";
  rootKey?: NumericKeys; // If it's a root key
  name?: string; // If its achievement or other army item
};

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
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [selectedStatisticDisplay, setSelectedStatisticDisplay] = useState("");
  const [selectedStat, setSelectedStat] = useState<SelectedStat>({
    statType: "root",
    rootKey: "trophies",
  });
  const timeOptions = createTimeOptions({
    hoursOptions: [],
    daysOptions: [7, 31, 90, 180],
    yearsOptions: [1],
    includeCustom: true,
    customStartTime: new Date(new Date().getTime() - 7 * 24 * 3600 * 1000),
  });
  const { data: goldPass } = useGoldPass();
  // Also add current season as an option in the dropdown
  if (goldPass !== undefined) {
    const startTime = new Date(
      new Date(formatToISO8601(goldPass.startTime)).getTime() - 24 * 3600000,
    );
    const endTime = new Date(formatToISO8601(goldPass.endTime));
    const seasonTimeOption: TimeOption = {
      display: "Current Season",
      id: timeOptions.length,
      startTime,
      endTime,
    };
    timeOptions.splice(1, 0, seasonTimeOption);
  }
  // Listbox props
  const [selectedTimeOption, setSelectedTimeOption] = useState(
    goldPass ? timeOptions[3] : timeOptions[2],
  );
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
    if (!router.isReady) return;

    const { statType, rootKey, name } = router.query;

    if (typeof statType === "string") {
      setSelectedStat({
        statType: statType as SelectedStat["statType"],
        rootKey:
          rootKey && typeof rootKey === "string"
            ? (rootKey as NumericKeys)
            : undefined,
        name: name as string | undefined,
      });
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (selectedStat.statType === "root" && selectedStat.rootKey) {
      onRootCategoryClick(selectedStat.rootKey);
    } else if (selectedStat.statType === "achievement" && selectedStat.name) {
      onAchievementClick(selectedStat.name);
    } else if (
      (selectedStat.statType === "spells" ||
        selectedStat.statType === "troops" ||
        selectedStat.statType === "heroes" ||
        selectedStat.statType === "heroEquipment") &&
      selectedStat.name
    ) {
      onPlayerItemClick(selectedStat.statType, selectedStat.name);
    }
  }, [data, selectedStat]);

  const onAchievementClick = (itemName: string) => {
    setSelectedStatisticDisplay(`${itemName} (${achievementMapper(itemName)})`);
    if (data)
      setChartData(
        data.history.map((entry) => {
          const i = entry.achievements.find((i) => i.name === itemName);
          return {
            time: new Date(entry.timestamp).getTime(),
            y: i ? i.value : 0,
          };
        }),
      );
  };

  const onRootCategoryClick = (item: NumericKeys) => {
    setSelectedStatisticDisplay(
      item
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (match) => match.toUpperCase()),
    );
    if (data)
      setChartData(
        data.history.map((entry) => {
          return {
            y: entry[item],
            time: new Date(entry.timestamp).getTime(),
          };
        }),
      );
  };

  const onPlayerItemClick = (
    nameKey: "troops" | "heroes" | "spells" | "heroEquipment",
    itemName: string,
  ) => {
    setSelectedStatisticDisplay(`${itemName} Level`);
    if (data)
      setChartData(
        data.history.map((entry) => {
          const i = entry[nameKey].find((i) => i.name === itemName);
          return {
            time: new Date(entry.timestamp).getTime(),
            y: i ? i.level : 0,
          };
        }),
      );
  };

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

  const updateUrlWithStat = (selectedStat: SelectedStat) => {
    // Convert object to query params
    const queryParams = new URLSearchParams();
    queryParams.set("statType", selectedStat.statType);
    if (selectedStat.rootKey !== undefined) {
      queryParams.set("rootKey", String(selectedStat.rootKey));
    }
    if (selectedStat.name) {
      queryParams.set("name", selectedStat.name);
    }

    router.push(
      {
        pathname: `/ClashOfClans/Progress/${tag}`,
        query: queryParams.toString(),
      },
      undefined,
      { shallow: true },
    );
  };

  const scrollToTitle = () => {
    if (titleRef.current) {
      const y =
        titleRef.current.getBoundingClientRect().top + window.scrollY - 80;
      if (window.scrollY > y) {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
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
            {selectedStatisticDisplay}
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
    const xMin = moment(chartProps.data[0].time).startOf("day").valueOf();
    chartProps.data[0].time = xMin;
    const xMax = chartProps.data[chartProps.data.length - 1].time;

    const generateDailyTicks = (xMin: number, xMax: number): number[] => {
      const tz = "Australia/Sydney"; // or your target timezone

      const start = moment.tz(xMin, tz).startOf("day");
      const end = moment.tz(xMax, tz).startOf("day");

      const ticks: number[] = [];

      const current = start.clone();
      while (current.isSameOrBefore(end)) {
        ticks.push(current.valueOf());
        current.add(1, "day");
      }

      return ticks;
    };

    const dailyTicks = generateDailyTicks(xMin, xMax);

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
            domain={[xMin, xMax]}
            stroke="white"
            scale="time"
            type="number"
            ticks={dailyTicks}
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
            updateUrlWithStat({ statType: "root", rootKey: item });
            setSelectedStat({ statType: "root", rootKey: item });
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
              updateUrlWithStat({ statType: nameKey, name: item.name });
              setSelectedStat({ statType: nameKey, name: item.name });
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
              updateUrlWithStat({ statType: "achievement", name: item.name });
              setSelectedStat({ statType: "achievement", name: item.name });
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

  const StatSummary = () => {
    const first = data.history[0];
    const last = data.history[data.history.length - 1];

    const rootDifferences = rootCategoryKeys.map((key) => {
      return {
        name: key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (match) => match.toUpperCase()),
        difference: last[key] - first[key],
      };
    });

    const achievementDifferences = achievementsInfo.map((item) => {
      const firstValue = first.achievements.find(
        (a) => a.name === item.name,
      )?.value;
      const lastValue = last.achievements.find(
        (a) => a.name === item.name,
      )?.value;
      let difference = 0;
      if (lastValue !== undefined && firstValue !== undefined) {
        difference = lastValue - firstValue;
      } else if (lastValue !== undefined && firstValue === undefined) {
        difference = lastValue;
      }
      return {
        name: item.info,
        difference,
      };
    });

    function playerItemLevelDifferences(
      nameKey: "troops" | "heroes" | "spells" | "heroEquipment",
    ) {
      // We are doing Queue method because there are 2 items with the name "Baby Dragon" and we dont have village info
      const firstQueue = [...first[nameKey]]; // Clone the first list to track consumed elements

      return last[nameKey].map((item) => {
        // Find the first occurrence of the same item while maintaining order
        const index = firstQueue.findIndex((i) => i.name === item.name);
        let firstValue: number | undefined = undefined;

        if (index !== -1) {
          firstValue = firstQueue[index].level;
          firstQueue.splice(index, 1); // Remove it so the next same-named item gets the next match
        }

        const lastValue = item.level;
        const difference =
          firstValue === undefined ? lastValue : lastValue - firstValue;

        return {
          name: item.name,
          difference,
        };
      });
    }

    const SummaryStat = (name: string, difference: number, idx: number) => {
      return (
        <div
          className="flex items-center justify-between md:max-w-80"
          key={idx}
        >
          <p className="text-sm">{name}</p>

          <div className="flex items-center">
            {difference > 0 ? (
              <IoCaretUp className="text-green-500" />
            ) : (
              <IoCaretDown className="text-red-500" />
            )}
            <p
              className={clsx(
                difference > 0 ? "text-green-400" : "text-red-400",
              )}
            >
              {Math.abs(difference).toLocaleString()}
            </p>
          </div>
        </div>
      );
    };

    const generalDifferences = rootDifferences
      .filter((i) => i.difference !== 0)
      .map((i, idx) => SummaryStat(i.name, i.difference, idx));

    const achievementDiffs = achievementDifferences
      .filter((i) => i.difference !== 0)
      .map((i, idx) => SummaryStat(i.name, i.difference, idx));

    const troopDiffs = playerItemLevelDifferences("troops")
      .filter((i) => i.difference !== 0)
      .map((i, idx) => SummaryStat(i.name, i.difference, idx));

    const spellDiffs = playerItemLevelDifferences("spells")
      .filter((i) => i.difference !== 0)
      .map((i, idx) => SummaryStat(i.name, i.difference, idx));

    const heroDiffs = playerItemLevelDifferences("heroes")
      .filter((i) => i.difference !== 0)
      .map((i, idx) => SummaryStat(i.name, i.difference, idx));

    const heroEquipmentDiffs = playerItemLevelDifferences("heroEquipment")
      .filter((i) => i.difference !== 0)
      .map((i, idx) => SummaryStat(i.name, i.difference, idx));

    const hasChange =
      generalDifferences.length +
        achievementDiffs.length +
        troopDiffs.length +
        spellDiffs.length +
        heroDiffs.length +
        heroEquipmentDiffs.length !==
      0;

    return (
      <div className="coc-font-style mx-auto rounded-md border-2 border-black bg-[#465172] px-4 py-2 lg:w-4/5">
        <h3 className="text-center">Change Summary</h3>

        {!hasChange && <p className="mt-2 text-center">No changes to report</p>}

        {generalDifferences.length > 0 && (
          <>
            <h4 className="mt-4 text-center">General</h4>
            <div className="grid grid-cols-1 items-center gap-x-8 md:grid-cols-2 xl:grid-cols-3">
              {generalDifferences}
            </div>
          </>
        )}

        {achievementDiffs.length > 0 && (
          <>
            <h4 className="mt-4 text-center">Achievements</h4>
            <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3">
              {achievementDiffs}
            </div>
          </>
        )}

        {troopDiffs.length > 0 && (
          <>
            <h4 className="mt-4 text-center">Troops</h4>
            <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3">
              {troopDiffs}
            </div>
          </>
        )}

        {spellDiffs.length > 0 && (
          <>
            <h4 className="mt-4 text-center">Spells</h4>
            <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3">
              {spellDiffs}
            </div>
          </>
        )}

        {heroDiffs.length > 0 && (
          <>
            <h4 className="mt-4 text-center">Heroes</h4>
            <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3">
              {heroDiffs}
            </div>
          </>
        )}

        {heroEquipmentDiffs.length > 0 && (
          <>
            <h4 className="mt-4 text-center">Hero Equipment</h4>
            <div className="">{heroEquipmentDiffs}</div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="font-clash font-thin">
      <h2 className="clash-font-style pt-20 text-center font-thin md:mb-0">
        Player Progress - {data.name}
      </h2>
      <p className="coc-font-style right-4 top-[2px] mt-2 flex items-center justify-center gap-2 text-lg">
        <span className="">{data.view_count.toLocaleString()}</span>
        <Image
          unoptimized
          alt="gem"
          src={"/assets/coc/gem.webp"}
          width={0}
          height={0}
          className="h-6 w-6"
        />
      </p>
      <div className="mx-auto mb-4 flex items-center justify-center gap-2 pt-4 md:gap-4">
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
              <p className="text-center text-error">
                Start date must be less than end date
              </p>
            )}
          </div>
        )}
      </div>
      {data.history.length > 0 && (
        <div className="mt-2 px-4">
          <StatSummary />
        </div>
      )}
      {chartData.length > 0 && data.history.length > 0 && (
        <>
          <h3
            className="coc-font-style mb-4 mt-6 px-4 text-center text-xl md:text-2xl lg:text-3xl"
            ref={titleRef}
          >
            {selectedStatisticDisplay}
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
