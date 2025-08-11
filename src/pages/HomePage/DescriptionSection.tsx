import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import HighlightedServicesSection from '@/pages/HomePage/HighlightedServicesSection'

const DESCRIPTION_IMAGES = [
    'https://media.istockphoto.com/id/2156738236/photo/koi-fish-cluster-together-underwater-fishes-nishikigoi-koi-asian-japanese-wildlife-colorful.webp?a=1&b=1&s=612x612&w=0&k=20&c=W5H0eNOZ3ByL-LPh6VxlT4qrkrvKI-pgNrBKovmPIWc=',
    'https://media.istockphoto.com/id/2153953530/photo/lotus-blossoms-and-goldfish-swimming-in-the-pond.webp?a=1&b=1&s=612x612&w=0&k=20&c=xf4l9UIryGJdeJ3SXajA9Nw8P_AjnARyRWHviANfiEE=',
    'https://media.istockphoto.com/id/2214659850/photo/arowana-fishes-in-water.webp?a=1&b=1&s=612x612&w=0&k=20&c=g4r-8J5NaM-JZ0jq63dGpDEi10pXTlBcX5hmqObhx9U='
]

const DescriptionSection = () => {
    return (
        <section className="flex flex-col items-center px-5 py-[100px]">
            <div className="max-w-container flex w-full flex-col gap-9">
                <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div className="flex flex-col gap-5 lg:max-w-[70%]">
                        <p className="text-primary/80 font-semibold tracking-widest uppercase">Vài nét về chúng tôi</p>
                        <p className="font-serif text-5xl leading-[1.4] font-semibold text-balance">
                            Mặt hàng với giá cả phải chăng cùng các sản phẩm hữu ích cho cá cảnh
                        </p>
                    </div>
                    <Link to="/products">
                        <div className="text-primary flex items-center gap-2 font-semibold tracking-widest uppercase">
                            Sản phẩm dành cho bạn <ArrowRight />
                        </div>
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-3 pt-10 lg:gap-8">
                    <div className="relative flex flex-col items-start gap-3 pr-5 pl-[30px] lg:gap-5 lg:pl-[50px]">
                        <div
                            className="bg-primary/80 absolute bottom-0 left-0 rounded-t-3xl"
                            style={{
                                width: 'calc(100% + 120px)',
                                height: 'calc(100% + 40px)'
                            }}
                        ></div>
                        <Quote className="text-primary-foreground/75 z-[1] h-8 w-8 lg:h-12 lg:w-12" />
                        <p className="text-primary-foreground/75 z-[1] text-lg font-semibold italic xl:text-[22px] xl:leading-[1.2] 2xl:text-[26px] 2xl:leading-[1.3]">
                            "NHT Marine! Natural Habitat, True beauty!"
                        </p>
                    </div>
                    {DESCRIPTION_IMAGES.map(imageUrl => (
                        <div
                            key={imageUrl}
                            className="bg-background z-[1] h-[175px] rounded-t-3xl px-[10px] pt-[10px] lg:h-[200px]"
                        >
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
