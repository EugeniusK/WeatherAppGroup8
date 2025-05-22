import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
    Map: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

const WeatherMapToggle = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={() => navigation.navigate('Map')}>
        <View style={styles.sunIcon}>
          <Ionicons name="sunny" size={32} color="white" />
        </View>
        <View style={styles.mapIcon}>
          <Ionicons name="map-outline" size={32} color="white" />
          
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
    borderRadius: 40,    // Increased from 30
    padding: 8,          // Increased from 5
  },
  sunIcon: {
    width: 60,          // Increased from 45
    height: 60,         // Increased from 45
    borderRadius: 30,   // Increased to match new size
    backgroundColor: '#F9B233', // Yellow/orange from design
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    width: 60,          // Increased from 45
    height: 60,         // Increased from 45
    borderRadius: 30,   // Increased to match new size
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WeatherMapToggle;