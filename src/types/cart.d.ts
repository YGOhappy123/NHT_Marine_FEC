declare global {
    interface ICustomerCart {
        cartId: number
        customerId: number
        status: CartStatus
        updatedAt: string
        items: ICartItem[]
    }

    interface ICartItem {
        cartId: number
        productItemId: number
        quantity: number
    }

    type CartStatus = 'Active' | 'Converted' | 'Abandoned'
}

export {}
