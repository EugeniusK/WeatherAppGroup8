import { useRouter } from "expo-router";
import MapPage from "./MapPage";

export default function RootLayout() {
  const router = useRouter();
  return (
    <div>
      <MapPage />
      {/* <Button onPress={() => router.navigate("/MapPage")}>Maps</Button> */}
    </div>
  );
}
