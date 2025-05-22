import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import WeatherMapToggle from "../components/WeatherMapToggle";
import { LocationResult, searchLocation } from "../utils/geolocation";

export default function MapPage() {
  const [markers, setMarkers] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(true);

  const [locations, setLocations] = useState(["Cambridge", "London"]); // These are pre set locations, can be changed once the search is implemented
  const {selectedLocation, selectedDate} = useLocalSearchParams();

  useEffect(() => {
    const fetchMarkers = async () => {
      setLoading(true);
      try {
        const newMarkers: LocationResult[] = []; // collect markers here

        for (const place of locations) {
          const locationData = await searchLocation(place); // Iterate through all locations and get relevant data (long, lat etc.)
          if (locationData.length > 0) {
            newMarkers.push(locationData[0]);
          }
        }
      setMarkers(newMarkers);
      setLoading(false); // Ensure that markers will be placed
      } catch (error) {
        console.error("Failed to fetch preset locations", error);
      } 
    };

    fetchMarkers();
  }, [locations]); // When locations is updated, code is reran so markers can be updated
  if (loading) {
  return <View style={styles.container}><Text>Loading map...</Text></View>;
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
        const lat = parseFloat(marker.lat);     // Iterate through all the available markers and place them on the map
        const lon = parseFloat(marker.lon);

        return (
          <Marker
            key={index}
            coordinate={{ latitude: lat, longitude: lon }}
            title={marker.display_name}
          />
        );
        })}
      </MapView>
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
  toggleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});