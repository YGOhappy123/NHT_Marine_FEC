import { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useQuery, UseMutationResult } from '@tanstack/react-query'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { PHONE_REGEX } from '@/configs/constants'
import { parsedEnv } from '@/env'
import axios from 'axios'

const addAddressFormSchema = z.object({
    recipientName: z.string().min(1, { message: 'Họ và tên người nhận không được để trống.' }),
    phoneNumber: z.string().regex(PHONE_REGEX, { message: 'Số điện thoại người nhận không hợp lệ.' }),
    city: z.number().min(1, { message: 'Vui lòng chọn tỉnh/ thành phố.' }),
    ward: z.number().min(1, { message: 'Vui lòng chọn phường/ xã.' }),
    addressLine: z.string().min(1, { message: 'Địa chỉ cụ thể không được để trống.' })
})

type AddAddressDialogProps = {
    triggerButtonClassname?: string
    addNewAddressMutation: UseMutationResult<
        any,
        any,
        {
            recipientName: string
            phoneNumber: string
            city: string
            ward: string
            addressLine: string
        },
        any
    >
}

const AddAddressDialog = ({ triggerButtonClassname, addNewAddressMutation }: AddAddressDialogProps) => {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof addAddressFormSchema>>({
        resolver: zodResolver(addAddressFormSchema),
        defaultValues: {
            recipientName: '',
            phoneNumber: '',
            city: 0,
            ward: 0,
            addressLine: ''
        }
    })

    const fetchAllCitiesQuery = useQuery({
        queryKey: ['cities-all'],
        queryFn: () => axios.get<IAddressCity[]>(parsedEnv.VITE_OPEN_LOCATION_URL)
    })

    const cities = fetchAllCitiesQuery.data?.data || []
    const wards = cities.find(city => city.code === form.watch('city'))?.wards ?? []

    useEffect(() => {
        form.resetField('ward')
    }, [form.watch('city'), form.resetField])

    const onSubmit = async (values: z.infer<typeof addAddressFormSchema>) => {
        const matchingCity = cities.find(city => city.code === values.city)
        const matchingWard = wards.find(ward => ward.code === values.ward)

        if (!matchingCity || !matchingWard) return

        await addNewAddressMutation.mutateAsync({
            recipientName: values.recipientName,
            phoneNumber: values.phoneNumber,
            city: matchingCity.name.startsWith('Thành phố')
                ? `thành phố ${matchingCity.name.split(' ').slice(2).join(' ')}`
                : `tỉnh ${matchingCity.name}`,
            ward: `${matchingWard.name
                .split(' ')
                .map((w, i) => (i === 0 ? w.toLowerCase() : w))
                .join(' ')}`,
            addressLine: values.addressLine
        })

        form.reset()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" className={triggerButtonClassname}>
                    <MapPin /> <span className="hidden lg:block">Thêm địa chỉ</span>{' '}
                    <span className="lg:hidden">Thêm</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-2xl md:min-w-3xl">
                <DialogHeader>
                    <DialogTitle>Thêm địa chỉ nhận hàng</DialogTitle>
                    <DialogDescription>
                        Thêm các thông tin bao gồm họ & tên người nhận, số điện thoại và địa chỉ chi tiết. Ấn "Xác nhận"
                        sau khi hoàn tất.
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-6">
                            <FormField
                                control={form.control}
                                name="recipientName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-card-foreground">Họ & tên người nhận</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Họ & tên người nhận..."
                                                className="text-card-foreground caret-card-foreground h-12 rounded border-2 font-semibold"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-card-foreground">Số điện thoại người nhận</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Số điện thoại người nhận..."
                                                className="text-card-foreground caret-card-foreground h-12 rounded border-2 font-semibold"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 items-start gap-4">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-card-foreground">Tỉnh/ thành phố</FormLabel>
                                            <Select
                                                onValueChange={value => field.onChange(Number(value))}
                                                value={field.value?.toString() ?? ''}
                                                disabled={fetchAllCitiesQuery.isLoading}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="caret-card-foreground text-card-foreground h-12! w-full rounded border-2 font-semibold">
                                                        <SelectValue placeholder="Tỉnh/ thành phố..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {cities.map(city => (
                                                        <SelectItem key={city.code} value={city.code.toString()}>
                                                            {city.name.startsWith('Thành phố')
                                                                ? city.name
                                                                : `Tỉnh ${city.name}`}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="ward"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-card-foreground">Phường/ xã</FormLabel>
                                            <Select
                                                onValueChange={value => field.onChange(Number(value))}
                                                value={field.value?.toString() ?? ''}
                                                disabled={!form.watch('city')}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="caret-card-foreground text-card-foreground h-12! w-full rounded border-2 font-semibold">
                                                        <SelectValue placeholder="Phường/ xã..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {wards.map(ward => (
                                                        <SelectItem key={ward.code} value={ward.code.toString()}>
                                                            {ward.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="addressLine"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-card-foreground">Địa chỉ cụ thể</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Địa chỉ cụ thể (Số nhà, tên đường, ngõ, hẻm,...)"
                                                className="text-card-foreground caret-card-foreground h-12 rounded border-2 font-semibold"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator />
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => form.reset()}>
                                Đặt lại
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    form.reset()
                                    setOpen(false)
                                }}
                            >
                                Hủy bỏ
                            </Button>
                            <Button type="submit">Xác nhận</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddAddressDialog
