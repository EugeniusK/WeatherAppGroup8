import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';

type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  Settings: undefined;
  Search: undefined;
  DestinationDetailsPage: { cityName: string; date: string; weather: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface CityCardProps {
  cityName: string;
  date: string;
  weather: string;
  onDelete: () => void;
  onEdit: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ cityName, date, weather, onDelete, onEdit }) => {
  const navigation = useNavigation<NavigationProp>();
  const translateX = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);

  const resetPosition = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      tension: 40,
      friction: 7,
      velocity: 1
    }).start(() => {
      setIsAnimating(false);
    });
  };

  const animateToPosition = (toValue: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    Animated.sequence([
      Animated.spring(translateX, {
        toValue,
        useNativeDriver: true,
        tension: 40,
        friction: 7,
        velocity: 1
      }),
      Animated.delay(150),
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        tension: 40,
        friction: 7,
        velocity: 1
      })
    ]).start(() => {
      setIsAnimating(false);
    });
  };

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    if (isAnimating) return;

    const { translationX } = event.nativeEvent;
    // Allow translation between -75 (left swipe) and 75 (right swipe)
    const newX = Math.max(-75, Math.min(75, translationX));
    translateX.setValue(newX);
  };

  const handleDelete = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    Animated.spring(translateX, {
      toValue: -75,
      useNativeDriver: true,
      tension: 40,
      friction: 7
    }).start(() => {
      setIsAnimating(false);
      onDelete();
    });
  };

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (isAnimating) return;

    if (event.nativeEvent.state === State.END) {
      const { translationX, velocityX } = event.nativeEvent;
      
      // Use velocity to help determine swipe direction
      const isQuickSwipe = Math.abs(velocityX) > 500;
      const swipeThreshold = isQuickSwipe ? 20 : 37.5;
      
      if (translationX < -swipeThreshold || (isQuickSwipe && velocityX < 0)) {
        // Swipe left - delete
        handleDelete();
      } else if (translationX > swipeThreshold || (isQuickSwipe && velocityX > 0)) {
        // Swipe right - edit
        animateToPosition(75);
        setTimeout(() => {
          if (!isAnimating) {
            onEdit();
          }
        }, 150);
      } else {
        resetPosition();
      }
    } else if (event.nativeEvent.state === State.CANCELLED) {
      resetPosition();
    }
  };

  const handlePress = () => {
    if (!isAnimating) {
      navigation.navigate('DestinationDetailsPage', { 
        cityName,
        date,
        weather
      });
    }
  };

  const handleEdit = () => {
    if (!isAnimating) {
      onEdit();
    }
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.deleteButton}>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteCircle}>
            <Ionicons name="trash" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.editButton}>
          <TouchableOpacity onPress={handleEdit} style={styles.editCircle}>
            <Ionicons name="pencil" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
          activeOffsetX={[-15, 15]}
        >
          <Animated.View style={[styles.cardContent, {
            transform: [{ translateX }]
          }]}>
            <TouchableOpacity 
              onPress={handlePress} 
              style={styles.cardTouchable}
              activeOpacity={0.7}
            >
              <View style={styles.weatherIcon}>
                <Ionicons name="sunny-outline" size={24} color="black" />
              </View>
              <View style={styles.cityInfo}>
                <Text style={styles.cityName}>{cityName}</Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{date}</Text>
              </View>
            </TouchableOpacity>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  deleteButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -25 }],
    zIndex: -1,
  },
  editButton: {
    position: 'absolute',
    left: 20,
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
  editCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F9B233',
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
  cardTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});

export default CityCard;