import React from "react"
import { StyleSheet, Text, TouchableHighlight } from "react-native"
import {primary_text, activated } from "../values/colors"
import { CommonActions } from "@react-navigation/native"
import { forecast_details_stack } from "../values/strings"
import { connect } from "react-redux"

const handleOnPress = (weatherIndex, navigation) => {
    navigation.dispatch(
        CommonActions.navigate({
          name: forecast_details_stack,
          params: {
            weatherIndex,
          },
        })
    )
}

const ForecastListItem = ({ style, navigation, weatherData, index }) => ( //FYI:  weatherForDay is a string
    <TouchableHighlight onPress={() => handleOnPress(index, navigation)} style={[styles.item, style]} underlayColor={activated}>
        <Text style={styles.data}>{weatherData[index]}</Text>
    </TouchableHighlight>
)

const mapStateToProps = ({ weatherData }) => ({ weatherData })

const connectedForecast = connect(mapStateToProps)
export default connectedForecast(ForecastListItem)

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