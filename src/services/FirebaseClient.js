import { auth } from './FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "./FirebaseConfig";
import { doc, getDoc, setDoc, addDoc, getDocs, collection, query, orderBy, serverTimestamp } from "firebase/firestore";


// Login method
export const login = async (email, password) => {
  try {
    //authenticating user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user);
    return userCredential.user;
  } 
  catch (error) {
    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    } else if (error.code === 'auth/wrong-password') {
      console.log('Incorrect password!');
    } else if (error.code === 'auth/user-not-found') {
      console.log('No user found with this email!');
    } else {
      console.error(error);
    }
    throw error; 
  }
};

// Signup method
export const signup = async (email, password, userData) => {
  try {
    // Creating a user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password, userData);

    // Check if the signup was successful
    if (!userCredential || !userCredential.user) {
      throw new Error('User signup failed');
    }

    //preparing userdata to be stored on firestore
    const { user, additionalUserInfo } = userCredential;
    const userDocData = {
      uid: user.uid,
      email: user.email,
      username: userData.username,
      createdAt: serverTimestamp(),
      providerId: additionalUserInfo?.providerId || "email/password",
    };

    await setDoc(doc(db, "users", user.email), userDocData);
    console.log('User created and data saved to Firestore:', userDocData);
    return userDocData;
  } 
  catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    } else {
      console.error(error);
    }
    console.error('Signup failed:', error.message);
    throw error;
  }
};



// Fetch chat messages from Firestore
export const fetchMessages = async () => {
  try {
    console.log('Fetching messages from chats/global/messages');
    
    const messagesQuery = query(collection(db, "chats/global/messages"), orderBy("timestamp", "asc"));
    const messagesSnapshot = await getDocs(messagesQuery);
    
    const messages = messagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate().toString(), // Convert Firestore Timestamp to ISO string
    }));

    //console.log('Fetched messages:', messages);
    return messages;
  } catch (error) {
    console.log("Error fetching chat messages:", error.message);
    throw error;
  }
};


export const sendMessage = async (messageData) => {
  try {
    const messageDoc = {
      text: messageData.text,
      sender: messageData.sender,
      timestamp: serverTimestamp(), // This ensures Firestore sets the timestamp
    };

    // Add the message to Firestore
    const docRef = await addDoc(collection(db, "chats", "global", "messages"), messageDoc);
    console.log("Message sent with ID:", docRef.id);

    // Fetch the message back from Firestore using the document reference ID
    const messageSnapshot = await getDoc(doc(db, "chats", "global", "messages", docRef.id));
    
    if (messageSnapshot.exists()) {
      const fullMessage = {
        id: messageSnapshot.id,
        ...messageSnapshot.data(),
        timestamp: messageSnapshot.data().timestamp.toDate().toString(),
      };
      console.log('Added message with server timestamp: ', fullMessage);
      return fullMessage;
    } else {
      console.error('Message not found!');
      throw new Error('Message not found!');
    }
  } catch (error) {
    console.error("Error sending message:", error.message);
    throw error.message;
  }
};
