import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    loading: false,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        fetchMessagesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMessagesSuccess: (state, action) => {
            state.messages = action.payload;
            state.loading = false;
        },
        fetchMessagesFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        sendMessageStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        sendMessageSuccess: (state, action) => {
            state.messages.push(action.payload);
            state.loading = false;
        },
        sendMessageFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { 
    fetchMessagesStart, 
    fetchMessagesSuccess, 
    fetchMessagesFailed, 
    sendMessageStart, 
    sendMessageSuccess, 
    sendMessageFailed 
} = chatSlice.actions;

export default chatSlice.reducer;
