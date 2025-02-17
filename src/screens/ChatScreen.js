import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageStart } from '../store/slices/ChatSlices';
import { Background, ChatList, ChatInput } from '../components/Components';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.user.currentUser);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null); // Reference for scrolling chatList

  useEffect(() => {
    if (messages.length > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || !user) return;
    
    const newMessage = {
      text: inputText,
      sender: user,
      timestamp: Date.now(), // Ensure new message has a timestamp
    };
    
    dispatch(sendMessageStart(newMessage));
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Background />
      <View style={styles.chatListContainer}>
        <ChatList
        scrollReference={scrollRef}
        chats={messages}
        currUser={user}
        />
      </View>
      <ChatInput
      msgInput={setInputText}
      txtValue={inputText}
      onSendPress={handleSend}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  chatListContainer: {
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    flex: 1,
    padding: '5%',
    paddingBottom: '14%',
    marginBottom: '10%',
  },
  
});

export default ChatScreen;
