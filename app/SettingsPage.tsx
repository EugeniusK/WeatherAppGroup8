import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ToggleGroup from "@/components/ToggleSwitch";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
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
      padding: 16,
      flex: 0.75,
    },
    titleContainer: {
      padding: 16,
      flex: 2,
    },

    settingsContainer: {
      padding: 16,
    },

    safe: {
      color: "black",
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView type="foreground" style={styles.headerContainer}>
          <View style={styles.backContainer}>
            <ThemedText type="title">test</ThemedText>
          </View>
          <View style={styles.titleContainer}>
            <ThemedText type="title">Setting</ThemedText>
          </View>
        </ThemedView>
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
