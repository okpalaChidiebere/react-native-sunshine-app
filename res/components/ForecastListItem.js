import React from "react"
import { StyleSheet, Text, TouchableHighlight } from "react-native"
import {primary_text, activated } from "../values/colors"
import { CommonActions } from "@react-navigation/native"
import { forecast_details_stack } from "../values/strings"

const handleOnPress = (weatherForDay, navigation) => {
    navigation.dispatch(
        CommonActions.navigate({
          name: forecast_details_stack,
          params: {
            weatherForDay,
          },
        })
    )
}

const ForecastListItem = ({ weatherForDay, style, navigation }) => ( //FYI:  weatherForDay is a string
    <TouchableHighlight onPress={() => handleOnPress(weatherForDay, navigation)} style={[styles.item, style]} underlayColor={activated}>
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