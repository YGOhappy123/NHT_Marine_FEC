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
import useDebounce from '@/hooks/useDebounce'

const addAddressFormSchema = z.object({
    recipientName: z.string().min(1, { message: 'Họ và tên người nhận không được để trống.' }),
    phoneNumber: z.string().regex(PHONE_REGEX, { message: 'Số điện thoại người nhận không hợp lệ.' }),
    city: z.string().min(1, { message: 'Vui lòng chọn tỉnh/ thành phố.' }),
    district: z.string().min(1, { message: 'Vui lòng chọn quận/ huyện.' }),
    ward: z.string().min(1, { message: 'Vui lòng chọn phường/ xã.' }),
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
            district: string
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
            city: '',
            district: '',
            ward: '',
            addressLine: ''
        }
    })

    const debouncedCityId = useDebounce(form.watch('city'))
    const debouncedDistrictId = useDebounce(form.watch('district'))

    const fetchAllCitiesQuery = useQuery({
        queryKey: ['cities-all'],
        queryFn: () =>
            axios.get<IOpenLocationResponse<IAddressCity[]>>(`${parsedEnv.VITE_OPEN_LOCATION_URL}/provinces?size=100`)
    })

    const fetchAllDistrictsQuery = useQuery({
        queryKey: ['districts-all', debouncedCityId],
        queryFn: () =>
            axios.get<IOpenLocationResponse<IAddressDistrict[]>>(
                `${parsedEnv.VITE_OPEN_LOCATION_URL}/districts/${debouncedCityId}?size=100`
            ),
        enabled: !!debouncedCityId
    })

    const fetchAllWardsQuery = useQuery({
        queryKey: ['wards-all', debouncedDistrictId],
        queryFn: () =>
            axios.get<IOpenLocationResponse<IAddressWard[]>>(
                `${parsedEnv.VITE_OPEN_LOCATION_URL}/wards/${debouncedDistrictId}?size=100`
            ),
        enabled: !!debouncedDistrictId
    })

    const cities = fetchAllCitiesQuery.data?.data?.data || []
    const districts = fetchAllDistrictsQuery.data?.data?.data || []
    const wards = fetchAllWardsQuery.data?.data?.data || []

    useEffect(() => {
        form.resetField('district')
        form.resetField('ward')
    }, [debouncedCityId, form.resetField])

    useEffect(() => {
        form.resetField('ward')
    }, [debouncedDistrictId, form.resetField])

    const onSubmit = async (values: z.infer<typeof addAddressFormSchema>) => {
        const matchingCity = cities.find(city => city.id === values.city)
        const matchingDistrict = districts.find(district => district.id === values.district)
        const matchingWard = wards.find(ward => ward.id === values.ward)

        if (!matchingCity || !matchingDistrict || !matchingWard) return

        await addNewAddressMutation.mutateAsync({
            recipientName: values.recipientName,
            phoneNumber: values.phoneNumber,
            city: `${matchingCity.typeText === 'Tỉnh' ? 'tỉnh' : 'thành phố'} ${matchingCity.name}`,
            district: `${matchingDistrict.name
                .split(' ')
                .map((w, i) => (i === 0 ? w.toLowerCase() : w))
                .join(' ')}`,
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
            <DialogContent className="min-w-3xl md:min-w-4xl">
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
                            <div className="grid grid-cols-3 items-start gap-4">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-card-foreground">Tỉnh/ thành phố</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                disabled={fetchAllCitiesQuery.isLoading}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="caret-card-foreground text-card-foreground h-12! w-full rounded border-2 font-semibold">
                                                        <SelectValue placeholder="Tỉnh/ thành phố..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {cities.map(city => (
                                                        <SelectItem key={city.id} value={city.id}>
                                                            {city.typeText === 'Tỉnh' ? 'Tỉnh' : 'Thành phố'}{' '}
                                                            {city.name}
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
                                    name="district"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-card-foreground">Quận/ huyện</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                disabled={fetchAllDistrictsQuery.isLoading || !debouncedCityId}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="caret-card-foreground text-card-foreground h-12! w-full rounded border-2 font-semibold">
                                                        <SelectValue placeholder="Quận/ huyện..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {districts.map(district => (
                                                        <SelectItem key={district.id} value={district.id}>
                                                            {district.name}
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
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                disabled={fetchAllWardsQuery.isLoading || !debouncedDistrictId}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="caret-card-foreground text-card-foreground h-12! w-full rounded border-2 font-semibold">
                                                        <SelectValue placeholder="Phường/ xã..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {wards.map(ward => (
                                                        <SelectItem key={ward.id} value={ward.id}>
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
