import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Constants from "expo-constants";
import { FetchWeatherTask } from "./utils/NetworkUtils"
import { getPreferredWeatherLocation } from "./utils/SunshinePreferences"
import {getSimpleWeatherStringsFromJson } from "./utils/OpenWeatherJsonUtils"


export default function App() {

  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    (async () => {
      try{
        const location = await getPreferredWeatherLocation()
        const jsonWeatherResponse = await FetchWeatherTask(location)
        const simpleJsonWeatherData = getSimpleWeatherStringsFromJson(jsonWeatherResponse)
        setWeatherData(simpleJsonWeatherData)
      }catch(e){
        console.warn("Error From NetworkFetch: ", e)
      }
    })()
  }, [])
  
  return (
    <View style={styles.container}>
      <SunshineStatusbar backgroundColor="#303F9F" barStyle="light-content"/>
      <View style={{backgroundColor:"#3F51B5", marginBottom: 10, paddingLeft: 20, height: 50, alignItems:"flex-start", justifyContent:"center"}}>
        <Text style={{color: '#fff', fontWeight:"bold", fontSize:20}}>Sunshine</Text>
      </View>
      <ScrollView>
        {weatherData.map((wd, index) => <Text key={index} style={{padding:16, fontSize:20}}>{wd}</Text>)}
      </ScrollView>
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