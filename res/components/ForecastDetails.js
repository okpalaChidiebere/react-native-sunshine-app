import React from "react"
import { StyleSheet, Button, Text, View }  from "react-native"
import { primary_text } from "../values/colors"

export default function ForecastDetails({ route, navigation}){

    const { weatherForDay } = route.params

    return (
        <View style={styles.container}>
          <Text style={styles.display_weather}>{weatherForDay}</Text>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
    },
    display_weather: {
        fontSize: 22,
        color: primary_text,
    },
})

export function ForecastDetailsOptions({ route }) {

    return {
        title: 'Details',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: "#3F51B5" },
    }
}
