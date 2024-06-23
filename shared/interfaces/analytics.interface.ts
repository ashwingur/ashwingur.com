export interface FrontendAnalytics {
  timeseries_data: FrontendTimeseriesData[];
  unique_routes: string[];
}

interface FrontendTimeseriesData {
  timestamp: string;
  total_visits: number;
  unique_routes: string[];
  unique_user_ids: number;
  unique_users_ips: number;
}
