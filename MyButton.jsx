import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

export default function MyButton({
  children,
  title,
  onPress = () => {},
  disabled,
  style = {
    container: {},
    text: {},
    icon,
  },
  variant = "primary",
  icon, // make sure this has a source of the icon, if not leave it blank, else it will throw an error
}) {
  function handlePress() {
    if (!disabled) {
      onPress();
    }
  }

  const variantStyles = {
    primary: {
      container: {
        backgroundColor: "rgb(47, 97, 183)",
      },
      text: {
        color: "rgb(225, 230, 238)",
      },
    },
    secondary: {
      container: {
        backgroundColor: "rgb(225, 230, 238)",
      },
      text: {
        color: "rgb(47, 97, 183)",
      },
    },
  };

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 5,
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      justifyContent: "center",
      ...variantStyles[variant]?.container,
      ...style.container,
      opacity: disabled ? 0.5 : 1,
    },
    text: {
      ...variantStyles[variant]?.text,
      ...style.text,
    },
    icon: {
      width: 20,
      height: 20,
      tintColor: variantStyles[variant]?.text?.color,
      ...style.icon,
    },
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.container}
      disabled={disabled}
    >
      {icon && <Image source={icon} style={styles.icon} />}
      {title && <Text style={styles.text}>{title}</Text>}
      {children}
    </TouchableOpacity>
  );
}
