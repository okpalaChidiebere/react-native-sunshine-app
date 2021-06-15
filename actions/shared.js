import { receivePreferences } from "./preferences"
import { getSunshinePreferences } from "../utils/SunshinePreferences"
import { loadAllWeatherData } from "../utils/AppDatabase"
import { receiveWeatherData } from "./weather"
 

export const handleInitialData = () => async (dispatch) => {

    try {

        const [ preferences, rowsInJson ] = await Promise.all([
            getSunshinePreferences(), //get current user preferences with data from AsyncStorage
            loadAllWeatherData(), //data from our SQLite DB
        ])

        dispatch(receiveWeatherData(rowsInJson))
        dispatch(receivePreferences(preferences))
    }catch(e){
        console.warn('handleInitialData ERROR!', e)
    }
}