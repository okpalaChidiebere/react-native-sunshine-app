/**
 * These utilities will be used to communicate with the weather servers.
 */


const DYNAMIC_WEATHER_URL =
            "https://andfun-weather.udacity.com/weather"

const  STATIC_WEATHER_URL =
            "https://andfun-weather.udacity.com/staticweather"

const  FORECAST_BASE_URL = STATIC_WEATHER_URL

/*
* NOTE: These values only effect responses from OpenWeatherMap, NOT from the fake weather
* server. They are simply here to allow us to teach you how to build a URL if you were to use
* a real API.If you want to connect your app to OpenWeatherMap's API, feel free to! However,
* we are not going to show you how to do so in this course.
*/

/* The format we want our API to return */
const  format = "json"
/* The units we want our API to return */
const  units = "metric"
/* The number of days we want our API to return */
const  numDays = 14

const  QUERY_PARAM = "q"
const  FORMAT_PARAM = "mode"
const UNITS_PARAM = "units"
const DAYS_PARAM = "cnt"

/**
* Builds the URL used to talk to the weather server using a location. This location is based
* on the query capabilities of the weather provider that we are using.
*
* @param locationQuery The location that will be queried for.
* @return The URL to use to query the weather server.
*/
export const buildUrl = (locationQuery) => {
  //More about building url here https://www.valentinog.com/blog/url/

    const builtUrl = new URL(FORECAST_BASE_URL)
    builtUrl.searchParams.append(QUERY_PARAM, locationQuery)
    builtUrl.searchParams.append(FORMAT_PARAM, format)
    builtUrl.searchParams.append(UNITS_PARAM, units)
    builtUrl.searchParams.append(DAYS_PARAM, numDays)
    return builtUrl.href;
}


/**
* This method returns the entire result from the HTTP response.
* https://andfun-weather.udacity.com/staticweather?q=94043,USA&amp;mode=json&amp;units=metric&amp;cnt=14
*
* @param location The location that will be queried for.
* @return The contents of the HTTP response.
*/
export const FetchWeatherTask = (location) =>
fetch(buildUrl(location))
  .then(res => res.json())
