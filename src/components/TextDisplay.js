import { StyleSheet, Text } from "react-native";
import { Colors } from "../assets/colors/Colors";
import { memo } from "react";

const TextDisplay = (props) => {
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