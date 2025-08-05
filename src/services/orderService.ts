import { useMutation } from '@tanstack/react-query'
import { onError } from '@/utils/errorsHandler'
import useAxiosIns from '@/hooks/useAxiosIns'

const orderService = () => {
    const axios = useAxiosIns()

    const verifyCouponMutation = useMutation({
        mutationFn: (code: string) => axios.post<IResponseData<ICoupon>>('/coupons/verify', { code }),
        onError: onError
    })

    const placeOrderMutation = useMutation({
        mutationFn: (data: any) => axios.post<IResponseData<any>>('/orders', data),
        onError: onError
    })

    return { verifyCouponMutation, placeOrderMutation }
}

export default orderService
