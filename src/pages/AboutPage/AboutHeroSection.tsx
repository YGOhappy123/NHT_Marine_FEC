import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import BackgroundPoster from '@/components/ui/BackgroundPoster'

const AboutHeroSection = () => {
    const navigate = useNavigate()

    return (
        <section className="relative">
            <BackgroundPoster
                imageUrl="https://images.unsplash.com/photo-1748935550505-54279e196f89?q=80&w=1330&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                size="small"
            />

            <div className="absolute bottom-[100px] left-1/2 grid w-full max-w-container -translate-x-1/2 grid-cols-5 gap-[60px] px-5 2xl:bottom-[150px]">
                <div className="col-span-3 flex flex-col gap-6">
                    <p className="flex items-center gap-3 font-semibold uppercase text-secondary">
                        <span className="cursor-pointer" onClick={() => navigate('/')}>
                            Trang chủ
                        </span>
                        <FontAwesomeIcon icon={faCaretRight} />
                        <span className="text-ivory">Giới thiệu</span>
                    </p>
                    <p className="font-serif text-5xl font-semibold capitalize leading-[1.4] text-white drop-shadow-lg">
                        Xin chào, <span className="text-sky-500">Chúng tôi</span> là <span className="text-sky-500">NHT Marine</span>
                    </p>
                    <p className="font-medium capitalize text-white drop-shadow-md text-lg">
                        Tất cả những mặt hàng đáp ứng nhu cầu về đam mê về cá cảnh đều có thể được
                        tìm thấy tại NHT Marine!
                    </p>
                </div>
            </div>
        </section>
    )
}

export default AboutHeroSection
