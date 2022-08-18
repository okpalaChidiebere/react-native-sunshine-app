import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import CheckBox from "expo-checkbox";
import {
  primary_text,
  secondary_text,
  activated,
  colorAccent,
} from "../values/colors";
import { connect } from "react-redux";
import { handleSavePerference } from "../../actions/preferences";

function CheckBoxPreference({
  title,
  value,
  summaryOff,
  summaryOn,
  onNotificationPreferenceChage,
  prefKey,
}) {
  const [isSelected, setSelection] = useState(value);

  /** handle when theuser clicks just the checkBox */
  const handlePrefChange = (value) => {
    setSelection(value);
    onNotificationPreferenceChage(prefKey, "value", value);
  };

  return (
    <Pressable
      onPress={() => {
        /** handle when the whole row area is clicked */
        setSelection(!isSelected);
        onNotificationPreferenceChage(prefKey, "value", !isSelected);
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? activated : "transparent",
        },
        styles.wrapperCustom,
      ]}
    >
      <View style={styles.preferenceRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}> {isSelected ? summaryOn : summaryOff}</Text>
      </View>
      <CheckBox
        value={isSelected}
        style={styles.checkbox}
        onValueChange={(v) => handlePrefChange(v)}
        color={isSelected ? colorAccent : undefined}
      />
    </Pressable>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNotificationPreferenceChage: (key, fieldToUpdate, value) =>
      dispatch(handleSavePerference({ key, fieldToUpdate, value })),
  };
};

const connectedEditTextPreference = connect(null, mapDispatchToProps);
export default connectedEditTextPreference(CheckBoxPreference);

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    color: colorAccent,
  },
});
