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

const fetchHistory = (playerTag: String) =>
  axios
    .get(`/api/clashofclans/player/${playerTag}/history`)
    .then(({ data }) => data);

const PlayerTag = () => {
  const router = useRouter();
  const playerTag =
    typeof router.query?.playerTag === "string" ? router.query.playerTag : "";
  const [displayedChartData, setDisplayedChartData] = useState<ChartData[]>([]);
  const [selectedStatistic, setSelectedStatistic] = useState("");

  const { isLoading, error, data } = useQuery<ICocUser>({
    queryKey: ["playerHistory", playerTag],
    queryFn: () => fetchHistory(playerTag),
    enabled: router.isReady,
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
    return (
      <ResponsiveContainer width="80%" height={500}>
        <AreaChart data={chartProps.data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="white" stopOpacity={0.7} />
              <stop offset="95%" stopColor="white" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="time"
            name="Time"
            stroke="white"
            tickFormatter={(unixTime) => moment(unixTime).format("DD-MM-YY")}
            dy={10}
          />
          <YAxis
            width={tickDigits >= 8 ? 110 : 80}
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
          className={`hover:cursor-pointer hover:bg-black p-2 rounded-md transition-all`}
          key={index}
          onClick={() => {
            itemClick(index);
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
          const yValue = categoryArray.find(
            (o) => o[numericCategoryProps.nameKey] === clickedName
          )[numericCategoryProps.valueKey];
          return { time: item.time, y: yValue };
        })
      );
    };
    return (
      <div
        className={`${numericCategoryProps.className} coc-font-style flex flex-col items-center px-4`}
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
          className={`hover:cursor-pointer hover:bg-black p-2 rounded-md transition-all`}
          key={index}
          onClick={() => {
            itemClick(item);
          }}
        >
          {displayResult}
        </div>
      );
    });

    const itemClick = (key: string) => {
      setSelectedStatistic(key);
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
        className={`${rootCategoryProps.className} coc-font-style flex flex-col items-center px-4`}
      >
        <div className="text-3xl">{rootCategoryProps.heading}</div>
        <div className="flex flex-wrap gap-4">{nameKeys}</div>
      </div>
    );
  };

  const achievementNames: string[] = data.data[0].player.achievements.map(
    (item) => item.name
  );
  const heroNames: string[] = data.data[0].player.heroes.map(
    (item) => item.name
  );
  const troopNames: string[] = data.data[0].player.troops.map(
    (item) => item.name
  );
  const spellNames: string[] = data.data[0].player.spells.map(
    (item) => item.name
  );

  return (
    <div className="bg-clash">
      <CocNavBar />
      <h2 className="coc-title pt-20 mb-4">{data.data[0].player.name}</h2>
      <h3 className="clash-font-style text-2xl font-thin text-center mb-1">
        {selectedStatistic}
      </h3>
      <div className="flex flex-col items-center gap-4">
        {displayedChartData.length > 0 && (
          <ProgressChart data={displayedChartData} />
        )}
        <RootCategory heading="General" nameKeys={rootCategoryKeys} />
        <NumericCategory
          heading={"Achievements"}
          names={achievementNames}
          categoryKey={"achievements"}
          nameKey={"name"}
          valueKey={"value"}
          className="mt-4"
        />
        <NumericCategory
          heading={"Heroes"}
          names={heroNames}
          categoryKey={"heroes"}
          nameKey={"name"}
          valueKey={"level"}
        />
        <NumericCategory
          heading={"Troops"}
          names={troopNames}
          categoryKey={"troops"}
          nameKey={"name"}
          valueKey={"level"}
        />
        <NumericCategory
          heading={"Spells"}
          names={spellNames}
          categoryKey={"spells"}
          nameKey={"name"}
          valueKey={"level"}
        />
      </div>
    </div>
  );
};

export default PlayerTag;
