import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Constants from "expo-constants";

const dummyWeatherData = [
  "Today, May 17 - Clear - 17°C / 15°C",
  "Tomorrow - Cloudy - 19°C / 15°C",
  "Thursday - Rainy- 30°C / 11°C",
  "Friday - Thunderstorms - 21°C / 9°C",
  "Saturday - Thunderstorms - 16°C / 7°C",
  "Sunday - Rainy - 16°C / 8°C",
  "Monday - Partly Cloudy - 15°C / 10°C",
  "Tue, May 24 - Meatballs - 16°C / 18°C",
  "Wed, May 25 - Cloudy - 19°C / 15°C",
  "Thu, May 26 - Stormy - 30°C / 11°C",
  "Fri, May 27 - Hurricane - 21°C / 9°C",
  "Sat, May 28 - Meteors - 16°C / 7°C",
  "Sun, May 29 - Apocalypse - 16°C / 8°C",
  "Mon, May 30 - Post Apocalypse - 15°C / 10°C",
];

export default function App() {
  return (
    <View style={styles.container}>
      <SunshineStatusbar backgroundColor="#303F9F" barStyle="light-content"/>
      <View style={{backgroundColor:"#3F51B5", marginBottom: 10, paddingLeft: 20, height: 50, alignItems:"flex-start", justifyContent:"center"}}>
        <Text style={{color: '#fff', fontWeight:"bold", fontSize:20}}>Sunshine</Text>
      </View>
      <ScrollView>
        {dummyWeatherData.map((wd, index) => <Text key={index} style={{padding:16, fontSize:20}}>{wd}</Text>)}
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