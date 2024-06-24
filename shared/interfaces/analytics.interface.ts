export interface FrontendAnalytics {
  timeseries_data: FrontendTimeseriesData[];
  unique_routes: string[];
  total_unique_user_id_count: number;
  total_unique_user_ip_count: number;
}

interface FrontendTimeseriesData {
  timestamp: string;
  total_visits: number;
  unique_routes: string[];
  unique_user_ids: number;
  unique_users_ips: number;
}
