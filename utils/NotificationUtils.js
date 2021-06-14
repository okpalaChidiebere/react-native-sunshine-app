import { Platform } from "react-native"
import * as Notifications from "expo-notifications"
import moment from "moment" //   https://momentjs.com/
import { areNotificationsEnabled, getLastNotificationTime, saveLastNotificationTime } from "./SunshinePreferences"
import { app_name } from "../res/values/strings"
import { colorPrimary } from "../res/values/colors"
import { getFirstRowWeatherData, CONTENT_AUTHORITY } from "./AppDatabase"
import { getStringForWeatherCondition, formatTemperature, getEmojiForWeatherCondition } from "./SunshineWeatherUtils"


const WEATHER_NOTIFICATION_ID = (3004).toString() //this number must be unique for each type of notification you want to sent

//When a notification is received while the app is running, using this function you can set a callback that will decide whether the notification should be shown to the user or not.
//https://docs.expo.io/versions/v41.0.0/sdk/notifications/#setnotificationhandlerhandler-notificationhandler--null-void
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true, //for sunshine, the app is running, so no need to show alert. You may want this one like football scores app does.
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
})
Notifications.setNotificationChannelAsync(WEATHER_NOTIFICATION_ID, Platform.select({
    android: { // Android-specific fields
        name: WEATHER_NOTIFICATION_ID,
        priority: Notifications.AndroidImportance.HIGH,
        autoDismiss: true,
        vibrate: false,
        color: colorPrimary,
        sound: false,
    },
}))

export const notifyUserOfNewWeather = async () => {

    /*
    Determine whether or not we should notify the user that the weather has been refreshed.
    */
    const notificationsEnabled = await areNotificationsEnabled()

    /*
    * If the last notification was shown was more than 1 day ago, we want to send
    * another notification to the user that the weather has been updated. Remember,
    * it's important that you shouldn't spam your users with notifications.
    */
    const timeSinceLastNotification = await getLastNotificationTime()

    let oneDayPassedSinceLastNotification = false

    /**
    * Check if a day has passed since the last notification or if the user just installed the app 
    * and timeSinceLastNotification is undefined.
    * 
    * moment().diff(moment(undefined), 'days') gives you 0 and we want to send notification
    * when the user download the app for the first since notification is enabled by default
    *  time so we have to explicitly handle this scenario. 
    * 
    * https://stackoverflow.com/questions/51405133/check-if-a-date-is-24-hours-old/51405252
    */
   if(moment().diff(moment(timeSinceLastNotification), 'days') >= 1 || !timeSinceLastNotification ){
        oneDayPassedSinceLastNotification = true
   }

    /*
    * We only want to show the notification if the user wants them shown and we
    * haven't shown a notification in the past day.
    */
    if (notificationsEnabled && oneDayPassedSinceLastNotification) {
           notify()
    }
}

async function notify() {

    const firstRow = await getFirstRowWeatherData()
    const index = 0
    
    const h = await formatTemperature(Math.round(firstRow[0].max))
    const l = await formatTemperature(Math.round(firstRow[0].min))

    const notificationText = getNotificationText(firstRow[0].weather_id, h, l)

    const forcastDetailIntentForToday = `${CONTENT_AUTHORITY}://weatherData/${index}`

    /* WEATHER_NOTIFICATION_ID allows you to update or cancel the notification later on */
    const requestInput = createNotification(WEATHER_NOTIFICATION_ID, notificationText, null, forcastDetailIntentForToday)

    //Notifications.setBadgeCountAsync(1) //not nneded for out app, but nice to know
    //Since we passed null to our request input, this notification will be triggered right away
    Notifications.scheduleNotificationAsync(requestInput)


    /*
    * Since we just showed a notification, save the current time. That way, we can check
    * next time the weather is refreshed if we should show another notification.
    */
    const t = moment().format()
    saveLastNotificationTime(t)
}

function createNotification (channelId, body, trigger, url) {
    return{
        channelId: channelId,
        content: {
          title: app_name,
          body,
          data: { //we use this data to know which screen to open when the user clicks into our notification
              url
          }
        },
        trigger,
    }
}

/**
* Constructs and returns the summary of a particular day's forecast using various utility
* methods and resources for formatting. This method is only used to create the text for the
* notification that appears when the weather is refreshed.
* <p>
* The String returned from this method will look something like this:
* <p>
* Forecast: Sunny 🌦 - High: 14°C Low 7°C
*
* @param weatherId ID as determined by Open Weather Map
* @param high      High temperature (either celsius or fahrenheit depending on preferences)
* @param low       Low temperature (either celsius or fahrenheit depending on preferences)
* @return Summary of a particular day's forecast
*/
function getNotificationText (weatherId, high, low) {
    const shortDescription = getStringForWeatherCondition(weatherId)
    const weatherEmoji = getEmojiForWeatherCondition(weatherId)
    return `Forecast:${shortDescription} ${weatherEmoji} - High:${high} Low:${low}`
}