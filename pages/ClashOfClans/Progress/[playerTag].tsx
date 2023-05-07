import { useRouter } from "next/router";
import React, { useState } from "react";
import CocNavBar from "../../../components/clashofclans/CocNavBar";
import axios from "axios";
import { useQuery } from "react-query";
import { ICocUser } from "../../../model/CocUser";
import CocLoadingOrError from "../../../components/clashofclans/CocLoadingOrError";
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
import moment from "moment";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import Link from "next/link";
import CocButton from "../../../components/clashofclans/CocButton";

interface ChartProps {
  data: ChartData[];
}

interface ChartData {
  time: number;
  y: number;
}

interface NumericCategoryProps {
  heading: string;
  categoryKey: string;
  names: string[];
  nameKey: string;
  valueKey: string;
  className?: string;
}

interface RootCategoryProps {
  heading: string;
  nameKeys: string[];
  className?: string;
}

const rootCategoryKeys = [
  "townHallLevel",
  "expLevel",
  "trophies",
  "bestTrophies",
  "warStars",
  "attackWins",
  "defenseWins",
  "builderHallLevel",
  "versusTrophies",
  "bestVersusTrophies",
  "versusBattleWins",
  "donations",
  "donationsReceived",
  "clanCapitalContributions",
];

const ProgressPage = () => {
  const router = useRouter();
  const playerTag =
    typeof router.query?.playerTag === "string" ? router.query.playerTag : "";
  const [displayedChartData, setDisplayedChartData] = useState<ChartData[]>([]);
  const [selectedStatistic, setSelectedStatistic] = useState("");

  const fetchHistory = (playerTag: String) =>
    axios
      .get(`/api/clashofclans/player/${playerTag}/history`)
      .then(({ data }) => {
        // Setting an initial display value so users see a trophy graph when first entering page
        setDisplayedChartData(
          (data as ICocUser).data.map((item) => {
            return { time: item.time, y: item.player.trophies };
          })
        );
        setSelectedStatistic("Trophies");
        return data;
      });
  const { isLoading, error, data } = useQuery<ICocUser>({
    queryKey: ["playerHistory", playerTag],
    queryFn: () => fetchHistory(playerTag),
    enabled: router.isReady,
    staleTime: 1000 * 60 * 10,
  });

  if (error instanceof Error)
    return CocLoadingOrError({
      heading: playerTag,
      info: (
        <p className="text-center coc-font-style m-8 text-2xl">
          Unable to fetch player history: {error.message}
        </p>
      ),
    });

  if (isLoading || data === undefined)
    return CocLoadingOrError({
      heading: "",
      info: <SpinningCircles className="mx-auto mt-8" />,
    });

  if (data === null || data.data.length == 0) {
    return CocLoadingOrError({
      heading: "",
      info: <p className="text-center coc-font-style m-8 text-2xl">No data</p>,
    });
  }

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active) {
      return (
        <div className="bg-gradient-to-b from-[#293968] to-[#637ac6] text-white p-2 rounded-md flex flex-col items-center">
          <p className="label text-lg">{moment(label).format("DD-MM-YY")}</p>
          <p>{payload?.[0].value?.toLocaleString()}</p>
          <p className="desc">{selectedStatistic}</p>
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
        <AreaChart data={chartProps.data}>
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
          />
          <YAxis
            width={yLabelWidth}
            dx={-4}
            allowDecimals={false}
            tickFormatter={(tick) => {
              return tick.toLocaleString();
            }}
            domain={[
              (dataMin: number) =>
                dataMin - delta < 0 ? 0 : Math.floor(dataMin - 0.2 * delta),
              (dataMax: number) => Math.ceil(dataMax + 0.2 * delta),
            ]}
            stroke="white"
          />
          <Tooltip content={CustomTooltip} />
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

  const NumericCategory = (numericCategoryProps: NumericCategoryProps) => {
    const nameKeys = numericCategoryProps.names.map((name, index) => {
      return (
        <div
          className={`hover:cursor-pointer hover:bg-black p-2 rounded-md transition-all md:text-lg`}
          key={index}
          onClick={() => {
            itemClick(index);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          {name}
        </div>
      );
    });
    const itemClick = (index: number) => {
      const clickedName = numericCategoryProps.names[index];
      setSelectedStatistic(clickedName);
      setDisplayedChartData(
        data.data.map((item) => {
          const categoryArray = (item.player as any)[
            numericCategoryProps.categoryKey
          ] as Array<any>;
          console.log(
            categoryArray.find(
              (o) => o[numericCategoryProps.nameKey] === clickedName
            )
          );
          const numericItem = categoryArray.find(
            (o) => o[numericCategoryProps.nameKey] === clickedName
          ); // If not undefined returns something like {name: 'Royal Champion', level: 2}
          if (numericItem === undefined) {
            return { time: item.time, y: 0 };
          }
          const yValue = numericItem[numericCategoryProps.valueKey];
          return { time: item.time, y: yValue };
        })
      );
    };
    return (
      <div
        className={`${numericCategoryProps.className} coc-font-style flex flex-col items-center px-4 py-2 border-black border-2 rounded-md w-full`}
      >
        <div className="text-3xl">{numericCategoryProps.heading}</div>
        <div className="flex flex-wrap gap-4">{nameKeys}</div>
      </div>
    );
  };

  const RootCategory = (rootCategoryProps: RootCategoryProps) => {
    const nameKeys = rootCategoryProps.nameKeys.map((item, index) => {
      const result = item.replace(/([A-Z])/g, " $1");
      const displayResult = result.charAt(0).toUpperCase() + result.slice(1);
      return (
        <div
          className={`hover:cursor-pointer hover:bg-black p-2 rounded-md transition-all md:text-lg`}
          key={index}
          onClick={() => {
            itemClick(item);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          {displayResult}
        </div>
      );
    });

    const itemClick = (key: string) => {
      const result = key.replace(/([A-Z])/g, " $1");
      const displayResult = result.charAt(0).toUpperCase() + result.slice(1);
      setSelectedStatistic(displayResult);
      setDisplayedChartData(
        data.data.map((item) => {
          const yValue = (item.player as any)[key];
          if (yValue == null) {
            return { time: item.time, y: 0 };
          }

          return { time: item.time, y: yValue };
        })
      );
    };

    return (
      <div
        className={`${rootCategoryProps.className} coc-font-style flex flex-col items-center px-4 py-2 border-black border-2 rounded-md w-full`}
      >
        <div className="text-3xl">{rootCategoryProps.heading}</div>
        <div className="flex flex-wrap gap-4">{nameKeys}</div>
      </div>
    );
  };

  const achievementNames: string[] = data.data[
    data.data.length - 1
  ].player.achievements.map((item) => item.name);
  const heroNames: string[] = data.data[data.data.length - 1].player.heroes.map(
    (item) => item.name
  );
  const troopNames: string[] = data.data[
    data.data.length - 1
  ].player.troops.map((item) => item.name);
  const spellNames: string[] = data.data[
    data.data.length - 1
  ].player.spells.map((item) => item.name);

  return (
    <div className="bg-clash">
      <CocNavBar />
      <div className="flex flex-col items-center">
        <div className="h-16 flex items-center pt-28">
          <Link href={`/ClashOfClans/player/${playerTag}`}>
            <CocButton
              className="w-80 hover:w-72"
              text={data.data[0].player.name}
              innerColour="bg-orange-500"
              middleColour="bg-orange-600"
              outerColour="bg-orange-700"
            />
          </Link>
        </div>
        <h2 className="clash-font-style text-2xl font-thin text-center mb-1 mt-12">
          {selectedStatistic}
        </h2>
      </div>
      <div className="flex flex-col items-center gap-4 mx-4">
        {displayedChartData.length > 0 && (
          <ProgressChart data={displayedChartData} />
        )}
        <RootCategory
          heading="General"
          nameKeys={rootCategoryKeys}
          className="bg-cyan-800"
        />
        <NumericCategory
          heading={"Achievements"}
          names={achievementNames}
          categoryKey={"achievements"}
          nameKey={"name"}
          valueKey={"value"}
          className="mt-4 bg-[#465172]"
        />
        <NumericCategory
          heading={"Heroes"}
          names={heroNames}
          categoryKey={"heroes"}
          nameKey={"name"}
          valueKey={"level"}
          className="bg-orange-700"
        />
        <NumericCategory
          heading={"Troops"}
          names={troopNames}
          categoryKey={"troops"}
          nameKey={"name"}
          valueKey={"level"}
          className="bg-sky-700"
        />
        <NumericCategory
          heading={"Spells"}
          names={spellNames}
          categoryKey={"spells"}
          nameKey={"name"}
          valueKey={"level"}
          className="bg-rose-800"
        />
      </div>
    </div>
  );
};

export default ProgressPage;
