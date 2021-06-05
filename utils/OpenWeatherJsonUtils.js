import { formatHighLows } from './SunshineWeatherUtils'
import { DAY_IN_MILLIS, getFriendlyDateString } from './SunshineDateUtils'

export const getSimpleWeatherStringsFromJson = (forecastJsonStr) => forecastJsonStr.list.map(( {temp, weather} , i) => {
    /* String array to hold each day's weather String */
    let parsedWeatherData

    let date, highAndLow, high, low, description, dateTimeMillis

    const localDate = new Date()
    const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000)

    // normalizeDate
    startDay = utcDate.getTime() / DAY_IN_MILLIS * DAY_IN_MILLIS


    /*
    * We ignore all the datetime values embedded in the JSON and assume that
    * the values are returned in-order by day (which is not guaranteed to be correct).
    */
    dateTimeMillis = startDay + DAY_IN_MILLIS * i
    date = getFriendlyDateString(dateTimeMillis, false)

    /* Max temperature for the day */
    high = temp.max
    low = temp.min

    description = weather[0].main
    highAndLow = formatHighLows(high, low)

    parsedWeatherData = date + " - " + description + " - " + highAndLow

    return parsedWeatherData;
});

    
