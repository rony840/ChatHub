import { listenToMessages, sendMessage } from "./FirebaseClient";


export const fetchChat = async (callback) => {
  try {
    return listenToMessages(callback);
  } 
  catch (error) {
    console.log('Fetch messages failed:', error.message);
    throw error;
  }
};

export const sendChat = async (message) => {
  try {
    const response = await sendMessage(message);
    return response;
  } 
  catch (error) {
    console.log('Send Message failed:', error.message);
    throw error;
  }
};