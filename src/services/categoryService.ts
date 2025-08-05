import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosIns from '@/hooks/useAxiosIns'

const categoryService = ({ enableFetching = false }: { enableFetching: boolean }) => {
    const axios = useAxiosIns()
    const [categories, setCategories] = useState<ICategory[]>([])
    const [categoryCount, setCategoryCount] = useState<number>(0)

    const getCategoriesQuery = useQuery({
        queryKey: ['categories'],
        queryFn: () => axios.get<IResponseData<ICategory[]>>('/products/categories'),
        enabled: enableFetching,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        refetchInterval: 30000
    })

    useEffect(() => {
        if (getCategoriesQuery.isSuccess && getCategoriesQuery.data) {
            setCategories(getCategoriesQuery.data.data?.data)
            setCategoryCount(getCategoriesQuery.data.data?.total as number)
        }
    }, [getCategoriesQuery.isSuccess, getCategoriesQuery.data])

    const categoryGroup = useMemo(() => {
        const group: Record<number, ICategory[]> = {}
        if (categories.length === 0) return group

        const mappedCategories = categories.map(category => ({
            ...category,
            parentId: category.parentId || 0
        }))

        mappedCategories.forEach(category => {
            if (group[category.parentId] == null) {
                group[category.parentId] = []
            }
            group[category.parentId].push(category)
        })

        return group
    }, [categories])

    return {
        categories,
        categoryCount,
        categoryGroup
    }
}

export default categoryService
