import { useNavigate } from 'react-router-dom'
import { UseMutationResult } from '@tanstack/react-query'
import { ShoppingCart, Trash } from 'lucide-react'
import { Avatar as RadixAvatar, AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DetailedCart } from '@/hooks/useCustomerCart'
import formatCurrency from '@/utils/formatCurrency'
import QuantityInput from '@/components/common/QuantityInput'

type CartContentProps = {
    isLoading: boolean
    detailedCart: DetailedCart | null
    updateCartItemMutation: UseMutationResult<any, any, { productItemId: number; quantity: number }, any>
    deleteCartItemMutation: UseMutationResult<any, any, { productItemId: number }, any>
}

const CartContent = ({ isLoading, detailedCart, updateCartItemMutation, deleteCartItemMutation }: CartContentProps) => {
    const navigate = useNavigate()
    return (
        <div className="flex-1 overflow-y-auto">
            {detailedCart == null || detailedCart.items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4">
                    <RadixAvatar className="w-[50%] xl:w-[40%]">
                        <RadixAvatarImage src="/images/empty-cart.png" alt="empty cart"></RadixAvatarImage>
                    </RadixAvatar>
                    <p className="text-sm font-semibold">Bạn chưa có sản phẩm nào trong giỏ hàng!</p>
                    <Button
                        size="lg"
                        variant="outline"
                        className="min-w-[50%] rounded-full text-sm capitalize xl:min-w-[40%]"
                        onClick={() => navigate('/products')}
                    >
                        <ShoppingCart />
                        Bắt đầu mua sắm
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {detailedCart.items.map(item => (
                        <div key={item.productItemId} className="hover:bg-muted/80 flex items-start gap-6 p-3">
                            <Avatar className="size-20 rounded-lg">
                                <AvatarImage src={item.product.imageUrl} alt={item.product.rootProduct.name} />
                            </Avatar>

                            <div className="flex-1">
                                <div className="mb-1 line-clamp-1 text-sm font-medium">
                                    {item.product.rootProduct.name} (x{item.quantity.toString().padStart(2, '0')})
                                </div>
                                <div className="text-muted-foreground text-sm">
                                    <p className="line-clamp-1">
                                        <span className="font-medium">Phân loại: </span>
                                        {item.product.attributes
                                            .map(attr => `${attr.variant}: ${attr.option}`)
                                            .join(', ')}
                                    </p>
                                    <p className="line-clamp-1">
                                        <span className="font-medium">Số lượng tồn kho: </span>
                                        {item.product.stock}
                                    </p>
                                    {item.product.discountRate ? (
                                        <>
                                            <p>
                                                <span className="font-medium">Giá tiền gốc: </span>
                                                {formatCurrency(item.product.price)}
                                            </p>
                                            <p>
                                                <span className="font-medium">Giá tiền hiện tại: </span>
                                                {formatCurrency(
                                                    item.product.price * (1 - item.product.discountRate / 100)
                                                )}
                                                <span className="text-destructive">
                                                    {' '}
                                                    (-{item.product.discountRate}%)
                                                </span>
                                            </p>
                                        </>
                                    ) : (
                                        <p>
                                            <span className="font-medium">Giá tiền: </span>
                                            {formatCurrency(item.product.price)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-3">
                                <QuantityInput
                                    isLoading={isLoading}
                                    initValue={item.quantity}
                                    maximum={item.product.stock}
                                    onChange={value => {
                                        if (value === item.quantity) return
                                        if (value === 0) {
                                            deleteCartItemMutation.mutateAsync({ productItemId: item.productItemId })
                                            return
                                        }
                                        updateCartItemMutation.mutateAsync({
                                            productItemId: item.productItemId,
                                            quantity: value
                                        })
                                    }}
                                />

                                <Button
                                    size="icon"
                                    variant="destructive"
                                    className="rounded-full"
                                    disabled={isLoading}
                                    onClick={async () => {
                                        if (isLoading) return
                                        await deleteCartItemMutation.mutateAsync({ productItemId: item.productItemId })
                                    }}
                                >
                                    <Trash />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CartContent
