export const RECEIVE_WEATHER_DATA = "RECEIVE_WEATHER_DATA" 

export function receiveWeatherData (weatherData) {
    return {
      type: RECEIVE_WEATHER_DATA,
      weatherData,
    }
}
