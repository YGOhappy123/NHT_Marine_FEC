declare global {
    interface IAddressCity {
        code: number
        name: string
        codename: string
        division_type: string
        phone_code: string
        wards: IAddressWard[]
    }

    interface IAddressWard {
        code: number
        name: string
        codename: string
        division_type: string
        short_codename: string
    }
}

export {}
