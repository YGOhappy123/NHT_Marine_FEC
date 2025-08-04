import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCartItems, addCartItem, updateCartItem, deleteCartItem, resetCart } from '@/slices/appSlice'
import { RootState } from '@/store'
import { LOGIN_REQUIRED_MESSAGE } from '@/configs/constants'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'

const cartService = ({ enableFetching }: { enableFetching: boolean }) => {
    const axios = useAxiosIns()
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const isLogged = useSelector((state: RootState) => state.auth.isLogged)

    useQuery({
        queryKey: ['cart-items'],
        queryFn: () => dispatch(getCartItems({ axios }) as any),
        enabled: enableFetching,
        refetchOnWindowFocus: false
    })

    const addCartItemMutation = useMutation({
        mutationFn: ({ productItemId, quantity }: { productItemId: number; quantity: number }) => {
            if (!isLogged) {
                toast(LOGIN_REQUIRED_MESSAGE, toastConfig('info'))
                return
            }

            return dispatch(addCartItem({ axios, productItemId, quantity }) as any)
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart-items'] })
    })

    const updateCartItemMutation = useMutation({
        mutationFn: ({
            productItemId,
            newProductItemId,
            quantity
        }: {
            productItemId: number
            newProductItemId?: number
            quantity: number
        }) => dispatch(updateCartItem({ axios, productItemId, newProductItemId, quantity }) as any),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart-items'] })
    })

    const deleteCartItemMutation = useMutation({
        mutationFn: ({ productItemId }: { productItemId: number }) =>
            dispatch(deleteCartItem({ axios, productItemId }) as any),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart-items'] })
    })

    const resetCartMutation = useMutation({
        mutationFn: () => dispatch(resetCart({ axios }) as any),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart-items'] })
    })

    return {
        addCartItemMutation,
        updateCartItemMutation,
        deleteCartItemMutation,
        resetCartMutation
    }
}

export default cartService
