import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableHighlight, View, Image } from "react-native"
import { getLargeArtResourceIdForWeatherCondition } from "../values/strings"
import { connect } from "react-redux"
import { formatTemperature, getStringForWeatherCondition } from "../../utils/SunshineWeatherUtils"
import { getFriendlyDateString } from "../../utils/SunshineDateUtils"


const ForecastTodayListItem = ({ navigation, weatherData, index }) => {

    const [ forcastForToday, setForcastForToday ] = useState({
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
  
          setForcastForToday({
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
    }, [ weatherData ])

    const { dateString, description, highString, lowString, weatherId } = forcastForToday


    return (
        <TouchableHighlight >
            <View style={styles.row}>
                <View style={{ alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize: 20}}>{dateString}</Text>
                </View>
                <View style={{flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10}}
                >
                    <View style={{
                    flexDirection: "column",
                    }}> 
                        <Image
                            style={{width: 96, height: 96}}
                            source={getLargeArtResourceIdForWeatherCondition(weatherId)}
                        />
                        <Text style={{marginTop: 8, fontSize: 20}}>{description}</Text>
                    </View>
                    <View style={{
                    width: 70, height: 90,
                    }}/>
                    <View style={{
                    width: 150, height: 80,
                    flexDirection: "column",
                    alignItems:"flex-end", justifyContent:"center",
                    marginTop: 30,
                    //backgroundColor: '#673AB7'
                    }}>
                        <Text style={{fontSize: 72 }}>{highString}</Text>
                        <Text style={{fontSize: 36, marginRight: 25}}>{lowString}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const mapStateToProps = ({ weatherData }) => ({ weatherData })

const connectedForecastTodayListItem = connect(mapStateToProps)
export default connectedForecastTodayListItem(ForecastTodayListItem)

const styles = StyleSheet.create ({
    row: {
      flexDirection: 'column',
      paddingBottom: 20,
      paddingTop: 20,
    },
})