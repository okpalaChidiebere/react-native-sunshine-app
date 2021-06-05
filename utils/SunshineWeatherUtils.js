import { isMetric } from "./SunshinePreferences"
import { format_temperature_celsius, format_temperature_fahrenheit } from "../res/values/strings"

/**
* This method will convert a temperature from Celsius to Fahrenheit.
*
* @param temperatureInCelsius Temperature in degrees Celsius(°C)
*
* @return Temperature in degrees Fahrenheit (°F)
*/
const celsiusToFahrenheit = (temperatureInCelsius) => {
    const temperatureInFahrenheit = (temperatureInCelsius * 1.8) + 32
    return temperatureInFahrenheit
}

/**
 * Temperature data is stored in Celsius by our app. Depending on the user's preference,
 * the app may need to display the temperature in Fahrenheit. This method will perform that
 * temperature conversion if necessary. It will also format the temperature so that no
 * decimal points show. Temperatures will be formatted to the following form: "21°C"
 *
 * @param temperature Temperature in degrees Celsius (°C)
 *
 * @return Formatted temperature String in the following form:
 * "21°C"
 */
const formatTemperature = (temperature) => {

    if (!isMetric()) {
        const ftemperature = celsiusToFahrenheit(temperature)
        return format_temperature_fahrenheit(ftemperature)
    }

    /* For presentation, assume the user doesn't care about tenths of a degree.
    https://stackoverflow.com/questions/25551394/add-percent-to-numbers
    */
    return format_temperature_celsius(temperature)
}

/**
 * This method will format the temperatures to be displayed in the
 * following form: "HIGH°C / LOW°C"
 *
 * @param high    High temperature for a day in user's preferred units
 * @param low     Low temperature for a day in user's preferred units
 *
 * @return String in the form: "HIGH°C / LOW°C"
 */
export const formatHighLows = (high, low) => {
    const roundedHigh = Math.round(high)
    const roundedLow = Math.round(low)

    const formattedHigh = formatTemperature(roundedHigh)
    const formattedLow = formatTemperature(roundedLow)

    const highLowStr = `${formattedHigh} / ${formattedLow}`
    return highLowStr
}

