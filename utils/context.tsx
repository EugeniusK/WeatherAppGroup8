/* Using this global state:
ANYPage.tsx
import { AppContext } from '../AppContext';

export default function ANYPage() {
  const context = useContext(AppContext)!;
  const { globalState, setGlobalState } = context;

  // Use globalState or setGlobalState here
}
*/

import React, { createContext, useEffect, useState } from 'react';
import { searchLocation } from './geolocation';
import { getHourlyWeatherForLocation } from './weather';

export interface TripDestination {
  location: string;
  date: string; // yyyy-mm-dd
  weather: HourlyWeatherData[] // 24 hour weather data
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
    }
  });

  // Fill in globalState with some example data
  useEffect(() => {
    (async () => {
      const location = await searchLocation('Cambridge');
      const date = new Date();
      const weather = await getHourlyWeatherForLocation(location[0], date, date);
      
      setGlobalState({
        ...globalState,
        tripDestinations: [
          {
            location: location[0].display_name,
            date: date.toISOString().split('T')[0],
            weather: weather
          }
        ]
      })
    })();
  })

  return (
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </AppContext.Provider>
  );
}
