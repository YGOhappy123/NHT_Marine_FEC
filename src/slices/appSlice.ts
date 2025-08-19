import { getMappedMessage } from '@/utils/resMessageMapping'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import toastConfig from '@/configs/toast'

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
    resetCart: 'customers/resetCart',
    getAddresses: 'customer-addresses/getAddresses',
    addAddress: 'customer-addresses/addAddress',
    setAddressAsDefault: 'customer-addresses/setAddressAsDefault',
    deleteAddress: 'customer-addresses/deleteCartItem'
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

export const getAddresses = createAsyncThunk(
    actionTypes.getAddresses,
    async ({ axios }: { axios: AxiosInstance }, { rejectWithValue }) => {
        try {
            const response = await axios.get<IResponseData<ICustomerAddress[]>>(
                `/customers/address/my-addresses?sort=${JSON.stringify({ isDefault: 'DESC' })}`
            )
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const addAddress = createAsyncThunk(
    actionTypes.addAddress,
    async (
        {
            axios,
            recipientName,
            phoneNumber,
            city,
            ward,
            addressLine
        }: {
            axios: AxiosInstance
            recipientName: string
            phoneNumber: string
            city: string
            ward: string
            addressLine: string
        },
        { rejectWithValue }
    ) => {
        try {
            const payload = { recipientName, phoneNumber, city, ward, addressLine }
            const response = await axios.post<IResponseData<ICustomerCart>>('/customers/address', payload)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const setAddressAsDefault = createAsyncThunk(
    actionTypes.setAddressAsDefault,
    async ({ axios, addressId }: { axios: AxiosInstance; addressId: number }, { rejectWithValue }) => {
        try {
            const response = await axios.patch<IResponseData<any>>(`/customers/address/${addressId}`)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteAddress = createAsyncThunk(
    actionTypes.deleteAddress,
    async ({ axios, addressId }: { axios: AxiosInstance; addressId: number }, { rejectWithValue }) => {
        try {
            const response = await axios.delete<IResponseData<any>>(`/customers/address/${addressId}`)
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
        builder
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.cart = action.payload.data
            })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.addresses = action.payload.data
            })
            .addMatcher(
                action => action.type.startsWith('customer-addresses/'),
                (_, action) => {
                    const isSuccess = action.type.endsWith('/fulfilled')
                    toast(
                        getMappedMessage((action as PayloadAction<any>).payload?.message),
                        toastConfig(isSuccess ? 'success' : 'error')
                    )
                }
            )
    }
})

export const { resetAppState } = appSlice.actions
export default appSlice.reducer
