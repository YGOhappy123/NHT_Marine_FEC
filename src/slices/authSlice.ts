import { createSlice } from '@reduxjs/toolkit'
import cookies from '@/libs/cookies'

export interface AuthState {
    isLogged: boolean
    user: ICustomer | null
}

const initialState: AuthState = {
    isLogged: false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }: { payload: ICustomer }) => {
            state.user = payload
        },
        setLogged: (state, { payload }: { payload: boolean }) => {
            state.isLogged = payload
        },
        signOut: () => {
            cookies.remove('access_token_fec', { path: '/' })
            cookies.remove('refresh_token_fec', { path: '/' })
            return initialState
        }
    }
})

export const { setUser, setLogged, signOut } = authSlice.actions
export default authSlice.reducer
