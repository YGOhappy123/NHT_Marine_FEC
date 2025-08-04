import { useEffect } from 'react'
import useTitle from '@/hooks/useTitle'

const HomePage = () => {
    useTitle('NHT Marine | Trang chủ')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <div className="h-[1000px]">HomePage</div>
}

export default HomePage
