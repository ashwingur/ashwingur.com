import { useRouter } from "next/router";
import React from "react";
import CocNavBar from "../../../components/clashofclans/CocNavBar";
import axios from "axios";
import { useQuery } from "react-query";
import { ICocUser } from "../../../model/CocUser";
import CocLoadingOrError from "../../../components/clashofclans/CocLoadingOrError";
import { SpinningCircles } from "react-loading-icons";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import moment from "moment";

interface ChartProps {
  data: ChartData[];
}

interface ChartData {
  time: number;
  y: number;
}

const fetchHistory = (playerTag: String) =>
  axios
    .get(`/api/clashofclans/player/${playerTag}/history`)
    .then(({ data }) => data);

const Chart = (chartProps: ChartProps) => {
  return (
    <ResponsiveContainer width="80%" height={500}>
      <LineChart data={chartProps.data}>
        <Line type="monotone" dataKey="y" stroke="#ccc" strokeWidth={3} />
        <CartesianGrid stroke="#ccc" />
        <XAxis
          dataKey="time"
          name="Time"
          stroke="white"
          tickFormatter={(unixTime) => moment(unixTime).format("DD-MM-YY")}
        />
        <YAxis domain={["dataMin - 100", "dataMax + 100"]} stroke="white" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

const PlayerTag = () => {
  const router = useRouter();
  const playerTag =
    typeof router.query?.playerTag === "string" ? router.query.playerTag : "";

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

  if (data === null) {
    return CocLoadingOrError({
      heading: "",
      info: <p className="text-center coc-font-style m-8 text-2xl">No data</p>,
    });
  }

  const chartData: ChartData[] = data.data.map((item) => {
    return {
      time: item.time,
      y: item.player.trophies,
    };
  });

  console.log(chartData);

  return (
    <div className="bg-clash">
      <CocNavBar />
      <h2 className="coc-title pt-20 mb-4">{data.data[0].player.name}</h2>
      <div className="flex flex-col items-center">
        <Chart data={chartData} />
      </div>
    </div>
  );
};

export default PlayerTag;
