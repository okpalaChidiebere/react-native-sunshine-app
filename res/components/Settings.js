import React from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Provider } from "react-native-paper"
import { app_name } from "../values/strings"
import EditTextPreference from "./EditTextPreference"
import ListPreference from "./ListPreference"
import { pref_location_key, pref_units_key, pref_enable_notifications_key } from "../values/strings"
import { connect } from "react-redux"
import CheckBoxPreference from "../components/CheckBoxPreference"
import { colorPrimary } from "../values/colors"

function Settings({ route, navigation, sunshinePreferences, dispatch }) {

    return (
        <Provider style={styles.container}>
            <View>
            <ScrollView>
            {sunshinePreferences.map((pref) => {
                const key = pref.prefKey
                return (
                    <View key={key}>
                        {/** more on switching JSX https://stackoverflow.com/questions/46592833/how-to-use-switch-statement-inside-a-react-component **/
                            {
                                [pref_location_key]: <EditTextPreference value={pref.value} {...pref}/>,
                                [pref_units_key]: <ListPreference unit={pref.unit} {...pref}/>,
                                [pref_enable_notifications_key]: <CheckBoxPreference value={pref.value} {...pref}/>,
                            }[key]
                        }
                    </View>
                )
            })}
            </ScrollView>
            </View>
        </Provider>
    )
}

const mapStateToProps = ({ sunshinePreferences }) => ({
    sunshinePreferences
})

const connectedSettings = connect(mapStateToProps)
export default connectedSettings(Settings)


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
        headerStyle: { backgroundColor: colorPrimary },
    }
}