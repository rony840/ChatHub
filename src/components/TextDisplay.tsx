import { StyleSheet, Text } from "react-native";
import { Colors } from "../assets/colors/Colors";
import React, { memo } from "react";

interface textDisplayProps{
    txt: string
}

const TextDisplay: React.FC <textDisplayProps> = (props) => {
    const {txt} = props;
    return(<Text style={styles.txtStyle}>{txt}</Text>);
}

const styles = StyleSheet.create({
    txtStyle:{
        textAlign:'center',
        fontSize: 45,
        color: Colors.companyName,
    }
})

export default memo(TextDisplay);