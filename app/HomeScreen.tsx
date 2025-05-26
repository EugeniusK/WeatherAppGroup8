import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { JSX, useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CityCard from "../components/CityCard";
import WeatherMapToggle from "../components/WeatherMapToggle";
import { AppContext, City } from "../utils/context";
type RootStackParamList = {
  Home: {
    newCity?: {
      id?: number;
      name: string;
      date: string;
      weather: string;
    };
  };
  Map: undefined;
  Settings: undefined;
  Search: {
    editMode?: boolean;
    cityId?: number;
    initialCity?: {
      name: string;
      date: string;
      weather: string;
    };
  };
  DestinationDetailsPage: { cityName: string; date: string; weather: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, "Home">;

// TODO:
// - want clicking on a city to open the page with City
// - want icons to Update
// - want to link buttons to other pages
// -want to get data from API

//example data -- get from json data file
const HomeScreen = (): JSX.Element => {
  // get global context
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { globalState, setGlobalState } = context;
  console.log(globalState);
  const [cities, setCities] = useState<City[]>(
    globalState["tripDestinationsHomePage"]
  );

  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();

  // Animation values
  const checkmarkScale = useRef(new Animated.Value(1)).current;
  const carRotate = useRef(new Animated.Value(0)).current;
  const [showTripStatus, setShowTripStatus] = useState(false);

  const animateCheckmark = () => {
    Animated.sequence([
      Animated.spring(checkmarkScale, {
        toValue: 1.2,
        useNativeDriver: true,
        tension: 40,
        friction: 3,
      }),
      Animated.spring(checkmarkScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 40,
        friction: 5,
      }),
    ]).start();
  };

  const animateCar = () => {
    Animated.sequence([
      Animated.timing(carRotate, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(carRotate, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (route.params?.newCity) {
      const { id, name, date, weather } = route.params.newCity;

      if (id) {
        // Update existing city
        setCities((currentCities) =>
          currentCities.map((city) =>
            city.id === id ? { ...city, name, date, weather } : city
          )
        );

        setGlobalState((prevState) => ({
          ...prevState,
          tripDestinationsHomePage: prevState.tripDestinationsHomePage.map(
            (city) => (city.id === id ? { ...city, name, date, weather } : city)
          ),
        }));
      } else {
        // Add new city
        console.log("add");
        const newId = Math.max(...cities.map((c) => c.id), 0) + 1;
        setCities((currentCities) => [
          ...currentCities,
          { id: newId, name, date, weather },
        ]);
        setGlobalState((prevState) => ({
          ...prevState,
          tripDestinationsHomePage: [
            ...prevState.tripDestinationsHomePage,
            { id: newId, name, date, weather },
          ],
        }));
      }
    }
  }, [route.params?.newCity]);

  const handleEditCity = (cityId: number) => {
    const cityToEdit = cities.find((c) => c.id === cityId);
    if (cityToEdit) {
      navigation.navigate("Search", {
        editMode: true,
        cityId: cityId,
        initialCity: {
          name: cityToEdit.name,
          date: cityToEdit.date,
          weather: cityToEdit.weather,
        },
      });
    }
  };

  const spin = carRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* <TripHeader onEdit={() => console.log('Edit cities/dates pressed')} />  */}

      <View style={styles.carIconContainer}>
        <TouchableOpacity
          onPress={animateCheckmark}
          activeOpacity={0.8}
          style={styles.checkCircle}
        >
          <Animated.View style={[{ transform: [{ scale: checkmarkScale }] }]}>
            <Ionicons name="checkmark" size={100} color="white" />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={animateCar}
          activeOpacity={0.8}
          style={styles.carIcon}
        >
          <Animated.View
            style={[styles.car, { transform: [{ rotate: spin }] }]}
          >
            <Image
              source={require("../assets/images/car.png")}
              style={styles.localImage}
            />
          </Animated.View>
        </TouchableOpacity>

        <View style={styles.editButtons}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons name="settings" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton}>
            <Ionicons name="pencil" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View
        style={[
          styles.statusContainer,
          {
            transform: [{ scale: checkmarkScale }],
          },
        ]}
      >
        <Text style={styles.weatherText}>
          {cities.length > 0
            ? "Weather is suitable for a trip!"
            : "Add some destinations to check trip status"}
        </Text>
      </Animated.View>

      <View style={styles.citiesSection}>
        <ScrollView style={styles.citiesList}>
          {cities
            .slice()
            .sort((a, b) => {
              const dateA = new Date(a.date.replace(" ", " 2024 "));
              const dateB = new Date(b.date.replace(" ", " 2024 "));
              return dateA.getTime() - dateB.getTime();
            })
            .map((city) => (
              <CityCard
                key={city.id}
                cityName={city.name}
                date={city.date}
                weather={city.weather}
                onDelete={() => {
                  setCities((prevCities) => {
                    const updatedCities = prevCities.filter(
                      (c) => c.id !== city.id
                    );
                    console.log(
                      "Deleting city:",
                      city.id,
                      "Updated cities:",
                      updatedCities
                    );
                    return updatedCities;
                  });

                  setGlobalState((prevState) => ({
                    ...prevState,
                    tripDestinationsHomePage:
                      prevState.tripDestinationsHomePage.filter(
                        (c) => c.id !== city.id
                      ),
                  }));
                }}
                onEdit={() => handleEditCity(city.id)}
              />
            ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Search", {})}
        >
          <View style={styles.addButtonContent}>
            <Ionicons name="add" size={24} color="#3066F1" />
            <Text style={styles.addButtonText}>Add New City</Text>
          </View>
        </TouchableOpacity>

        <WeatherMapToggle currentPage="Home" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3E8", // Light beige for top section
    padding: 16,
  },
  carIconContainer: {
    paddingTop: 40,
    paddingBottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    position: "relative",
    backgroundColor: "#F5F3E8",
    padding: 4,
  },
  checkCircle: {
    position: "absolute",
    left: -10, // Changed from -20 to 10 for slight right adjustment
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#8CD867",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  carIcon: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 300, // Increased from 200 to push further right
  },
  car: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editButtons: {
    position: "absolute",
    right: 10,
    top: 20, // Changed from -20 to move buttons down
    flexDirection: "row",
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F9B233",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  citiesSection: {
    flex: 1,
    backgroundColor: "#d9d9d9",
    marginTop: 0, // Changed from -30 to 0 to move section down
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: -16,
    paddingTop: 20,
  },
  weatherText: {
    color: "#8CD867",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  citiesList: {
    flex: 1,
    marginTop: 10,
  },
  localImage: {
    width: 300, // Doubled from 150
    height: 300, // Doubled from 150
    resizeMode: "contain",
  },
  addButton: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  addButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F3E8",
    borderRadius: 25,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E8E6D9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    justifyContent: "center",
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#3066F1",
  },
  statusContainer: {
    backgroundColor: "rgba(140, 216, 103, 0.2)",
    borderRadius: 15,
    padding: 10,
    marginTop: -50,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
