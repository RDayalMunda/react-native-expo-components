import { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";

const ASSETS_PATH = "./assets";
const ICON_RADIO_ON = require(`${ASSETS_PATH}/radio-checked.png`);
const ICON_RADIO_OFF = require(`${ASSETS_PATH}/radio-unchecked.png`);
const ICON_CHECKBOX_ON = require(`${ASSETS_PATH}/checkbox-checked.png`);
const ICON_CHECKBOX_OFF = require(`${ASSETS_PATH}/checkbox-unchecked.png`);

export default function MyCheckbox({
  onPress = () => {},
  value = "", // value to bind
  bindValue = [], // value binded to this field, // should be array for mulitple value // should be string for single value
  multiple = true,
  label = "",
  disabled,
}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    let isChecked = false;
    if (multiple) {
      isChecked = bindValue.includes(value);
    } else {
      isChecked = bindValue === value;
    }
    setIsChecked(isChecked);
  }, [bindValue, value]);

  function handlePress() {
    if (multiple) {
      // handle unselect
      if (bindValue.includes(value)) {
        onPress(bindValue.filter((item) => item !== value));
      } else {
        onPress([...bindValue, value]);
      }
    } else {
      onPress(value);
    }
  }

  const styles = StyleSheet.create({
    container: {
      opacity: disabled ? 0.5 : 1,
    },
    checkboxIcon: {
      width: 20,
      height: 20,
      tintColor: isChecked ? "rgb(38, 106, 184)" : "rgb(0, 0, 0)",
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      disabled={disabled}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={
            isChecked
              ? multiple
                ? ICON_CHECKBOX_ON
                : ICON_RADIO_ON
              : multiple
              ? ICON_CHECKBOX_OFF
              : ICON_RADIO_OFF
          }
          style={styles.checkboxIcon}
        />
        {label && <Text>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
}
