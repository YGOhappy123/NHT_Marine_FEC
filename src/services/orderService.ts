import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { onError } from '@/utils/errorsHandler'
import useAxiosIns from '@/hooks/useAxiosIns'

const orderService = ({ enableFetching = false }: { enableFetching: boolean }) => {
    const axios = useAxiosIns()
    const queryClient = useQueryClient()
    const [orders, setOrders] = useState<IOrder[]>([])
    const [orderCount, setOrderCount] = useState<number>(0)

    const getMyOrdersQuery = useQuery({
        queryKey: ['my-orders'],
        queryFn: () =>
            axios.get<IResponseData<IOrder[]>>(`/orders/my-orders?sort=${JSON.stringify({ createdAt: 'DESC' })}`),
        enabled: enableFetching,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        refetchInterval: 20000
    })

    const verifyCouponMutation = useMutation({
        mutationFn: (code: string) => axios.post<IResponseData<ICoupon>>('/orders/verify-coupon', { code }),
        onError: onError
    })

    const placeOrderMutation = useMutation({
        mutationFn: (data: any) => axios.post<IResponseData<any>>('/orders', data),
        onError: onError,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-orders'] })
        }
    })

    useEffect(() => {
        if (getMyOrdersQuery.isSuccess && getMyOrdersQuery.data) {
            setOrders(getMyOrdersQuery.data.data?.data)
            setOrderCount(getMyOrdersQuery.data.data?.total as number)
        }
    }, [getMyOrdersQuery.isSuccess, getMyOrdersQuery.data])

    return {
        orders,
        orderCount,
        verifyCouponMutation,
        placeOrderMutation
    }
}

export default orderService
