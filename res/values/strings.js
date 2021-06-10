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
export const format_temperature_celsius = (temp) => `${temp.toFixed(0)}\u00B0C`
export const format_temperature_fahrenheit = (temp) => `${temp.toFixed(0)}\u00B0F`

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
