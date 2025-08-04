import { useEffect } from 'react'
import useTitle from '@/hooks/useTitle'

const CheckoutPage = () => {
    useTitle('NHT Marine | Thanh toán')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <div>CheckoutPage </div>
}

export default CheckoutPage
