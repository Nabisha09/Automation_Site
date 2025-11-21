import { call, put, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginFailure, loginRequest, registerSuccess, registerFailure, registerRequest } from '../slices/authSlice';
import api from '../../services/api';

function* loginSaga(action: any): any {
    try {
        const response = yield call(api.post, '/login', action.payload);
        yield put(loginSuccess(response.data.user));
    } catch (error: any) {
        yield put(loginFailure(error.response?.data?.message || 'Login failed'));
    }
}

function* registerSaga(action: any): any {
    try {
        const response = yield call(api.post, '/register', action.payload);
        yield put(registerSuccess(response.data.user));
    } catch (error: any) {
        yield put(registerFailure(error.response?.data?.message || 'Registration failed'));
    }
}

export default function* authSaga() {
    yield takeLatest(loginRequest.type, loginSaga);
    yield takeLatest(registerRequest.type, registerSaga);
}
