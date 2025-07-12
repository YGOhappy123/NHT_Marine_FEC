import { SiFacebook, SiYoutube, SiTiktok, SiInstagram, SiX, IconType } from '@icons-pack/react-simple-icons'

type NavigationTab = {
    label: string
    href: string
    authRequired?: boolean
}

export const NAVIGATION_TABS: NavigationTab[] = [
    { label: 'trang chủ', href: '/' },
    { label: 'giới thiệu', href: '/about-us' },
    { label: 'sản phẩm', href: '/products' },
    { label: 'tư vấn', href: '/advisory' },
    { label: 'giỏ hàng', href: '/cart', authRequired: true },
    { label: 'profile', href: '/profile', authRequired: true }
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

export const INTRODUCTION_VIDEO_URL = 'https://youtube.com'

export const AUTH_CAROUSEL_IMAGES = [
    'https://www.itl.cat/pngfile/big/185-1857360_animated-gif-fish-share-or-download-water-with.gif'
]
