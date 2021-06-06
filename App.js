import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Constants from "expo-constants";
import { FetchWeatherTask } from "./utils/NetworkUtils"
import { getPreferredWeatherLocation } from "./utils/SunshinePreferences"
import {getSimpleWeatherStringsFromJson } from "./utils/OpenWeatherJsonUtils"
import AppLoading from "expo-app-loading"
import { error_message } from "./res/values/strings"


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
  
  return (
    <View style={styles.container}>
      <SunshineStatusbar backgroundColor="#303F9F" barStyle="light-content"/>
      <View style={{backgroundColor:"#3F51B5", marginBottom: 10, paddingLeft: 20, height: 50, alignItems:"flex-start", justifyContent:"center"}}>
        <Text style={{color: '#fff', fontWeight:"bold", fontSize:20}}>Sunshine</Text>
      </View>
      {isReady 
      ? (
        <ScrollView>
        {weatherData.map((wd, index) => <Text key={index} style={{padding:16, fontSize:20}}>{wd}</Text>)}
        </ScrollView>
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