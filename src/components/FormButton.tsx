import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../assets/colors/Colors";
import React, { memo } from "react";

interface formButtonProps {
    btStyle: object | undefined;
    title: string;
    btTxt: object | undefined;
    onPress: () => void;
    disabled: boolean
}

const FormButton: React.FC <formButtonProps> = (props)=> {
    const {btStyle,title,btTxt,onPress,disabled} = props;
    return(
        <TouchableOpacity
        disabled={disabled}
            onPress={onPress}>
            <View style={{...styles.btn,...btStyle}}>
            <Text style={{...styles.btnText,...btTxt}}>{title||"Button Name"}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        flexDirection:'row',
        justifyContent: 'center',
        height:60,
        width:150,
        borderRadius:10,
        backgroundColor: Colors.formButtonBG,
        marginBottom: 20
    },
    btnText: {
        fontSize: 20,
        fontWeight: '600',
        alignSelf:'center',
        color: Colors.formButtonTxt,
    },
});

export default memo(FormButton);