export interface WeatherData {
  data: number[][];
  headers: string[];
  overall_stats?: OverallStats;
}

interface OverallStats {
  temperature: MetricStats;
  pressure: MetricStats;
  humidity: MetricStats;
  air_quality_index: MetricStats;
  ambient_light: MetricStats;
  eCO2: MetricStats;
  TVOC: MetricStats;
}

export interface MetricStats {
  average: number;
  max: {
    timestamp: number;
    value: number;
  };
  min: {
    timestamp: number;
    value: number;
  };
}
