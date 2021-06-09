import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FetchWeatherTask } from "./utils/NetworkUtils"
import { getPreferredWeatherLocation } from "./utils/SunshinePreferences"
import {getSimpleWeatherStringsFromJson } from "./utils/OpenWeatherJsonUtils"
import AppLoading from "expo-app-loading"
import { error_message, forecast_stack, forecast_details_stack, settings_stack } from "./res/values/strings"
import ForecastDetails, { ForecastDetailsOptions }  from "./res/components/ForecastDetails"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'
import Forecast, { ForecastOptions } from './res/components/Forecast'
import Settings, { SettingsOptions } from "./res/components/Settings"
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducers from "./reducers"
import middleware from "./middleware"


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
    <Provider store={createStore(reducers, middleware)}>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor="#303F9F"/>
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
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    marginTop: StatusBar.currentHeight || 0,
  },
});


const Stack = createStackNavigator()
  const MainNavigator = ({ weatherData }) => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name={forecast_stack}
          component={Forecast}
          options={ForecastOptions}
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
