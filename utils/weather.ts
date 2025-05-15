import { fetchWeatherApi } from 'openmeteo';
import { LocationResult } from './geolocation';
import weatherCodes from './weather_codes.json';

export interface WeatherType {
  description: string;
  image: string
}

export interface HourlyWeatherData {
  time: Date;
  temperature2m: number;
  relativeHumidity2m: number;
  apparentTemperature: number;
  precipitationProbability: number;
  precipitation: number;
  visibility: number;
  uvIndex: number;
  weatherCode: WeatherType
}

const getWeatherType = (weatherCode: number, time: Date): WeatherType => {
  const isDay = time.getHours() >= 6 && time.getHours() < 18;
  const weatherSupertype = weatherCodes[weatherCode.toString()];
  if (!weatherSupertype) return {
    description: "Unknown",
    image: "http://openweathermap.org/img/wn/01d@2x.png"
  };
  return isDay ? weatherSupertype.day : weatherSupertype.night;
}

// Helper to format Date as YYYY-MM-DD
const formatDate = (date: Date): string =>
  date.toISOString().split('T')[0];

export const getHourlyWeatherForLocation = async (
  location: LocationResult,
  startDate: Date = new Date(),
  endDate: Date = new Date()
): Promise<HourlyWeatherData[]> => {
  const { lat, lon } = location;
  const latitude = Number(lat);
  const longitude = Number(lon);
  const params = {
    latitude,
    longitude,
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation_probability",
      "precipitation",
      "visibility",
      "uv_index",
      "weather_code"
    ],
    start_date: formatDate(startDate),
    end_date: formatDate(endDate)
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const hourly = response.hourly()!;

  const startTime = Number(hourly.time());
  const endTime = Number(hourly.timeEnd());
  const interval = hourly.interval();
  const steps = (endTime - startTime) / interval;

  const timeArray = [...Array(steps)].map(
    (_, i) => new Date((startTime + i * interval + utcOffsetSeconds) * 1000)
  );

  const temperature2m = hourly.variables(0)!.valuesArray()!;
  const relativeHumidity2m = hourly.variables(1)!.valuesArray()!;
  const apparentTemperature = hourly.variables(2)!.valuesArray()!;
  const precipitationProbability = hourly.variables(3)!.valuesArray()!;
  const precipitation = hourly.variables(4)!.valuesArray()!;
  const visibility = hourly.variables(5)!.valuesArray()!;
  const uvIndex = hourly.variables(6)!.valuesArray()!;
  const weatherCode = hourly.variables(7)!.valuesArray()!;

  const hourlyData: HourlyWeatherData[] = timeArray.map((time, i) => ({
    time,
    temperature2m: temperature2m[i],
    relativeHumidity2m: relativeHumidity2m[i],
    apparentTemperature: apparentTemperature[i],
    precipitationProbability: precipitationProbability[i],
    precipitation: precipitation[i],
    visibility: visibility[i],
    uvIndex: uvIndex[i],
    weatherCode: getWeatherType(weatherCode[i], time)
  }));

  return hourlyData;
};