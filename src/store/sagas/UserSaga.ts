import { call, put, takeLatest } from "redux-saga/effects";
import { logoutUserSuccess, logoutUserFailed,
    startLoading, stopLoading, setError,
    loginUserFailed, loginUserSuccess,
    signupUserFailed, signupUserSuccess 
} from "../slices/UserSlices";
import { loginOnChathub, signupOnChathub, logoutFromChathub } from "../../services/UserAPI";
import { PayloadAction } from "@reduxjs/toolkit";


interface userLogin{
    email: string;
    password: string;
}

function* loginUserSaga(action: PayloadAction<userLogin>) {
    try {
        yield put(startLoading());
        const response:string = yield call(loginOnChathub, action.payload.email, action.payload.password);
        yield put(loginUserSuccess(response));
        
    } catch (error:any) {
        console.error('Login error:', error);
        yield put(loginUserFailed(error));
        yield put(setError(error.message || 'An error occurred during login. Please try again.'));
    } finally {
        yield put(stopLoading());
    }
}
interface userSignup{
    email: string;
    password: string;
    username: string;
}

function* signupUserSaga(action: PayloadAction<userSignup>) {
    try {
        yield put(startLoading());
        const response:userSignup = yield call(signupOnChathub, action.payload.email, action.payload.password, action.payload.username);
        yield put(signupUserSuccess(response.email));
        
    } catch (error:any) {
        console.error('Signup error:', error);
        yield put(signupUserFailed(error));
        yield put(setError(error.message || 'An error occurred during signup. Please try again.'));
    } finally {
        yield put(stopLoading());
    }
}

function* logoutUserSaga() {
    try {
      yield call(logoutFromChathub);
      yield put(logoutUserSuccess());
    } catch (error:any) {
      console.error("Logout error:", error);
      yield put(logoutUserFailed(error.message || "Logout failed. Try again."));
    }
  }

// Watcher saga
export function* userSaga() {
  yield takeLatest('user/loginUser', loginUserSaga);
  yield takeLatest('user/signupUser', signupUserSaga);
  yield takeLatest('user/logoutUser', logoutUserSaga);
}
