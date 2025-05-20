import { useRouter } from "expo-router";
import SettingsPage from "./SettingsPage";
// import MapPage from "./MapPage";
import React from "react";

export default function RootLayout() {
  const router = useRouter();
  return (
    // <div>
    <SettingsPage />
    // {/* <Button onPress={() => router.navigate("/MapPage")}>Maps</Button> */}
    // </div>
  );
}
