import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'

export interface AppState {
    cart: ICustomerCart | null
    addresses: ICustomerAddress[]
}

const initialState: AppState = {
    cart: null,
    addresses: []
}

const actionTypes = {
    getCartItems: 'customers/getCartItems',
    addCartItem: 'customers/addCartItem',
    updateCartItem: 'customers/updateCartItem',
    deleteCartItem: 'customers/deleteCartItem',
    resetCart: 'customers/resetCart'
}

export const getCartItems = createAsyncThunk(
    actionTypes.getCartItems,
    async ({ axios }: { axios: AxiosInstance }, { rejectWithValue }) => {
        try {
            const response = await axios.get<IResponseData<ICustomerCart>>('/customers/cart')
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const addCartItem = createAsyncThunk(
    actionTypes.addCartItem,
    async (
        { axios, productItemId, quantity }: { axios: AxiosInstance; productItemId: number; quantity: number },
        { rejectWithValue }
    ) => {
        try {
            const payload = { productItemId, quantity }
            const response = await axios.post<IResponseData<ICustomerCart>>('/customers/cart', payload)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateCartItem = createAsyncThunk(
    actionTypes.updateCartItem,
    async (
        {
            axios,
            productItemId,
            newProductItemId,
            quantity
        }: { axios: AxiosInstance; productItemId: number; newProductItemId?: number; quantity: number },
        { rejectWithValue }
    ) => {
        try {
            const payload = newProductItemId ? { newProductItemId, quantity } : { quantity }
            const response = await axios.patch<IResponseData<any>>(`/customers/cart/${productItemId}`, payload)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteCartItem = createAsyncThunk(
    actionTypes.deleteCartItem,
    async ({ axios, productItemId }: { axios: AxiosInstance; productItemId: number }, { rejectWithValue }) => {
        try {
            const response = await axios.delete<IResponseData<any>>(`/customers/cart/${productItemId}`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const resetCart = createAsyncThunk(
    actionTypes.resetCart,
    async ({ axios }: { axios: AxiosInstance }, { rejectWithValue }) => {
        try {
            const response = await axios.post<IResponseData<any>>(`/customers/cart/reset`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        resetAppState: () => {
            return initialState
        }
    },
    extraReducers: builder => {
        builder.addCase(getCartItems.fulfilled, (state, action) => {
            state.cart = action.payload.data
        })
    }
})

export const { resetAppState } = appSlice.actions
export default appSlice.reducer
