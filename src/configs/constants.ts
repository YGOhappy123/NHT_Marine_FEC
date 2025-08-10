import { SiFacebook, SiYoutube, SiTiktok, SiInstagram, SiX, IconType } from '@icons-pack/react-simple-icons'
import { House, MessageCircleMore, PencilLine, ScanBarcode, Users } from 'lucide-react'

type NavigationTab = {
    label: string
    href: string
    Icon: IconType
    authRequired?: boolean
}

export const NAVIGATION_TABS: NavigationTab[] = [
    { label: 'trang chủ', href: '/', Icon: House },
    { label: 'giới thiệu', href: '/about-us', Icon: Users },
    { label: 'sản phẩm', href: '/products', Icon: ScanBarcode },
    { label: 'tư vấn', href: '/profile/chat', Icon: MessageCircleMore, authRequired: true },
    { label: 'profile', href: '/profile/edit', Icon: PencilLine, authRequired: true }
]

type SocialLink = {
    platform: string
    url: string
    Icon: IconType
}

export const SOCIAL_LINKS: SocialLink[] = [
    { platform: 'facebook', url: 'https://www.facebook.com', Icon: SiFacebook },
    { platform: 'youtube', url: 'https://youtube.com', Icon: SiYoutube },
    { platform: 'tiktok', url: 'https://www.tiktok.com', Icon: SiTiktok },
    { platform: 'instagram', url: 'https://www.instagram.com', Icon: SiInstagram },
    { platform: 'x', url: 'https://x.com', Icon: SiX }
]

export const LOGIN_SESSION_EXPIRED_MESSAGE = 'Phiên đăng nhập hết hạn. Xin vui lòng đăng nhập lại.'

export const LOGIN_REQUIRED_MESSAGE = 'Bạn cần phải đăng nhập trước khi thực hiện hành đồng này.'

export const INTRODUCTION_VIDEO_URL = 'https://youtube.com'

export const AUTH_CAROUSEL_IMAGES = []

export const AUTH_CAROUSEL_VIDEOS = [
    {
        source: './videos/jelly-fish.mp4',
        type: 'video/mp4'
    }
]

export const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
