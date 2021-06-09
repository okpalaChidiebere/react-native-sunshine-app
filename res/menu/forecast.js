import React from "react"
import { TouchableOpacity, View, StyleSheet, Text, Linking } from "react-native"
import Menu, { MenuItem } from "react-native-material-menu"
import { Feather } from "@expo/vector-icons"
import { CommonActions } from "@react-navigation/native"
import { white } from "../values/colors"
import { action_map, action_settings, settings_stack } from "../values/strings"

const ForecastMenu = ({ menustyle, isIcon, textStyle, menutext, navigation }) => {
    
    const ICON_SIZE = 24
    let _menu = null;

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

    return (
      <View style={menustyle}>
        <Menu
          ref={(ref) => (_menu = ref)}
          button={
            isIcon ? (
              <TouchableOpacity onPress={() => _menu.show()}>
                <Feather name="more-vertical" size={ICON_SIZE} color={white} />
              </TouchableOpacity>
            ) : (
              <Text
                onPress={() => _menu.show()}
                 style={textStyle}>
                {menutext}
              </Text>
            )
          }>
          <MenuItem onPress={() => openLocationInMap()} style={styles.row}>
            {action_map}
          </MenuItem>
          <MenuItem onPress={() => navigation.dispatch(CommonActions.navigate({
                name: settings_stack,
            }))} style={styles.row}>
            {action_settings}
          </MenuItem>
   
        </Menu>
      </View>
    );
};

export default ForecastMenu

const styles = StyleSheet.create ({
    row: {
        paddingRight: 60
    },
})

//Another good menu for react native you can explore using https://github.com/react-native-menu/menu