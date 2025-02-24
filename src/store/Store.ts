import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './slices/Slices'; 
import { rootSaga } from './sagas/Sagas'; 

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  collapsed: true, 
  diff: true, 
});

// Configuring the store with typed reducers
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, logger),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
