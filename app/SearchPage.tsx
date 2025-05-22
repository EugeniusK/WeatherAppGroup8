import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { Calendar } from "react-native-calendars";
// import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router"; // for going back to previous page
import { searchLocation } from "../utils/geolocation";
let debounceTimer: NodeJS.Timeout; // for debouncing searching

// previously for testing
// const locationSuggestions = [
//   "Cambridge, England",
//   "Canterbury, England",
//   "Camberley, England",
//   "Camden, England",
// ];

export default function SearchPage() {
  const router = useRouter();
  
  // set usestates
  // const[variable, function to increment variable] = useState(initial value of variable)
  const [searchText, setSearchText] = useState("");
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]); // set initial state to empty list (of string type)
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarVisible, setCalendarVisible] = useState(false);

  // search function, pass input string into function that implements API request
  const handleSearch = (text: string) => {
    setSearchText(text);
  
    clearTimeout(debounceTimer); // rest debounce timer if user types

    debounceTimer = setTimeout(async () => {
      try {
        const results = await searchLocation(text); // pass into function that implemenets API function
        setFilteredLocations(results.map((r) => r.display_name)); // set list of location to results obtained from API function
      } catch (error) {
        console.error("Location search failed:", error);
        setFilteredLocations([]);
      }
    }, 500); //  adds 500 ms delay so that we only search 
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search location"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={handleSearch} // call the function handleSearch when input text changes
        />
        <Ionicons name="search" size={20} color="#444" style={styles.searchIcon} />
      </View>

      {/* Location Suggestions */}
      <FlatList
        data={filteredLocations}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.locationItem}
            onPress={() => setSelectedLocation(item)}
          >
            <Ionicons name="location" size={20} color="red" style={styles.icon} /> 
            <Text style={styles.locationText}>{item}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noResults}>No results found</Text>} // display No results found if list empty
      />

      {/* Selected Information */}
      {selectedLocation ? (
        <View style={styles.selectionDisplay}>
          <Text style={styles.selectionLabel}>Location:</Text>
          <Text style={styles.selectionValue}>{selectedLocation}</Text>
        </View>
      ) : null}

      {selectedDate ? (
        <View style={styles.selectionDisplay}>
          <Text style={styles.selectionLabel}>Date:</Text>
          <Text style={styles.selectionValue}>{selectedDate}</Text>
        </View>
      ) : null}

      {/* Date Picker Button */}
      <TouchableOpacity style={styles.dateButton} onPress={() => setCalendarVisible(true)}>
        <Text style={styles.dateButtonText}>Select Date</Text>
      </TouchableOpacity>

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

      {/* Confirm Button */}
      <TouchableOpacity
      style={styles.confirmButton}
      onPress={() => {
       if (selectedLocation && selectedDate) {
        // both are of string data type
        // console.log("Selected Location:", typeof selectedLocation);
        // console.log("Selected Date:", typeof selectedDate);

        router.navigate({
          pathname: '/MapPage',
          params: {location: typeof selectedLocation,
                   date: typeof selectedDate}
        }); // go back to Map Page
       } else {
        alert("Please select both a location and a date.");
       }
      }}
      >
    <Text style={styles.confirmText}>Confirm</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f1ebda",
  },
  backButton: {
    backgroundColor: "#4e70db",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9", 
    borderRadius: 16,
    paddingHorizontal: 12,
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
  locationText: {
    fontSize: 16,
    color: "#222",
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
  },
  confirmButton: {
    marginTop: 24,
    backgroundColor: "#a0e778",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  confirmText: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
  },
});