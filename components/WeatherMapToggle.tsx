import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MapPage from '../app/MapPage'; // Ensure the file exists at this path or adjust the path accordingly

type RootStackParamList = {
    MapPage: undefined; // Ensure this matches the route name in your stack
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MapPage'>;


const WeatherMapToggle = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={() => navigation.navigate('Map')}>
        <View style={styles.sunIcon}>
          <Ionicons name="sunny" size={24} color="white" />
        </View>
        <View style={styles.mapIcon}>
          <Ionicons name="map-outline" size={24} color="white" />
          
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  toggleButton: {
    flexDirection: 'row',
    backgroundColor: '#3066F1', // Blue color from design
    borderRadius: 30,
    padding: 5,
  },
  sunIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F9B233', // Yellow/orange from design
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WeatherMapToggle;