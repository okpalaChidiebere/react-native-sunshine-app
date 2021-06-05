import moment from "moment" //   https://momentjs.com/
import { today, tomorrow } from "../res/values/strings"


const SECOND_IN_MILLIS = 1000
const MINUTE_IN_MILLIS = SECOND_IN_MILLIS * 60
const HOUR_IN_MILLIS = MINUTE_IN_MILLIS * 60
export const DAY_IN_MILLIS = HOUR_IN_MILLIS * 24

const getDayNumber = (dateInMillis) => {
    return new Date(dateInMillis).getDate()
    //more on getDtae method here https://www.codegrepper.com/code-examples/javascript/get+day+number+from+date+javascript
}

export const getFriendlyDateString = (dateInMillis, showFullDate) => {

    //more about moment library  https://stackoverflow.com/questions/27669019/moment-js-get-day-name-from-date

    //get day number
    const dayNumber = getDayNumber(dateInMillis)

    const currentDayNumber = new Date().getDate()
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    let readableDate =  new Date(dateInMillis).toLocaleString("en-US", options)

    if (dayNumber == currentDayNumber || showFullDate) {
        /*
        * If the date we're building the String for is today's date, the format
        * is "Today, June 24"
        */
        const dayName = getDayName(dateInMillis); //eg  Today

        const res = readableDate.split(" ");
        if(dayNumber - currentDayNumber < 2){
            return `${dayName} ${res[1]} ${res[3]}`; //eg Today Jun 5
        }else{
            return res[0]+" "+res[1]
        }
    }else if (dayNumber < currentDayNumber + 7) {
        return getDayName(dateInMillis) //Tomorrow
    }else{
        const splt = readableDate.split(" ");
        return `${splt[0]}, ${splt[1]} ${splt[2]}` // Mon, Jun 14
    }
}


/**
    * Given a day, returns just the name to use for that day.
    *   E.g "today", "tomorrow", "Wednesday".
    *
    * @param dateInMillis The date in milliseconds (local time)
    *
    * @return the string day of the week
 */
const getDayName = (dateInMillis) => {
    /*
     * If the date is today, return the localized version of "Today" instead of the actual
     * day name.
     */
    const dayNumber = getDayNumber(dateInMillis)
    const currentDayNumber = new Date().getDate()
    if (dayNumber == currentDayNumber) {
        return today
    } else if (dayNumber == currentDayNumber + 1) {
        return tomorrow
    } else {
        /*
        * Otherwise, if the day is not today, the format is just the day of the week
        * (e.g "Wednesday")
        */
        return moment(dateInMillis).format('dddd')
        //return new Date(dateInMillis).toLocaleString("en-US", { "weekday": "long" }) 
    }
}