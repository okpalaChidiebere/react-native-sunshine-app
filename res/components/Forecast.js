import React from "react"
import { FlatList, View, } from "react-native"
import ForecastListItem from "./ForecastListItem"
import ForecastMenu from "../menu/forecast"
import { app_name, white } from "../values/colors"


export default function Forecast({ route, navigation }) {

    const renderItem = ({ item }) => <ForecastListItem navigation={navigation} weatherForDay={item} />
    const { weatherData } = route.params //we get the data passed into the initialParams by the Stack

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