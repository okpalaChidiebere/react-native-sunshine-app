import { FetchWeatherTask } from "../utils/NetworkUtils"
import { getPreferredWeatherLocation } from "../utils/SunshinePreferences"
import { bulkInsertWeatherData, deleteWeatherData, loadAllWeatherData } from "../utils/AppDatabase"


export const startImmediateSync = async() => {
    return await syncWeatherTask()
}

export const syncWeatherTask = async () => {
    //console.log("Sync")
        const location = await getPreferredWeatherLocation()
        const jsonWeatherResponse = await FetchWeatherTask(location)

        /*
        * In cases due to HTTP error, the fetch request would have returned null. 
        * We need to check for those cases here to prevent any error being thrown
        * We also have no reason to insert fresh data if there isn't any to insert.
        */
        if (!jsonWeatherResponse != null && jsonWeatherResponse.list != 0) {

            /* Delete old weather data because we don't need to keep multiple days' data */
            deleteWeatherData(null)

            /* Insert our new weather data into Sunshine's SQLite */
            bulkInsertWeatherData(jsonWeatherResponse)
        }

        /* If the code reaches this point, we have successfully performed our sync */
}

export const initialize = async () => {
    
    /* Here, we perform the query to check to see if we have any weather data */
    const rows = await loadAllWeatherData()

    /**
     * we want to check to see if our SQLite provider is empty, in case for example 
     * the app was just freshly installed and had no data stored yet!.
     */
    if (rows.length === 0) {
        await startImmediateSync()
    }
}