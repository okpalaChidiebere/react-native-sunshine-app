import * as SQLite from "expo-sqlite" // https://docs.expo.io/versions/v41.0.0/sdk/sqlite/
import { DAY_IN_MILLIS } from "./SunshineDateUtils"

export const CONTENT_AUTHORITY = "sunshineApp"
export const BASE_CONTENT_URL = CONTENT_AUTHORITY + "://"

const DATABASE_NAME = "weather.db"
const TABLE_NAME = "weather"
const COLUMN_ID = "_ID"
const COLUMN_DATE = "date"
const COLUMN_WEATHER_ID = "weather_id"
const COLUMN_MIN_TEMP = "min"
const COLUMN_MAX_TEMP = "max"
const COLUMN_HUMIDITY = "humidity"
const COLUMN_PRESSURE = "pressure"
const COLUMN_WIND_SPEED = "wind"
const COLUMN_DEGREES = "degrees"

const db = SQLite.openDatabase(DATABASE_NAME)

export const createTable = () => {

    /*
    * This String will contain a simple SQL statement that will create a table that will
    * cache our weather data.
    */
    const query = "CREATE TABLE IF NOT EXISTS " +  TABLE_NAME + "(" +
                COLUMN_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                COLUMN_DATE + " INTEGER NOT NULL, " +
                COLUMN_WEATHER_ID + " INTEGER NOT NULL, " +
                COLUMN_MIN_TEMP + " REAL NOT NULL, " +
                COLUMN_MAX_TEMP + " REAL NOT NULL, " +
                COLUMN_HUMIDITY + " REAL NOT NULL, " +
                COLUMN_PRESSURE + " REAL NOT NULL, " +
                COLUMN_WIND_SPEED + " REAL NOT NULL, " +
                COLUMN_DEGREES    + " REAL NOT NULL, " +
                /*
                 * To ensure this table can only contain one weather entry per date, we declare
                 * the date column to be unique. We also specify "ON CONFLICT REPLACE". This tells
                 * SQLite that if we have a weather entry for a certain date and we attempt to
                 * insert another weather entry with that date, we replace the old weather entry.
                 */
                "UNIQUE (" + COLUMN_DATE + ") ON CONFLICT REPLACE" +
                 ");" ;

    db.transaction((tx) => {
         /*
         * After we've spelled out our SQLite table creation statement above, we actually execute
         * that SQL with the executeSql method of our SQLite.SQLTransaction database object.
         */
        //tx.executeSql("DROP TABLE IF EXISTS "+TABLE_NAME); //used for debugging
        tx.executeSql(query)
    },
    (e) => {
        console.log("ERROR: " + e.message)
    })
}

export const loadAllWeatherData = () => {
    const SQL_LOAD_ALL_WEATHER_DATA = 
    `SELECT ${COLUMN_DATE}, ${COLUMN_WEATHER_ID}, ${COLUMN_MIN_TEMP}, ${COLUMN_MAX_TEMP}, ${COLUMN_HUMIDITY}, ${COLUMN_PRESSURE}, ${COLUMN_WIND_SPEED}, ${COLUMN_DEGREES} FROM ${TABLE_NAME};`
    
    return new Promise((resolve, reject) => {
        db.transaction(
            async (tx) => {
              tx.executeSql(SQL_LOAD_ALL_WEATHER_DATA, [], (_, { rows: { _array } }) => resolve(_array)
              );
            },
            (e) => {
                reject("ERROR: " + e.message)
                console.log("ERROR: " + e.message)
            }
        );
    })
}

export const getFirstRowWeatherData = () => {
    const getFristRow = "SELECT " + 
    COLUMN_DATE + ", " +
    COLUMN_WEATHER_ID + ", " +
    COLUMN_MIN_TEMP + ", " +
    COLUMN_MAX_TEMP + ", " +
    COLUMN_HUMIDITY + ", " +
    COLUMN_PRESSURE + ", " +
    COLUMN_WIND_SPEED + ", " +
    COLUMN_DEGREES    + " " +
    "FROM " + TABLE_NAME + " " +
    "ORDER BY " + COLUMN_ID + " " +
     "ASC LIMIT 1;" ;
    
    return new Promise((resolve, reject) => {
        db.transaction(
            async (tx) => {
              tx.executeSql(getFristRow, [], (_, { rows: { _array } }) => resolve(_array)
              );
            },
            (e) => {
                reject("ERROR: " + e.message)
                console.log("ERROR: " + e.message)
            }
        );
    })
}

/**
* If we pass null as the selection, It means you want to delete all the rows
* @param selection    default value is null
*/
export const deleteWeatherData = (selection = null) => {
    let query

    if (null === selection) selection = "1" //If you comment out this line, your entire database table will be deleted. I probably will used this for debugging

    if(selection === "1"){
        // delete all of the rows in the table
        query = "DELETE FROM "+TABLE_NAME
    }else{
        //our entire table will be deleted
        query = "DROP TABLE IF EXISTS "+TABLE_NAME
    }

    db.transaction((tx) => {
       tx.executeSql(query)
    })

    /**
     * query = "DELETE FROM "+TABLE_NAME+
        "ORDER BY "+COLUMN_ID+
        "LIMIT "+100
     */
}

export const bulkInsertWeatherData = (forecastJsonStr) => {

     // is text empty?
    if (!forecastJsonStr) {
        return false;
    }

    let weatherContentValues = [], bigqery = "", dateTimeMillis

    const localDate = new Date()
    const utcDate = new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000)

    const { list, city } = forecastJsonStr

    const cityLatitude = city.coord.lat
    const cityLongitude = city.coord.lon

    // normalizeDate
    let startDay = utcDate.getTime() / DAY_IN_MILLIS * DAY_IN_MILLIS

    for(const index in list){

        
        dateTimeMillis = startDay + DAY_IN_MILLIS * index

        let { pressure, humidity, speed, deg, weather, temp } = list[index]

        const mPressure = pressure
        const mHumidity = humidity
        const windSpeed = speed
        const windDirection = deg
        const weatherId = weather[0].id
        const high = temp.max
        const low = temp.min

        weatherContentValues.push(dateTimeMillis, mPressure, mHumidity, windSpeed, windDirection, high, low, weatherId)
        bigqery += `(?,?,?,?,?,?,?,?)${list.length-1 != index?`,`:``}`

        /* For bigger rows you may want to be inserting in interval
        https://github.com/reconka/Cordova-sqlite-storage-bulkinsert/blob/9e72c4ca44dd56df38233dbda42fcc6de80363d4/android/assets/www/js/index.js */
    }

    const SQL_BULK_INSERT = "INSERT INTO "+TABLE_NAME
        +`  (${COLUMN_DATE},${COLUMN_PRESSURE},${COLUMN_HUMIDITY},${COLUMN_WIND_SPEED},${COLUMN_DEGREES},${COLUMN_MAX_TEMP},${COLUMN_MIN_TEMP},${COLUMN_WEATHER_ID}) VALUES ` 
        + bigqery + ";";
  
    db.transaction(
        (tx) => {
            tx.executeSql(
                SQL_BULK_INSERT, 
                weatherContentValues,
            )
        },
        (e) => {
        console.log("ERROR: " + e.message)
        }
    );

}