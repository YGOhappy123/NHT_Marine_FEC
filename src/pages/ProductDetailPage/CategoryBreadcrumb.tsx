import { Fragment, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import categoryService from '@/services/categoryService'
import getAllAncestors from '@/utils/getAllAncestors'

type CategoryBreadcrumbProps = {
    categoryId: number | undefined
}

const CategoryBreadcrumb = ({ categoryId }: CategoryBreadcrumbProps) => {
    const navigate = useNavigate()
    const { categories } = categoryService({ enableFetching: true })

    const categoryTree = useMemo(() => {
        if (!categoryId) return []
        else return getAllAncestors(categoryId, categories)
    }, [categoryId, categories])

    return (
        <div className="flex w-full items-center justify-start">
            <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" onClick={() => navigate('/')}>
                    <Home />
                </Button>
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {categoryTree.map((item, index) => (
                            <Fragment key={index}>
                                <BreadcrumbItem className="cursor-pointer">
                                    <BreadcrumbLink href={`/products?category=${item?.name}`}>
                                        {item?.name}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {index < categoryTree.length - 1 && <BreadcrumbSeparator />}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    )
}

export default CategoryBreadcrumb
