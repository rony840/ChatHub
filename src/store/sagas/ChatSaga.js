import { call, put, takeLatest } from "redux-saga/effects";
import { 
    fetchMessagesStart, fetchMessagesSuccess, fetchMessagesFailed,
    sendMessageStart, sendMessageSuccess, sendMessageFailed
} from "../slices/ChatSlices";
import { fetchChat, sendChat } from "../../services/ChatAPI";

// Fetch messages saga
function* fetchMessagesSaga() {
    try {
        console.log('fetch request in saga')
        //yield put(fetchMessagesStart());

        const messages = yield call(fetchChat);
        yield put(fetchMessagesSuccess(messages));
    } catch (error) {
        console.error('Fetch Messages Error:', error);
        yield put(fetchMessagesFailed(error.message || 'Failed to load messages.'));
    }
}

// Send message saga
function* sendMessageSaga(action) {
    try {
        //yield put(sendMessageStart());
        const message = yield call(sendChat, action.payload);
        yield put(sendMessageSuccess(message));
    } catch (error) {
        console.error('Send Message Error:', error);
        yield put(sendMessageFailed(error.message || 'Failed to send message.'));
    }
}

// Watcher saga
export function* chatSaga() {
    yield takeLatest('chat/fetchMessagesStart', fetchMessagesSaga);
    yield takeLatest('chat/sendMessageStart', sendMessageSaga);
}
