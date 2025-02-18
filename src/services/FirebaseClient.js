import { auth } from './FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { db } from "./FirebaseConfig";
import { doc, getDoc, setDoc, addDoc, collection, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";


// Login method
export const login = async (email, password) => {
  try {
    //authenticating user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //fetching username from DB
    const userRef = doc(db, "users", email);
    const userInfo = await getDoc(userRef);
    const userData = userInfo.data().username;
    return userData;//return username
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
    //console.log('User created and data saved to Firestore:', userDocData);
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

export const logout = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error; 
  }
};

// Listen to chat messages in real time
export const listenToMessages = (callback) => {
  try {
    const messagesQuery = query(collection(db, "chats/global/messages"), orderBy("timestamp", "asc"));
    // Set up Firestore listener
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()?.toString() || new Date().toString(),
      }));
      callback(messages); // Pass messages to Redux via callback
    });
    return unsubscribe; // Return unsubscribe function to stop listening
  } catch (error) {
    console.error("Error setting up real-time listener:", error.message);
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

    // Fetch the message back from Firestore using the document reference ID
    const messageSnapshot = await getDoc(doc(db, "chats", "global", "messages", docRef.id));
    
    return messageSnapshot.id
  } catch (error) {
    console.error("Error sending message:", error.message);
    throw error.message;
  }
};
