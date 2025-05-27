import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import WeatherMapToggle from '../components/WeatherMapToggle';
import { AppContext } from '../utils/context';
import { LocationResult } from "../utils/geolocation";


interface WeatherMarker extends LocationResult {
  iconName: string;
}

export default function MapPage() {
  const [fontsLoaded, setFontsLoaded] = useState(true);

  const conditionIconMap: Record<string, string> = {
  "Cloudy": "cloudy",
  "Sunny": "sunny",
  "Clear":"sunny",
  "Mainly Sunny": "sunny",
  "Mainly Clear": "sunny",
  "Rainy": "rainy",
  "Partly Cloudy": "partly-sunny",
  "Foggy": "cloudy",
  "Rime Fog": "cloudy",
  "Light Drizzle": "rainy",
  "Drizzle": "rainy",
  "Heavy Drizzle": "rainy",
  "Light Freezing Drizzle": "rainy",
  "Freezing Drizzle": "rainy",
  "Light Rain": "rainy",
  "Heavy Rain": "rainy",
  "Light Freezing Rain": "rainy",
  "Freezing Rain": "rainy",
  "Light Snow": "snow",
  "Heavy Snow": "snow",
  "Snow Grains": "snow",
  "Light Showers": "rainy",
  "Showers": "rainy",
  "Heavy Showers": "rainy",
  "Light Snow Showers": "snow",
  "Snow Showers": "snow",
  "Thunderstorm": "thunderstorm",
  "Light Thunderstorms With Hail": "thunderstorm",
  "Thunderstorm With Hail": "thunderstorm",
  }
  const context = useContext(AppContext)!;
  const { globalState, setGlobalState } = context;

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(Ionicons.font); // Makes sure the ionics font is loaded so icons load
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View style={styles.loadingContainer}><Text style={styles.loadingText}>Loading map and icons...</Text></View>;
  }

  const markers: WeatherMarker[] = []; // collect markers here
  for (const place of globalState.tripDestinations) {
    const marker = {
      lat: place.lat,
      lon: place.lon,
      display_name: place.location,
      type: "city",
    }
    const weatherData = place.weather;
    // Count frequency of weather conditions
    const conditionCounts: Record<string, number> = {};
    for (const hourly of weatherData) {
      const desc = hourly.weatherCode.description;
      conditionCounts[desc] = (conditionCounts[desc] || 0) + 1;
    }

    // Gets the weather condition which occurs the most
    let maxKey = "";
    let maxValue = -Infinity;
    for (const [key, value] of Object.entries(conditionCounts)) {
      if (value > maxValue) {
        maxValue = value;
        maxKey = key;
      }
    }
    const iconName = conditionIconMap[maxKey];;
      markers.push({
      ...marker,
      iconName,
    });
  }
 
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 52.2053,
          longitude: 0.1218,    // Cambridge
          latitudeDelta: 2.0,
          longitudeDelta: 2.0,
        }}
      >
      {markers.map((marker, index) => {
        const lat = parseFloat(marker.lat);     // Iterate through all the available markers and place them on the map along with the correct icons
        const lon = parseFloat(marker.lon);
        return (
          <Marker
            key={index}
            coordinate={{ latitude: lat, longitude: lon }}
            title={marker.display_name}>

          <View style={[{ alignItems: 'center' }, styles.yellowOuterCircle]}>
          <Ionicons name={marker.iconName as any} size={24} color="white" />
          </View>
          </Marker>
        );
        })}
        {markers.length > 1 && (
          <Polyline
            coordinates={markers.map(marker => ({
              latitude: parseFloat(marker.lat),
              longitude: parseFloat(marker.lon),
            }))}
            strokeColor="#0000FF"
            strokeWidth={3}
          />
        )}
      </MapView>
      {/* Allows you to go back to the home page */}
      <View style={styles.toggleContainer}>
        <WeatherMapToggle currentPage="Map" />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
  },
  greenOuterCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#90EE90',
    backgroundColor: '#90EE90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowOuterCircle: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    borderWidth: 3,
    borderColor: '#D9D900',
    backgroundColor: '#D9D900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});