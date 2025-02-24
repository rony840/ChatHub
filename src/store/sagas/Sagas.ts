import { all } from 'redux-saga/effects';
import { userSaga } from '../sagas/UserSaga';
import { chatSaga } from './ChatSaga';

export function* rootSaga() {
    yield all([
        userSaga(),
        chatSaga()
    ]);
}
