import React from "react"
import { StyleSheet, Text, View } from "react-native"
import {primary_text} from "../values/colors"

const ForecastListItem = ({ data }) => (
    <View style={styles.item}>
        <Text style={styles.data}>{data}</Text>
    </View>
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