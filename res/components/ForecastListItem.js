import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableHighlight, View, Image } from "react-native"
import {primary_text, secondary_text, activated } from "../values/colors"
import { CommonActions } from "@react-navigation/native"
import { forecast_details_stack, a11y_low_temp, a11y_forecast, a11y_high_temp } from "../values/strings"
import { connect } from "react-redux"
import { formatTemperature, getStringForWeatherCondition } from "../../utils/SunshineWeatherUtils"
import { getFriendlyDateString } from "../../utils/SunshineDateUtils"

const handleOnPress = (weatherIndex, navigation, forecastSummary) => {
    navigation.dispatch(
        CommonActions.navigate({
          name: forecast_details_stack,
          params: {
            weatherIndex,
            forecastSummary,
          },
        })
    )
}

const ForecastListItem = ({ style, navigation, weatherData, index }) => {

  const [ forcastForThisDay, setForcastForThisDay ] = useState({
    dateString: 0,
    description: "",
    highString: "",
    lowString: "",
    weatherId: 0,
  })

  useEffect(() => {
      (async () => {
      try{
        const { date, max, min, weather_id } = weatherData[index]

        const dateString = getFriendlyDateString(date, false)
        const description = getStringForWeatherCondition(weather_id)
        const highString = await formatTemperature(max)
        const lowString = await formatTemperature(min)

        setForcastForThisDay({
          dateString,
          description,
          highString, 
          lowString,
          weatherId: weather_id
        })
      }catch(e){
          console.warn("Error with ForecastList item", e)
      }
      })()
  }, [ weatherData ]) //Added the weatherData as a dependency of the useEffect to re-render when the redux-store updates

  const { dateString, description, highString, lowString, weatherId } = forcastForThisDay

  /* Store the forecast summary String in our forecast summary field to share later */
  const mForecastSummary = { dateString, description, highString, lowString }

  return (
      <TouchableHighlight onPress={() => handleOnPress(index, navigation, mForecastSummary)} style={[styles.item, style]} underlayColor={activated}>
          <View style={styles.row}>
            <View style={{flexDirection: "row"}}>
              <Image
                style={{width: 45, height: 45}}
                source={getSmallArtResourceIdForWeatherCondition(weatherId)}
              />
              <View style={{flexDirection: "column", marginLeft: 16}}>
                <Text 
                  style={[styles.data, {fontSize: 16, color: primary_text,}]} 
                >
                  {dateString}
                </Text>
                <Text 
                  style={[styles.data, {fontSize: 14, color: secondary_text,}]}
                  accessible={true} 
                  accessibilityLabel={a11y_forecast(description)}
                >
                  {description}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: "row"}}>
              <Text 
                style={[{ marginRight: 20, fontSize: 25, color: primary_text, fontFamily:"sans-serif-thin"}]} 
                accessible={true} 
                accessibilityLabel={a11y_high_temp(highString)}
              >
                {highString}
              </Text>
              <Text 
                style={[{ width: 60, fontSize: 25, color: secondary_text, fontFamily:"sans-serif-thin"}]}
                accessible={true} 
                accessibilityLabel={a11y_low_temp(lowString)}
              >
                {lowString}
              </Text>
            </View>
          </View>
      </TouchableHighlight>
  )
}
const mapStateToProps = ({ weatherData }) => ({ weatherData })

const connectedForecast = connect(mapStateToProps)
export default connectedForecast(ForecastListItem)

const styles = StyleSheet.create ({
    row: {
      flexDirection: 'row',
      paddingBottom: 12,
      paddingLeft: 16,
      paddingTop: 12,
      flex: 1,
      alignItems:"center",
      justifyContent: "space-between",
    },
    data: {
        fontSize: 20,      
    },
})

function getSmallArtResourceIdForWeatherCondition (weatherId) {
    
  if (weatherId >= 200 && weatherId <= 232) {
      return require('../assets/assets-hdpi/ic_storm.png')
  } else if (weatherId >= 300 && weatherId <= 321) {
      return require('../assets/assets-hdpi/ic_light_rain.png')
  } else if (weatherId >= 500 && weatherId <= 504) {
      return require('../assets/assets-hdpi/ic_rain.png')
  } else if (weatherId == 511) {
      return require('../assets/assets-hdpi/ic_snow.png')
  } else if (weatherId >= 520 && weatherId <= 531) {
      return require('../assets/assets-hdpi/ic_rain.png')
  } else if (weatherId >= 600 && weatherId <= 622) {
      return require('../assets/assets-hdpi/ic_snow.png')
  } else if (weatherId >= 701 && weatherId <= 761) {
      return require('../assets/assets-hdpi/ic_fog.png')
  } else if (weatherId == 761 || weatherId == 771 || weatherId == 781) {
      return require('../assets/assets-hdpi/ic_storm.png')
  } else if (weatherId == 800) {
      return require('../assets/assets-hdpi/ic_clear.png') 
  } else if (weatherId == 801) {
      return require('../assets/assets-hdpi/ic_light_clouds.png')
  } else if (weatherId >= 802 && weatherId <= 804) {
      return require('../assets/assets-hdpi/ic_cloudy.png')
  } else if (weatherId >= 900 && weatherId <= 906) {
      return require('../assets/assets-hdpi/ic_storm.png')
  } else if (weatherId >= 958 && weatherId <= 962) {
      return require('../assets/assets-hdpi/ic_storm.png')
  } else if (weatherId >= 951 && weatherId <= 957) {
      return require('../assets/assets-hdpi/ic_clear.png')
  }

  //console.log("Unknown Weather: " + weatherId)
  return require('../assets/assets-hdpi/ic_storm.png')
}