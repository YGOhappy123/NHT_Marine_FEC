import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Fish, Home } from 'lucide-react'
import { getCartItems } from '@/slices/appSlice'
import useTitle from '@/hooks/useTitle'
import useAxiosIns from '@/hooks/useAxiosIns'

const ThankYouPage = () => {
    useTitle('NHT Marine | Tri Ân')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const axios = useAxiosIns()
    const { orderId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartItems({ axios }) as any)
    }, [])

    return (
        <div className="flex min-h-screen flex-col items-center justify-between gap-8 bg-[#FAFAFB] text-[#699282] lg:flex-row">
            <img src="/images/tkp-top-pattern.png" alt="thank-you-page-asset" className="w-screen lg:hidden" />
            <img src="/images/tkp-left-pattern.png" alt="thank-you-page-asset" className="hidden h-screen lg:block" />

            <div className="px-4">
                <div className="mb-[45px] flex flex-col items-center gap-5">
                    <img src="/images/tkp-title.png" alt="thank-you-page-asset" className="w-full max-w-[650px]" />
                    <p className="text-center text-xl font-medium uppercase">Cảm ơn bạn đã ủng hộ NHT Marine</p>
                </div>
                <div className="flex flex-col items-center">
                    <h4 className="text-lg font-medium">Đặt hàng thành công</h4>
                    {orderId && <p className="text-center text-black/45">Mã đơn hàng: {orderId}</p>}
                    <p className="text-center text-black/45">Đơn hàng của bạn sẽ sớm được xử lý</p>

                    <div className="mt-[30px] grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
                        <button
                            className="col-span-1 flex h-[60px] cursor-pointer items-center justify-center gap-3 rounded-full bg-[#699282] font-semibold tracking-widest text-[#D9D9D9] uppercase hover:bg-[#699282]/90"
                            onClick={() => navigate('/profile/orders')}
                        >
                            <Fish /> Quản lý đơn
                        </button>
                        <button
                            className="col-span-1 flex h-[60px] cursor-pointer items-center justify-center gap-3 rounded-full bg-[#D9D9D9] font-semibold tracking-widest text-[#699282] uppercase hover:bg-[#D9D9D9]/90"
                            onClick={() => navigate('/')}
                        >
                            <Home /> Về trang chủ
                        </button>
                    </div>
                </div>
            </div>

            <img src="/images/tkp-bottom-pattern.png" alt="thank-you-page-asset" className="w-screen lg:hidden" />
            <img src="/images/tkp-right-pattern.png" alt="thank-you-page-asset" className="hidden h-screen lg:block" />
        </div>
    )
}

export default ThankYouPage
