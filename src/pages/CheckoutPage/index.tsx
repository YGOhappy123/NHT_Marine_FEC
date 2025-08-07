import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getCartItems } from '@/slices/appSlice'
import CheckoutForm, { TCheckoutFormSchema } from '@/pages/CheckoutPage/CheckoutForm'
import LoadingIndicator from '@/pages/CheckoutPage/LoadingIndicator'
import ProductSummarize from '@/pages/CheckoutPage/ProductSummarize'
import useCustomerCart from '@/hooks/useCustomerCart'
import useAxiosIns from '@/hooks/useAxiosIns'
import useTitle from '@/hooks/useTitle'
import toastConfig from '@/configs/toast'
import orderService from '@/services/orderService'

const CheckoutPage = () => {
    useTitle('NHT Marine | Xác nhận đơn hàng')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { isLoading, detailedCart, totalCount, cart } = useCustomerCart()
    const { verifyCouponMutation, placeOrderMutation } = orderService({ enableFetching: false })
    const [coupon, setCoupon] = useState<ICoupon | null>(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const axios = useAxiosIns()

    const handleVerifyCoupon = async (code: string) => {
        const res = await verifyCouponMutation.mutateAsync(code)
        setCoupon(res.data.data)
    }

    const handlePlaceOrder = async (values: TCheckoutFormSchema) => {
        const orderInfo: any = {
            note: values.note,
            items: (cart?.items ?? []).map(item => ({ productItemId: item.productItemId, quantity: item.quantity }))
        }

        if (coupon != null) orderInfo.coupon = coupon.code
        if (values.method === 'delivery') {
            orderInfo.recipientName = values.recipientName
            orderInfo.deliveryAddress = values.deliveryAddress
            orderInfo.deliveryPhone = values.deliveryPhone
        }

        const res = await placeOrderMutation.mutateAsync(orderInfo)
        dispatch(getCartItems({ axios }) as any)
        navigate(`/thank-you/${res.data.data.orderId}`)
    }

    if (isLoading) {
        return (
            <div className="h-screen">
                <LoadingIndicator />
            </div>
        )
    }

    if (!isLoading && totalCount === 0) {
        toast('Giỏ hàng của bạn đang trống, bạn không thể truy cập trang đặt hàng.', toastConfig('error'))
        return <Navigate to="/" replace />
    }

    if (!isLoading && detailedCart?.items.some(item => item.quantity > item.product.stock)) {
        toast(
            'Một số sản phẩm không đủ số lượng trong kho, vui lòng điều chỉnh số lượng trước khi đặt hàng.',
            toastConfig('error')
        )
        return <Navigate to="/" replace />
    }

    return (
        <section className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center justify-between px-4 py-24">
                <h2 className="font-[Dancing_Script] text-4xl capitalize">Xác nhận đơn hàng</h2>
                <div className="mt-11 grid w-full grid-cols-1 gap-x-11 gap-y-11 lg:grid-cols-5 xl:gap-x-20">
                    <div className="col-span-1 lg:col-span-3">
                        <CheckoutForm handlePlaceOrder={handlePlaceOrder} />
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                        <ProductSummarize
                            items={detailedCart?.items ?? []}
                            coupon={coupon}
                            handleVerifyCoupon={handleVerifyCoupon}
                            handleClearCoupon={() => setCoupon(null)}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckoutPage
