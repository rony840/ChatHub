import { call, put, takeLatest, take, fork } from "redux-saga/effects";
import { 
    fetchMessagesSuccess, fetchMessagesFailed,
    sendMessageSuccess, sendMessageFailed
} from "../slices/ChatSlices";
import { fetchChat, sendChat } from "../../services/ChatAPI";
import { eventChannel } from "redux-saga";

function createMessageChannel() {
    return eventChannel((emit) => {
      const unsubscribe = fetchChat((messages) => {
        emit(messages); // Emit messages when Firestore updates
      });
  
      return () => unsubscribe(); // Cleanup listener on unmount
    });
  }
  
  function* fetchMessagesListenerSaga() {
    const channel = yield call(createMessageChannel);
  
    try {
      while (true) {
        const messages = yield take(channel);
        yield put(fetchMessagesSuccess(messages)); // Dispatch to Redux
      }
    } catch (error) {
      yield put(fetchMessagesFailed(error.message || "Failed to listen for messages."));
    } finally {
      channel.close();
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
    yield fork(fetchMessagesListenerSaga);
    yield takeLatest('chat/sendMessageStart', sendMessageSaga);
}
