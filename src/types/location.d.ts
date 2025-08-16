declare global {
    interface IAddressCity {
        id: string
        name: string
        type: number
        typeText: string
        slug: string
    }

    interface IAddressDistrict {
        id: string
        name: string
        type: number
        typeText: string
        provinceId: string
    }

    interface IAddressWard {
        id: string
        name: string
        type: number
        typeText: string
        districtId: string
    }

    interface IOpenLocationResponse<T> {
        data: T
        total: number
        code: string
        message: string | null
    }
}

export {}
