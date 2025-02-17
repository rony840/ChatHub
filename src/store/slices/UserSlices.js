import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {email: "", username: "", password: ""},
    currentUser: {username: ""},
    authUser: "",
    isAuthenticated: false,
    signedup: false,
    loggedin: false,
    loading: false,  // Add a loading state to handle async operations
    error: null,     // Optional: Add an error state for error handling
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signupUser: (state, action) => {
            state.user = action.payload;
        },
        signupUserFailed: (state, action) => {
            state.authUser = action.payload;
            state.signedup = false;
        },
        signupUserSuccess: (state, action) => {
            state.authUser = action.payload;
            state.signedup = true;
        },
        loginUser: (state, action) => {
            state.user = action.payload;
        },
        loginUserFailed: (state, action) => {
            state.authUser = action.payload;
            state.loggedin = false;
        },
        loginUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loggedin = true;
            state.isAuthenticated= true;
        },
        startLoading: (state) => {
            state.loading = true; // Set loading to true when starting async operations
        },
        stopLoading: (state) => {
            state.loading = false; // Set loading to false when done
        },
        setError: (state, action) => {
            state.error = action.payload; // Store error messages
        },
    }
});

export const { 
    signupUser,
    signupUserFailed,
    signupUserSuccess,
    loginUser,
    loginUserFailed,
    loginUserSuccess,
    startLoading, 
    stopLoading, 
    setError 
} = userSlice.actions;

export default userSlice.reducer;
