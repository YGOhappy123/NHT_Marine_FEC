import { useMemo } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { DetailedCart } from '@/hooks/useCustomerCart'
import { Button } from '@/components/ui/button'
import formatCurrency from '@/utils/formatCurrency'

const couponFormSchema = z.object({
    code: z.string().min(1, { message: 'Mã phiếu giảm giá không được bỏ trống.' })
})

type ProductSummarizeProps = {
    items: DetailedCart['items']
    coupon: ICoupon | null
    handleVerifyCoupon: (code: string) => Promise<void>
    handleClearCoupon: () => void
}

const ProductSummarize = ({ items, coupon, handleVerifyCoupon, handleClearCoupon }: ProductSummarizeProps) => {
    const form = useForm<z.infer<typeof couponFormSchema>>({
        resolver: zodResolver(couponFormSchema),
        defaultValues: {
            code: ''
        }
    })

    const onSubmit = (values: z.infer<typeof couponFormSchema>) => {
        if (coupon === null) {
            handleVerifyCoupon(values.code)
        } else {
            handleClearCoupon()
        }
    }

    const originalTotal = useMemo(
        () => items.reduce((total, item) => total + item.product.price * item.quantity, 0),
        [items]
    )

    const promotionDiscount = useMemo(
        () =>
            items.reduce(
                (total, item) => total + item.product.price * item.quantity * ((item.product.discountRate ?? 0) / 100),
                0
            ),
        [items]
    )

    const couponDiscount = useMemo(() => {
        if (!coupon) return 0
        const subTotalPrice = items.reduce(
            (total, item) => total + item.product.price * item.quantity * (1 - (item.product.discountRate ?? 0) / 100),
            0
        )
        if (coupon.type === 'Percentage') return (subTotalPrice * coupon.amount) / 100
        return Math.min(coupon.amount, subTotalPrice)
    }, [items, coupon])

    return (
        <div>
            <div className="flex max-h-[300px] flex-col gap-3 overflow-y-auto">
                {items.map(item => (
                    <div key={item.productItemId} className="hover:bg-muted/80 flex items-start gap-6 rounded-md p-3">
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
                                    {item.product.attribute.map(attr => `${attr.variant}: ${attr.option}`).join(', ')}
                                </p>
                                {item.product.discountRate ? (
                                    <>
                                        <p>
                                            <span className="font-medium">Giá tiền gốc: </span>
                                            {formatCurrency(item.product.price)}
                                        </p>
                                        <p>
                                            <span className="font-medium">Giá tiền hiện tại: </span>
                                            {formatCurrency(item.product.price * (1 - item.product.discountRate / 100))}
                                            <span className="text-destructive"> (-{item.product.discountRate}%)</span>
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
                    </div>
                ))}
            </div>
            <Separator className="my-4" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full gap-4">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input
                                        disabled={coupon != null}
                                        placeholder="Mã phiếu giảm giá..."
                                        className="caret-card-foreground text-card-foreground h-12 rounded border-2 font-semibold"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        className="h-12 rounded px-6"
                        variant={coupon ? 'destructive' : 'default'}
                        disabled={form.watch('code') === ''}
                    >
                        {coupon ? 'Hủy bỏ' : 'Kiểm tra'}
                    </Button>
                </form>
            </Form>
            <Separator className="my-4" />
            <div className="flex flex-col gap-2">
                <div className="flex justify-between font-medium">
                    <span>Giá tiền gốc: </span> {formatCurrency(originalTotal)}
                </div>
                <div className="text-destructive flex justify-between font-medium">
                    <span>Giảm giá từ khuyến mãi: </span> -{formatCurrency(promotionDiscount)}
                </div>
                {couponDiscount > 0 && (
                    <div className="text-destructive flex justify-between font-medium">
                        <span>Giảm giá từ phiếu giảm giá: </span> -{formatCurrency(couponDiscount)}
                    </div>
                )}
            </div>
            <Separator className="my-4" />
            <div className="text-primary flex justify-between text-lg font-semibold">
                <span>Tổng cộng: </span> {formatCurrency(originalTotal - promotionDiscount - couponDiscount)}
            </div>
        </div>
    )
}

export default ProductSummarize
