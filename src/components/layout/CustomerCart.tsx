import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleDollarSign, ListRestart } from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@/components/common/ConfirmationDialog'
import useCustomerCart from '@/hooks/useCustomerCart'
import cartService from '@/services/cartService'
import formatCurrency from '@/utils/formatCurrency'
import CartContent from '@/components/layout/CartContent'

type CustomerCartProps = {
    trigger: ReactElement
}

const CustomerCart = ({ trigger }: CustomerCartProps) => {
    const navigate = useNavigate()
    const { detailedCart, totalCount, totalPrice } = useCustomerCart()
    const { updateCartItemMutation, deleteCartItemMutation, resetCartMutation } = cartService({ enableFetching: true })

    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent className="gap-0 md:max-w-[500px]! xl:max-w-[600px]!">
                <SheetHeader>
                    <SheetTitle>Giỏ hàng của bạn</SheetTitle>
                    <SheetDescription>
                        Bạn có thể thay đổi các sản phẩm trong giỏ hàng trực tiếp tại đây. Một số sản phẩm có thể hết
                        hàng hoặc bị gỡ bởi người quản lý.
                    </SheetDescription>
                    <Separator className="mt-2" />
                </SheetHeader>

                <CartContent
                    isLoading={
                        updateCartItemMutation.isPending ||
                        deleteCartItemMutation.isPending ||
                        resetCartMutation.isPending
                    }
                    detailedCart={detailedCart}
                    updateCartItemMutation={updateCartItemMutation}
                    deleteCartItemMutation={deleteCartItemMutation}
                />

                <SheetFooter>
                    <Separator className="mb-2" />
                    {totalPrice > 0 && totalCount > 0 && (
                        <>
                            <div className="-mt-2 flex items-center justify-between">
                                <p className="text-foreground font-semibold">Tổng số sản phẩm:</p>
                                <p>{totalCount}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-foreground font-semibold">Tổng tiền:</p>
                                <p>{formatCurrency(totalPrice)}</p>
                            </div>
                            <Separator className="mb-2" />
                        </>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                        <ConfirmationDialog
                            title="Bạn có chắc muốn đặt lại giỏ hàng của mình không?"
                            description="Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn tất cả sản phẩm trong giỏ hàng của bạn."
                            onConfirm={async () => {
                                if (totalCount === 0) return
                                await resetCartMutation.mutateAsync()
                            }}
                            trigger={
                                <Button
                                    size="xl"
                                    variant="secondary"
                                    className="rounded-full text-base capitalize"
                                    disabled={totalCount === 0}
                                >
                                    <ListRestart /> Đặt lại giỏ hàng
                                </Button>
                            }
                        />
                        <Button
                            size="xl"
                            className="rounded-full text-base capitalize"
                            onClick={() => navigate('/checkout')}
                            disabled={totalCount === 0}
                        >
                            <CircleDollarSign />
                            Đặt hàng
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
export default CustomerCart
