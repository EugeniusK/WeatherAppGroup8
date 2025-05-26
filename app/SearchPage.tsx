import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { AppContext, TripDestination } from "../utils/context";
import { searchLocation } from "../utils/geolocation";
import { getHourlyWeatherForLocation } from "../utils/weather";

type RootStackParamList = {
  Home: {
    newCity?: {
      name: string;
      date: string;
      weather: string;
    };
  };
  Search: {
    editMode?: boolean;
    cityId?: number;
    initialCity?: {
      name: string;
      date: string;
      weather: string;
    };
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'Search'>;

let debounceTimer: ReturnType<typeof setTimeout>;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  return `${day} ${month}`;
};

const extractCityName = (fullLocation: string): string => {
  return fullLocation.split(',')[0].trim();
};

export default function SearchPage() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const isEditMode = route.params?.editMode || false;
  const initialCity = route.params?.initialCity;

  // get global context
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within an AppProvider");
  }

  const { globalState, setGlobalState } = context;
  
  const [searchText, setSearchText] = useState("");
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState(initialCity?.name || "");
  const [selectedDate, setSelectedDate] = useState(initialCity?.date || "");
  const [calendarVisible, setCalendarVisible] = useState(false);

  useEffect(() => {
    if (isEditMode && initialCity) {
      setSearchText(initialCity.name);
    }
  }, [isEditMode, initialCity]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        const results = await searchLocation(text);
        setFilteredLocations(results.map((r) => r.display_name));
      } catch (error) {
        console.error("Location search failed:", error);
        setFilteredLocations([]);
      }
    }, 500);
  };

  const handleConfirm = async () => {
    if (selectedLocation && selectedDate) {
      console.log("waiting");
      const selectedLocationExact = await searchLocation(selectedLocation)
      const weather = await getHourlyWeatherForLocation(selectedLocationExact[0], new Date(selectedDate), new Date(selectedDate));
      console.log("waiting done");

      const newTrip: TripDestination = {
        location: selectedLocation,
        date: selectedDate,
        weather: weather,
      };

      setGlobalState(prevState => ({
        ...prevState,
        tripDestinations: [...prevState.tripDestinations, newTrip],
      }));
      const cityData = {
        name: extractCityName(selectedLocation),
        date: formatDate(selectedDate),
        weather: 'sunny',
      };

      if (isEditMode && route.params?.cityId) {
        // Update existing city
        navigation.navigate('Home', {
          newCity: {
            ...cityData,
            id: route.params.cityId
          }
        });
      } else {
        // Add new city
        navigation.navigate('Home', {
          newCity: cityData
        });
      }
    } else {
      alert("Please select both a location and a date.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <Text style={styles.headerText}>
        {isEditMode ? 'Edit City' : 'Add New City'}
      </Text>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search location"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={handleSearch}
        />
        <Ionicons name="search" size={20} color="#444" style={styles.searchIcon} />
      </View>

      <View style={styles.contentContainer}>
        {/* Location Suggestions */}
        <FlatList
          data={filteredLocations}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.locationItem}
              onPress={() => setSelectedLocation(item)}
            >
              <Ionicons name="location" size={20} color="red" style={styles.icon} /> 
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationText}>{extractCityName(item)}</Text>
                <Text style={styles.locationDetails}>{item.substring(item.indexOf(',') + 1).trim()}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.noResults}>No results found</Text>}
          style={styles.suggestionsList}
        />

        {/* Selected Information */}
        {selectedLocation ? (
          <View style={styles.selectionDisplay}>
            <Text style={styles.selectionLabel}>Location:</Text>
            <Text style={styles.selectionValue}>{extractCityName(selectedLocation)}</Text>
            <Text style={styles.selectionDetails}>{selectedLocation.substring(selectedLocation.indexOf(',') + 1).trim()}</Text>
          </View>
        ) : null}

        {selectedDate ? (
          <View style={styles.selectionDisplay}>
            <Text style={styles.selectionLabel}>Date:</Text>
            <Text style={styles.selectionValue}>{formatDate(selectedDate)}</Text>
          </View>
        ) : null}

        {/* Date Picker Button */}
        <TouchableOpacity 
          style={styles.dateButton} 
          onPress={() => setCalendarVisible(true)}
        >
          <Text style={styles.dateButtonText}>Select Date</Text>
        </TouchableOpacity>

        {/* Confirm Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmText}>
            {isEditMode ? 'Update City' : 'Add City'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
      <Modal visible={calendarVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.calendarWrapper}>
            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
                setCalendarVisible(false);
              }}
              markedDates={{
                [selectedDate]: { selected: true, marked: true, selectedColor: "white" },
              }}
              theme={{
                calendarBackground: "#0033cc",
                dayTextColor: "white",
                monthTextColor: "white",
                arrowColor: "white",
                textSectionTitleColor: "white",
                todayTextColor: "lightblue",
                selectedDayTextColor: "black",
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1ebda",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  backButton: {
    backgroundColor: "#4e70db",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginLeft: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    borderRadius: 16,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    height: 50,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchIcon: {
    marginLeft: 8,
  },
  suggestionsList: {
    flex: 1,
    marginBottom: 10,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0ba42",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
    color: "#4e70db",
  },
  locationTextContainer: {
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    color: "#222",
    fontWeight: '500',
  },
  locationDetails: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  noResults: {
    textAlign: "center",
    marginTop: 10,
    color: "#888",
  },
  dateButton: {
    marginTop: 16,
    backgroundColor: "#f0ba42",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  dateButtonText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarWrapper: {
    backgroundColor: "#4e70db",
    borderRadius: 16,
    padding: 10,
    overflow: "hidden",
  },
  selectionDisplay: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
  },
  selectionLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  selectionValue: {
    fontSize: 16,
    color: "#222",
    marginTop: 4,
  },
  selectionDetails: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  confirmButton: {
    marginTop: 16,
    marginBottom: 20,
    backgroundColor: "#a0e778",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  confirmText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
});