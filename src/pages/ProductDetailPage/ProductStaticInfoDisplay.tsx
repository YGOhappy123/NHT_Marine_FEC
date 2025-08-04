import formatCurrency from '@/utils/formatCurrency'

type ProductStaticInfoDisplayProps = {
    product: IRootProduct
    selectedProductItem: IProductItem | undefined
}

const ProductStaticInfoDisplay = ({ product, selectedProductItem }: ProductStaticInfoDisplayProps) => {
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
                            ? formatCurrency(
                                  product.productItems?.find(
                                      item => item.productItemId === selectedProductItem.productItemId
                                  )?.price
                              )
                            : minPrice !== maxPrice
                              ? `Từ ${formatCurrency(minPrice)} đến ${formatCurrency(maxPrice)}`
                              : formatCurrency(minPrice)}
                    </span>
                </p>
            </div>
            {product.promotions != null && product.promotions.length > 0 && (
                <div className="mt-4">
                    <p className="mb-1 font-medium">
                        Giảm giá: <span className="font-normal">{product.promotions[0].discountRate}%</span>
                    </p>
                </div>
            )}
        </>
    )
}

export default ProductStaticInfoDisplay
