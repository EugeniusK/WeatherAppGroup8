import { searchLocation } from './geolocation';
import { getHourlyWeatherForLocation } from './weather';

var locs = await searchLocation("cambridge");
console.log(`Got ${locs.length} locations`);
var loc = locs[0];
console.log(`Using location ${loc.display_name}`);

var weather = await getHourlyWeatherForLocation(loc);
console.dir(weather)