import DateTimeRangePicker from "@components/DateTimeRangePicker";
import GenericListbox from "@components/GenericListBox";
import clsx from "clsx";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
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
import { CocPlayerHistorySchema } from "shared/validations/ClashOfClansSchemas";
import { z } from "zod";
import CocButton from "./CocButton";

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

const CocPlayerHistory: React.FC<CocPlayerHistoryProps> = ({ tag }) => {
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

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active) {
      return (
        <div className="flex flex-col items-center rounded-md bg-gradient-to-b from-[#293968] to-[#637ac6] p-2 text-white">
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

  const scrollPosition = window.innerWidth <= 768 ? 100 : 0;

  const RootCategory: React.FC<RootCategoryProps> = ({
    keys,
    title,
    className,
  }) => {
    const items = keys.map((item, index) => {
      return (
        <button
          className="btn"
          key={index}
          onClick={() => {
            window.scrollTo({
              top: scrollPosition,
              left: 0,
              behavior: "smooth",
            });
            setSelectedStatistic(item);
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
          {item}
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
    const items = history[history.length - 1][nameKey].map((item, index) => {
      return (
        <button
          className="btn"
          key={index}
          onClick={() => {
            window.scrollTo({
              top: scrollPosition,
              left: 0,
              behavior: "smooth",
            });
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
          {item.name}
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
      <div className="mx-auto mb-24 flex h-16 justify-center pt-24">
        <Link href={`/ClashOfClans/player/${tag}`} className="">
          <CocButton
            className="w-80 hover:w-72"
            text={data.name}
            innerColour="bg-orange-500"
            middleColour="bg-orange-600"
            outerColour="bg-orange-700"
          />
        </Link>
      </div>
      <div className="z-20 flex flex-col items-center">
        <h3 className="mb-2 text-xl">Time Filter</h3>
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
          <h3 className="coc-font-style my-4 text-center text-3xl">
            {selectedStatistic}
          </h3>
          <ProgressChart data={chartData} />
        </>
      )}
      {data.history.length == 0 && (
        <p className="text-center font-coc text-2xl text-error">
          No data for this player between the given timestamps.
        </p>
      )}
      {data.history.length > 0 && (
        <div className="p-4">
          <RootCategory
            keys={rootCategoryKeys}
            title={"General"}
            className="mt-4 bg-[#465172]"
          />
          <PlayerItemCategory
            nameKey={"troops"}
            title="Troops"
            className="mt-4 bg-[#465172]"
          />
          <PlayerItemCategory
            nameKey={"spells"}
            title="Spells"
            className="mt-4 bg-[#465172]"
          />
          <PlayerItemCategory
            nameKey={"heroes"}
            title="Heroes"
            className="mt-4 bg-[#465172]"
          />
          <PlayerItemCategory
            nameKey={"heroEquipment"}
            title="Hero Equipment"
            className="mt-4 bg-[#465172]"
          />
        </div>
      )}
    </div>
  );
};

export default CocPlayerHistory;
