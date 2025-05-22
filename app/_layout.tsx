import { useRouter } from "expo-router";
// import SettingsPage from "./SettingsPage";
import React from "react";
import SearchPage from "./SearchPage";

export default function RootLayout() {
  const router = useRouter();
  return (
    // <div>
    <SearchPage />
    // {/* <Button onPress={() => router.navigate("/MapPage")}>Maps</Button> */}
    // </div>
  );
}
