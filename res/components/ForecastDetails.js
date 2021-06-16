import React, { useEffect, useState } from "react"
import { StyleSheet, View, Share, TouchableOpacity }  from "react-native"
import { white } from "../values/colors"
import ForecastDetailsMenu from "../menu/forecastDetails"
import { Ionicons } from "@expo/vector-icons"
import { connect } from "react-redux"
import ExtraWeatherDetails from "./ExtraWeatherDetails"
import PrimaryWeatherInfo from "./PrimaryWeatherInfo"
import { getFormattedWind, formatTemperature, getStringForWeatherCondition } from "../../utils/SunshineWeatherUtils"
import { getFriendlyDateString } from "../../utils/SunshineDateUtils"
import { format_pressure, format_humidity } from "../values/strings"
import { getLargeArtResourceIdForWeatherCondition } from "../values/strings"

function ForecastDetails({ route, navigation, weatherData }){

    const { weatherIndex } = route.params

    const [ details, setForcastDetails ] = useState({
        dateString: 0,
        description: "",
        highString: "",
        lowString: "",
        weatherId: 0,
        humidityString: "",
        windSpeed: "",
        pressureString: "",
    })

    useEffect(() => {
        (async () => {
        try{
          const { date, max, min, weather_id, pressure, wind, humidity, degrees } = weatherData[weatherIndex]
  
          const dateString = getFriendlyDateString(date, false)
          const description = getStringForWeatherCondition(weather_id)
          const highString = await formatTemperature(max)
          const lowString = await formatTemperature(min)
          const windSpeed = await getFormattedWind(wind, degrees)
          const pressureString = format_pressure(pressure)
          const humidityString = format_humidity(humidity)

          setForcastDetails({
            dateString,
            description,
            highString, 
            lowString,
            weatherId: weather_id,
            windSpeed,
            pressureString,
            humidityString,
          })
        }catch(e){
            console.warn("Error with ForecastList item", e)
        }
        })()
    }, [ weatherData ])

    const { dateString, description, highString, lowString, weatherId, humidityString, windSpeed, pressureString } = details

    return (
        <View style={styles.container}>
            <View style={{
            flexGrow: 1}}>
                <PrimaryWeatherInfo 
                dateString={dateString} 
                description={description} 
                highString={highString} 
                lowString={lowString} 
                getIcon={() => getLargeArtResourceIdForWeatherCondition(weatherId)}
                />
            </View>
            <View style={{
            flexGrow: 1,
            /*backgroundColor: '#7E57C2'*/}}>
                <ExtraWeatherDetails humidity={humidityString} pressure={pressureString} wind={windSpeed}/>
            </View>
        </View>
    );
}

const mapStateToProps = ({ weatherData }) => ({ weatherData })

const connectedForecast = connect(mapStateToProps)
export default connectedForecast(ForecastDetails)

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 8,
    },
})

export function ForecastDetailsOptions({ route, navigation }) {

    const { forecastSummary } = route.params

    const handleOnClickShareTextButton = async () => {

    /*
     * In this Component, you can share the selected day's forecast. No social sharing is complete
     * without using a hashtag. #BeTogetherNotTheSame
     */
    const FORECAST_SHARE_HASHTAG = " #SunshineApp"
    
        
        const title = "Share Weather Details"
        const textThatYouWantToShare =
            `${forecastSummary.dateString} - ${forecastSummary.description} - ${forecastSummary.highString}/${forecastSummary.lowString}` +
                FORECAST_SHARE_HASHTAG

        /*
        More content config options here
        https://reactnative.dev/docs/share 
        https://github.com/react-native-share/react-native-share/issues/866
        https://github.com/react-native-share/react-native-share/issues/767
        */
        const content = { title, message: textThatYouWantToShare }

        try {
            const result = await Share.share(content)
              
            // The content was successfully shared.
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // The dialog has been dismissed.
            }
        }catch (error) {
            console.log(error.message)
        }
    }

    return {
        title: 'Details',
        headerTintColor: white,
        headerStyle: { backgroundColor: "#3F51B5" },
        /** We show one menuIcon(share-social) on screen and have other menu items hidden only to appear when "more" icon is clicked */
        headerRight: () => ( 
            <View style={{flexDirection: "row", justifyContent: "space-between", width: 80}}>
              <TouchableOpacity onPress={handleOnClickShareTextButton}>
                <Ionicons name="share-social" size={24} color={white} />
              </TouchableOpacity>
              <ForecastDetailsMenu
                menutext="Menu"
                menustyle={{marginRight: 8}}
                textStyle={{color: 'white'}}
                navigation={navigation}
                route={route}
                isIcon={true}
                />
            </View> 
        ),
    }
}
/**
 * You probaly my want TouchWithNativeFeedback for android menu icons like share only https://reactnative.dev/docs/touchablenativefeedback
 */