import React, { useState } from "react"
import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView } from "react-native"
import { primary_text, secondary_text, activated } from "../values/colors"
import { Modal, Portal, RadioButton } from "react-native-paper"
import {  colorAccent } from "../values/colors"
import { connect } from "react-redux"
import { handleSavePerference } from "../../actions/preferences"

function ListPreference({ prefKey, title, unit, entries, entryValues, onUnitsChange }){

    const [state, setState] = useState({
        checked: unit,
        visible: false,
    })

    const setChecked = (newValueChecked) => {
        setState({ checked: newValueChecked, visible: false }) //we close the modal as well as soon as the user selects a value
        onUnitsChange(prefKey, "unit", newValueChecked)
    }
    const showModal = () => setState({ ...state, visible: true})
    const hideModal = () => setState({ ...state, visible: false})
    const containerStyle = {backgroundColor: 'white', padding: 20, marginLeft: 30, marginRight: 30}

    const { visible, checked } = state
    return(
        <Pressable
        onPress={showModal}
        style={({ pressed }) => [
        {
            backgroundColor: pressed
            ? activated
            : 'transparent'
        },
        ]}>
            <View style={styles.preferenceRow}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{unit}</Text>
            </View>
            <KeyboardAvoidingView behavior="padding">
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Text style={{fontSize: 20, fontWeight:"700" }}>{title}</Text>
                        {/* we loop through each entry and map the correct entryValue for each entry*/
                            entries.map((entry, index) => (
                                <View key={entry} style={{flexDirection:"row", marginTop: 20, marginRight: 10, alignItems:"center"/*justifyContent:"space-between"*/}}>
                                    <RadioButton
                                        color={colorAccent}
                                        value={entryValues[index]}
                                        status={ checked === entryValues[index] ? 'checked' : 'unchecked' }
                                        onPress={() => setChecked(entryValues[index])}
                                    />
                                    <Text style={{fontWeight:"600", marginLeft: 30, fontSize: 17 }}>{entry}</Text>
                                </View>
                            ))
                        }
                        <View style={{flexDirection:"row", justifyContent:"flex-end", marginTop: 20, marginRight: 10}}>
                            <Pressable onPress={hideModal}><Text style={{color: colorAccent, fontWeight:"700"}}>CANCEL</Text></Pressable>
                        </View>
                    </Modal>
                </Portal>
            </KeyboardAvoidingView>
        </Pressable>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onUnitsChange: (key, fieldToUpdate, value) => dispatch(handleSavePerference({ key, fieldToUpdate, value }))
    }
}

const connectedListPreference = connect(null, mapDispatchToProps)
export default connectedListPreference(ListPreference)

const styles = StyleSheet.create({
    title: {
        color: primary_text,
        fontSize: 15,
    },
    value: {
        color: secondary_text,
        fontSize: 14,
    },
    preferenceRow: {
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 20,
        paddingLeft: 50,
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6
    },
})