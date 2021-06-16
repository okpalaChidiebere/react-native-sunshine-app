import React from "react"
import { Text, View, Image }  from "react-native"
import { a11y_forecast, a11y_high_temp, a11y_low_temp } from "../values/strings"


const PrimaryWeatherInfo = ({ getIcon, dateString, highString, lowString, description }) => {

    return(
        <View style={{flex: 1,
            flexDirection: 'column',
            alignItems: 'stretch'}}>
            <View style={{
                flex: 1,
                justifyContent:"flex-end",
                alignItems:"center",
            }}>
                    <Text style={{fontSize: 20}}>{dateString}</Text>
            </View>
            <View style={{ flex: 1,
              flexDirection:"row",
              justifyContent: 'space-around',}}
            >
                <Image
                    style={{width: 96, height: 96, alignSelf:"flex-end"}}
                    source={getIcon()}
                />
                <Text 
                style={{marginTop: 8, fontSize: 72, alignSelf:"flex-end" }}
                accessible={true} 
                accessibilityLabel={a11y_high_temp(highString)}
                >{highString}</Text>
            </View>
            <View style={{ flex: 1,
              flexDirection:"row",
              justifyContent: 'space-around'}}
            >
                <Text 
                style={{ fontSize: 20, marginTop: 15 }}
                accessible={true} 
                accessibilityLabel={a11y_forecast(description)}
                >
                    {description}
                </Text>
                <Text 
                style={{ fontSize: 36, marginRight: 25 }}
                accessible={true} 
                accessibilityLabel={a11y_low_temp(lowString)}
                >
                    {lowString}
                </Text>
            </View>
          </View>
    )
}

export default PrimaryWeatherInfo