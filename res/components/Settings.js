import React, { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Provider } from "react-native-paper"
import { app_name } from "../values/strings"
import { getSunshinePreferences } from "../../utils/SunshinePreferences"
import EditTextPreference from "./EditTextPreference"
import ListPreference from "./ListPreference"


export default function Settings({ route, navigation }) {

    const sunshinePreferences = getSunshinePreferences() //This returns us the whole preferences. We will be getting this from redux in a future lesson
    const { location, units } = sunshinePreferences

    /* 
    This will state will be gotten from Redux (Redux loads the actual value from AsyncStorage) 
    for future implementation. This is fine for now
    */
    const [state, setState] = useState({
        location: location.value, //string
        units: units.unit, //string
    })

    const locationChange = (newLocation) => {
        //console.log(newLocation)
        console.log("You will update Redux and Redux will HAVE TO update AsyncStorage")
    }

    const unitsChange = (unit) => {
        //console.log(unit)
        console.log("You will update Redux and Redux will HAVE TO update AsyncStorage")
    }


    return (
        <Provider style={styles.container}>
            <ScrollView>
            {Object.keys(sunshinePreferences).map( key => {
                const value = state[key]

                return (
                    <View key={key}>
                        {/** more on switching JSX https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component **/
                            {
                                location: <EditTextPreference value={value}  onLocationChange={locationChange} {...sunshinePreferences[key]}/>,
                                units: <ListPreference unit={value} onUnitsChange={unitsChange} {...sunshinePreferences[key]}/>,
                            }[key]
                        }
                    </View>
                )
            })}
            </ScrollView>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
});

export function SettingsOptions({ _ }) {

    return {
        title: app_name,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: "#3F51B5" },
    }
}