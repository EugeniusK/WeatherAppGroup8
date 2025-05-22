import React from "react";
import { AppProvider } from "../utils/context";
import SettingsPage from "./SettingsPage";

export default function RootLayout() {

  return (
    <AppProvider>
      <SettingsPage />
    </AppProvider>
  );
}
