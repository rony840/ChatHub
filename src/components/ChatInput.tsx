import React, { memo } from "react";
import IconButton from "./IconButton";
import { StyleSheet, TextInput, View } from "react-native";

interface chatInputProps {
    msgInput: (txtValue: string) => void
    txtValue: string;
    onSendPress: () => void;
}

const ChatInput: React.FC <chatInputProps> = props => {
    const {msgInput, txtValue, onSendPress} = props;
    return(
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Type a message..."
                value={txtValue}
                onChangeText={msgInput}
                placeholderTextColor={'rgb(198, 167, 95)'}
            />
            <IconButton opacity={true} onPress={onSendPress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgb(115, 85, 17)',
      },
      input: {
        flex: 1,
        color: 'white',
        paddingLeft: 0,
        borderRadius: 30,
        marginRight: 10,
      },
})

export default memo(ChatInput);