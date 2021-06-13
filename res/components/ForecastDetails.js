import React from "react"
import { StyleSheet, Text, View, Share, TouchableOpacity }  from "react-native"
import { primary_text, white } from "../values/colors"
import ForecastDetailsMenu from "../menu/forecastDetails"
import { Ionicons } from "@expo/vector-icons"
import { connect } from "react-redux"

function ForecastDetails({ route, navigation, weatherData }){

    const { weatherIndex } = route.params

    return (
        <View style={styles.container}>
            <Text style={styles.display_weather}>{weatherData[weatherIndex]}</Text>
        </View>
    );
}

const mapStateToProps = ({ weatherData }) => ({ weatherData })

const connectedForecast = connect(mapStateToProps)
export default connectedForecast(ForecastDetails)

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

export function ForecastDetailsOptions({ route, navigation }) {

    const handleOnClickShareTextButton = async () => {
        
        const title = "Learning How to Share"
        const textThatYouWantToShare =
            "Sharing the coolest thing I've learned so far. You should " +
                "check out Udacity and Google's Android Nanodegree!"

        /*
        More content config options here
        https://reactnative.dev/docs/share 
        https://github.com/react-native-share/react-native-share/issues/866
        https://github.com/react-native-share/react-native-share/issues/767
        */
        const content = { title, message: textThatYouWantToShare }

        try {
            const result = await Share.share(content)
              
            // The content was successfully shared.
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // The dialog has been dismissed.
            }
        }catch (error) {
            console.log(error.message)
        }
    }

    return {
        title: 'Details',
        headerTintColor: white,
        headerStyle: { backgroundColor: "#3F51B5" },
        /** We show one menuIcon(share-social) on screen and have other menu items hidden only to appear when "more" icon is clicked */
        headerRight: () => ( 
            <View style={{flexDirection: "row", justifyContent: "space-between", width: 80}}>
              <TouchableOpacity onPress={handleOnClickShareTextButton}>
                <Ionicons name="share-social" size={24} color={white} />
              </TouchableOpacity>
              <ForecastDetailsMenu
                menutext="Menu"
                menustyle={{marginRight: 8}}
                textStyle={{color: 'white'}}
                navigation={navigation}
                route={route}
                isIcon={true}
                />
            </View> 
        ),
    }
}
/**
 * You probaly my want TouchWithNativeFeedback for android menu icons like share only https://reactnative.dev/docs/touchablenativefeedback
 */