import { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { View, Text, TextInput, StyleSheet } from "react-native";

const ASSETS_PATH = "./assets/"; // Change this to the path of the icons
const ICONS = {
  EYE_OPEN: require(ASSETS_PATH + "eye-open.png"),
  EYE_CLOSED: require(ASSETS_PATH + "eye-closed.png"),
};

export default function MyInput({
  label = "",
  placeholder = "",
  value,
  onChangeText = () => {},
  type = "text", // text, password,
  disabled,
  style = {
    container: {},
    label: {},
    inputContainer: {},
    input: {},
  },
}) {
  const isPassword = type?.toLowerCase() === "password";
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      borderRadius: 10,
      gap: 4,
      ...style.container,
    },
    label: {
      width: "100%",
      ...style.label,
    },
    inputContainer: {
      backgroundColor: "white",
      width: "100%",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "gray",
      paddingHorizontal: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      ...style.inputContainer,
    },
    input: {
      flex: 1,
      ...style.input,
    },
    eyeIcon: {
      width: 20,
      height: 20,
      tintColor: isPasswordVisible ? "rgb(47, 97, 183)" : "rgb(0, 0, 0)",
      ...style.eyeIcon,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          editable={!disabled}
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !isPasswordVisible}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Image
              source={isPasswordVisible ? ICONS.EYE_OPEN : ICONS.EYE_CLOSED}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
