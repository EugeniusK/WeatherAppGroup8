/* Using this global state:
ANYPage.tsx
import { AppContext } from '../AppContext';

export default function ANYPage() {
  const context = useContext(AppContext)!;
  const { globalState, setGlobalState } = context;

  // Use globalState or setGlobalState here
}
*/

import React, { createContext, useState } from 'react';
import { HourlyWeatherData } from './weather';
export interface TripDestination {
  location: string;
  date: string; // yyyy-mm-dd
  latitude: number;
  longitude: number;
  weather: HourlyWeatherData[] // 24 hour weather data
}


export interface City {
    id: number;
    name: string;
    date: string;
    weather: string;
}
export interface Settings {
  units: 'celsius' | 'fahrenheit';
  contrast: 'normal' | 'high';
  textSize: 'small' | 'medium' | 'large';
  offlineAccess: boolean;
}

export interface GlobalState {
  tripDestinations: TripDestination[];
  settings: Settings;
  tripDestinationsHomePage: City[];
}

type AppContextType = {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [globalState, setGlobalState] = useState<GlobalState>({
    tripDestinations: [],
    settings: {
      units: 'celsius',
      contrast: 'normal',
      textSize: 'medium',
      offlineAccess: false
    },
    tripDestinationsHomePage: []
  });


  return (
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </AppContext.Provider>
  );
}
