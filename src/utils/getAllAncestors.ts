const getAllAncestors = (childrenId: number, categories: ICategory[]) => {
    let currentId: number | null = childrenId
    const result: number[] = []

    do {
        const category = categories.find(item => item.categoryId === currentId)
        if (category == null || result.includes(currentId)) {
            break
        } else {
            result.unshift(currentId)
            currentId = category.parentId || null
        }
    } while (currentId != null)

    return result.map(item => categories.find(cat => cat.categoryId === item))
}

export default getAllAncestors
