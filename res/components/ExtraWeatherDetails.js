import React from "react"
import { Text, View }  from "react-native"
import { wind_label, humidity_label, pressure_label, 
    a11y_humidity, a11y_pressure, a11y_wind } from "../values/strings"
import { white, detail_accent_label, detail_accent_pane_background } from "../values/colors"

const ExtraWeatherDetails = ({ humidity, pressure, wind }) => {

    return (
        <View style={{flex: 1,
            flexDirection: 'column',
            backgroundColor: detail_accent_pane_background,
            alignItems: 'stretch'}}
        >
            <View style={{
            flexGrow: 1,
            flexDirection: "row",
            alignItems: "center",
            }}
            accessible={true} 
            accessibilityLabel={a11y_humidity(humidity)}
            >
                <View style={{
                    flex: 1,
                    marginLeft: 30}}
                >
                    <Text style={{fontSize: 19, color: detail_accent_label}}>{humidity_label}</Text>
                </View>
                <View style={{flex: 1,
                    justifyContent:"flex-start"}}
                >
                    <Text style={{fontSize: 23, color: white}}>{humidity}</Text>
                </View>
            </View>
            <View style={{
            flexGrow: 1,
            flexDirection: "row",
            justifyContent:"space-around",
            alignItems: "center"}}
            accessible={true} 
            accessibilityLabel={a11y_pressure(pressure)}
            >
                <View style={{
                    flex: 1,
                    marginLeft: 30}}
                >
                    <Text style={{fontSize: 19, color: detail_accent_label}}>{pressure_label}</Text>
                </View>
                <View style={{flex: 1,
                    justifyContent:"flex-start"}}
                >
                    <Text style={{fontSize: 23, color: white}}>{pressure}</Text>
                </View>
            </View>
            <View style={{
            flexGrow: 1,
            flexDirection: "row",
            justifyContent:"space-around",
            alignItems: "center"}}
            accessible={true} 
            accessibilityLabel={a11y_wind(wind)}
            >
                <View style={{
                    flex: 1,
                    marginLeft: 30}}
                >
                    <Text style={{fontSize: 19, color: detail_accent_label}}>{wind_label}</Text>
                </View>
                <View style={{flex: 1,
                    justifyContent:"flex-start"}}
                >
                    <Text style={{fontSize: 23, color: white}}>{wind}</Text>
                </View>
            </View>
        </View>
    )
}

export default ExtraWeatherDetails