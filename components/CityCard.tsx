import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

interface CityCardProps {
  cityName: string;
  date: string;
  weather: string;
  onDelete: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ cityName, date, weather, onDelete }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const isOpen = useRef(false);

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationX } = event.nativeEvent;
    // Limit the translation to between 0 and -75
    const newX = Math.max(-75, Math.min(0, translationX));
    translateX.setValue(newX);
  };

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === 4) { // END state
      const { translationX } = event.nativeEvent;
      
      if (translationX < -37.5) { // If swiped left more than halfway
        isOpen.current = true;
        Animated.spring(translateX, {
          toValue: -75,
          useNativeDriver: true,
        }).start();
      } else {
        isOpen.current = false;
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.deleteButton}>
          <TouchableOpacity onPress={onDelete} style={styles.deleteCircle}>
            <Ionicons name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View style={[styles.cardContent, {
            transform: [{ translateX }]
          }]}>
            <View style={styles.weatherIcon}>
              <Ionicons name="sunny-outline" size={24} color="black" />
            </View>
            <View style={styles.cityInfo}>
              <Text style={styles.cityName}>{cityName}</Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{date}</Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3E8',
    borderRadius: 25,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E8E6D9',
  },
  deleteButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -25 }],
    zIndex: -1,
  },
  deleteCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#3066F1',
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