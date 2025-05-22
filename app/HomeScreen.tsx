import { Ionicons } from '@expo/vector-icons';
import React, { JSX, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import CityCard from '../components/CityCard';
import WeatherMapToggle from '../components/WeatherMapToggle';

interface City {
    id: number;
    name: string;
    date: string;
    weather: string;
}

// TODO:
// - want clicking on a city to open the page with City
// - want icons to Update
// - want to link buttons to other pages
// -want to get data from API

//example data -- get from json data file 
const HomeScreen = (): JSX.Element => {
    const [cities, setCities] = useState<City[]>([
      { id: 1, name: 'Cambridge', date: '9 May', weather: 'sunny' },
      { id: 2, name: 'Birmingham', date: '10 May', weather: 'sunny' },
      { id: 3, name: 'Edinburgh', date: '15 May', weather: 'sunny' },
    ]);
  
    return (
      <View style={styles.container}>
       {/* <TripHeader onEdit={() => console.log('Edit cities/dates pressed')} />  */}
        
        <View style={styles.carIconContainer}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={100} color="white" />
          </View>
          <View style={styles.carIcon}>
  
            <View style={styles.car}>
            <Image
              source={require('../assets/images/car.png')}
              style={styles.localImage}
              />
            </View>
          </View>
          <View style={styles.editButtons}>
            <TouchableOpacity style={styles.circleButton}>
              <Ionicons name="settings" size={24} color="white" />
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
      paddingTop: 20,     // Reduced from 40
      paddingBottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 0,  // Removed vertical margin completely
      position: 'relative',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      backgroundColor: 'transparent',
      padding: 4,
      borderRadius: 8,
    },
    checkCircle: {
      position: 'absolute',
      left: -10,          // Changed from -20 to 10 for slight right adjustment
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: '#8CD867',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    carIcon: {
      width: 300,
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 300,    // Increased from 200 to push further right
    },
    car: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editButtons: {
      position: 'absolute',
      right: 10,
      top: 20,           // Changed from -20 to move buttons down
      flexDirection: 'row',
    },
    circleButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#F9B233',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    citiesList: {
      flex: 1,
      marginTop: -20,    // Added negative margin to pull cities up
    },
    localImage: {
      width: 300,      // Doubled from 150
      height: 300,     // Doubled from 150
      resizeMode: 'contain',
    },
  });
  
  export default HomeScreen;
  