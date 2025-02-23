import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface msg{
  sender: string;
  text: string;
  timestamp: string;
}

interface props{
  message: msg;
  isCurrentUser: boolean;
}

const ChatBubble: React.FC<props> = ({ message, isCurrentUser }) => {
  return (
    <View style={[styles.container, isCurrentUser ? styles.currentUser : styles.otherUser]}>
      <Text style={styles.username}>{message.sender}</Text>
      <Text style={styles.text}>{message.text}</Text>
      <Text style={styles.timestamp}>{new Date(message.timestamp).toLocaleTimeString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  currentUser: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 243, 71, 0.68)',
  },
  otherUser: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 240, 154, 0.68)',
  },
  username: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color:'rgb(0, 0, 0)',
  },
  timestamp: {
    fontSize: 10,
    alignSelf: 'flex-end',
    color:'rgb(78, 78, 78)',
  },
});

export default memo(ChatBubble);
