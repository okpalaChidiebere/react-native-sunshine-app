/*
AsyncStorage is a simple, unencrypted, asynchronous, persistent, 
key-value storage system that is global to the app. It should 
be used instead of LocalStorage.
This fits just fine for how we want our app preferences to be stored and accessed by key-value!
*/
import AsyncStorage from "@react-native-async-storage/async-storage" //https://react-native-async-storage.github.io/async-storage/docs/install
import { pref_location_label, pref_units_label, pref_location_default,
    pref_units_imperial, pref_units_metric, pref_units_key, pref_location_key, 
    pref_enable_notifications_key, pref_enable_notifications_label, pref_enable_notifications_false, 
    pref_enable_notifications_true, pref_last_notification } from "../res/values/strings"


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
    return results && JSON.parse(results)[pref_location_key] ? JSON.parse(results)[pref_location_key] : getDefaultWeatherLocation()
}

/**
* Returns true if the user has selected metric temperature display.
*
* @return true If metric display should be used
*/
export const isMetric = async () => {
    const results =  await AsyncStorage.getItem(SUNSHINE_PREFERENCES_ASYNCSTORAGE_KEY)
    let userPrefersMetric = false

    if( results && (JSON.parse(results)[pref_units_key]  === pref_units_metric) ){
        userPrefersMetric = true
    } 

    return userPrefersMetric
}

const getDefaultWeatherLocation = () => {
    return DEFAULT_WEATHER_LOCATION
}

/**
* Returns true if the user prefers to see notifications from Sunshine, false otherwise. This
* preference can be changed by the user within the SettingsFragment.
*
* @return true if the user prefers to see notifications, false otherwise. Default value is true
*if the user just downloaded the sunshine app
*/
export const areNotificationsEnabled = async () => {
    const results =  await AsyncStorage.getItem(SUNSHINE_PREFERENCES_ASYNCSTORAGE_KEY)

    if(!results) return true

    const b = JSON.parse(results)

    return b?.[pref_enable_notifications_key]??true
}

/**
* Saves the time that a notification is shown. This will be used to get the ellapsed time
* since a notification was shown.
*
* @param timeOfNotification Time of last notification to save (in ISO 8601 format)
*/
export const saveLastNotificationTime = async (timeOfNotification) => {
    return AsyncStorage.mergeItem(SUNSHINE_PREFERENCES_ASYNCSTORAGE_KEY, JSON.stringify({
        [pref_last_notification]: timeOfNotification
    }))
}

/**
* Returns the last time that a notification was shown (eg: 2021-06-13T23:36:58-06:00)
*
* @return time of when the last notification was shown (in ISO 8601 format)
*/
export const getLastNotificationTime = async () => {
    const results =  await AsyncStorage.getItem(SUNSHINE_PREFERENCES_ASYNCSTORAGE_KEY)

    /*
    * Here, we retrieve the time in milliseconds when the last notification was shown. If
    * SharedPreferences doesn't have a value for lastNotificationKey, we return 0. The reason
    * we return 0 is because we compare the value returned from this method to the current
    * system time. If the difference between the last notification time and the current time
    * is greater than one day, we will show a notification again. When we compare the two
    * values, we subtract the last notification time from the current system time. If the
    * time of the last notification was 0, the difference will always be greater than the
    * number of milliseconds in a day and we will show another notification.
    */
    return results && JSON.parse(results)[pref_last_notification] != null ? JSON.parse(results)[pref_last_notification] : ''
}

export function submitPerference({ key, value }) {
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
            unit: await isMetric() ? pref_units_metric : pref_units_imperial, //
            entries: [pref_units_metric, pref_units_imperial],
            entryValues: [pref_units_metric, pref_units_imperial],
        },
        {
            title : pref_enable_notifications_label,
            prefKey: pref_enable_notifications_key,
            value: await areNotificationsEnabled(),  //default value will be true if areNotificationsEnabled() method return null or undefined
            summaryOff: pref_enable_notifications_false,
            summaryOn : pref_enable_notifications_true
        },
    ]


    return info
}
