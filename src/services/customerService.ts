import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getMappedMessage } from '@/utils/resMessageMapping'
import { onError } from '@/utils/errorsHandler'
import useAxiosIns from '@/hooks/useAxiosIns'
import toastConfig from '@/configs/toast'

const customerService = ({ enableFetching = false }: { enableFetching: boolean }) => {
    const axios = useAxiosIns()
    const queryClient = useQueryClient()

    const updateCustomerMutation = useMutation({
        mutationFn: ({ customerId, data }: { customerId: number; data: Partial<ICustomer> }) =>
            axios.patch<IResponseData<any>>(`/customers/${customerId}`, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['customers'] })
            toast(getMappedMessage(res.data.message), toastConfig('success'))
        },
        onError: onError
    })

    return { updateCustomerMutation }
}
export default customerService
