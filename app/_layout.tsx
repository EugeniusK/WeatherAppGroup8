import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import HomeScreen from "./HomeScreen";
import MapPage from "./MapPage";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapPage} />
    </Stack.Navigator>
  );
}
