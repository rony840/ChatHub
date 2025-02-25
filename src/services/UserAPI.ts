import { login, signup, logout } from "./FirebaseClient";
import { Alert } from 'react-native';

export const signupOnChathub = async (email:string, password:string, username:string) => {
  try {
    const user = await signup(email, password, username);
    //console.log('Signed up as:', user.email);
    Alert.alert('Signed up:', user);
    return user;
  } 
  catch (error:any) {
    console.log('Signup failed:', error.message);
    Alert.alert('Signup failed:', error.message);
    throw error;
  }
};

export const loginOnChathub = async (email:string, password:string) => {
  try {
    const user = await login(email, password);
    //console.log('Logged in as:', user.email);
    Alert.alert('Logged in:', user);
    return user;
  } 
  catch (error:any) {
    console.log('Login failed:', error.message);
    Alert.alert('Login failed:', error.message);
    throw error;
  }
};

export const logoutFromChathub = async () => {
  try {
    await logout();
    const msg = 'Logout Successful!';
    Alert.alert(msg);
    return msg;
  } 
  catch (error:any) {
    console.log('Logout Failed: ', error.message);
    Alert.alert('Logout Failed:', error.message);
    throw error;
  }
};