import React from "react";
import { useRouter } from "expo-router";
import { AppProvider } from "../utils/context";
import SettingsPage from "./SettingsPage";

export default function RootLayout() {

  return (
    <AppProvider>
      <SettingsPage />
    </AppProvider>
  );
}
