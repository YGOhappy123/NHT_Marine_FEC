import { useEffect } from 'react'
import useTitle from '@/hooks/useTitle'
import HomeHeroSection from '@/pages/HomePage/HomeHeroSection'
import StatisticSection from '@/pages/HomePage/StatisticSection'
import DescriptionSection from '@/pages/HomePage/DescriptionSection'

const HomePage = () => {
    useTitle('NHT Marine | Trang chủ')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <div className="-mt-[150px]">
        <HomeHeroSection />
        <StatisticSection />
        <DescriptionSection />
        
    </div>
}

export default HomePage
