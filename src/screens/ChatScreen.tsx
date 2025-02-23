import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageStart } from '../store/slices/ChatSlices';
import { Background, ChatList, ChatInput } from '../components/Components';

interface msgObject {
  text: string;
  sender: string;
  timestamp: number; 
}

const ChatScreen: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.chat.messages); // Update with correct state type if possible
  const user = useSelector((state: any) => state.user.currentUser); // Update with correct state type if possible
  const [inputText, setInputText] = useState<string>(''); // inputText should be a string type
  const scrollRef = useRef<FlatList<msgObject>>(null); // Typed as FlatList or null

  useEffect(() => {
    if (messages.length > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || !user) return;
    
    const newMessage: msgObject = {
      text: inputText,
      sender: user,
      timestamp: Date.now(), // Ensure new message has a timestamp
    };
    
    dispatch(sendMessageStart(newMessage));
    setInputText('');
  };

    // Define a valid function for onContentSize
  const handleContentSizeChange = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Background />
      <View style={styles.chatListContainer}>
        <ChatList
          scrollRef={scrollRef}
          chats={messages}
          currUser={user}
          onContentSize={handleContentSizeChange}
          onLayout={handleContentSizeChange}
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    height: '100%',
    padding: '5%',
    paddingBottom: '18%',
    marginBottom: '10%',
  },
});

export default ChatScreen;
