import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, TextInput, Button, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessagesStart, sendMessageStart } from '../store/slices/ChatSlices';
import ChatBubble from '../components/ChatBubble';
import { getAuth } from 'firebase/auth';
import { Background, IconButton } from '../components/Components';

const ChatScreen = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const auth = getAuth();
  const user = auth.currentUser;
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    dispatch(fetchMessagesStart());
  }, [dispatch]);

  const handleSend = () => {
    if (!inputText.trim() || !user) return;
    
    const newMessage = {
      text: inputText,
      sender: user.email,
    };
    
    dispatch(sendMessageStart(newMessage));
    setInputText('');
  };

  const renderItem = ({ item, index }) => {
    const prevItem = index > 0 ? messages[index - 1] : null;
    const showDate = !prevItem || new Date(prevItem.timestamp).toDateString() !== new Date(item.timestamp).toDateString();

    return (
      <>
        {showDate && <Text style={styles.dateHeader}>{new Date(item.timestamp).toDateString()}</Text>}
        <ChatBubble message={item} isCurrentUser={item.sender === user.email} />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.chatCont}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      
      
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          placeholderTextColor={'rgb(198, 167, 95)'}
        />
        <IconButton onPress={handleSend}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  chatCont:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding:'5%',
    paddingBottom:'14%',
    marginBottom:'10%',
  },
  dateHeader: {
    textAlign: 'center',
    color:'rgba(253, 253, 253, 0.49)',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgb(115, 85, 17)'
  },
  input: {
    flex: 1,
    color: 'white',
    paddingLeft: 0,
    borderRadius: 30,
    marginRight:10,
  },
});

export default ChatScreen;
