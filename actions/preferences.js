import { submitPerference } from "../utils/SunshinePreferences"
import { pref_location_key } from "../res/values/strings"
import { startImmediateSync } from "../utils/SunshineSyncUtils"
import { loadAllWeatherData } from "../utils/AppDatabase"
import { receiveWeatherData } from "./weather"

export const RECEIVE_PREFERENCES = "RECEIVE_PREFERENCES" //receive datas from our SunshinePreferences (the AsyncStorage)
export const SAVE_PEREFERENCE = "SAVE_PEREFERENCE"

export function receivePreferences (preferences) {
  return {
    type: RECEIVE_PREFERENCES,
    preferences,
  }
}

function savePerference ({ key, fieldToUpdate, value }) {
  return {
    type: SAVE_PEREFERENCE,
    key,
    fieldToUpdate,
    value,
  }
}

//Dont forget to add your redux thunk middleware to run actions like this
export const handleSavePerference = ({ key, fieldToUpdate, value }) => async (dispatch) => {
  try {

    await submitPerference({key, value})
    dispatch(savePerference({key, fieldToUpdate, value}))

    //startImmediateSync when location changes from the user
    if(key === pref_location_key){
      await startImmediateSync()
    }

    /** For any preferences change, we want to update the weather data for the correct location with the correct units */
    
    const rowsInJson = await loadAllWeatherData() //load current updated syncData from db
    dispatch(receiveWeatherData(rowsInJson)) //update the weatherData redux store slice. Eg the Forcast Component will re-render
  
    }catch(e){
      console.warn('Error in handleSavePerference: ', e)
    }
}