import React, { useEffect, useState } from "react"
import { View, Share, TouchableOpacity, useWindowDimensions }  from "react-native"
import styled from "styled-components/native"
import { white, colorPrimary } from "../values/colors"
import ForecastDetailsMenu from "../menu/forecastDetails"
import { Ionicons } from "@expo/vector-icons"
import { connect } from "react-redux"
import ExtraWeatherDetails from "./ExtraWeatherDetails"
import PrimaryWeatherInfo from "./PrimaryWeatherInfo"
import { getFormattedWind, formatTemperature, getStringForWeatherCondition } from "../../utils/SunshineWeatherUtils"
import { getFriendlyDateString } from "../../utils/SunshineDateUtils"
import { format_pressure, format_humidity } from "../values/strings"
import { getLargeArtResourceIdForWeatherCondition } from "../values/strings"

/**
 * 
 * For smallest width of the screen is 600, we show PrimaryWeatherInfo and ExtraWeatherDetails side by side (colums)
 * For screen of width 600 and higher we show PrimaryWeatherInfo on top of ExtraWeatherDetails (rows)
 */
const DetailsViewContainer = styled.View`
flex: 1;
flex-direction: ${props => props.windowWidth < 600 ? 'column' : 'row'};
align-items: stretch;
`

/*
There is no such thing as Resource Qualifires for React-Native, But with the help of 
styled-component, we can pass screen dimensions as prop to render different value based on 
Screen size.

Here we are saying when the phone is at landscape mode, we are going to have the layout occupy
certain percentage of the screen
*/
const DetailsOuterLayouts = styled.View`
flex: 1;
flex-grow: ${props => props.windowWidth < 600 ? '1' : `${props.sw600}`};
`

function ForecastDetails({ route, navigation, weatherData }){

    const window = useWindowDimensions();

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
        <DetailsViewContainer windowWidth={window.width}>
            <DetailsOuterLayouts windowWidth={window.width} sw600={.55}>
                <PrimaryWeatherInfo 
                dateString={dateString} 
                description={description} 
                highString={highString} 
                lowString={lowString} 
                getIcon={() => getLargeArtResourceIdForWeatherCondition(weatherId)}
                />
            </DetailsOuterLayouts>
            <DetailsOuterLayouts windowWidth={window.width} sw600={.45}>
                <ExtraWeatherDetails humidity={humidityString} pressure={pressureString} wind={windSpeed}/>
            </DetailsOuterLayouts>
        </DetailsViewContainer>
    );
}

const mapStateToProps = ({ weatherData }) => ({ weatherData })

const connectedForecast = connect(mapStateToProps)
export default connectedForecast(ForecastDetails)

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
        headerStyle: { backgroundColor: colorPrimary },
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