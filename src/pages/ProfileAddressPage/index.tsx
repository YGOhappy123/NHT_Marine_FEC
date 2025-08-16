import { useSelector } from 'react-redux'
import { Eraser, Settings, Sparkles } from 'lucide-react'
import { Avatar as RadixAvatar, AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RootState } from '@/store'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import ConfirmationDialog from '@/components/common/ConfirmationDialog'
import AddAddressDialog from '@/pages/ProfileAddressPage/AddAddressDialog'
import customerService from '@/services/customerService'

const ProfileAddressPage = () => {
    const addresses = useSelector((state: RootState) => state.app.addresses)
    const { addNewAddressMutation, setAddressAsDefaultMutation, deleteAddressMutation } = customerService({
        enableFetching: true
    })

    return (
        <div className="flex h-full flex-1 flex-col items-center justify-center space-y-8 p-4">
            <Card className="w-full max-w-4xl">
                <CardHeader className="relative text-center">
                    <CardTitle className="text-xl">Danh sách địa chỉ</CardTitle>
                    <CardDescription>Danh sách thông tin nhận hàng của bạn</CardDescription>
                    <AddAddressDialog
                        triggerButtonClassname="absolute right-6"
                        addNewAddressMutation={addNewAddressMutation}
                    />
                </CardHeader>
                <CardContent className="py-6">
                    {addresses.length === 0 && (
                        <div className="flex h-full flex-col items-center justify-center gap-4 px-6">
                            <RadixAvatar className="w-[20%]">
                                <RadixAvatarImage src="/images/no-locations.png" alt="no location"></RadixAvatarImage>
                            </RadixAvatar>
                            <p className="text-sm font-semibold">Bạn chưa có địa chỉ nhận hàng nào!</p>
                        </div>
                    )}

                    {addresses.length > 0 && (
                        <div className="flex max-h-[400px] flex-col overflow-y-auto px-6">
                            {addresses.map((address, index) => (
                                <div key={address.addressId}>
                                    <div className="flex items-start justify-between gap-6 lg:gap-10">
                                        <div className="flex flex-1 flex-col gap-4 break-words whitespace-normal">
                                            <p>
                                                <span className="font-semibold">Họ & tên người nhận: </span>
                                                <span className="text-muted-foreground">{address.recipientName}</span>
                                            </p>
                                            <p>
                                                <span className="font-semibold">Số điện thoại: </span>
                                                <span className="text-muted-foreground">{address.phoneNumber}</span>
                                            </p>
                                            <p>
                                                <span className="font-semibold">Địa chỉ: </span>
                                                <span className="text-muted-foreground">
                                                    {address.addressLine}, {address.ward}, {address.district},{' '}
                                                    {address.city}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                variant="outline"
                                                disabled={address.isDefault}
                                                onClick={async () => {
                                                    if (address.isDefault) return
                                                    await setAddressAsDefaultMutation.mutateAsync({
                                                        addressId: address.addressId
                                                    })
                                                }}
                                            >
                                                {address.isDefault ? (
                                                    <>
                                                        <Sparkles /> Mặc định
                                                    </>
                                                ) : (
                                                    <>
                                                        <Settings /> Đặt làm mặc định
                                                    </>
                                                )}
                                            </Button>
                                            <ConfirmationDialog
                                                title="Bạn có chắc muốn xóa hướng chuyển trạng thái này?"
                                                description="Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn hướng chuyển trạng thái khỏi hệ thống NHT Marine."
                                                onConfirm={async () => {
                                                    if (address.isDefault) return
                                                    await deleteAddressMutation.mutateAsync({
                                                        addressId: address.addressId
                                                    })
                                                }}
                                                trigger={
                                                    <Button variant="destructive" disabled={address.isDefault}>
                                                        <Eraser />
                                                        Xóa
                                                    </Button>
                                                }
                                            />
                                        </div>
                                    </div>
                                    {index < (addresses ?? []).length - 1 && <Separator className="my-4" />}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileAddressPage
