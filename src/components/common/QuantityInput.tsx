import { useEffect, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useDebounce from '@/hooks/useDebounce'

type QuantityInputProps = {
    isLoading: boolean
    initValue: number
    maximum: number
    onChange: (value: number) => void
}

const QuantityInput = ({ isLoading, initValue, maximum, onChange }: QuantityInputProps) => {
    const [quantity, setQuantity] = useState<number>(initValue)
    const debouncedQuantity = useDebounce(quantity)

    useEffect(() => {
        setQuantity(initValue)
    }, [initValue])

    useEffect(() => {
        onChange(debouncedQuantity as number)
    }, [debouncedQuantity])

    const handleIncrease = () => {
        setQuantity(prev => (prev - 1 < 0 ? 0 : prev - 1))
    }

    const handleDecrease = () => {
        setQuantity(prev => (prev + 1 > maximum ? maximum : prev + 1))
    }

    return (
        <div className="flex w-[100px] items-center justify-between rounded-md border-2">
            {maximum === 0 && (
                <Button variant="secondary" disabled>
                    Hết hàng
                </Button>
            )}

            {maximum > 0 && maximum < initValue && (
                <Button variant="secondary" className="w-full" onClick={() => onChange(maximum)}>
                    Giảm về {maximum.toString().padStart(2, '0')}
                </Button>
            )}

            {maximum >= initValue && (
                <>
                    <Button variant="ghost" size="icon" disabled={isLoading} onClick={handleIncrease}>
                        <Minus />
                    </Button>
                    {quantity.toString().padStart(2, '0')}
                    <Button variant="ghost" size="icon" disabled={isLoading} onClick={handleDecrease}>
                        <Plus />
                    </Button>
                </>
            )}
        </div>
    )
}

export default QuantityInput
