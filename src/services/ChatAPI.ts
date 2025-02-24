import { listenToMessages, sendMessage } from "./FirebaseClient";

interface MsgObject {
  text: string;
  sender: string;
  timestamp: string;
}

// Define the callback type that expects an array of MsgObject
type MessageCallback = (messages: MsgObject[]) => void;

export const fetchChat = async (callback: MessageCallback): Promise<void> => {
  try {
    await listenToMessages(callback); // Listen to messages and pass them to the callback
  } catch (error: any) {
    console.error("Fetch messages failed:", error.message);
    throw error;
  }
};

interface ChatMessage {
  text: string;
  sender: string;
  timestamp: string;
}

export const sendChat = async (message: ChatMessage): Promise<any> => {
  try {
    const response = await sendMessage(message);
    return response;
  } catch (error: any) {
    console.error("Send message failed:", error.message);
    throw error;
  }
};
