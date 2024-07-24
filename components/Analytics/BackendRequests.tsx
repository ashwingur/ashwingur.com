import Card from "@components/Card";
import { BackendAnalytics } from "@interfaces/analytics.interface";
import React, { useState } from "react";
import { useQuery } from "react-query";
import AnalyticsChart from "./AnalyticsChart";
import clsx from "clsx";

interface BackendRequestsProps {
  startTime: Date;
  endTime: Date;
  className?: string;
}

const fetchBackendAnalytics = async (
  start_time: string,
  end_time: string,
  route?: string,
): Promise<BackendAnalytics> => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_ASHWINGUR_API}/analytics/requests`,
    );
    url.searchParams.append("start_time", start_time);
    url.searchParams.append("end_time", end_time);
    if (route) {
      url.searchParams.append("endpoint", route);
    }

    const response = await fetch(url.toString(), { credentials: "include" });

    if (!response.ok) {
      throw new Error("Failed to fetch backend analytics data");
    }

    const analyticsData: BackendAnalytics = await response.json();
    return analyticsData;
  } catch (error) {
    throw new Error(`Failed to fetch backend analytics data: ${error}`);
  }
};

const roundToNearestMinute = (date: Date): Date => {
  const ms = 60000; // milliseconds in a minute
  return new Date(Math.ceil(date.getTime() / ms) * ms);
};

const BackendRequests: React.FC<BackendRequestsProps> = ({
  startTime,
  endTime,
  className,
}) => {
  const [route, setRoute] = useState<string | undefined>(undefined);

  const { data, isLoading, isError } = useQuery<BackendAnalytics>({
    queryKey: ["backendAnalytics", startTime, endTime, route],
    queryFn: () =>
      fetchBackendAnalytics(
        startTime.toISOString(),
        endTime.toISOString(),
        route,
      ),
    staleTime: 60 * 1000, // 1 minute
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    keepPreviousData: true, // Keeps the previous data while fetching new data (also smooth transitions as a benefit)
  });

  if (isLoading) {
    return (
      <Card firstLayer={true} className="flex flex-col items-center">
        <h2>Backend Requests</h2>
        <p className="text-center">LOADING</p>
      </Card>
    );
  }

  if (isError || data === undefined) {
    return (
      <Card firstLayer={true} className="flex flex-col items-center">
        <h2>Backend Requests</h2>
        <p className="text-center">Error fetching frontend statistics</p>
      </Card>
    );
  }

  const timestamps = data.timeseries_data.map((d) => d.timestamp);
  const total_visits = data.timeseries_data.map((d) => d.total_requests);
  const unique_ids = data.timeseries_data.map((d) => d.unique_user_ids);
  const unique_ips = data.timeseries_data.map((d) => d.unique_user_ips);
  const endpoints = data.timeseries_data.map((d) => d.unique_endpoints);

  const routeButtons = data.unique_endpoints.map((item, index) => (
    <button
      className="btn-secondary text-xs md:text-base"
      key={index}
      onClick={() => setRoute(item)}
    >
      {item}
    </button>
  ));

  return (
    <Card
      firstLayer={true}
      className={clsx(className, "flex flex-col items-center")}
    >
      <h2>Backend Requests</h2>
      <div className="flex flex-wrap gap-2 py-4 transition-all md:gap-4 md:px-4">
        {routeButtons}

        {route && (
          <button
            onClick={() => setRoute(undefined)}
            className="btn-accent text-xs md:text-base"
          >
            Clear Endpoint Filter
          </button>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-8 self-stretch lg:px-4">
        <AnalyticsChart
          timestamps={timestamps}
          values={total_visits}
          routes={endpoints}
          title={"Total Requests"}
          total={data.total_count}
        />
        <AnalyticsChart
          timestamps={timestamps}
          values={unique_ids}
          routes={endpoints}
          title={"Unique User IDs"}
          total={data.total_unique_user_id_count}
        />
        <AnalyticsChart
          timestamps={timestamps}
          values={unique_ips}
          routes={endpoints}
          title={"Unique User IPs"}
          total={data.total_unique_user_ip_count}
        />
      </div>
    </Card>
  );
};

export default BackendRequests;
