import { useNavigate } from 'react-router-dom'
import { Fish, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import categoryService from '@/services/categoryService'

const CategoryNavbar = () => {
    const navigate = useNavigate()
    const { categories, categoryGroup } = categoryService({ enableFetching: true })

    return (
        <nav className="bg-background sticky top-0 z-[10] flex w-full justify-center border-b shadow-md">
            <div className="max-w-container flex w-full items-center justify-between gap-10 p-4 lg:gap-15 xl:gap-25">
                <div className="flex w-full items-start justify-between gap-8 lg:gap-10 xl:gap-12">
                    <div className="mr-auto grid shrink-0 grid-cols-2 justify-center gap-4">
                        <Button size="lg" className="shrink-0 rounded-full" onClick={() => navigate('/about-us')}>
                            <ShoppingBag />
                            Giới thiệu cửa hàng
                        </Button>
                        <Button size="lg" className="shrink-0 rounded-full" onClick={() => navigate('/products')}>
                            <Fish />
                            Tất cả sản phẩm
                        </Button>
                    </div>

                    <div className="flex items-center justify-between gap-4 overflow-hidden lg:gap-6 xl:gap-8">
                        {categories.slice(0, 6).map(category => (
                            <DropdownMenu key={category.categoryId}>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="lg" className="rounded-full">
                                        {category.name}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>{category.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() => navigate(`/products?category=${category.name.toLowerCase()}`)}
                                    >
                                        {category.name}
                                    </DropdownMenuItem>

                                    {categoryGroup[category.categoryId] &&
                                        categoryGroup[category.categoryId].map(child => (
                                            <DropdownMenuItem
                                                key={child.categoryId}
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    navigate(`/products?category=${child.name.toLowerCase()}`)
                                                }
                                            >
                                                {child.name}
                                            </DropdownMenuItem>
                                        ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default CategoryNavbar
