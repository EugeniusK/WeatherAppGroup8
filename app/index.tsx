
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CityCard from '../components/CityCard';
import TripHeader from '../components/TripHeader';
import WeatherMapToggle from '../components/WeatherMapToggle';

interface City {
  id: number;
  name: string;
  date: string;
  weather: string;
}

const HomeScreen = (): JSX.Element => {
  const [cities, setCities] = useState<City[]>([
    { id: 1, name: 'Cambridge', date: '9 May', weather: 'sunny' },
    { id: 2, name: 'Birmingham', date: '10 May', weather: 'sunny' },
    { id: 3, name: 'Edinburgh', date: '15 May', weather: 'sunny' },
  ]);

  return (
    <View style={styles.container}>
      <TripHeader onEdit={() => console.log('Edit cities/dates pressed')} />
      
      <View style={styles.carIconContainer}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={40} color="white" />
        </View>
        <View style={styles.carIcon}>
          {/* You would use an actual car image here */}
          <View style={styles.car}></View>
        </View>
        <View style={styles.editButtons}>
          <TouchableOpacity style={styles.circleButton}>
            <Ionicons name="sunny" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <Ionicons name="pencil" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.citiesList}>
        {cities.map(city => (
          <CityCard 
            key={city.id}
            cityName={city.name}
            date={city.date}
            weather={city.weather}
          />
        ))}
      </ScrollView>
      
      <WeatherMapToggle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3E8', // Light beige background from the design
    padding: 16,
  },
  carIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  checkCircle: {
    position: 'absolute',
    left: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8CD867', // Green color from design
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  carIcon: {
    width: 200,
    height: 100,
    backgroundColor: '#5571D1', // Blue color from design
    borderRadius: 20,
    marginLeft: 40,
  },
  car: {
    // Simplified car representation - would be an actual image
  },
  editButtons: {
    position: 'absolute',
    right: 10,
    top: -20,
    flexDirection: 'row',
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F9B233', // Yellow/orange from design
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  citiesList: {
    flex: 1,
  },
});

export default HomeScreen;
