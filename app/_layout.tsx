import { useRouter } from "expo-router";
// import SettingsPage from "./SettingsPage";
// import MapPage from "./MapPage";
import React from "react";
import DestinationDetailsPage from "./DestinationDetailsPage";

export default function RootLayout() {
  const router = useRouter();
  return (
    // <div>
    <DestinationDetailsPage />
    // {/* <Button onPress={() => router.navigate("/MapPage")}>Maps</Button> */}
    // </div>
  );
}
