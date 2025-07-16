import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StyleSheet } from "react-native";

const ASSETS_PATH = "./assets/"; // Change this to the path of the icons
const ICON = {
  CHECKBOX_CHECKED: require(ASSETS_PATH + "checkbox-checked.png"),
  CHECKBOX_UNCHECKED: require(ASSETS_PATH + "checkbox-unchecked.png"),
  RADIO_CHECKED: require(ASSETS_PATH + "radio-checked.png"),
  RADIO_UNCHECKED: require(ASSETS_PATH + "radio-unchecked.png"),
};

export default function MyCheckbox({
  label, // text to display next to the checkbox/radio
  value, // value of the checkbox/radio
  bindState = [], // current state of the useState(), if multiple is true, it should be an array, else it should be a single value
  onPress = () => {}, // set function of the useState() to handle the press event
  multiple = true, // if true, act as a checkbox, else it will be a radio button
  disabled = false, // if true, the checkbox/radio will be disabled
  style = {}, // style object to apply to the checkbox/radio
}) {
  function handlePress() {
    let newState = bindState;
    if (multiple) {
      if (bindState.includes(value)) {
        newState = bindState.filter((v) => v !== value);
      } else {
        newState = [...bindState, value];
      }
    } else {
      newState = value;
    }
    onPress(newState);
  }

  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (multiple) {
      setIsChecked(bindState.includes(value));
    } else {
      setIsChecked(bindState === value);
    }
  }, [bindState, value, multiple]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      ...style?.container,
      opacity: disabled ? 0.5 : 1,
    },
    image: {
      width: 20,
      height: 20,
      tintColor: isChecked ? "rgb(47, 97, 183)" : "rgb(0, 0, 0)",
      ...style?.image,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      ...style?.label,
    },
  });

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={
            isChecked
              ? multiple
                ? ICON.CHECKBOX_CHECKED
                : ICON.RADIO_CHECKED
              : multiple
              ? ICON.CHECKBOX_UNCHECKED
              : ICON.RADIO_UNCHECKED
          }
        />
        <Text>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
