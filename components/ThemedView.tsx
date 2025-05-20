import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, type ViewProps } from "react-native";
export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  type = "background",
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    type
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;

  // return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
