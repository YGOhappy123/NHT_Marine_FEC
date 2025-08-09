declare global {
    interface IOrder {
        orderId: number
        customerId: number
        orderStatusId: number
        couponId: number
        totalAmount: number
        recipientName?: string
        deliveryAddress?: string
        deliveryPhone?: string
        note?: string
        createdAt: string

        orderStatus: IOrderStatus
        coupon?: ICoupon
        items: {
            orderId: number
            productItemId: number
            price: number
            quantity: number

            productItem: {
                productItemId: number
                imageUrl: string
                price: number
                attributes: {
                    variant: string
                    option: string
                }[]
                rootProduct: {
                    rootProductId: number
                    name: string
                    description: string
                    imageUrl: string
                }
            }
        }[]
        updateLogs: Partial<IOrderStatusUpdateLog>[]
    }

    interface IOrderStatusUpdateLog {
        logId: number
        orderId: number
        statusId: number
        updatedAt: string
        updatedBy: number
        updatedByStaff?: Partial<IStaff>
        status?: Partial<IOrderStatus>
    }

    interface ICoupon {
        couponId: number
        code: string
        type: 'Fixed' | 'Percentage'
        amount: number
        maxUsage: number
        isActive: boolean
        expiredAt: string
        createdAt: string
        createdBy: number

        createdByStaff?: Partial<IStaff> | string
    }
    interface IOrderStatus {
        statusId: number
        name: string
        description: string
        isDefaultState: boolean
        isAccounted: boolean
        isUnfulfilled: boolean
    }
}

export {}
