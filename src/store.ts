import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import authReducer from '@/slices/authSlice'
import appReducer from '@/slices/appSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'app']
}

const combinedReducers = combineReducers({
    auth: authReducer,
    app: appReducer
})

export const store = configureStore({
    reducer: persistReducer(persistConfig, combinedReducers),

    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
    }
})

export type RootState = ReturnType<typeof combinedReducers>
export type AppDispatch = typeof store.dispatch
