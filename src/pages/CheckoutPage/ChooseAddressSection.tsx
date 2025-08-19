import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { MapPin, PencilLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import customerService from '@/services/customerService'
import SwitchAddressDialog from '@/pages/CheckoutPage/SwitchAddressDialog'

type ChooseAddressSectionProps = {
    setCheckoutDisabled: (value: boolean) => void
    setData: (address: ICustomerAddress) => void
}

const ChooseAddressSection = ({ setCheckoutDisabled, setData }: ChooseAddressSectionProps) => {
    customerService({ enableFetching: true })
    const addresses = useSelector((state: RootState) => state.app.addresses)

    const navigate = useNavigate()
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
    const [switchAddressDialogOpen, setSwitchAddressDialogOpen] = useState(false)

    useEffect(() => {
        if (!addresses || addresses.length === 0) {
            setCheckoutDisabled(true)
        } else {
            const defaultAddr = addresses.find(a => a.isDefault)
            if (defaultAddr) {
                setSelectedAddressId(defaultAddr.addressId)
                setCheckoutDisabled(false)
                setData(defaultAddr)
            }
        }

        return () => setCheckoutDisabled(false)
    }, [addresses, setData])

    const selectedAddr = addresses.find(a => a.addressId === selectedAddressId)

    return (
        <div>
            <SwitchAddressDialog
                open={switchAddressDialogOpen}
                setOpen={setSwitchAddressDialogOpen}
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onChooseAddress={(address: ICustomerAddress) => {
                    setSelectedAddressId(address.addressId)
                    setSwitchAddressDialogOpen(false)

                    const selectedAddr = addresses.find(a => a.addressId === address.addressId)
                    if (selectedAddr) {
                        setData(selectedAddr)
                    }
                }}
            />

            {selectedAddressId && (
                <div className="mb-4 flex flex-col gap-2">
                    <span className="text-card-foreground text-sm leading-none font-medium select-none">
                        Thông tin người nhận
                    </span>
                    <div className="flex flex-col gap-1.5 rounded border-2 px-3 py-2 text-sm">
                        <p>
                            <span className="font-semibold">Họ & tên người nhận: </span>
                            <span className="text-muted-foreground">{selectedAddr?.recipientName}</span>
                        </p>
                        <p>
                            <span className="font-semibold">Số điện thoại: </span>
                            <span className="text-muted-foreground">{selectedAddr?.phoneNumber}</span>
                        </p>
                        <p>
                            <span className="font-semibold">Địa chỉ: </span>
                            <span className="text-muted-foreground">
                                {selectedAddr?.addressLine}, {selectedAddr?.ward}, {selectedAddr?.city}
                            </span>
                        </p>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-3">
                <Button type="button" onClick={() => navigate('/profile/addresses')}>
                    <MapPin /> Thêm địa chỉ
                </Button>

                {addresses.length > 0 && (
                    <Button
                        type="button"
                        variant="outline"
                        disabled={addresses.length <= 1}
                        onClick={() => setSwitchAddressDialogOpen(true)}
                    >
                        <PencilLine /> Thay đổi địa chỉ
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ChooseAddressSection
