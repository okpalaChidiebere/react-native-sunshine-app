import { pref_location_label, pref_units_label, pref_location_default,
    pref_units_imperial, pref_units_metric } from "../res/values/strings"

/*
 * Before you implement methods to return your REAL preference for location,
 * we provide some default values to work with.
 */
const DEFAULT_WEATHER_LOCATION = "94043,USA"


/**
* Returns the location currently set in Preferences. The default location this method
* will return is "94043,USA", which is Mountain View, California. Mountain View is the
* home of the headquarters of the Googleplex!
*
* @return Location The current user has set in SharedPreferences. Will default to
* "94043,USA" if SharedPreferences have not been implemented yet.
*/
export const getPreferredWeatherLocation = async () => {
    // This will be implemented in a future lesson 
     return getDefaultWeatherLocation();
}

export const getPreferredWeatherLocationNonAsync = () => {
    /** This will be implemented in a future lesson **/
     return pref_location_default;
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
    /** This will be implemented in a future lesson **/
    return DEFAULT_WEATHER_LOCATION
}

/**
 * In future lessons, this will be called by redux and we will make this function 
 * asynchronous due to it has to commnicate with AsyncStorage so we can wait for 
 * functions that returns promises
 * 
 * All the function we called in here are not async. This is good for mock preference for now
 */
export function getSunshinePreferences(preference){

    /** This objects will have the properties that co-relates to the number of setting we want the user to configure */
    const info = {
        location: { //contains any information that will help us build the UI for our specific preference
            title: pref_location_label,
           // defaultValue: pref_location_default,
            value: getPreferredWeatherLocationNonAsync() || pref_location_default, //we will get this value from AsyncStorage later which will be a boolean just like we did for temperature_units.unit
        }, 
        units: {
            title: pref_units_label,
            unit: isMetric() ? pref_units_metric : pref_units_imperial, //
            entries: [pref_units_metric, pref_units_imperial],
            entryValues: [pref_units_metric, pref_units_imperial],
        },
    }

    return typeof preference === 'undefined'
    ? info
    : info[preference]
}
