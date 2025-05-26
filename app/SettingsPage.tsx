import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ToggleGroup from "@/components/ToggleSwitch";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  Settings: undefined;
  DestinationDetailsPage: { cityName: string };
};
type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function SettingsPage() {
  const [unit, setUnit] = useState("Celcius");
  const [contrast, setContrast] = useState("Normal");
  const [textSize, setTextSize] = useState("Medium");
  const [offlineAccess, setOffineAccess] = useState("Enabled");

  const styles = StyleSheet.create({
    headerContainer: {
      height: 100,
      padding: 16,
      flexDirection: "row",
    },
    backContainer: {
      padding: 10,
      flex: 0.75,
      justifyContent:"center",
      alignItems: 'center'
    },
    titleContainer: {
      padding: 16,
      flex: 2,
    },

    settingsContainer: {
      flex: 1,
      marginTop: -50, // Changed from -30 to 0 to move section down
      marginHorizontal: -16,
      paddingHorizontal: 16,
      paddingBottom: 32,
      marginBottom: -16,
      paddingTop: 20,
    },

    safe: {
      color: "red",
    },
    backButton: {
      backgroundColor: "rgb(51, 102, 255)",
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,
      // marginBottom: 16,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
    container: {
      flex: 1,
      backgroundColor: "#F2EBD8", // Light beige for top section
      padding: 16,
    },
  });
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ThemedView type="foreground" style={styles.headerContainer}>
          <View style={styles.backContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <ThemedText type="title">Settings</ThemedText>
          </View>
        </ThemedView>
      </SafeAreaView>

      <ThemedView type="background" style={styles.settingsContainer}>
        <ToggleGroup
          label="Units"
          selected={unit}
          options={["Celcius", "Fahrenheit"]}
          onChange={setUnit}
        ></ToggleGroup>

        <ToggleGroup
          label="Contrast"
          selected={contrast}
          options={["Normal", "High"]}
          onChange={setContrast}
        ></ToggleGroup>

        <ToggleGroup
          label="Text Size"
          selected={textSize}
          options={["Small", "Medium", "Large"]}
          onChange={setTextSize}
        ></ToggleGroup>

        <ToggleGroup
          label="Offline Access"
          selected={offlineAccess}
          options={["Enabled", "Disabled"]}
          onChange={setOffineAccess}
        ></ToggleGroup>
      </ThemedView>
    </View>
  );
}
