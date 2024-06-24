// Frontend
export interface FrontendAnalytics {
  timeseries_data: BackendTimeSeriesData[];
  unique_routes: string[];
  total_count: number;
  total_unique_user_id_count: number;
  total_unique_user_ip_count: number;
}

interface BackendTimeSeriesData {
  timestamp: string;
  total_visits: number;
  unique_routes: string[];
  unique_user_ids: number;
  unique_user_ips: number;
}

// Backend
export interface BackendAnalytics {
  timeseries_data: BackendTimeSeriesData[];
  unique_endpoints: string[];
  total_count: number;
  total_unique_user_id_count: number;
  total_unique_user_ip_count: number;
}

interface BackendTimeSeriesData {
  timestamp: string;
  total_requests: number;
  unique_endpoints: string[];
  unique_user_ids: number;
  unique_user_ips: number;
}
