/**
* Used by SunshineWeatherUtils
*/

export const app_name = "Sunshine"

/**
 * By convention, "action" denotes that this String will be used as the label for an
 * Action, typically from the action bar.  The ActionBar is limited real estate, so
 * shorter is better.   
 */
export const action_map = "Map Location"
// Used to share the weather forecast on a given day from the ForecastDetails component
export const action_share = "Share"
// Used to open Settings Menu from Forcast and ForecastDetails components
export const action_settings = "Settings"

export const today = "Today"
export const tomorrow = "Tomorrow"
export const format_temperature_celsius = (temp) => `${temp.toFixed(0)}\u00B0`
export const format_temperature_fahrenheit = (temp) => `${temp.toFixed(0)}\u00B0`

/**
 * Used by SunshinePreferences
*/
// Label for the location preference
export const pref_location_label = "Location"
// Key name for storing location in SharedPreferences 
export const pref_location_key = "location"
// Default postal code for location preference 
export const pref_location_default = "Mountain View, CA 94043"
// Label for the temperature units preference
export const pref_units_label = "Temperature Units"
// Value in SharedPreferences for imperial temperature unit option
export const pref_units_imperial = "Imperial"
// Value in SharedPreferences for metric temperature unit option 
export const pref_units_metric = "Metric"
// Key name for temperature unit preference in SharedPreferences
export const pref_units_key = "units"

export const error_message = "An error has occurred"

/* Application Stacks */
export const forecast_stack = 'Forecast' //Route to Forecast Component
export const forecast_details_stack = 'ForecastDetails' //Route to ForecastDetails Component Page
export const settings_stack = "Settings" //ROute to the Settings Perferences page

// Strings related to Notification Enabled preference 
export const pref_enable_notifications_label = "Weather Notifications"
export const pref_enable_notifications_true = "Enabled"
export const pref_enable_notifications_false = "Not Enabled"
export const pref_enable_notifications_key = "enable_notifications"
export const pref_last_notification = "last_notification"

/** Weather Conditions (From OpenWeatherMap)*/
export const wC = {
    condition_2xx: "Storm",
    condition_3xx: "Drizzle",
    condition_500: "Light Rain",
    condition_501: "Moderate Rain",
    condition_502: "Heavy Rain",
    condition_503: "Intense Rain",
    condition_504: "Extreme Rain",
    condition_511: "Freezing Rain",
    condition_520: "Light Shower",
    condition_521: "Shower",
    condition_522: "Heavy Shower",
    condition_531: "Ragged Shower",
    condition_600: "Light Snow",
    condition_601: "Snow",
    condition_602: "Heavy Snow",
    condition_611: "Sleet",
    condition_612: "Shower Sleet",
    condition_615: "Rain and Snow",
    condition_616: "Rain and Snow",
    condition_620: "Shower Snow",
    condition_621: "Shower Snow",
    condition_622: "Shower Snow",
    condition_701: "Mist",
    condition_711: "Smoke",
    condition_721: "Haze",
    condition_731: "Sand, Dust",
    condition_741: "Fog",
    condition_751: "Sand",
    condition_761: "Dust",
    condition_762: "Volcanic Ash",
    condition_771: "Squalls",
    condition_781: "Tornado",
    condition_800: "Clear",
    condition_801: "Mostly Clear",
    condition_802: "Scattered Clouds",
    condition_803: "Broken Clouds",
    condition_804: "Overcast Clouds",
    condition_900: "Tornado",
    condition_901: "Tropical Storm",
    condition_902: "Hurricane",
    condition_903: "Cold",
    condition_904: "Hot",
    condition_905: "Windy",
    condition_906: "Hail",
    condition_951: "Calm",
    condition_952: "Light Breeze",
    condition_953: "Gentle Breeze",
    condition_954: "Breeze",
    condition_955: "Fresh Breeze",
    condition_956: "Strong Breeze",
    condition_957: "High Wind",
    condition_958: "Gale",
    condition_959: "Severe Gale",
    condition_960: "Storm",
    condition_961: "Violent Storm",
    condition_962: "Hurricane",
    condition_unknown: "Unknown",
}

/*
Cmd+Shift+L or Cmd+Ctrl+G on Mac  for “vscode select all occurances command”
Saved me a lot of time copying things over
https://www.youtube.com/watch?v=dFwjJr1Fg5M
*/


/**
 * - Used for Accessibility purposes (Accessibility == a11y)                            
 *                                                                                   
 * Fun Fact: Accessibility is abbreviated a11y because accessibility starts with 'a', 
 * followed by 11 letters, and then a 'y'. It is pronounced alley, like an alley cat. 
 * 
 * Read more on why you need Accessibility for your app
 * http://man.hubwiz.com/docset/React_Native.docset/Contents/Resources/Documents/react-native/docs/accessibility.html
 * https://www.shopify.ca/partners/blog/react-native-accessibility
 */
export const a11y_forecast = (description) => `Forecast: ${description}` 
export const a11y_high_temp = (highString) => `High: ${highString}`
export const a11y_low_temp = (lowString) => `Low: ${lowString}`
