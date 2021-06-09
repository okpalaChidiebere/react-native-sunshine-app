/*
AsyncStorage is a simple, unencrypted, asynchronous, persistent, 
key-value storage system that is global to the app. It should 
be used instead of LocalStorage.
This fits just fine for how we want our app preferences to be stored and accessed by key-value!
*/
import AsyncStorage from "@react-native-async-storage/async-storage" //https://react-native-async-storage.github.io/async-storage/docs/install
import { pref_location_label, pref_units_label, pref_location_default,
    pref_units_imperial, pref_units_metric, pref_units_key, pref_location_key } from "../res/values/strings"


const DEFAULT_WEATHER_LOCATION = pref_location_default
// This will be the key used to access all our preferences
const SUNSHINE_PREFERENCES_ASYNCSTORAGE_KEY = "sunshine.preferences"


/**
* Returns the location currently set in Preferences. The default location this method
* will return is "94043,USA", which is Mountain View, California. Mountain View is the
* home of the headquarters of the Googleplex!
*
* @return Location The current user has set in SharedPreferences. Will default to
* "94043,USA" if SharedPreferences have not been implemented yet.
*/
export const getPreferredWeatherLocation = async () => {
    const results =  await AsyncStorage.getItem(SUNSHINE_PREFERENCES_ASYNCSTORAGE_KEY)
    return results != null ? JSON.parse(results)[pref_location_key] : getDefaultWeatherLocation()
}

/**
* Returns true if the user has selected metric temperature display.
*
* @return true If metric display should be used
*/
export  const isMetric = () => {
    /** This will be implemented in a future lesson **/
    return true
}

const getDefaultWeatherLocation = () => {
    return DEFAULT_WEATHER_LOCATION
}

export function submitPerference({ key, value }) {
    //console.log(key, value)
    return AsyncStorage.mergeItem(SUNSHINE_PREFERENCES_ASYNCSTORAGE_KEY, JSON.stringify({
      [key]: value
    }))
} 

export async function getSunshinePreferences(){
    // AsyncStorage.clear() //used to clear our preference storage. Used for Debugging

    /** This objects will have the properties that co-relates to the number of setting we want the user to configure */
    const info = [
        { //contains any information that will help us build the UI for our specific preference
            title: pref_location_label,
            prefKey: pref_location_key,
            value: await getPreferredWeatherLocation()
        }, 
        {
            title: pref_units_label,
            prefKey: pref_units_key,
            unit: isMetric() ? pref_units_metric : pref_units_imperial, //
            entries: [pref_units_metric, pref_units_imperial],
            entryValues: [pref_units_metric, pref_units_imperial],
        },
    ]


    return info
}
