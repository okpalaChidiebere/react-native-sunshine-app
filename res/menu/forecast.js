import React from "react"
import { TouchableOpacity, View, StyleSheet, Text, Alert } from "react-native"
import Menu, { MenuItem } from "react-native-material-menu"
import { Feather } from "@expo/vector-icons"
import { CommonActions } from "@react-navigation/native"
import { white } from "../values/colors"
import { action_map, action_settings, settings_stack } from "../values/strings"

const ForecastMenu = ({ menustyle, isIcon, textStyle, menutext, navigation }) => {
    
    const ICON_SIZE = 24
    let _menu = null;
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
          <MenuItem onPress={() => {Alert.alert('PopUp Menu Button Clicked...')}} style={styles.row}>
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
        marginRight: 60
    },
})

//Another good menu for react native you can explore using https://github.com/react-native-menu/menu