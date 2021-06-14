import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import { syncWeatherTask } from "../utils/SunshineSyncUtils"


const SUNSHINE_SYNC_TAG = "sunshine-sync-app"
const SYNC_INTERVAL_HOURS = (3 * 60) * 60 //sync Sunshine every 3 hours 

TaskManager.defineTask(SUNSHINE_SYNC_TAG, async () => {

    try {
        await syncWeatherTask()
        //we will push notification after the sync as well in a future lesson
        //console.log(SUNSHINE_SYNC_TAG, "background fetch running")
        return BackgroundFetch.Result.NewData
    } catch (error) {
        //console.log(SUNSHINE_SYNC_TAG, "background featch running failed :(")
        return BackgroundFetch.Result.Failed
    }
})

/**
* Schedules a repeating sync of Sunshine's weather data using expo-task-manager and expo-background-fetch.
*/
const scheduleTaskManagerSync = async () => {

    //console.log("scheduleTaskManagerSync()")

    //await TaskManager.unregisterAllTasksAsync() // debugging purpose.
    //await BackgroundFetch.unregisterTaskAsync(SUNSHINE_SYNC_TAG)  // debugging purpose

    const backgroundFetchStatus = await BackgroundFetch.getStatusAsync()
    switch (backgroundFetchStatus) {
        case BackgroundFetch.Status.Restricted:
            //console.log("Background fetch execution is restricted")
            return

        case BackgroundFetch.Status.Denied:
            //console.log("Background fetch execution is disabled")
            return

        default:
            //console.log("Background fetch execution allowed")

            let tasks = await TaskManager.getRegisteredTasksAsync()
            //console.log("Registered tasks", tasks)

            if (tasks.find(f => f.taskName === SUNSHINE_SYNC_TAG) == null) {
                //console.log("Registering task")

                /* Create the Task to periodically sync Sunshine */
                await BackgroundFetch.registerTaskAsync(SUNSHINE_SYNC_TAG, {
                    minimumInterval: parseInt(SYNC_INTERVAL_HOURS), // Interval at which to sync with the weather.
                    stopOnTerminate: false,
                    startOnBoot: true,
                })
            } else {
                //console.log(` Task ${SUNSHINE_SYNC_TAG} already registered, skipping`)
            }
            BackgroundFetch.setMinimumIntervalAsync(600) //for debugging, set the time in seconds to as short as possible Eg 1. This will run your task right away.
    }

}

export default scheduleTaskManagerSync