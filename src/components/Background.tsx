import { Colors } from "assets/colors/Colors";
import React, { memo } from "react";
import { View, StyleSheet } from "react-native";

const Background: React.FC = () => {
  return <View style={styles.outer} />;
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
});

export default memo(Background);
