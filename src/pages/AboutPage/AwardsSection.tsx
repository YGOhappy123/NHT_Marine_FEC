import { Award, CalendarCheck } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type AwardsSectionProps = {
    isSummarized?: boolean
    containerClassNames?: string
}

const AwardsSection = ({ containerClassNames }: AwardsSectionProps) => {
    return (
        <div
            className={twMerge(
                `max-w-container flex w-full flex-col items-center gap-[60px] lg:flex-row ${containerClassNames}`
            )}
        >
            <div className="relative grid grid-cols-[200px_190px_200px] grid-rows-[100px_400px_100px]">
                <div className="col-span-2 col-start-1 row-span-2 row-start-1">
                    <div
                        className="h-full rounded-3xl bg-cover bg-center"
                        style={{
                            backgroundImage: `url(https://images.unsplash.com/photo-1748935543923-bcc9ab22baf7?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`
                        }}
                    ></div>
                </div>
                <div className="bg-background col-span-2 col-start-2 row-span-2 row-start-2 rounded-3xl p-4 shadow-lg">
                    <div
                        className="h-full rounded-2xl bg-cover bg-center"
                        style={{
                            backgroundImage: `url(https://images.unsplash.com/photo-1748935542633-989e3b3ded54?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`
                        }}
                    ></div>
                </div>
                <div className="bg-secondary absolute bottom-[50px] left-[80px] flex flex-col items-center gap-3 rounded-3xl p-6 font-serif">
                    <span className="text-primary/80 text-3xl font-semibold">
                        Trên 90<sup className="ml-1 text-xl">%</sup>
                    </span>
                    <span className="text-ivory text-xl font-semibold capitalize">Khách hài lòng</span>
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-[30px]">
                <p className="text-primary/80 font-semibold tracking-widest uppercase">
                    Hệ cung cấp cá cảnh hiện đại nhất
                </p>
                <p className="font-serif text-5xl leading-[1.2] font-semibold">
                    Chúng tôi tự tin mang cho bạn cảm giác thích thú, thoả mãn, hiện đại với giá cả phải chăng.
                </p>
                <p className="text-muted-foreground font-semibold">
                    Cung cấp dịch vụ tốt nhất, hứa hẹn sẽ giúp bạn tìm được sản phẩm mơ ước cho đam mê cá cảnh của mình.
                </p>
                <div className="text-primary/60 flex items-center gap-3">
                    <Award size={32} />
                    <p className="text-xl font-semibold">Thuộc top 10 cửa hàng cá cảnh tốt nhất Việt Nam năm 2024</p>
                </div>
                <div className="text-primary/60 -mt-3 flex items-center gap-3">
                    <CalendarCheck size={32} />
                    <p className="text-xl font-semibold">Với hơn 5 năm hoạt động trong lĩnh vực cá cảnh</p>
                </div>
            </div>
        </div>
    )
}

export default AwardsSection
