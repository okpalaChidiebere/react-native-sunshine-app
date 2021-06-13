import React, { useEffect } from "react"
import { FlatList, View, } from "react-native"
import ForecastListItem from "./ForecastListItem"
import ForecastMenu from "../menu/forecast"
import { app_name, white } from "../values/colors"
import { connect } from "react-redux"
import { handleInitialData } from "../../actions/shared"


function Forecast({ route, navigation, weatherData, dispatch }) {

    const renderItem = ({ _, index }) => <ForecastListItem navigation={navigation} index={index} />

    useEffect(() => {
        (async () => {
        try{

            dispatch(handleInitialData())
         }catch(e){
             console.warn("Error with preference storage", e)
        }
        })()
    }, [])

    return (
        <View>
            <FlatList 
            data={weatherData} 
            renderItem={renderItem} 
            keyExtractor={( _ , index )=> index.toString()}
            ItemSeparatorComponent={() => <View style={{height:1, backgroundColor:"#dadada", marginLeft:8, marginRight:8}}/> }
            />
        </View>
    );
}

const mapStateToProps = ({ weatherData }) => ({ weatherData })

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