import { call, put, takeLatest } from 'redux-saga/effects';
import { loginSuccess, loginFailure, loginRequest, registerSuccess, registerFailure, registerRequest } from '../slices/authSlice';
import api from '../../services/api';

function* loginSaga(action: any): any {
    try {
        const { email, password, userType } = action.payload;
        const endpoint = userType === 'superadmin' ? '/superadmin/login' : '/admin/login';
        const response = yield call(api.post, endpoint, { email, password });

        // Map backend type to frontend role
        const role = response.data.type === 'ADMIN' ? 'SUB_ADMIN' : 'SUPER_ADMIN';
        const user = { ...response.data.user, role };

        yield put(loginSuccess(user));
    } catch (error: any) {
        yield put(loginFailure(error.response?.data?.message || 'Login failed'));
    }
}

function* registerSaga(action: any): any {
    try {
        const { fullName, email, password, userType } = action.payload;
        const endpoint = userType === 'superadmin' ? '/superadmin/register' : '/admin/register';
        const response = yield call(api.post, endpoint, { fullName, email, password });

        // Map backend type to frontend role
        const role = response.data.type === 'ADMIN' ? 'SUB_ADMIN' : 'SUPER_ADMIN';
        const user = { ...response.data.user, role };

        yield put(registerSuccess(user));
    } catch (error: any) {
        yield put(registerFailure(error.response?.data?.message || 'Registration failed'));
    }
}

export default function* authSaga() {
    yield takeLatest(loginRequest.type, loginSaga);
    yield takeLatest(registerRequest.type, registerSaga);
}
