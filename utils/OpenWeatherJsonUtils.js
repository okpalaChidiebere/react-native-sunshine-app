import { formatHighLows } from './SunshineWeatherUtils'
import { DAY_IN_MILLIS, getFriendlyDateString } from './SunshineDateUtils'

export const getSimpleWeatherStringsFromJson = (forecastJsonStr) => {
    const promises = forecastJsonStr.list.map(async ({temp, weather} , i) => {
        /* String array to hold each day's weather String */
        let parsedWeatherData

        let date, highAndLow, high, low, description, dateTimeMillis

        const localDate = new Date()
        const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000)

        // normalizeDate
        let startDay = utcDate.getTime() / DAY_IN_MILLIS * DAY_IN_MILLIS


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
        highAndLow = await formatHighLows(high, low)

        parsedWeatherData = date + " - " + description + " - " + highAndLow

        return parsedWeatherData;
    });
    return Promise.all(promises); //make sure we get all the weather for the day. If i had not done this, i will get error like "PayloadTooLargeError: request entity too large" 
}

    
