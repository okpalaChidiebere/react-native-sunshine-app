import { RECEIVE_WEATHER_DATA } from '../actions/weather'

export default function weatherData (state = [], action) {
  switch (action.type) {
    case RECEIVE_WEATHER_DATA : //when this runs, state will always be first empty. THis is simialar action to initial data for your app
    //console.log(action.weatherData)
      return action.weatherData
    default :
      return state
  }
}