import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from '../utils/context';
import DestinationDetailsPage from "./DestinationDetailsPage";
import HomeScreen from "./HomeScreen";
import MapPage from "./MapPage";
import SearchPage from "./SearchPage";
import SettingsPage from "./SettingsPage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Hide the default tab bar
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapPage} />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator 
          initialRouteName="MainTabs"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="Settings" component={SettingsPage} />
          <Stack.Screen name="Search" component={SearchPage} />
          <Stack.Screen name="DestinationDetailsPage" component={DestinationDetailsPage} />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </AppProvider>
  );
}
