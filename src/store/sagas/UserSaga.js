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
        console.log('User in login saga:', action.payload.email);
        const response = yield call(loginOnChathub, action.payload.email, action.payload.password);
        console.log('Login response:', response);
        yield put(loginUserSuccess(response._user)); 
        
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
        console.log('User in signup saga:', action.payload.email);
        const response = yield call(signupOnChathub, action.payload.email, action.payload.password, action.payload);
        console.log('Signup response:', response);
        yield put(signupUserSuccess(response.username)); 
        
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
