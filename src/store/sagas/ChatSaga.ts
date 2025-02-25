import { call, put, takeLatest, take, fork, select } from "redux-saga/effects";
import { 
    fetchMessagesSuccess, fetchMessagesFailed,
    sendMessageSuccess, sendMessageFailed
} from "../slices/ChatSlices";
import { fetchChat, sendChat } from "../../services/ChatAPI";
import { eventChannel, END } from "redux-saga";
import { PayloadAction } from "@reduxjs/toolkit";

// Define the message type
interface MsgObject {
    text: string;
    sender: string;
    timestamp: string;
}

// Create an event channel for Firestore messages
function createMessageChannel() {
    
    return eventChannel<MsgObject[]>((emit) => {
        const unsubscribe = fetchChat((messages: MsgObject[]) => {
            emit(messages);
            console.log("Listening1...");
        });
        return () => { unsubscribe
            console.log("Unsubscribing...");
        };
    });
}

interface stateObj{
    isAuthenticated: Boolean;
}

const selectAuth = (state:any) => state.user;
// Fetch messages listener saga
function* fetchMessagesListenerSaga () {
    const auth:stateObj = yield select(selectAuth);
    if (!auth.isAuthenticated) {
        const channel: ReturnType<typeof createMessageChannel> = yield call(createMessageChannel);

        try {
            while (!auth.isAuthenticated) {
                console.log("Listening2...");
                const messages: MsgObject[] = yield take(channel);
                yield put(fetchMessagesSuccess(messages)); // Dispatch to Redux
            }
        } catch (error: any) {
            yield put(fetchMessagesFailed(error instanceof Error ? error.message : "Failed to listen for messages."));
        } finally {
            console.log("stop Listening...");
            channel.close();
        }
    } else{console.log("Stopping listening..");}
}

// Send message saga
function* sendMessageSaga(action: PayloadAction<MsgObject>) {
    try {
        const messageId: string = yield call(sendChat, action.payload);
        yield put(sendMessageSuccess(messageId));
    } catch (error: any) {
        console.error("Send Message Error:", error);
        yield put(sendMessageFailed(error instanceof Error ? error.message : "Failed to send message."));
    }
}

// Watcher saga
export function* chatSaga() {
    yield fork(fetchMessagesListenerSaga);
    yield takeLatest("chat/sendMessageStart", sendMessageSaga);
}
