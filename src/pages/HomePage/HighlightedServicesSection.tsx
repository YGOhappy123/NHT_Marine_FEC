import { twMerge } from 'tailwind-merge'
import { IconType } from '@icons-pack/react-simple-icons'
import { Card, CardContent } from '@/components/ui/card'
import { Fish, MessageCircleQuestionMark, Package2 } from 'lucide-react'

type HighlightedServicesSectionProps = {
    isSummarized?: boolean
    containerClassNames?: string
}

type ServiceSummary = {
    Icon: IconType
    name: string
    description: string
}

const HIGHLIGHTED_SERVICES: ServiceSummary[] = [
    {
        Icon: Fish,
        name: 'Đa dạng loài cá cảnh và phụ kiện',
        description: 'Cung cấp nhiều loại cá cảnh khác nhau với giá cả và các tiện ích phù hợp với mọi nhu cầu của bạn'
    },
    {
        Icon: Package2,
        name: 'Giao hàng tận nơi nhanh chóng',
        description:
            'Chúng tôi cung cấp dịch vụ giao hàng tận nơi cho tất cả các sản phẩm của mình, đảm bảo bạn nhận được hàng hóa một cách nhanh chóng và tiện lợi'
    },
    {
        Icon: MessageCircleQuestionMark,
        name: 'Chăm sóc khách hàng tận tình',
        description:
            'Chúng tôi cung cấp dịch vụ chăm sóc khách hàng tận tình để giúp bạn chọn lựa sản phẩm phù hợp nhất với nhu cầu của mình'
    }
]

const HighlightedServicesSection = ({ isSummarized = false, containerClassNames }: HighlightedServicesSectionProps) => {
    return (
        <div className={twMerge(`max-w-container flex w-full flex-col gap-9 ${containerClassNames}`)}>
            <div className="flex flex-col items-center gap-5">
                <p className="text-primary/80 font-semibold tracking-widest uppercase">
                    Các dịch vụ chúng tôi cung cấp
                </p>
                <p className="font-serif text-5xl leading-[1.4] font-semibold text-balance">
                    Các dịch vụ nổi bật tại NHT Marine
                </p>
            </div>
            <div className={`grid grid-cols-3 gap-[30px] ${isSummarized ? '' : 'grid-rows-2'}`}>
                {HIGHLIGHTED_SERVICES.filter((_, index) => (isSummarized && index >= 3 ? false : true)).map(service => (
                    <Card key={service.name}>
                        <CardContent className="flex flex-1 flex-col items-center gap-6">
                            <service.Icon size={48} className="text-primary/80" />
                            <div className="flex-1">
                                <p className="text-primary/80 px-6 text-center font-serif text-3xl font-semibold capitalize">
                                    {service.name}
                                </p>
                                <p className="text-muted-foreground mt-4 text-center text-lg">{service.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default HighlightedServicesSection
