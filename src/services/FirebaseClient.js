import { auth } from './FirebaseConfig';
//import firestore from '@react-native-firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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
export const signup = async (email, password) => {
  try {
    // Creating a user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Check if the signup was successful
    if (!userCredential || !userCredential.user) {
      throw new Error('User signup failed');
    }

    // //preparing userdata to be stored on firestore
    // const { user, additionalUserInfo } = userCredential;
    // const userDocData = {
    //   uid: user.uid,
    //   email: user.email, 
    //   firstname: userData.firstname,
    //   lastname: userData.lastname,
    //   username: userData.username,
    //   createdAt: firestore.FieldValue.serverTimestamp(),
    //   providerId: additionalUserInfo?.providerId || "email/password",
    // };

    // await firestore().collection('users').doc(user.email).set(userDocData);
    // console.log('User created and data saved to Firestore:', userDocData);
    // return userDocData;
    return userCredential;
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

