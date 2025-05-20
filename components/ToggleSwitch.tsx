import { Colors } from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
const styles = StyleSheet.create({
  activeButton: { backgroundColor: "#012" },
  activeText: { color: Colors.dark.text },
  settingContainer: {
    padding: 16,
    flexDirection: "row",
  },
  textContainer: {
    flex: 0.75,
    paddingHorizontal: 16,
    paddingVertical: 8,
    // backgroundColor: "#EEE",
  },
  toggleContainer: {
    flex: 2,
    flexDirection: "row",
    // borderRadius: 14,
    // backgroundColor: "#bbb",
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    backgroundColor: "#ddd",
    borderColor: "black",
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
  },
  toggleButtonLeft: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  toggleButtonRight: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderLeftWidth: 5,
    borderRightWidth: 5,
  },
  toggleButtonText: {
    textAlign: "center",
    color: "000",
  },
});
const ToggleSwitch = ({ label, selected, options, onChange }) => (
  <View style={styles.settingContainer}>
    <View style={styles.textContainer}>
      <ThemedText type="default" style={styles.toggleButtonText}>
        {label}
      </ThemedText>
    </View>
    <View style={styles.toggleContainer}>
      {options.map((option, index) => {
        if (index === 0) {
          return (
            <Pressable
              style={[
                styles.toggleButton,
                styles.toggleButtonLeft,
                selected === option && styles.activeButton,
              ]}
              onPress={() => onChange(option)}
              key={index}
            >
              <ThemedText
                type="default"
                style={[
                  styles.toggleButtonText,
                  selected === option && styles.activeText,
                ]}
              >
                {option}
              </ThemedText>
            </Pressable>
          );
        } else if (index === options.length - 1) {
          return (
            <Pressable
              style={[
                styles.toggleButton,
                styles.toggleButtonRight,
                selected === option && styles.activeButton,
              ]}
              onPress={() => onChange(option)}
              key={index}
            >
              <ThemedText
                type="default"
                style={[
                  styles.toggleButtonText,
                  selected === option && styles.activeText,
                ]}
              >
                {option}
              </ThemedText>
            </Pressable>
          );
        } else {
          return (
            <Pressable
              style={[
                styles.toggleButton,
                selected === option && styles.activeButton,
              ]}
              onPress={() => onChange(option)}
              key={index}
            >
              <ThemedText
                type="default"
                style={[
                  styles.toggleButtonText,
                  selected === option && styles.activeText,
                ]}
              >
                {option}
              </ThemedText>
            </Pressable>
          );
        }
      })}
    </View>
  </View>
);

export default ToggleSwitch;
