import { useState } from "react";
import { Pressable, Switch, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function SettingsPage() {
  const [unit, setUnit] = useState("celcius");
  let textUnit = "celcius";
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Pressable
          onPress={() => {
            setUnit((current) => {
              if (current === "celcius") {
                return "fahrenheit";
              } else {
                return "celcius";
              }
            });
          }}
        >
          <Text>{unit}</Text>
        </Pressable>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </SafeAreaView>
    </SafeAreaProvider>

    // <SafeAreaProvider>
    //   <SafeAreaView>
    //     <Pressable
    //       onPress={() => {
    //         setTimesPressed((current) => current + 1);
    //       }}
    //       style={({ pressed }) => [
    //         {
    //           backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
    //         },
    //       ]}
    //     >
    //       {({ pressed }) => <Text>{pressed ? "Pressed!" : "Press Me"}</Text>}
    //     </Pressable>
    //     <View>
    //       <Text testID="pressable_press_console">{textLog}</Text>
    //     </View>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}
