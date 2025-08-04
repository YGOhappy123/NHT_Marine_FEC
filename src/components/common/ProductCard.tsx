import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import striptags from 'striptags'
import formatCurrency from '@/utils/formatCurrency'

type ProductCardProps = {
    product: IRootProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
    const navigate = useNavigate()
    const discountRate = product.discountRate ?? 0
    const prices = (product.productItems ?? [{ price: 0 }]).map(item => item.price ?? 0)
    const minPrice = Math.min(...prices) * (1 - discountRate / 100)

    return (
        <Card className="p-4">
            <CardContent className="p-0">
                <div className="flex flex-col gap-4">
                    <div
                        className="bg-muted/80 group flex h-[200px] items-center justify-center"
                        style={{
                            borderRadius: '15px 15px 15px 45px'
                        }}
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-[150px] max-h-full max-w-full cursor-pointer rounded-lg object-cover group-hover:scale-110"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">{product.name}</h3>
                        <p className="line-clamp-3">{striptags(product.description)}</p>
                        <p className="text-destructive mt-2">Giá chỉ từ: {formatCurrency(minPrice)}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="mt-auto p-0">
                <Button
                    size="lg"
                    variant="secondary"
                    className="w-full"
                    onClick={() => navigate(`/products/${product.rootProductId}`)}
                >
                    Xem chi tiết
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ProductCard
