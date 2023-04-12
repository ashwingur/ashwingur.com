import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { ICocUser } from "../../model/CocUser";
import { useQuery } from "react-query";
import { SpinningCircles } from "react-loading-icons";
import CocLoadingOrError from "../../components/clashofclans/CocLoadingOrError";
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

const title = "Chart";

const fetchHistory = (playerTag: String) =>
  axios
    .get(`/api/clashofclans/player/${playerTag}/history`)
    .then(({ data }) => data);

const ChartTest = () => {
  const router = useRouter();
  const playerTag = "YLPGLJ0V";
  //   const playerTag =
  //     typeof router.query?.playerTag === "string" ? router.query.playerTag : "";

  const { isLoading, error, data } = useQuery<ICocUser>({
    queryKey: ["playerHistory", playerTag],
    queryFn: () => fetchHistory(playerTag),
    enabled: router.isReady,
  });

  if (error instanceof Error)
    return CocLoadingOrError({
      heading: title,
      info: (
        <p className="text-center coc-font-style m-8 text-2xl">
          Unable to fetch player history: {error.message}
        </p>
      ),
    });

  if (isLoading || data === undefined)
    return CocLoadingOrError({
      heading: title,
      info: <SpinningCircles className="mx-auto mt-8" />,
    });

  const chartData = data.data.map((item) => {
    return {
      time: item.time,
      y: item.player.trophies,
    };
  });
  console.log(data.data);
  console.log(JSON.stringify(chartData));

  return (
    <div className="py-10 px-10">
      <ResponsiveContainer width="80%" height={500}>
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="y" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis
            dataKey="time"
            name="Time"
            tickFormatter={(unixTime) => moment(unixTime).format("DD-MM-YY")}
          />
          <YAxis domain={["dataMin - 100", "dataMax + 100"]}></YAxis>
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartTest;
