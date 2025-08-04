import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Avatar as RadixAvatar, AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'

const ProductNotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4">
            <RadixAvatar className="w-[50%] xl:w-[40%]">
                <RadixAvatarImage src="/images/empty-cart.png" alt="empty cart"></RadixAvatarImage>
            </RadixAvatar>
            <p className="text-sm font-semibold">Các sản phẩm không tồn tại hoặc đã bị gỡ bởi quản trị viên!</p>
            <Button
                size="lg"
                variant="outline"
                className="min-w-[50%] rounded-full text-sm capitalize xl:min-w-[40%]"
                onClick={() => navigate('/products')}
            >
                <ShoppingCart />
                Xem các sản phẩm khác
            </Button>
        </div>
    )
}

export default ProductNotFound
