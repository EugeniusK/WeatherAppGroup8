import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Map: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface WeatherMapToggleProps {
  currentPage: 'Home' | 'Map';
}

const WeatherMapToggle: React.FC<WeatherMapToggleProps> = ({ currentPage }) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate(currentPage === 'Home' ? 'Map' : 'Home');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={handlePress}>
        <View style={[styles.iconContainer, currentPage === 'Home' && styles.activeYellow]}>
          <Ionicons name="sunny" size={32} color="white" />
        </View>
        <View style={[styles.iconContainer, currentPage === 'Map' && styles.activeYellow]}>
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
    backgroundColor: '#3066F1',
    borderRadius: 40,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8, // for Android
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeYellow: {
    backgroundColor: '#F9B233',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // for Android
  },
});

export default WeatherMapToggle;