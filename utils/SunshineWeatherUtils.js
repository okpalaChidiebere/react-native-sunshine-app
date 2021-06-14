import { isMetric } from "./SunshinePreferences"
import { format_temperature_celsius, format_temperature_fahrenheit, wC } from "../res/values/strings"

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
export const formatTemperature = async (temperature) => {

    const metric = await isMetric()
    //console.log(metric)
    if (!metric) {
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
export const formatHighLows = async (high, low) => {
    const roundedHigh = Math.round(high)
    const roundedLow = Math.round(low)

    const formattedHigh = await formatTemperature(roundedHigh)
    const formattedLow = await formatTemperature(roundedLow)

    const highLowStr = `${formattedHigh} / ${formattedLow}`
    return highLowStr
}

export const getStringForWeatherCondition = (weatherId) => {
    let stringId
    if (weatherId >= 200 && weatherId <= 232) {
        stringId = wC.condition_2xx;
    } else if (weatherId >= 300 && weatherId <= 321) {
        stringId = wC.condition_3xx;
    } else switch (weatherId) {
        case 500:
            stringId = wC.condition_500;
            break;
        case 501:
            stringId = wC.condition_501;
            break;
        case 502:
            stringId = wC.condition_502;
            break;
        case 503:
            stringId = wC.condition_503;
            break;
        case 504:
            stringId = wC.condition_504;
            break;
        case 511:
            stringId = wC.condition_511;
            break;
        case 520:
            stringId = wC.condition_520;
            break;
        case 531:
            stringId = wC.condition_531;
            break;
        case 600:
            stringId = wC.condition_600;
            break;
        case 601:
            stringId = wC.condition_601;
            break;
        case 602:
            stringId = wC.condition_602;
            break;
        case 611:
            stringId = wC.condition_611;
            break;
        case 612:
            stringId = wC.condition_612;
            break;
        case 615:
            stringId = wC.condition_615;
            break;
        case 616:
            stringId = wC.condition_616;
            break;
        case 620:
            stringId = wC.condition_620;
            break;
        case 621:
            stringId = wC.condition_621;
            break;
        case 622:
            stringId = wC.condition_622;
            break;
        case 701:
            stringId = wC.condition_701;
            break;
        case 711:
            stringId = wC.condition_711;
            break;
        case 721:
            stringId = wC.condition_721;
            break;
        case 731:
            stringId = wC.condition_731;
            break;
        case 741:
            stringId = wC.condition_741;
            break;
        case 751:
            stringId = wC.condition_751;
            break;
        case 761:
            stringId = wC.condition_761;
            break;
        case 762:
            stringId = wC.condition_762;
            break;
        case 771:
            stringId = wC.condition_771;
            break;
        case 781:
            stringId = wC.condition_781;
            break;
        case 800:
            stringId = wC.condition_800;
            break;
        case 801:
            stringId = wC.condition_801;
            break;
        case 802:
            stringId = wC.condition_802;
            break;
        case 803:
            stringId = wC.condition_803;
            break;
        case 804:
            stringId = wC.condition_804;
            break;
        case 900:
            stringId = wC.condition_900;
            break;
        case 901:
            stringId = wC.condition_901;
            break;
        case 902:
            stringId = wC.condition_902;
            break;
        case 903:
            stringId = wC.condition_903;
            break;
        case 904:
            stringId = wC.condition_904;
            break;
        case 905:
            stringId = wC.condition_905;
            break;
        case 906:
            stringId = wC.condition_906;
            break;
        case 951:
            stringId = wC.condition_951;
            break;
        case 952:
            stringId = wC.condition_952;
            break;
        case 953:
            stringId = wC.condition_953;
            break;
        case 954:
            stringId = wC.condition_954;
            break;
        case 955:
            stringId = wC.condition_955;
            break;
        case 956:
            stringId = wC.condition_956;
            break;
        case 957:
            stringId = wC.condition_957;
            break;
        case 958:
            stringId = wC.condition_958;
            break;
        case 959:
            stringId = wC.condition_959;
            break;
        case 960:
            stringId = wC.condition_960;
            break;
        case 961:
            stringId = wC.condition_961;
            break;
        case 962:
            stringId = wC.condition_962;
            break;
        default:
            return `${wC.condition_unknown}${weatherId}`;
    }
    return stringId;
}

export const getEmojiForWeatherCondition = (weatherId) => {

    /*
     * Based on weather code data for Open Weather Map.
     * https://www.piliapp.com/emoji/list/weather/
     */
    if (weatherId >= 200 && weatherId <= 232) {
        return `⛈`
    } else if (weatherId >= 300 && weatherId <= 321) {
        return `🌦`
    } else if (weatherId >= 500 && weatherId <= 504) {
        return `🌧`
    } else if (weatherId == 511) {
        return `🌨`
    } else if (weatherId >= 520 && weatherId <= 531) {
        return `🌧`
    } else if (weatherId >= 600 && weatherId <= 622) {
        return `🌨`
    } else if (weatherId >= 701 && weatherId <= 761) {
        return `🌫`
    } else if (weatherId == 761 || weatherId == 771 || weatherId == 781) {
        return `⛈`
    } else if (weatherId == 800) {
        return `🌤`
    } else if (weatherId == 801) {
        return `⛅`
    } else if (weatherId >= 802 && weatherId <= 804) {
        return `☁`
    } else if (weatherId >= 900 && weatherId <= 906) {
        return `⛈`
    } else if (weatherId >= 958 && weatherId <= 962) {
        return `⛈`
    } else if (weatherId >= 951 && weatherId <= 957) {
        return `🌤`
    }

    return `⛈`
}