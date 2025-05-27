import { ThemedText } from "@/components/ThemedText";
import { AppContext } from "@/utils/context";
import { formatDate } from "@/utils/misc";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext } from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient, Path, Stop } from "react-native-svg";
var SunCalc = require('suncalc');// Weather type definition
type WeatherType = 
  | "sunny" 
  | "cloudy" 
  | "partlyCloudy" 
  | "fog" 
  | "rain" 
  | "storm" 
  | "snow";

const getWeatherBackground = (description: string) => {
  // Map weather descriptions to our background image types
  const weatherMapping: { [key: string]: WeatherType } = {
    // Clear conditions
    "Sunny": "sunny",
    "Clear": "sunny",
    "Mainly Sunny": "sunny",
    "Mainly Clear": "sunny",
    
    // Cloudy conditions
    "Cloudy": "cloudy",
    
    // Partly cloudy conditions
    "Partly Cloudy": "partlyCloudy",
    
    // Foggy conditions
    "Foggy": "fog",
    "Rime Fog": "fog",
    
    // Rainy conditions
    "Light Drizzle": "rain",
    "Drizzle": "rain",
    "Heavy Drizzle": "rain",
    "Light Freezing Drizzle": "rain",
    "Freezing Drizzle": "rain",
    "Light Rain": "rain",
    "Rain": "rain",
    "Heavy Rain": "rain",
    "Light Freezing Rain": "rain",
    "Freezing Rain": "rain",
    "Light Showers": "rain",
    "Showers": "rain",
    "Heavy Showers": "rain",
    
    // Stormy conditions
    "Thunderstorm": "storm",
    "Light Thunderstorms With Hail": "storm",
    "Thunderstorm With Hail": "storm",
    
    // Snowy conditions
    "Light Snow": "snow",
    "Snow": "snow",
    "Heavy Snow": "snow",
    "Snow Grains": "snow",
    "Light Snow Showers": "snow",
    "Snow Showers": "snow"
  };

  const backgrounds = {
    sunny: require("../assets/images/sunny.png"),
    cloudy: require("../assets/images/sun with clouds.png"),
    partlyCloudy: require("../assets/images/sun with clouds.png"),
    fog: require("../assets/images/fog.png"),
    rain: require("../assets/images/rain.png"),
    storm: require("../assets/images/storm.png"),
    snow: require("../assets/images/rain.png") // Using rain image for snow since we don't have a snow image
  };

  // Get the weather type from the mapping, default to sunny if not found
  const weatherType = weatherMapping[description] || "sunny";
  return backgrounds[weatherType];
};

