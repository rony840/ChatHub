import { StyleSheet, Image, Pressable } from "react-native";
import { Colors } from "../assets/colors/Colors";
import { memo } from "react";

const IconButton = ({ onPress, opacity = true }) => {
  
  return (
    <Pressable
      style={({ pressed }) => [
        opacity ? styles.iconContainer1 : styles.iconContainer2,
        pressed && styles.iconPressed,  // Apply scale effect on press
      ]}
      onPress={onPress}
    >
      <Image style={styles.icon1}
      source={require("../assets/icons/send.png")} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon1: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    tintColor: Colors.white,
    zIndex: 1,
  },
  iconContainer1: {
    height: 45,
    width: 45,
    padding: 5,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: 'rgb(229, 220, 40)',
    alignItems: 'center',
  },
  iconContainer2: {
    height: 45,
    width: 45,
    padding: 5,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: Colors.transparent, // Transparent background
    alignItems: 'center',
  },
  iconPressed: {
    backgroundColor: Colors.iconPressed,  // Slightly scale down the button when pressed
  },
});

export default memo(IconButton);
