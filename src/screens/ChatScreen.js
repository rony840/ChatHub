import { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList, TextInput, Button, View, Text } from 'react-native';
import { Background } from '../components/Components';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/FirebaseConfig';
import { getAuth } from 'firebase/auth';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const messagesRef = collection(db, 'chats/global/messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    if (!user) return;
    
    await addDoc(collection(db, 'chats/global/messages'), {
      text: inputText,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.sender}>{item.sender}</Text>
            <Text style={styles.message}>{item.text}</Text>
          </View>
        )}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sender: {
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
});

export default ChatScreen;
