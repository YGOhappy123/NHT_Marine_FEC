import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar as RadixAvatar, AvatarImage as RadixAvatarImage } from '@radix-ui/react-avatar'
import ProductCard from '@/components/common/ProductCard'
import categoryService from '@/services/categoryService'
import useAxiosIns from '@/hooks/useAxiosIns'
import useTitle from '@/hooks/useTitle'
import getAllDescendants from '@/utils/getAllDescendants'

const DEFAULT_FILTER = { inStock: true }

const ProductsPage = () => {
    useTitle('NHT Marine | Danh sách sản phẩm')
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const axios = useAxiosIns()
    const { categories, categoryGroup } = categoryService({ enableFetching: true })
    const [searchProductQuery, setSearchProductQuery] = useState<string>('')
    const [categoryQuery, setCategoryQuery] = useSearchParams()

    const fetchProductsQuery = useQuery({
        queryKey: ['menu-products', searchProductQuery],
        queryFn: () => axios.get<IResponseData<IRootProduct[]>>(`/products?filter=${searchProductQuery}`),
        enabled: true,
        refetchIntervalInBackground: true,
        refetchInterval: 20000,
        select: res => res.data
    })

    const products = fetchProductsQuery.data?.data ?? []

    useEffect(() => {
        const activeCategory = categories?.find(
            category => category.name.toLowerCase() === categoryQuery.get('category')?.toLowerCase()
        )
        if (activeCategory) {
            setSearchProductQuery(
                JSON.stringify({
                    categories: [
                        activeCategory.categoryId,
                        ...getAllDescendants(activeCategory.categoryId, categoryGroup).map(
                            category => category.categoryId
                        )
                    ],
                    ...DEFAULT_FILTER
                })
            )
        } else {
            setSearchProductQuery(JSON.stringify({ ...DEFAULT_FILTER }))
        }
    }, [categoryQuery.get('category'), categories])

    return (
        <section className="bg-background flex w-full justify-center">
            <div className="max-w-container flex w-full flex-col items-center justify-between px-4 py-24">
                <h2 className="font-[Dancing_Script] text-4xl capitalize">Danh sách sản phẩm</h2>
                <ul className="mt-11 flex flex-1 flex-wrap items-center justify-center gap-4 lg:gap-6 xl:gap-8">
                    {categories.length > 0 && (
                        <li>
                            <Button
                                variant={!categoryQuery.get('category') ? 'default' : 'secondary'}
                                size="lg"
                                className="rounded-full"
                                onClick={() => setCategoryQuery({})}
                            >
                                Tất cả
                            </Button>
                        </li>
                    )}
                    {categories?.map(category => {
                        const isActive = category.name.toLowerCase() === categoryQuery.get('category')?.toLowerCase()

                        return (
                            <li key={category.categoryId}>
                                <Button
                                    variant={isActive ? 'default' : 'secondary'}
                                    size="lg"
                                    className="rounded-full"
                                    onClick={() => setCategoryQuery({ category: category.name })}
                                >
                                    {category.name}
                                </Button>
                            </li>
                        )
                    })}
                </ul>

                {products.length > 0 ? (
                    <div className="mt-11 grid w-full grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map(product => (
                            <ProductCard key={product.rootProductId} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-11 flex w-full max-w-[500px] flex-col items-center justify-center gap-4">
                        <RadixAvatar className="w-[50%] xl:w-[40%]">
                            <RadixAvatarImage src="/images/empty-cart.png" alt="empty cart"></RadixAvatarImage>
                        </RadixAvatar>
                        <p className="text-sm font-semibold">Các sản phẩm trong danh mục này đã hết hàng!</p>
                        <Button
                            size="lg"
                            variant="outline"
                            className="min-w-[50%] rounded-full text-sm capitalize xl:min-w-[40%]"
                            onClick={() => setCategoryQuery({})}
                        >
                            <ShoppingCart />
                            Xem các sản phẩm khác
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductsPage
