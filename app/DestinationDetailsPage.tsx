import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient, Path, Stop } from "react-native-svg";

// Weather type definition
type WeatherType = 'fog' | 'rain' | 'storm' | 'sunny' | 'sunWithClouds';

const getWeatherBackground = (weatherType: WeatherType) => {
  const backgrounds = {
    fog: require('../assets/images/fog.png'),
    rain: require('../assets/images/rain.png'),
    storm: require('../assets/images/storm.png'),
    sunny: require('../assets/images/sunny.png'),
    sunWithClouds: require('../assets/images/sun with clouds.png'),
  };
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
  DestinationDetailsPage: { cityName: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function DestinationDetailsPage() {
  const navigation = useNavigation<NavigationProp>();
  // TODO: This will come from API later
  const currentWeather: WeatherType = 'sunny';
  
  const weatherData = [
    12.3, 11.5, 10.7, 10.3, 9.4, 9.4, 10.4, 11.1, 12.2, 12.6, 13.5, 13.7, 15.0,
    15.7, 15.4, 14.8,
  ];
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
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
      backgroundColor: '#F5F3E8',
      padding: 25,
      margin: 15,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.1)',
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
      backgroundColor: 'rgba(51, 102, 255, 0.15)',
      borderRadius: 25,
      padding: 25,
      margin: 15,
      justifyContent: "center",
      borderWidth: 1,
      borderColor: 'rgba(51, 102, 255, 0.3)',
    },
    centerText: {
      textAlign: "center",
      color: '#000000',
      textShadowColor: 'rgba(255, 255, 255, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    feelsLike: {
      fontSize: 72,
      lineHeight: 72,
      marginRight: 10,
      color: '#000000',
      textShadowColor: 'rgba(255, 255, 255, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    actual: {
      fontSize: 48,
      lineHeight: 48,
      marginLeft: 10,
      color: '#000000',
      textShadowColor: 'rgba(255, 255, 255, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    feelsLikeLabel: {
      marginRight: 10,
      color: '#000000',
      textShadowColor: 'rgba(255, 255, 255, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    actualLabel: {
      marginLeft: 10,
      color: '#000000',
      textShadowColor: 'rgba(255, 255, 255, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
    backButton: {
      backgroundColor: 'rgba(51, 102, 255, 0.3)',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
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
              <ThemedText style={[styles.centerText, { color: '#000000' }]} type="subtitle">Cambridge, UK</ThemedText>
            </View>

            <View style={styles.temperatureContainer}>
              <View style={styles.temperatureDataContainer}>
                <ThemedText style={[styles.feelsLike, { color: '#000000' }]} type="title">
                  6°C
                </ThemedText>

                <ThemedText style={[styles.actual, { color: '#000000' }]} type="title">
                  5°C
                </ThemedText>
              </View>
              <View style={styles.temperatureLabelContainer}>
                <ThemedText style={[styles.feelsLikeLabel, { color: '#000000' }]} type="subtitle">
                  Feels like
                </ThemedText>
                <ThemedText style={[styles.actualLabel, { color: '#000000' }]} type="subtitle">
                  Actual
                </ThemedText>
              </View>
            </View>
            <View style={styles.summaryContainer}>
              <ThemedText type="title" style={[styles.centerText, { color: '#000000' }]}>
                warning: snow{" "}
              </ThemedText>
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.detailContainer}>
                <View style={styles.keyContainer}>
                  <ThemedText type="defaultSemiBold" style={{ color: '#000000' }}>temperature:</ThemedText>
                </View>
              </View>
              <CustomLineChart
                data={{
                  labels: ["00:00", "12:00"],
                  datasets: [
                    {
                      data: [
                        12.3, 11.5, 10.7, 10.3, 9.4, 9.4, 10.4, 11.1, 12.2, 12.6,
                        13.5, 13.7, 15.0, 15.7, 15.4, 14.8, 13.6, 13.2, 11.6, 10.6,
                        9.9, 9.2, 8.7, 8.2, 7.4, 7.0, 6.8, 6.5, 6.5, 7.0, 7.9, 9.3,
                        10.6, 11.8, 12.9, 13.9, 13.9, 14.4, 12.9, 14.0, 11.1, 12.2,
                        12.1, 11.9, 11.0, 10.4, 9.7, 9.0, 8.5, 8.3, 8.1, 8.1, 7.9,
                        8.1, 8.8, 9.9, 11.7, 12.9, 14.0, 15.5, 16.3, 16.9, 17.6,
                        18.0, 18.1, 17.9, 17.2, 16.2, 15.0, 14.2, 13.6, 13.3, 12.9,
                        12.5, 12.2, 11.9, 11.4, 11.2, 11.1, 11.9, 12.5, 12.9, 12.9,
                        14.2, 15.3, 15.3, 15.0, 14.8, 15.0, 15.3, 15.4, 15.1, 14.6,
                        14.1, 14.0, 13.9, 13.8, 13.5, 13.2, 13.0, 13.1, 13.4, 14.1,
                        15.4, 17.2, 18.6, 19.4, 19.9, 20.1, 20.2, 20.1, 19.7, 18.9,
                        17.7, 16.6, 15.5, 14.3, 13.4, 12.6, 12.1, 11.5, 10.7, 9.9,
                        9.6, 10.1, 11.2, 11.9, 14.1, 15.6, 16.9, 17.8, 18.4, 19.0,
                        19.5, 19.9, 20.0, 19.9, 19.6, 19.0, 18.0, 16.7, 15.6, 14.8,
                        14.1, 13.6, 13.0, 12.5, 12.3, 12.7, 13.4, 14.2, 15.1, 16.0,
                        16.6, 16.8, 16.7, 16.7, 16.9, 17.1, 17.2, 17.2, 17.1, 16.9,
                        16.5, 15.9, 15.4, 15.1, 14.8,
                      ],
                    },
                  ],
                }}
                width={300}
                height={120}
                chartConfig={{
                  backgroundGradientFrom: "#fbfbfb",
                  backgroundGradientTo: "#fbfbfb",
                  color: (opacity = 1) => `rgba(63, 0, 241, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                bezier
                withInnerLines={false}
                withOuterLines={false}
              />
              <View style={styles.detailContainer}>
                <View style={styles.keyContainer}>
                  <ThemedText type="defaultSemiBold" style={{ color: '#000000' }}>sunset:</ThemedText>
                </View>
                <View style={styles.valContainer}>
                  <ThemedText type="default" style={{ color: '#000000' }}>9pm</ThemedText>
                </View>
              </View>
              <View style={styles.detailContainer}>
                <View style={styles.keyContainer}>
                  <ThemedText type="defaultSemiBold" style={{ color: '#000000' }}>visibility:</ThemedText>
                </View>
                <View style={styles.valContainer}>
                  <ThemedText type="default" style={{ color: '#000000' }}>22km</ThemedText>
                </View>
              </View>
              <View style={styles.detailContainer}>
                <View style={styles.keyContainer}>
                  <ThemedText type="defaultSemiBold" style={{ color: '#000000' }}>rainfall:</ThemedText>
                </View>
              </View>
              <CustomLineChart
                data={{
                  labels: ["00:00", "12:00"],
                  datasets: [
                    {
                      data: [
                        12.3, 11.5, 10.7, 10.3, 9.4, 9.4, 10.4, 11.1, 12.2, 12.6,
                        13.5, 13.7, 15.0, 15.7, 15.4, 14.8, 13.6, 13.2, 11.6, 10.6,
                        9.9, 9.2, 8.7, 8.2, 7.4, 7.0, 6.8, 6.5, 6.5, 7.0, 7.9, 9.3,
                        10.6, 11.8, 12.9, 13.9, 13.9, 14.4, 12.9, 14.0, 11.1, 12.2,
                        12.1, 11.9, 11.0, 10.4, 9.7, 9.0, 8.5, 8.3, 8.1, 8.1, 7.9,
                        8.1, 8.8, 9.9, 11.7, 12.9, 14.0, 15.5, 16.3, 16.9, 17.6,
                        18.0, 18.1, 17.9, 17.2, 16.2, 15.0, 14.2, 13.6, 13.3, 12.9,
                        12.5, 12.2, 11.9, 11.4, 11.2, 11.1, 11.9, 12.5, 12.9, 12.9,
                        14.2, 15.3, 15.3, 15.0, 14.8, 15.0, 15.3, 15.4, 15.1, 14.6,
                        14.1, 14.0, 13.9, 13.8, 13.5, 13.2, 13.0, 13.1, 13.4, 14.1,
                        15.4, 17.2, 18.6, 19.4, 19.9, 20.1, 20.2, 20.1, 19.7, 18.9,
                        17.7, 16.6, 15.5, 14.3, 13.4, 12.6, 12.1, 11.5, 10.7, 9.9,
                        9.6, 10.1, 11.2, 11.9, 14.1, 15.6, 16.9, 17.8, 18.4, 19.0,
                        19.5, 19.9, 20.0, 19.9, 19.6, 19.0, 18.0, 16.7, 15.6, 14.8,
                        14.1, 13.6, 13.0, 12.5, 12.3, 12.7, 13.4, 14.2, 15.1, 16.0,
                        16.6, 16.8, 16.7, 16.7, 16.9, 17.1, 17.2, 17.2, 17.1, 16.9,
                        16.5, 15.9, 15.4, 15.1, 14.8,
                      ],
                    },
                  ],
                }}
                width={300}
                height={120}
                chartConfig={{
                  backgroundGradientFrom: "#fbfbfb",
                  backgroundGradientTo: "#fbfbfb",
                  color: (opacity = 1) => `rgba(63, 0, 241, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
