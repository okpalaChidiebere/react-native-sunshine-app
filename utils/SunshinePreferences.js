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
    /** This will be implemented in a future lesson **/
     return getDefaultWeatherLocation();
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
