import { call, put, takeLatest } from "redux-saga/effects";
import { 
    startLoading, stopLoading, setError,
    loginUserFailed, loginUserSuccess,
    signupUserFailed, signupUserSuccess 
} from "../slices/UserSlices";
import { loginOnChathub, signupOnChathub } from "../../services/UserAPI";

function* loginUserSaga(action) {
    try {
        yield put(startLoading());
        const response = yield call(loginOnChathub, action.payload.email, action.payload.password);
        yield put(loginUserSuccess(response));
        
    } catch (error) {
        console.error('Login error:', error);
        yield put(loginUserFailed());
        yield put(setError(error.message || 'An error occurred during login. Please try again.'));
    } finally {
        yield put(stopLoading());
    }
}

function* signupUserSaga(action) {
    try {
        yield put(startLoading());
        const response = yield call(signupOnChathub, action.payload.email, action.payload.password, action.payload);
        yield put(signupUserSuccess(response.email));
        
    } catch (error) {
        console.error('Signup error:', error);
        yield put(signupUserFailed());
        yield put(setError(error.message || 'An error occurred during signup. Please try again.'));
    } finally {
        yield put(stopLoading());
    }
}

// Watcher saga
export function* userSaga() {
  yield takeLatest('user/loginUser', loginUserSaga);
  yield takeLatest('user/signupUser', signupUserSaga);
}
