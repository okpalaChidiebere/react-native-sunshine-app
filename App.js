import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from "expo-constants";
import { FetchWeatherTask } from "./utils/NetworkUtils"
import { getPreferredWeatherLocation } from "./utils/SunshinePreferences"
import {getSimpleWeatherStringsFromJson } from "./utils/OpenWeatherJsonUtils"
import AppLoading from "expo-app-loading"
import { error_message, forecast_stack, forecast_details_stack, settings_stack } from "./res/values/strings"
import ForecastDetails, { ForecastDetailsOptions }  from "./res/components/ForecastDetails"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import Forecast from './res/components/Forecast'
import Settings, { SettingsOptions } from "./res/components/Settings"

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
      {isReady 
      ? (
        <NavigationContainer>
          <MainNavigator weatherData={weatherData}/>
        </NavigationContainer>     
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

const Stack = createStackNavigator()
  const MainNavigator = ({ weatherData }) => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name={forecast_stack}
          component={Forecast}
          options={{
            title: 'Sunshine',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: "#3F51B5" },
          }}
          initialParams={{ weatherData }}
        />
        <Stack.Screen
          name={forecast_details_stack}
          component={ForecastDetails}
          options={/*If you do not specify this option, react-native will still add it for you but with default options*/
            ForecastDetailsOptions
          }
        />
        <Stack.Screen
          name={settings_stack}
          component={Settings}
          options={SettingsOptions}
        />
    </Stack.Navigator>
  )


  /**
   * 
   * <View style={{backgroundColor:"#3F51B5", marginBottom: 10, paddingLeft: 20, height: 50, alignItems:"flex-start", justifyContent:"center"}}>
        <Text style={{color: '#fff', fontWeight:"bold", fontSize:20}}>Sunshine</Text>
      </View>
   */