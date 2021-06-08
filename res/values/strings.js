/**
* Used by SunshineWeatherUtils
*/

export const app_name = "Sunshine"

export const today = "Today"
export const tomorrow = "Tomorrow"
export const format_temperature_celsius = (temp) => `${temp}\u00B0C`
export const format_temperature_fahrenheit = (temp) => `${temp}\u00B0F`

/**
 * Used by SunshinePreferences
*/
// Label for the location preference
export const pref_location_label = "Location"
// Default postal code for location preference 
export const pref_location_default = "Mountain View, CA 94043"
// Label for the temperature units preference
export const pref_units_label = "Temperature Units"
// Value in SharedPreferences for imperial temperature unit option
export const pref_units_imperial = "Imperial"
// Value in SharedPreferences for metric temperature unit option 
export const pref_units_metric = "Metric"

export const error_message = "An error has occurred"

/* Application Stacks */
export const forecast_stack = 'Forecast' //Route to Forecast Component
export const forecast_details_stack = 'ForecastDetails' //Route to ForecastDetails Component Page
export const settings_stack = "Settings" //ROute to the Settings Perferences page
