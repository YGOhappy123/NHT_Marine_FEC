import { useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { CircleDollarSign } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RootState } from '@/store'
import AppLogo from '@/components/common/AppLogo'
import ChooseAddressSection from '@/pages/CheckoutPage/ChooseAddressSection'

const checkoutFormSchema = z.object({
    method: z.enum(['takeFromShop', 'delivery']),
    note: z.string().optional(),
    recipientName: z.string().optional(),
    deliveryAddress: z.string().optional(),
    deliveryPhone: z.string().optional()
})

export type TCheckoutFormSchema = z.infer<typeof checkoutFormSchema>

type CheckoutFormProps = {
    handlePlaceOrder: (values: TCheckoutFormSchema) => Promise<void>
}

const CheckoutForm = ({ handlePlaceOrder }: CheckoutFormProps) => {
    const user = useSelector((state: RootState) => state.auth.user) as ICustomer
    const [isDisabled, setIsDisabled] = useState(false)

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
                        <ChooseAddressSection
                            setCheckoutDisabled={setIsDisabled}
                            setData={(ad: ICustomerAddress) => {
                                form.setValue('recipientName', ad.recipientName)
                                form.setValue('deliveryPhone', ad.phoneNumber)
                                form.setValue('deliveryAddress', [ad.addressLine, ad.ward, ad.city].join(', '))
                            }}
                        />
                    )}

                    <Button
                        size="xl"
                        className="mt-5 ml-auto w-[200px] rounded-full text-base capitalize"
                        disabled={isDisabled}
                    >
                        <CircleDollarSign />
                        Đặt hàng
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default CheckoutForm
