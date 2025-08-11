import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import BackgroundPoster from '@/components/ui/BackgroundPoster'

const AboutHeroSection = () => {
    const navigate = useNavigate()

    return (
        <section className="relative">
            <BackgroundPoster
                imageUrl="https://images.unsplash.com/photo-1748935550505-54279e196f89?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                size="small"
            />

            <div className="max-w-container absolute top-1/2 left-1/2 grid w-full -translate-1/2 grid-cols-6 gap-[60px] px-5 lg:grid-cols-5">
                <div className="col-span-4 flex flex-col gap-4 lg:col-span-3 lg:gap-6">
                    <div className="flex items-center gap-2 text-lg font-semibold text-sky-500 uppercase drop-shadow-md lg:text-xl">
                        <span className="cursor-pointer" onClick={() => navigate('/')}>
                            Trang chủ
                        </span>
                        <ChevronRight />
                        <span className="text-primary-foreground/75">Giới thiệu</span>
                    </div>

                    <p className="font-serif text-4xl leading-[1.4] font-semibold text-white capitalize drop-shadow-lg lg:text-5xl">
                        Xin chào, <span className="text-sky-500">Chúng tôi</span>
                        <br />
                        là <span className="text-sky-500">NHT Marine</span>!
                    </p>

                    <p className="text-base font-medium text-white capitalize drop-shadow-md lg:text-lg">
                        Tất cả những mặt hàng đáp ứng nhu cầu về đam mê về cá cảnh đều có thể được tìm thấy tại NHT
                        Marine!
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AboutHeroSection
