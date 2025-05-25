<<<<<<< HEAD
// import SettingsPage from "./SettingsPage";
import React from "react";
import SearchPage from "./SearchPage";
=======
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DestinationDetailsPage from "./DestinationDetailsPage";
import HomeScreen from "./HomeScreen";
import MapPage from "./MapPage";
import SettingsPage from "./SettingsPage";

const Stack = createStackNavigator();
>>>>>>> 4ab3e0360438ee421debaed9e7f048e7153b1d17

export default function RootLayout() {
  return (
<<<<<<< HEAD
    // <div>
    <SearchPage />
    // {/* <Button onPress={() => router.navigate("/MapPage")}>Maps</Button> */}
    // </div>
=======
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
        <Stack.Screen name="DestinationDetailsPage" component={DestinationDetailsPage} />
      </Stack.Navigator>
    </GestureHandlerRootView>
>>>>>>> 4ab3e0360438ee421debaed9e7f048e7153b1d17
  );
}
