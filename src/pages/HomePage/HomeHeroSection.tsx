import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
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

            <div className="absolute bottom-[100px] left-1/2 grid w-full max-w-container -translate-x-1/2 grid-cols-5 gap-[60px] px-5 2xl:bottom-[200px]">
                <div className="col-span-3 flex flex-col gap-6">
                    {/* Tiêu đề phụ */}
                    <p className="font-semibold uppercase text-sky-500 drop-shadow-md text-xl">
                        Thế giới Cá Cảnh – Vẻ đẹp từ đại dương
                    </p>

                    {/* Tiêu đề chính */}
                    <p className="font-serif text-5xl font-semibold capitalize leading-[1.4] text-white drop-shadow-lg">
                        Khám phá <span className="text-sky-500">cá cảnh</span>
                    </p>

                    <p className="font-serif text-5xl font-semibold capitalize leading-[1.4] text-white drop-shadow-lg">
                        Ngay hôm nay
                    </p>

                    {/* Mô tả ngắn */}
                    <p className="font-medium capitalize text-white drop-shadow-md text-lg">
                        Mang sắc màu và sự sống động của biển cả vào ngôi nhà bạn – cá cảnh khỏe mạnh, đẹp và đa dạng loài.
                    </p>


                    {/* Nút */}
                    <div className="flex items-center gap-6">
                        <button
                            className="flex h-[60px] w-[280px] items-center justify-center rounded-full bg-sky-400 font-semibold uppercase tracking-widest text-white hover:bg-sky-500 drop-shadow-md"
                            onClick={() => navigate('/about-us')}
                        >
                            Giới thiệu cửa hàng
                        </button>
                        <button
                            className="flex h-[60px] w-[230px] items-center justify-center rounded-full bg-white font-semibold uppercase tracking-widest text-sky-500 hover:bg-white/90 drop-shadow-md"
                            onClick={() => navigate('/products')}
                        >
                            Xem cá sản phẩm
                        </button>
                    </div>
                </div>

                {/* Video giới thiệu */}
                <div className="col-span-2 flex items-center justify-center">
                    <Link
                        className="flex aspect-square w-[90px] cursor-pointer items-center justify-center rounded-full bg-sky-300 hover:bg-sky-400 drop-shadow-lg"
                        to={INTRODUCTION_VIDEO_URL}
                    >
                        <FontAwesomeIcon icon={faPlay} className="text-white" size="2xl" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HomeHeroSection
