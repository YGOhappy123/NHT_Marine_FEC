import { Link, useNavigate } from 'react-router-dom'
import { Play } from 'lucide-react'
import { INTRODUCTION_VIDEO_URL } from '@/configs/constants'
import BackgroundPoster from '@/components/ui/BackgroundPoster'

const HomeHeroSection = () => {
    const navigate = useNavigate()

    return (
        <section className="relative">
            <BackgroundPoster
                imageUrl="https://images.unsplash.com/photo-1748152559648-add6a979b4fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                size="big"
            />

            <div className="max-w-container absolute top-1/2 left-1/2 grid w-full -translate-1/2 grid-cols-6 gap-[60px] px-5 lg:grid-cols-5">
                <div className="col-span-4 flex flex-col gap-4 lg:col-span-3 lg:gap-6">
                    <p className="text-lg font-semibold text-sky-500 uppercase drop-shadow-md lg:text-xl">
                        Thế giới Cá Cảnh – Vẻ đẹp từ đại dương
                    </p>

                    <p className="font-serif text-4xl leading-[1.4] font-semibold text-white capitalize drop-shadow-lg lg:text-5xl">
                        Khám phá <span className="text-sky-500">cá cảnh</span>
                        <br />
                        Ngay hôm nay
                    </p>

                    <p className="text-base font-medium text-white capitalize drop-shadow-md lg:text-lg">
                        Mang sắc màu và sự sống động của biển cả vào ngôi nhà bạn – cá cảnh khỏe mạnh, đẹp và đa dạng
                        loài.
                    </p>

                    <div className="grid grid-cols-2 items-center gap-6">
                        <button
                            className="flex h-[45px] items-center justify-center rounded-full bg-sky-400 text-sm font-semibold tracking-widest text-white uppercase drop-shadow-md hover:bg-sky-500 lg:h-[60px] lg:text-base"
                            onClick={() => navigate('/about-us')}
                        >
                            Giới thiệu cửa hàng
                        </button>
                        <button
                            className="flex h-[45px] items-center justify-center rounded-full bg-white text-sm font-semibold tracking-widest text-sky-500 uppercase drop-shadow-md hover:bg-white/90 lg:h-[60px] lg:text-base"
                            onClick={() => navigate('/products')}
                        >
                            Xem các sản phẩm
                        </button>
                    </div>
                </div>

                <div className="col-span-2 flex items-center justify-center">
                    <Link
                        className="flex aspect-square w-[70px] cursor-pointer items-center justify-center rounded-full bg-sky-300 drop-shadow-lg hover:bg-sky-400 lg:w-[90px]"
                        to={INTRODUCTION_VIDEO_URL}
                    >
                        {/* <FontAwesomeIcon icon={faPlay} className="text-white" size="2xl" /> */}
                        <Play className="lg:h-8 lg:w-8" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HomeHeroSection
