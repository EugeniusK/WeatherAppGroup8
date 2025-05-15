import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CityCardProps {
  cityName: string;
  date: string;
  weather: string;
}

const CityCard: React.FC<CityCardProps> = ({ cityName, date, weather }) => {
  return (
    <View style={styles.container}>
      <View style={styles.weatherIcon}>
        <Ionicons name="sunny-outline" size={24} color="black" />
      </View>
      <View style={styles.cityInfo}>
        <Text style={styles.cityName}>{cityName}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3E8', // Light beige
    borderRadius: 25,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#E8E6D9', // Slightly darker border
  },
  weatherIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityInfo: {
    flex: 1,
    marginLeft: 10,
  },
  cityName: {
    fontSize: 16,
    fontWeight: '500',
  },
  dateContainer: {
    backgroundColor: '#3066F1', // Blue color from design
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dateText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default CityCard;