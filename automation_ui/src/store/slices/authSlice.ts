import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    fullName: string;
    email: string;
    role: 'SUPER_ADMIN' | 'SUB_ADMIN';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state, _action: PayloadAction<{ email: string; password: string }>) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        registerRequest: (state, _action: PayloadAction<{ fullName: string; email: string; password: string; role: 'SUPER_ADMIN' | 'SUB_ADMIN' }>) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure, logout, registerRequest, registerSuccess, registerFailure } = authSlice.actions;
export default authSlice.reducer;
