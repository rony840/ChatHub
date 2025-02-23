import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/UserSlices';
import { userSaga } from './sagas/UserSaga';
import chatReducer from './slices/ChatSlices';
import { chatSaga } from './sagas/ChatSaga';
import { createLogger } from 'redux-logger';


const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  collapsed: true, 
  diff: true, 
});

// Configuring the store with typed reducers
export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, logger), // Explicitly disabling thunk since we use sagas
});

// Running the sagas
sagaMiddleware.run(userSaga);
sagaMiddleware.run(chatSaga);

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
