import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import HighlightedServicesSection from '@/pages/HomePage/HighlightedServicesSection'


const DESCRIPTION_IMAGES = [
    'https://media.istockphoto.com/id/2156738236/photo/koi-fish-cluster-together-underwater-fishes-nishikigoi-koi-asian-japanese-wildlife-colorful.webp?a=1&b=1&s=612x612&w=0&k=20&c=W5H0eNOZ3ByL-LPh6VxlT4qrkrvKI-pgNrBKovmPIWc=',
    'https://media.istockphoto.com/id/2153953530/photo/lotus-blossoms-and-goldfish-swimming-in-the-pond.webp?a=1&b=1&s=612x612&w=0&k=20&c=xf4l9UIryGJdeJ3SXajA9Nw8P_AjnARyRWHviANfiEE=',
    'https://media.istockphoto.com/id/2214659850/photo/arowana-fishes-in-water.webp?a=1&b=1&s=612x612&w=0&k=20&c=g4r-8J5NaM-JZ0jq63dGpDEi10pXTlBcX5hmqObhx9U='
]

const DescriptionSection = () => {
    return (
        <section className="flex flex-col items-center bg-ivory px-5 py-[100px]">
            <div className="flex w-full max-w-container flex-col gap-9">
                <div className="flex items-center justify-between">
                    <div className="flex max-w-[70%] flex-col gap-5">
                        <p className="font-semibold uppercase tracking-widest text-secondary">Vài nét về chúng tôi</p>
                        <p className="text-balance font-serif text-5xl font-semibold leading-[1.4]">
                            Mặt hàng với giá cả phải chăng cùng các sản phẩm hữu ích cho cá cảnh
                        </p>
                    </div>
                    <Link to="/products">
                        <div className="font-semibold uppercase tracking-widest text-primary">
                            Sản phẩm dành cho bạn <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-[30px] pt-10">
                    <div className="relative flex flex-col items-start gap-5 pl-[50px] pr-5">
                        <div
                            className="absolute bottom-0 left-0 rounded-t-3xl bg-accent"
                            style={{
                                width: 'calc(100% + 120px)',
                                height: 'calc(100% + 40px)'
                            }}
                        ></div>
                        <FontAwesomeIcon icon={faQuoteLeft} className="z-[1] text-[#DADADA]" size="3x" />
                        <p className="z-[1] text-lg font-semibold italic text-white/75 xl:text-[22px] xl:leading-[1.2] 2xl:text-[26px] 2xl:leading-[1.3]">
                            "NHT Marine! Natural Habitat, True beauty!"
                        </p>
                    </div>
                    {DESCRIPTION_IMAGES.map(imageUrl => (
                        <div key={imageUrl} className="z-[1] h-[175px] rounded-t-3xl bg-ivory px-[10px] pt-[10px] lg:h-[200px]">
                            <div
                                className="h-full rounded-t-2xl bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(${imageUrl})`
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
            <HighlightedServicesSection isSummarized containerClassNames="pt-[100px]" />
        </section>
    )
}

export default DescriptionSection
