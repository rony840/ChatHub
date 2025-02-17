import { fetchMessages, sendMessage } from "./FirebaseClient";


export const fetchChat = async () => {
  try {
    console.log('fetch inside chatapi')
    const messages = await fetchMessages();
    return messages;
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