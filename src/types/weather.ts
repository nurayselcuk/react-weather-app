export interface WeatherData {
  cod: number;
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface LocationData {
  latitude: number;
  longitude: number;
  error?: string;
} 