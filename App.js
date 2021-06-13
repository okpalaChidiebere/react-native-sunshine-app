import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
import { createTable } from "./utils/AppDatabase"
import { initialize } from "./utils/SunshineSyncUtils"


export default function App() {

  const [ state, setState ] = useState({
    isReady: false,
    initialized: false, //This will be mainly used as a safeguard to prevent calling the synchronize method more than once.
  })

  useEffect(() => {
    (async () => {
      try{
        createTable()

        /** 
         * We check if an immediate sync is required. It’s best practice to not initialize things more than once, 
         * so for that, we will make sure that startImmediateSync will only get called once when the app starts 
         * and only if the database was empty.
         */
        if(!state.initialized){
          await initialize()
        }

        setState({
          isReady: true,
          initialized: true,
        })

      }catch(e){
        setState({
          isReady: true,
        })
        console.warn("Error From NetworkFetch: ", e)
      }
    })()
  }, [])

  const { isReady } = state

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
            <MainNavigator />
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
  const MainNavigator = () => (
    <Stack.Navigator headerMode="screen">
        <Stack.Screen
          name={forecast_stack}
          component={Forecast}
          options={ForecastOptions}
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
