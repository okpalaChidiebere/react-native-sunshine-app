import React from "react"
import { StyleSheet, Button, Text, View, Platform, Linking, Share, Alert }  from "react-native"
import { primary_text } from "../values/colors"

export default function ForecastDetails({ route, navigation}){

    const openLocationInMap = async () => {
        const addressString = "1600 Ampitheatre Parkway, CA"
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
        const geoLocartionUrl = scheme + addressString

        const supported = await Linking.canOpenURL(geoLocartionUrl)

        if (supported) {
            await Linking.openURL(geoLocartionUrl)
        }else{
            //The user may not have any app installed that will fulfil our request
            console.log("Couldn't call " + geoLocartionUrl
            + ", no receiving apps installed!")
        }
    }

    const openWebsite = async () => {
        const url = "https://google.com"

        const supported = await Linking.canOpenURL(url)

        if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url)
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`)
        }
    }

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

    const { weatherForDay } = route.params

    return (
        <View style={styles.container}>
            <Text style={styles.display_weather}>{weatherForDay}</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <View style={{ marginTop: 50 }}>
                <Button title="OPEN LOCATION IN MAP" onPress={() => openLocationInMap()} />
            </View>
            <View style={{ marginTop: 50 }}>
                <Button title="OPEN WEBSITE" onPress={openWebsite} />
            </View>
            <View style={{ marginTop: 50 }}>
                <Button title="SHARE TEXT CONTENT" onPress={handleOnClickShareTextButton} />
            </View>
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
