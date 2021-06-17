import React, { useEffect } from "react"
import { FlatList, View, Image } from "react-native"
import ForecastListItem from "./ForecastListItem"
import ForecastMenu from "../menu/forecast"
import { white, colorPrimary } from "../values/colors"
import { connect } from "react-redux"
import { handleInitialData } from "../../actions/shared"
import ForecastTodayListItem from "./ForecastTodayListItem"


function Forecast({ route, navigation, weatherData, dispatch }) {

    const renderItem = ({ _, index }) => {
        // if we had ItemViewType more than two, switch statement. But this will do
        //NOTE: whatever login you write in here should not be asynchronous. 
        //This function should be free from external side effects just like return block for any react component
        return(
            index === 0
            ? <ForecastTodayListItem navigation={navigation} index={index}/>
            : <ForecastListItem navigation={navigation} index={index} />
        )
    }

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
            />
        </View>
    );
}

const mapStateToProps = ({ weatherData }) => ({ weatherData })

const connectedForecast = connect(mapStateToProps)
export default connectedForecast(Forecast)

export function ForecastOptions({ route, navigation }) {

    return {
        title: "",
        headerTintColor: white,
        headerStyle: { 
            backgroundColor: colorPrimary,
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow or elevation on iOS
        },
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
        headerLeft: () => ( <Image style={{resizeMode: 'stretch', marginTop: 3, marginLeft: 15, width: 95, height: 30}} source={require("../assets/assets-hdpi/ic_logo.png")}/> ),
    }
}