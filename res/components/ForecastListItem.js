import React from "react"
import { StyleSheet, Text, TouchableHighlight, ToastAndroid, Platform } from "react-native"
import {primary_text, activated } from "../values/colors"

const handleOnPress = (weatherForDay) => {
    Platform.OS == 'android' && (ToastAndroid.showWithGravityAndOffset(
      weatherForDay,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    ))
}

const ForecastListItem = ({ weatherForDay, style }) => ( //FYI: weather for the day is a string
    <TouchableHighlight onPress={() => handleOnPress(weatherForDay)} style={[styles.item, style]} underlayColor={activated}>
        <Text style={styles.data}>{weatherForDay}</Text>
    </TouchableHighlight>
)

export default ForecastListItem

const styles = StyleSheet.create ({
    row: {
      flexDirection: 'row',
      flex: 1,
    },
    data: {
        padding: 16,
        fontSize: 20,
        color: primary_text,
    },
})