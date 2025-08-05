import formatCurrency from '@/utils/formatCurrency'
import { Sparkles } from 'lucide-react'

type ProductStaticInfoDisplayProps = {
    product: IRootProduct
    selectedProductItem: IProductItem | undefined
}

const ProductStaticInfoDisplay = ({ product, selectedProductItem }: ProductStaticInfoDisplayProps) => {
    const discountRate = product?.promotions?.[0]?.discountRate ?? 0
    const prices = (product?.productItems ?? [{ price: 0 }]).map(item => item.price ?? 0)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    return (
        <>
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <div className="mt-4">
                <p className="mb-1 font-medium">Mô tả sản phẩm</p>
                <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
            </div>
            <div className="mt-4">
                <p className="mb-1 font-medium">
                    Giá tiền gốc:{' '}
                    <span className="font-normal">
                        {selectedProductItem
                            ? formatCurrency(selectedProductItem.price)
                            : minPrice !== maxPrice
                              ? `Từ ${formatCurrency(minPrice)} đến ${formatCurrency(maxPrice)}`
                              : formatCurrency(minPrice)}
                    </span>
                </p>
            </div>
            {product.promotions != null && product.promotions.length > 0 && (
                <>
                    <div className="text-primary mt-4 flex items-center gap-3">
                        <Sparkles />
                        <p className="mb-1 font-medium">
                            Giảm giá: <span className="font-normal">{discountRate}%</span>
                        </p>
                    </div>
                    <div className="text-primary mt-4 flex items-center gap-3">
                        <Sparkles />
                        <p className="mb-1 font-medium">
                            Chỉ còn:{' '}
                            <span className="font-normal">
                                {selectedProductItem
                                    ? formatCurrency(selectedProductItem.price * (1 - discountRate / 100))
                                    : minPrice !== maxPrice
                                      ? `Từ ${formatCurrency(minPrice * (1 - discountRate / 100))} đến ${formatCurrency(maxPrice * (1 - discountRate / 100))}`
                                      : formatCurrency(minPrice * (1 - discountRate / 100))}
                            </span>
                        </p>
                    </div>
                </>
            )}
        </>
    )
}

export default ProductStaticInfoDisplay
