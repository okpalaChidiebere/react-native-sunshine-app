import React from "react"
import { FlatList, View, } from "react-native"
import ForecastListItem from "./ForecastListItem"


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