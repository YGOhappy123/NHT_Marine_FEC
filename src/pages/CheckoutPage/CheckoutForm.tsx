import { Link } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { CircleDollarSign } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RootState } from '@/store'
import { PHONE_REGEX } from '@/configs/constants'
import AppLogo from '@/components/common/AppLogo'

const checkoutFormSchema = z
    .object({
        method: z.enum(['takeFromShop', 'delivery']),
        note: z.string().optional(),
        recipientName: z.string().optional(),
        deliveryAddress: z.string().optional(),
        deliveryPhone: z.string().optional()
    })
    .refine(
        data => {
            if (data.method === 'takeFromShop') return true
            return data.recipientName != null && data.recipientName.trim().length > 0
        },
        {
            message: 'Họ và tên người nhận không được để trống.',
            path: ['recipientName']
        }
    )
    .refine(
        data => {
            if (data.method === 'takeFromShop') return true
            return data.deliveryPhone != null && PHONE_REGEX.test(data.deliveryPhone.trim())
        },
        {
            message: 'Số điện thoại người nhận không hợp lệ.',
            path: ['deliveryPhone']
        }
    )
    .refine(
        data => {
            if (data.method === 'takeFromShop') return true
            return data.deliveryAddress != null && data.deliveryAddress.trim().length > 0
        },
        {
            message: 'Địa chỉ nhận hàng không được để trống.',
            path: ['deliveryAddress']
        }
    )

export type TCheckoutFormSchema = z.infer<typeof checkoutFormSchema>

type CheckoutFormProps = {
    handlePlaceOrder: (values: TCheckoutFormSchema) => Promise<void>
}

const CheckoutForm = ({ handlePlaceOrder }: CheckoutFormProps) => {
    const user = useSelector((state: RootState) => state.auth.user) as ICustomer

    const form = useForm<TCheckoutFormSchema>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            method: 'takeFromShop',
            note: '',
            recipientName: user.fullName,
            deliveryAddress: '',
            deliveryPhone: ''
        }
    })

    const onSubmit = (values: TCheckoutFormSchema) => {
        handlePlaceOrder(values)
    }

    return (
        <div className="flex w-full flex-col items-center">
            <Link to="/">
                <AppLogo />
            </Link>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-11 flex w-full flex-col gap-6 p-6">
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-card-foreground">Ghi chú đơn hàng</FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={4}
                                        placeholder="Ghi chú đơn hàng..."
                                        className="caret-card-foreground text-card-foreground rounded border-2"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="method"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-card-foreground">Chọn phương thức nhận hàng</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="caret-card-foreground text-card-foreground h-12! w-full rounded border-2">
                                            <SelectValue placeholder="Danh mục..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {[
                                            {
                                                value: 'takeFromShop',
                                                title: 'Nhận trực tiếp tại cửa hàng.'
                                            },
                                            {
                                                value: 'delivery',
                                                title: 'Vận chuyển qua đường bưu điện.'
                                            }
                                        ].map(item => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {form.watch('method') === 'delivery' && (
                        <>
                            <FormField
                                control={form.control}
                                name="recipientName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-card-foreground">Họ và tên người nhận</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Họ và tên người nhận..."
                                                className="caret-card-foreground text-card-foreground h-12 rounded border-2 font-semibold"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deliveryPhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-card-foreground">Số điện thoại người nhận</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Số điện thoại người nhận..."
                                                className="caret-card-foreground text-card-foreground h-12 rounded border-2 font-semibold"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="deliveryAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-card-foreground">Địa chỉ nhận hàng</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Địa chỉ nhận hàng..."
                                                className="caret-card-foreground text-card-foreground h-12 rounded border-2 font-semibold"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}

                    <Button size="xl" className="mt-5 ml-auto w-[200px] rounded-full text-base capitalize">
                        <CircleDollarSign />
                        Đặt hàng
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default CheckoutForm
