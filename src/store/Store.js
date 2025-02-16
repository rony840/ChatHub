import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './slices/UserSlices';
import { userSaga } from './sagas/UserSaga';

//creating instance of sagamiddleware
const sagaMiddleware = createSagaMiddleware();

// Configuring the store with logger middleware
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(userSaga);