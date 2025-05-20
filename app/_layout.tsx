import { useRouter } from "expo-router";
import MapPage from "./MapPage";
import React from "react";

export default function RootLayout() {
  const router = useRouter();
  return (
    <div>
      <MapPage />
      {/* Uncomment the following Button if you want to navigate to the MapPage in the future */}
      {/* <Button onPress={() => router.navigate("/MapPage")}>Maps</Button> */}
    </div>
  );
}
