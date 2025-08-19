import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMappedMessage } from '@/utils/resMessageMapping'
import { onError } from '@/utils/errorsHandler'
import { addAddress, deleteAddress, getAddresses, setAddressAsDefault } from '@/slices/appSlice'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'

const customerService = ({ enableFetching }: { enableFetching: boolean }) => {
    const axios = useAxiosIns()
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    const updateCustomerMutation = useMutation({
        mutationFn: (data: Partial<ICustomer>) => axios.patch<IResponseData<any>>('/customers', data),
        onSuccess: res => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        },
        onError: onError
    })

    useQuery({
        queryKey: ['my-addresses'],
        queryFn: () => dispatch(getAddresses({ axios }) as any),
        enabled: enableFetching,
        refetchOnWindowFocus: false
    })

    const addNewAddressMutation = useMutation({
        mutationFn: ({
            recipientName,
            phoneNumber,
            city,
            ward,
            addressLine
        }: {
            recipientName: string
            phoneNumber: string
            city: string
            ward: string
            addressLine: string
        }) => dispatch(addAddress({ axios, recipientName, phoneNumber, city, ward, addressLine }) as any),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-addresses'] })
    })

    const setAddressAsDefaultMutation = useMutation({
        mutationFn: ({ addressId }: { addressId: number }) =>
            dispatch(setAddressAsDefault({ axios, addressId }) as any),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-addresses'] })
    })

    const deleteAddressMutation = useMutation({
        mutationFn: ({ addressId }: { addressId: number }) => dispatch(deleteAddress({ axios, addressId }) as any),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['my-addresses'] })
    })

    return {
        updateCustomerMutation,
        addNewAddressMutation,
        setAddressAsDefaultMutation,
        deleteAddressMutation
    }
}

export default customerService
