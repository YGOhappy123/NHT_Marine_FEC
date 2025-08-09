import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

type AwardsSectionProps = {
    isSummarized?: boolean
    containerClassNames?: string
}

const AwardsSection = ({ containerClassNames }: AwardsSectionProps) => {
    return (
        <div className={twMerge(`flex w-full max-w-container gap-[60px] bg-ivory ${containerClassNames}`)}>
            <div className="relative grid grid-cols-[200px_190px_200px] grid-rows-[100px_400px_100px]">
                <div className="col-span-2 col-start-1 row-span-2 row-start-1">
                    <div
                        className="h-full rounded-3xl bg-cover bg-center"
                        style={{
                            backgroundImage: `url(https://images.unsplash.com/photo-1748935543923-bcc9ab22baf7?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`
                        }}
                    ></div>
                </div>
                <div className="col-span-2 col-start-2 row-span-2 row-start-2 rounded-3xl bg-ivory p-[10px] shadow-lg">
                    <div
                        className="h-full rounded-2xl bg-cover bg-center"
                        style={{
                            backgroundImage: `url(https://images.unsplash.com/photo-1748935542633-989e3b3ded54?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`
                        }}
                    ></div>
                </div>
                <div className="absolute bottom-[50px] left-[50px] flex flex-col items-center gap-3 rounded-3xl bg-accent p-6 font-serif">
                    <span className="text-5xl font-semibold text-secondary">
                        99<sup className="ml-1 text-xl">%</sup>
                    </span>
                    <span className="text-xl font-semibold capitalize text-ivory">Khách hài lòng</span>
                </div>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-[30px]">
                <p className="font-semibold uppercase tracking-widest text-secondary">Hệ cung cấp cá cảnh hiện đại nhất</p>
                <p className="font-serif text-5xl font-semibold leading-[1.2]">
                    Chúng tôi tự tin mang cho bạn cảm giác thích thú, thoả mãn, hiện đại với giá cả phải chăng.
                </p>
                <p className="font-semibold text-[#6E6E6E]">
                    Cung cấp dịch vụ tốt nhất, hứa hẹn sẽ giúp bạn tìm được sản phẩm mơ ước cho đam mê cá cảnh của mình.
                </p>
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faAward} className="text-secondary" size="2x" />
                    <p className="text-xl font-semibold">Thuộc top 10 cửa hàng cá cảnh tốt nhất Việt Nam năm 2024</p>
                </div>
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-secondary" size="2x" />
                    <p className="text-xl font-semibold">Với hơn 5 năm hoạt động trong lĩnh vực cá cảnh</p>
                </div>
            </div>
        </div>
    )
}

export default AwardsSection
