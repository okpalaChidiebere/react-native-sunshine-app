import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { app_name } from "../values/strings"

export default function Settings({ route, navigation }) {

    return (
        <View style={styles.container}>
            <Text>Your Setting Sunshine Preferences goes here</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

export function SettingsOptions({ _ }) {

    return {
        title: app_name,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: "#3F51B5" },
    }
}