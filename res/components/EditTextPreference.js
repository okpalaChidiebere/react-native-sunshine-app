import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, KeyboardAvoidingView } from "react-native"
import { primary_text, secondary_text, activated } from "../values/colors"
import { Modal, Portal, TextInput } from "react-native-paper"
import { colorAccent } from "../values/colors"

export default function EditTextPreference({ title, value, onLocationChange }){
    const [state, setState] = useState({
        text: value,
        visible: false,
    })

    const showModal = () => setState({ ...state, visible: true})
    const hideModal = () => setState({ ...state, visible: false})
    const setText = (text) => setState({...state, text })
    const containerStyle = {backgroundColor: 'white', padding: 20, marginLeft: 30, marginRight: 30}

    const { visible, text } = state

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
                <Text style={styles.value}>{/** right now, the value does not change when the user clicks ok. I will change this here after i see of it will change when we connect this to redux*/ value}</Text>
            </View>
            <KeyboardAvoidingView behavior="padding">
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Text style={{fontSize: 20, fontWeight:"700" }}>{title}</Text>
                        <TextInput
                        underlineColor={colorAccent}
                        value={text}
                        selectionColor={colorAccent}
                        onChangeText={text => setText(text)}
                        theme={{colors: {primary: colorAccent /* why we need this here https://stackoverflow.com/questions/58786281/change-label-color-textinput-react-native-paper-onfocus */}}}
                        style={{backgroundColor:"white", paddingBottom: 0}}
                        />
                        <View style={{flexDirection:"row", justifyContent:"flex-end", marginTop: 20, marginRight: 10}}>
                            <Pressable onPress={hideModal}><Text style={{color: colorAccent, fontWeight:"700"}}>CANCEL</Text></Pressable>
                            <View style={{width: 50}}/>
                            <Pressable onPress={() => {
                                onLocationChange(text)
                                hideModal()
                            }}><Text style={{color: colorAccent, fontWeight:"700"}}>OK</Text></Pressable>
                        </View>
                    </Modal>
                </Portal>
            </KeyboardAvoidingView>
        </Pressable>
    )
}

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

//More ways to edit TextInput eg for password  https://github.com/callstack/react-native-paper/issues/1164