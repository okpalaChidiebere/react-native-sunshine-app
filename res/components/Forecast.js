import React, { useEffect, useState } from "react"
import { FlatList, View, } from "react-native"
import ForecastListItem from "./ForecastListItem"
import ForecastMenu from "../menu/forecast"
import { app_name, white } from "../values/colors"
import { connect } from "react-redux"
import { FetchWeatherTask } from "../../utils/NetworkUtils"
import { getPreferredWeatherLocation } from "../../utils/SunshinePreferences"
import { getSimpleWeatherStringsFromJson } from "../../utils/OpenWeatherJsonUtils"


function Forecast({ route, navigation, sunshinePreferences }) {

    const renderItem = ({ item }) => <ForecastListItem navigation={navigation} weatherForDay={item} />

    const [ state, setState ] = useState({
    weatherData: [],
  })

    useEffect(() => {
        (async () => {
        try{
            const location = await getPreferredWeatherLocation()
            const jsonWeatherResponse = await FetchWeatherTask(location)
            const simpleJsonWeatherData = await getSimpleWeatherStringsFromJson(jsonWeatherResponse)
            setState({
            weatherData: simpleJsonWeatherData,
            })

        }catch(e){
            console.warn("Error From NetworkFetch: ", e)
        }
        })()
    }, [sunshinePreferences]) // passing this sunshinePreferences as a dependency to useEffect will make sure this Forecast componenet re-renders whevenever the sunshinepreferences store slice is updated

  const { weatherData } = state

    return (
        <View>
            <FlatList 
            data={weatherData} 
            renderItem={renderItem} 
            keyExtractor={( _ , index )=> `${index}`}
            ItemSeparatorComponent={() => <View style={{height:1, backgroundColor:"#dadada", marginLeft:8, marginRight:8}}/> }
            />
        </View>
    );
}

const mapStateToProps = ({ sunshinePreferences }) => ({
    sunshinePreferences
})

const connectedForecast = connect(mapStateToProps)
export default connectedForecast(Forecast)

export function ForecastOptions({ route, navigation }) {

    return {
        title: app_name,
        headerTintColor: white,
        headerStyle: { backgroundColor: "#3F51B5" },
        /** We have all menuItem Hiddens on this Component  */
        headerRight: () => ( 
          <ForecastMenu 
            menutext="Menu"
            menustyle={{marginRight: 8}}
            textStyle={{color: white}}
            navigation={navigation}
            route={route}
            isIcon={true}/>
        ),
    }
}