class CustomLineChart extends LineChart {
  renderLine = ({
    width,
    height,
    paddingRight,
    paddingTop,
    data,
  }: Pick<
    AbstractChartConfig,
    "data" | "width" | "height" | "paddingRight" | "paddingTop"
  >) => {
    const output: React.JSX.Element[] = [];

    if (!data) return [];

    data.forEach((dataset, index) => {
      const bezierPoints = this.getBezierLinePoints(dataset, {
        width,
        height,
        paddingRight,
        paddingTop,
        data,
      });

      const gradientColors = ["#F10086", "#3F00F1"];

      output.push(
        <LinearGradient
          key={`line-gradient-${index}`}
          id={`line-gradient-${index}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <Stop offset="0%" stopColor={gradientColors[0]} />
          <Stop offset="100%" stopColor={gradientColors[1]} />
        </LinearGradient>,
        <Path
          key={`line-${index}`}
          d={bezierPoints}
          fill="none"
          stroke={`url(#line-gradient-${index})`}
          strokeWidth={this.getStrokeWidth(dataset)}
          strokeDasharray={dataset.strokeDashArray}
          strokeDashoffset={dataset.strokeDashOffset}
        />
      );
    });

    return output;
  };
}

type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  Settings: undefined;
  DestinationDetailsPage: {
    cityName: string;
    date: string;
    weather: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, "DestinationDetailsPage">;

export default function DestinationDetailsPage() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { cityName, date, weather } = route.params;

  const context = useContext(AppContext)!;
  const { globalState, setGlobalState } = context;

  var dest = globalState["tripDestinations"].find(
    (a) => a["location"].split(",")[0] == cityName
  );
  if (!dest) {
    dest = globalState["tripDestinations"][0];
  }
  const weatherT = dest["weather"];
  
  function findClosestWeather(data: any[]) {
    return data.reduce((closest, current) => {
      const currentDiff = Math.abs(
        new Date(current.time).getTime() - new Date().getTime()
      );
      const closestDiff = Math.abs(
        new Date(closest.time).getTime() - new Date().getTime()
      );
      return currentDiff < closestDiff ? current : closest;
    });
  }

  const closest = findClosestWeather(weatherT);
  const currentWeather = closest.weatherCode.description;

  const feelsLike = Math.round(closest["apparentTemperature"]);
  const actual = Math.round(closest["temperature2m"]);
  const visibility = (closest["visibility"]/1000).toFixed(1);
  // const sunset = 9;

  const sunsetTime = new Date(SunCalc.getTimes(new Date(dest.date), dest.latitude, dest.longitude).sunset)
  var sunset = (sunsetTime.getHours()-12).toString()+":"+sunsetTime.getMinutes().toString()+"pm";

  if (sunsetTime.getMinutes() < 10) {
  var sunset = (sunsetTime.getHours()-12).toString()+":0"+sunsetTime.getMinutes().toString()+"pm";

  } 
  const rainData = weatherT.map((w) => w["precipitation"]);
  const tempData = weatherT.map((w) => w["temperature2m"]);
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    container: {
      flex: 1,
    },
    detailContainer: {
      padding: 2,
      margin: 2,
      flexDirection: "row",
    },
    keyContainer: {
      flex: 1,
    },
    valContainer: {
      flex: 2,
    },
    detailsContainer: {
      borderRadius: 25,
      backgroundColor: "#F5F3E8",
      padding: 25,
      margin: 15,
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    temperatureContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    temperatureDataContainer: {
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "baseline",
      paddingTop: 15,
    },
    temperatureLabelContainer: {
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "baseline",
    },
    summaryContainer: {
      backgroundColor: "rgba(51, 102, 255, 0.15)",
      borderRadius: 25,
      padding: 25,
      margin: 15,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "rgba(51, 102, 255, 0.3)",
    },
    centerText: {
      textAlign: "center",
      color: "#000000",
      textShadowColor: "rgba(255, 255, 255, 0.5)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    dateText: {
      textAlign: "center",
      color: "#000000",
      fontSize: 14,
      marginTop: 4,
      opacity: 0.7,
      textShadowColor: "rgba(255, 255, 255, 0.5)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    feelsLike: {
      fontSize: 72,
      lineHeight: 72,
      marginRight: 10,
      color: "#000000",
      textShadowColor: "rgba(255, 255, 255, 0.5)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    actual: {
      fontSize: 48,
      lineHeight: 48,
      marginLeft: 10,
      color: "#000000",
      textShadowColor: "rgba(255, 255, 255, 0.5)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    feelsLikeLabel: {
      marginRight: 10,
      color: "#000000",
      textShadowColor: "rgba(255, 255, 255, 0.5)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    actualLabel: {
      marginLeft: 10,
      color: "#000000",
      textShadowColor: "rgba(255, 255, 255, 0.5)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    backButton: {
      backgroundColor: "#3366FF",
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,
      marginBottom: 16,
      alignSelf: "flex-start",
      marginLeft: 16,
      borderWidth: 0,
    },
  });

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={getWeatherBackground(currentWeather)}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <SafeAreaView>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <View>
              <ThemedText
                style={[styles.centerText, { color: "#000000" }]}
                type="subtitle"
              >
                {cityName}
              </ThemedText>
              <ThemedText style={styles.dateText} type="default">
                {formatDate(date)}
              </ThemedText>
            </View>

            <View style={styles.temperatureContainer}>
              <View style={styles.temperatureDataContainer}>
                <ThemedText
                  style={[styles.feelsLike, { color: "#000000" }]}
                  type="title"
                >
                  {feelsLike}°C
                </ThemedText>

                <ThemedText
                  style={[styles.actual, { color: "#000000" }]}
                  type="title"
                >
                  {actual}°C
                </ThemedText>
              </View>
              <View style={styles.temperatureLabelContainer}>
                <ThemedText
                  style={[styles.feelsLikeLabel, { color: "#000000" }]}
                  type="subtitle"
                >
                  Feels like
                </ThemedText>
                <ThemedText
                  style={[styles.actualLabel, { color: "#000000" }]}
                  type="subtitle"
                >
                  Actual
                </ThemedText>
              </View>
            </View>
            <View style={styles.summaryContainer}>
              <ThemedText
                type="title"
                style={[styles.centerText, { color: "#000000" }]}
              >
                {weather}
              </ThemedText>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailContainer}>
                <View style={styles.keyContainer}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={{ color: "#000000" }}
                  >
                    temperature:
                  </ThemedText>
                </View>
              </View>
              <CustomLineChart
                data={{
                  labels: ["00:00", "12:00"],
                  datasets: [
                    {
                      data: tempData,
                    },
                  ],
                }}
                width={300}
                height={120}
                withDots={false}
                fromZero={true}
                chartConfig={{
                  backgroundGradientFrom: "#F5F3E8",
                  backgroundGradientTo: "#F5F3E8",
                  fillShadowGradientFrom: "#F5F3E8",
                  fillShadowGradientTo: "#F5F3E8",
                  color: (opacity = 1) => `rgba(63, 0, 241, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  decimalPlaces: 0,
                }}
                bezier
                withInnerLines={false}
                withOuterLines={false}
              />
              <View style={styles.detailContainer}>
                <View style={styles.keyContainer}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={{ color: "#000000" }}
                  >
                    sunset:
                  </ThemedText>
                </View>
                <View style={styles.valContainer}>
                  <ThemedText type="default" style={{ color: "#000000" }}>
                    {sunset}
                  </ThemedText>
                </View>
              </View>
              <View style={styles.detailContainer}>
                <View style={styles.keyContainer}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={{ color: "#000000" }}
                  >
                    visibility:
                  </ThemedText>
                </View>
                <View style={styles.valContainer}>
                  <ThemedText type="default" style={{ color: "#000000" }}>
                    {visibility}km
                  </ThemedText>
                </View>
              </View>
              <View style={styles.detailContainer}>
                <View style={styles.keyContainer}>
                  <ThemedText
                    type="defaultSemiBold"
                    style={{ color: "#000000" }}
                  >
                    rainfall:
                  </ThemedText>
                </View>
              </View>
              <CustomLineChart
                data={{
                  labels: ["00:00", "12:00"],
                  datasets: [
                    {
                      data: rainData,
                    },
                    {
                      data: [10],

                      withDots: false, //a flage to make it hidden
                    },
                  ],
                }}
                width={300}
                height={120}
                withDots={false}
                fromZero={true}
                chartConfig={{
                  backgroundGradientFrom: "#F5F3E8",
                  backgroundGradientTo: "#F5F3E8",
                  fillShadowGradientFrom: "#F5F3E8",
                  fillShadowGradientTo: "#F5F3E8",
                  color: (opacity = 1) => `rgba(63, 0, 241, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  decimalPlaces: 1,
                }}
                bezier
                withInnerLines={false}
                withOuterLines={false}
              />
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

///https://stackoverflow.com/a/63988530
