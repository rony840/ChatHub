import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../slices/UserSlices';
import chatReducer from '../slices/ChatSlices';

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
});

export default rootReducer;
