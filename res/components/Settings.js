import React, { useEffect } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { Provider } from "react-native-paper"
import { app_name } from "../values/strings"
import { getSunshinePreferences } from "../../utils/SunshinePreferences"
import EditTextPreference from "./EditTextPreference"
import ListPreference from "./ListPreference"
import { pref_location_key, pref_units_key } from "../values/strings"
import { connect } from "react-redux"
//import { receivePreferences } from "../../actions/preferences"
//import { startImmediateSync } from "../../utils/SunshineSyncUtils"

function Settings({ route, navigation, sunshinePreferences, dispatch }) {

    //useEffect(() => {
        /**
         * Before our component mounts, we will run the code below which will get sunshine preferences
         * then run a dispatch which updates the store causing the componet to re-render again and then we get our preferences
         * 
         * NOTE: In future lessons we probaly will add this code to App.js where we initalize the weather data from SQLite and 
         * Perferences from AsyncStorage into our redux store
         */
        //(async () => {
        //    try{
        //       const results = await getSunshinePreferences()
               /**
                * When the user changes their location, new weather data needs to be 
                * downloaded immediately
                */
        //        dispatch(receivePreferences([
        //            ...results
        //        ]))
        //    }catch(e){
        //        console.warn("Error with preference storage", e)
        //    }
        //})()
    //}, [])


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
        headerStyle: { backgroundColor: "#3F51B5" },
    }
}