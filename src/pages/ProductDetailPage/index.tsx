import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { Sparkles } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { RootState } from '@/store'
import { LOGIN_REQUIRED_MESSAGE } from '@/configs/constants'
import useAxiosIns from '@/hooks/useAxiosIns'
import useTitle from '@/hooks/useTitle'
import toastConfig from '@/configs/toast'
import cartService from '@/services/cartService'
import ProductImagesDisplay from '@/pages/ProductDetailPage/ProductImagesDisplay'
import ProductStaticInfoDisplay from '@/pages/ProductDetailPage/ProductStaticInfoDisplay'
import ProductNotFound from '@/pages/ProductDetailPage/ProductNotFound'
import CategoryBreadcrumb from '@/pages/ProductDetailPage/CategoryBreadcrumb'

const ProductDetailPage = () => {
    useTitle('NHT Marine | Chi tiết sản phẩm')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { addCartItemMutation } = cartService({ enableFetching: false })
    const { productId } = useParams()
    const axios = useAxiosIns()
    const navigate = useNavigate()
    const isLogged = useSelector((state: RootState) => state.auth.isLogged)

    // Fetching product data
    const getProductDetailQuery = useQuery({
        queryKey: ['product-detail', productId],
        queryFn: () => axios.get<IResponseData<IRootProduct>>(`/products/${productId}`),
        enabled: true,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        refetchInterval: 10000,
        select: res => res.data
    })
    const product = getProductDetailQuery.data?.data

    // Handle product image display
    const [activeImage, setActiveImage] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (product?.imageUrl) {
            setActiveImage(product.imageUrl)
        }
    }, [product])

    // Handle select productItem
    const [selectedProductItem, setSelectedProductItem] = useState<IProductItem | undefined>(undefined)
    const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({})
    const handleSelect = (variantId: number, optionId: number) => {
        setSelectedOptions(prev => ({ ...prev, [variantId]: optionId }))
    }

    useEffect(() => {
        if (!product || !product.productItems) return

        const selectedOptionIds = Object.values(selectedOptions)
        if (selectedOptionIds.length === product?.variants?.length) {
            const matchingItem = product.productItems.find(item =>
                item.attributes?.every(attr => selectedOptionIds.includes(attr.optionId))
            )

            if (matchingItem) {
                setSelectedProductItem(matchingItem as IProductItem)
                setActiveImage(matchingItem.imageUrl)
            }
        }
    }, [selectedOptions, product])

    const handleAddCartItem = async () => {
        if (!selectedProductItem) return
        if (selectedProductItem!.stock === 0 || addCartItemMutation.isPending) return
        if (!isLogged) return toast(LOGIN_REQUIRED_MESSAGE, toastConfig('info'))

        await addCartItemMutation.mutateAsync({
            productItemId: selectedProductItem!.productItemId,
            quantity: 1
        })
    }

    useEffect(() => {
        setSelectedOptions({})
        setSelectedProductItem(undefined)
        setActiveImage(product?.imageUrl)
    }, [productId])

    return (
        <section className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center justify-between px-4 py-24">
                <h2 className="font-[Dancing_Script] text-4xl capitalize">Chi tiết sản phẩm</h2>
                <div className="mt-11 w-full">
                    <CategoryBreadcrumb categoryId={product?.categoryId} />
                </div>
                <div className="mt-11 flex w-full justify-center">
                    {getProductDetailQuery.isLoading && <Skeleton className="h-[200px] w-full" />}

                    {!getProductDetailQuery.isLoading && product == null && <ProductNotFound />}

                    {!getProductDetailQuery.isLoading && product != null && (
                        <div className="grid w-full grid-cols-1 gap-x-11 gap-y-11 lg:grid-cols-5 xl:gap-x-20">
                            <div className="col-span-1 lg:col-span-2">
                                <ProductImagesDisplay
                                    activeImage={activeImage}
                                    imageAlt={product.name}
                                    setActiveImage={value => setActiveImage(value)}
                                    allImages={[
                                        product.imageUrl,
                                        ...((product.productItems ?? []).map(item => item.imageUrl) as string[])
                                    ]}
                                />
                            </div>

                            <div className="col-span-1 lg:col-span-3">
                                <ProductStaticInfoDisplay product={product} selectedProductItem={selectedProductItem} />

                                <div className="mt-4">
                                    <p className="mb-1 font-medium">Chọn giá trị phân loại</p>
                                    <div className="flex flex-col gap-3">
                                        {product.variants!.map(variant => (
                                            <div key={variant.variantId} className="flex items-center gap-3">
                                                <Sparkles />
                                                <span>Chọn "{variant.name}": </span>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    {variant.options?.map(option => {
                                                        const isActive =
                                                            selectedOptions[variant.variantId!] === option.optionId

                                                        return (
                                                            <Button
                                                                variant={isActive ? 'default' : 'outline'}
                                                                key={option.optionId}
                                                                onClick={() =>
                                                                    handleSelect(variant.variantId!, option.optionId)
                                                                }
                                                            >
                                                                {option.value}
                                                            </Button>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {selectedProductItem && (
                                    <>
                                        <div className="mt-4">
                                            <p className="mb-1 font-medium">
                                                Số lượng tồn kho:{' '}
                                                <span className="font-normal">{selectedProductItem.stock}</span>
                                            </p>
                                        </div>
                                        <div className="mt-4 flex items-center gap-4">
                                            <Button
                                                size="xl"
                                                className="rounded-full text-base capitalize"
                                                disabled={
                                                    selectedProductItem.stock === 0 || addCartItemMutation.isPending
                                                }
                                                onClick={handleAddCartItem}
                                            >
                                                Thêm vào giỏ hàng
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="xl"
                                                className="rounded-full text-base capitalize"
                                                onClick={() => navigate('/products')}
                                            >
                                                Xem sản phẩm khác
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default ProductDetailPage
