import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Constants from "expo-constants";
import { FetchWeatherTask } from "./utils/NetworkUtils"
import { getPreferredWeatherLocation } from "./utils/SunshinePreferences"
import {getSimpleWeatherStringsFromJson } from "./utils/OpenWeatherJsonUtils"
import AppLoading from "expo-app-loading"
import { error_message } from "./res/values/strings"
import ForecastListItem from "./res/components/ForecastListItem"


export default function App() {

  const [ state, setState ] = useState({
    weatherData: [],
    isReady: false,
  })

  useEffect(() => {
    (async () => {
      try{
        const location = await getPreferredWeatherLocation()
        const jsonWeatherResponse = await FetchWeatherTask(location)
        const simpleJsonWeatherData = getSimpleWeatherStringsFromJson(jsonWeatherResponse)
        setState({
          isReady: true,
          weatherData: simpleJsonWeatherData,
        })

      }catch(e){
        setState({
          ...state,
          isReady: true,
        })
        console.warn("Error From NetworkFetch: ", e)
      }
    })()
  }, [])

  const { weatherData, isReady } = state

  if (!isReady) {
    return <AppLoading />
  }

  const renderItem = ({ item }) => <ForecastListItem data={item} />;
  
  return (
    <View style={styles.container}>
      <SunshineStatusbar backgroundColor="#303F9F" barStyle="light-content"/>
      <View style={{backgroundColor:"#3F51B5", marginBottom: 10, paddingLeft: 20, height: 50, alignItems:"flex-start", justifyContent:"center"}}>
        <Text style={{color: '#fff', fontWeight:"bold", fontSize:20}}>Sunshine</Text>
      </View>
      {isReady 
      ? (
        <FlatList 
          data={weatherData} 
          renderItem={renderItem} 
          keyExtractor={( _ , index )=> `${index}`}
          ItemSeparatorComponent={ () => <View style={{height:1, backgroundColor:"#dadada", marginLeft:8, marginRight:8}}/> }
        />
      )
      : (
        <Text>{error_message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    marginTop: StatusBar.currentHeight || 0,
    //justifyContent: 'center',
  },
});


function SunshineStatusbar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent={true} backgroundColor={backgroundColor} {...props} />
    </View>
  )
}