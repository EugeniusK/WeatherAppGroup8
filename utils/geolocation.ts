export interface LocationResult {
  lat: string;
  lon: string;
  display_name: string;
  type: string;
}

export const searchLocation = async (location: string): Promise<LocationResult[]> => {
  try {
    const query = encodeURIComponent(location);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'WeatherApp8/1.0 (hello@its.me)',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LocationResult[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
};

