import { Link } from 'react-router-dom'
import { Mail, MapPin, PhoneCall, Sparkles } from 'lucide-react'
import { NAVIGATION_TABS, SOCIAL_LINKS } from '@/configs/constants'
import AppLogo from '@/components/common/AppLogo'

const AppFooter = () => {
    const currentYear = new Date().getFullYear().toString()

    return (
        <footer className="bg-background shadow-md-reverse flex flex-col items-center gap-10 border-t px-4 pt-24 lg:gap-15">
            <div className="max-w-container grid w-full grid-cols-7 gap-[30px] lg:grid-cols-9">
                <div className="col-span-3 pr-10 lg:pr-15">
                    <AppLogo />

                    <div className="text-foreground/75 mt-6 text-base">
                        Ứng dụng tốt nhất cho mua bán và chăm sóc cá cảnh tại thành phố Hồ Chí Minh!
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                        {SOCIAL_LINKS.map(link => (
                            <Link key={link.url} to={link.url}>
                                <link.Icon />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="col-span-2">
                    <h3 className="text-xl font-semibold">Truy cập nhanh</h3>
                    <div className="mt-6 flex flex-col gap-4">
                        {NAVIGATION_TABS.filter(tab => !tab.authRequired).map(tab => (
                            <Link key={tab.href} to={tab.href}>
                                <div className="flex items-center gap-4">
                                    <tab.Icon />
                                    <p className="text-foreground/75 text-base capitalize">{tab.label}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="col-span-2 hidden lg:block">
                    <h3 className="text-xl font-semibold">Tiện nghi nổi bật</h3>
                    <div className="mt-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Sparkles /> <p className="text-foreground/75 text-base">Tư vấn 24 giờ</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Sparkles /> <p className="text-foreground/75 text-base">Giữ xe miễn phí</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Sparkles /> <p className="text-foreground/75 text-base">Không tăng giá dịp lễ, Tết</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-2">
                    <h3 className="text-xl font-semibold">Thông tin liên hệ</h3>
                    <div className="mt-6 flex items-center gap-4">
                        <MapPin /> <p className="text-foreground/75 text-base">97 Man Thiện, phường Hiệp Phú</p>
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                        <Mail /> <p className="text-foreground/75 text-base">nhtmarine@gmail.com</p>
                    </div>
                    <div className="mt-6 flex items-center gap-4">
                        <PhoneCall /> <p className="text-foreground/75 text-base">(+84)913.283.742</p>
                    </div>
                </div>
            </div>
            <div className="max-w-container border-foreground/30 w-full border-t py-[30px] text-center font-semibold tracking-widest uppercase">
                &#169; {currentYear} - Bản quyền thuộc về NHT Marine
            </div>
        </footer>
    )
}

export default AppFooter
