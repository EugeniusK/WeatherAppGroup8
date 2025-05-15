import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  activeButton: { backgroundColor: "#012" },
  activeText: { color: "#FFF" },
  settingContainer: {
    padding: 16,
    flexDirection: "row",
  },
  textContainer: {
    flex: 0.75,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#EEE",
  },
  toggleContainer: {
    flex: 2,
    flexDirection: "row",
    borderRadius: 14,
    backgroundColor: "#bbb",
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    backgroundColor: "#ddd",
  },
  toggleButtonLeft: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  toggleButtonRight: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  toggleButtonText: {
    textAlign: "center",
    color: "000",
  },
});
const ToggleSwitch = ({ label, selected, options, onChange }) => (
  <View style={styles.settingContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.toggleButtonText}>{label}</Text>
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
              <Text
                style={[
                  styles.toggleButtonText,
                  selected === option && styles.activeText,
                ]}
              >
                {option}
              </Text>
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
              <Text
                style={[
                  styles.toggleButtonText,
                  selected === option && styles.activeText,
                ]}
              >
                {option}
              </Text>
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
              <Text
                style={[
                  styles.toggleButtonText,
                  selected === option && styles.activeText,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        }
      })}
    </View>
  </View>
);

export default ToggleSwitch;
