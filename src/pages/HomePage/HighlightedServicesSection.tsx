
import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {  faFish, faMotorcycle, faQuestion} from '@fortawesome/free-solid-svg-icons'

type HighlightedServicesSectionProps = {
    isSummarized?: boolean
    containerClassNames?: string
}

type ServiceSummary = {
    icon: IconProp
    name: string
    description: string
    isActive: boolean
}

const HIGHLIGHTED_SERVICES: ServiceSummary[] = [
    {
        icon: faFish,
        name: 'Đa dạng loài cá cảnh',
        description: 'Cung cấp nhiều loại cá cảnh khác nhau với giá cả và các tiện ích phù hợp với mọi nhu cầu của bạn',
        isActive: true
    },
    {
        icon: faMotorcycle,
        name: 'Giao hàng tận nơi',
        description: 'Chúng tôi cung cấp dịch vụ giao hàng tận nơi cho tất cả các sản phẩm của mình, đảm bảo bạn nhận được hàng hóa một cách nhanh chóng và tiện lợi',
        isActive: false
    },
    {
        icon: faQuestion,
        name: 'Dịch vụ chăm sóc khách hàng tận tình',
        description: 'Chúng tôi cung cấp dịch vụ chăm sóc khách hàng tận tình để giúp bạn chọn lựa sản phẩm phù hợp nhất với nhu cầu của mình',
        isActive: false
    }
]

const HighlightedServicesSection = ({ isSummarized = false, containerClassNames }: HighlightedServicesSectionProps) => {

    return (
        <div className={twMerge(`flex w-full max-w-container flex-col gap-9 ${containerClassNames}`)}>
            <div className="flex flex-col items-center gap-5">
                <p className="font-semibold uppercase tracking-widest text-secondary">Các dịch vụ chúng tôi cung cấp</p>
                <p className="text-balance font-serif text-5xl font-semibold leading-[1.4]">Các dịch vụ nổi bật tại NHT Marine</p>
            </div>
            <div className={`grid grid-cols-3 gap-[30px] ${isSummarized ? '' : 'grid-rows-2'}`}>
                {HIGHLIGHTED_SERVICES.filter((_, index) => (isSummarized && index >= 3 ? false : true)).map(service => (
                    <div
                        key={service.name}
                        className={`flex flex-col items-center gap-6 rounded-3xl p-[50px] ${service.isActive ? 'bg-accent' : 'bg-white'}`}
                    >
                        <FontAwesomeIcon icon={service.icon} className="text-secondary" size="3x" />
                        <div>
                            <p
                                className={`text-center font-serif text-3xl font-semibold capitalize ${service.isActive ? 'text-ivory' : 'text-[#2D2D2D]'}`}
                            >
                                {service.name}
                            </p>
                            <p className={`mt-[10px] text-center text-lg ${service.isActive ? 'text-ivory' : 'text-[#6E6E6E]'}`}>
                                {service.description}
                            </p>
                        </div>
                        
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default HighlightedServicesSection
