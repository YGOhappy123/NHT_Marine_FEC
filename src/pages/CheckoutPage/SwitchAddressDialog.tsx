import { MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

type SwitchAddressDialogProps = {
    addresses: ICustomerAddress[]
    selectedAddressId: number | null
    open: boolean
    setOpen: (value: boolean) => void
    onChooseAddress: (value: ICustomerAddress) => void
}

const SwitchAddressDialog = ({
    addresses,
    selectedAddressId,
    open,
    setOpen,
    onChooseAddress
}: SwitchAddressDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="min-w-2xl md:min-w-3xl">
                <DialogHeader>
                    <DialogTitle>Thay đổi địa chỉ nhận hàng</DialogTitle>
                    <DialogDescription>
                        Chọn địa chỉ để nhận hàng cho đơn hàng hiện tại trong danh sách địa chỉ của bạn
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="-mx-3 flex max-h-[400px] flex-col overflow-y-auto px-3">
                    {addresses.map((address, index) => (
                        <div key={address.addressId}>
                            <div className="flex items-start justify-between gap-6 lg:gap-10">
                                <div className="flex flex-1 flex-col gap-4 break-words whitespace-normal">
                                    <p>
                                        <span className="font-semibold">Họ & tên người nhận: </span>
                                        <span className="text-muted-foreground">{address.recipientName}</span>
                                        {address.isDefault && (
                                            <span className="text-muted-foreground"> (Mặc định)</span>
                                        )}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Số điện thoại: </span>
                                        <span className="text-muted-foreground">{address.phoneNumber}</span>
                                    </p>
                                    <p>
                                        <span className="font-semibold">Địa chỉ: </span>
                                        <span className="text-muted-foreground">
                                            {address.addressLine}, {address.ward}, {address.city}
                                        </span>
                                    </p>
                                </div>
                                <Button
                                    disabled={address.addressId === selectedAddressId}
                                    onClick={() => onChooseAddress(address)}
                                >
                                    {address.addressId === selectedAddressId ? (
                                        <>
                                            <Sparkles /> Đang chọn
                                        </>
                                    ) : (
                                        <>
                                            <MapPin /> Chọn địa chỉ
                                        </>
                                    )}
                                </Button>
                            </div>
                            {index < (addresses ?? []).length - 1 && <Separator className="my-4" />}
                        </div>
                    ))}
                </div>
                <Separator />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Đóng</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SwitchAddressDialog
