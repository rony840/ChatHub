import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/UserSlices';
import { userSaga } from './sagas/UserSaga';
import chatReducer from './slices/ChatSlices';
import { chatSaga } from './sagas/ChatSaga';
import { createLogger } from 'redux-logger';

//creating instance of sagamiddleware
const sagaMiddleware = createSagaMiddleware();

// Creating the logger middleware instance
const logger = createLogger({
  collapsed: true, //set it to false to expand logs
  diff: true, //shows difference in prev and next state
});

// Configuring the store with logger middleware
export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware,logger)
});

sagaMiddleware.run(userSaga);
sagaMiddleware.run(chatSaga);