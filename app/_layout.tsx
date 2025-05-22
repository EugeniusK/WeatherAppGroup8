import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from "./HomeScreen";
import MapPage from "./MapPage";
import SettingsPage from "./SettingsPage";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapPage} />
        <Stack.Screen name="Settings" component={SettingsPage} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
