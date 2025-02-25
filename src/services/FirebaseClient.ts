import { auth, db } from './FirebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  getAuth, 
  signOut, 
  UserCredential 
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from "firebase/firestore";

interface UserDoc {
  uid: string;
  email: string;
  username: string;
  createdAt: any;
  providerId: string;
}

interface MessageData {
  id?: string;
  text: string;
  sender: string;
  timestamp: string;
}


export const login = async (email: string, password: string): Promise<string> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    if (!user.email) {
      throw new Error("User email is null");
    }

    // Fetch user info from Firestore
    const userRef = doc(db, "users", user.email);
    const userInfo = await getDoc(userRef);

    if (!userInfo.exists()) {
      throw new Error("User data not found in Firestore");
    }

    const userData = userInfo.data().username as string;
    return userData;
  } 
  catch (error: any) {
    console.error("Login failed:", error.message);
    throw error;
  }
};


export const signup = async (email: string, password: string, username: string): Promise<string> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!user.email) {
      throw new Error("User email is null");
    }

    const userDocData: UserDoc = {
      uid: user.uid,
      email: user.email,
      username,
      createdAt: serverTimestamp(),
      providerId: userCredential.user.providerId || "email/password",
    };

    await setDoc(doc(db, "users", user.email), userDocData);
    
    return userDocData.username;
  } 
  catch (error: any) {
    console.error("Signup failed:", error.message);
    throw error;
  }
};


export const logout = async (): Promise<void> => {
  try {
    const authInstance = getAuth();
    await signOut(authInstance);
    console.log("User logged out successfully");
  } catch (error: any) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};

//realtime messages
export const listenToMessages = (callback: (messages: MessageData[]) => void): (() => void) => {
  try {
    const messagesQuery = query(collection(db, "chats", "global", "messages"), orderBy("timestamp", "asc"));

    // Set up Firestore listener
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const messages: MessageData[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text ?? "No text", // Ensuring text exists
          sender: data.sender ?? "Unknown", // Ensuring sender exists
          timestamp: data.timestamp?.toDate()?.toString() || new Date().toString(),
        };
      });

      callback(messages);
    });

    return unsubscribe;
  } 
  catch (error: any) {
    console.error("Error setting up real-time listener:", error.message);
    throw error;
  }
};

// send message
export const sendMessage = async (messageData: MessageData): Promise<string> => {
  try {
    const messageDoc = {
      text: messageData.text,
      sender: messageData.sender,
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "chats", "global", "messages"), messageDoc);
    return docRef.id;
  } 
  catch (error: any) {
    console.error("Error sending message:", error.message);
    throw error;
  }
};
