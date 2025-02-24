import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the message object type
interface MsgObject {
    text: string;
    sender: string;
    timestamp: string;
}

// Define the chat slice state type
interface ChatState {
    messages: MsgObject[];
    loading: boolean;
    error: string | null;
    messageId: string[];
    newMsg: MsgObject | {}; // Can be an empty object initially
}

// Initial state with proper types
const initialState: ChatState = {
    messages: [],
    loading: false,
    error: null,
    messageId: [],
    newMsg: {},
};

// Create the slice
const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        fetchMessagesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMessagesSuccess: (state, action: PayloadAction<MsgObject[]>) => {
            state.messages = action.payload;
            state.loading = false;
        },
        fetchMessagesFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        sendMessageStart: (state, action: PayloadAction<MsgObject>) => {
            state.newMsg = action.payload;
            state.loading = true;
            state.error = null;
        },
        sendMessageSuccess: (state, action: PayloadAction<string>) => {
            state.messageId.push(action.payload);
            state.loading = false;
        },
        sendMessageFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

// Export actions & reducer
export const { 
    fetchMessagesStart, 
    fetchMessagesSuccess, 
    fetchMessagesFailed, 
    sendMessageStart, 
    sendMessageSuccess, 
    sendMessageFailed 
} = chatSlice.actions;

export default chatSlice.reducer;
