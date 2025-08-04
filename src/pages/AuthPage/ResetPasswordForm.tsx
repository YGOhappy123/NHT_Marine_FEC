import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { FormType } from '@/pages/AuthPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import authService from '@/services/authService'
import toastConfig from '@/configs/toast'

type ResetPasswordFormProps = {
    changeFormType: (type: FormType) => void
}

const resetPasswordFormSchema = z
    .object({
        password: z
            .string()
            .min(8, { message: 'Mật khẩu phải lớn hơn 8 ký tự.' })
            .max(20, { message: 'Mật khẩu không vượt quá 20 ký tự.' }),
        confirmPassword: z.string()
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Mật khẩu không trùng khớp.',
        path: ['confirmPassword']
    })

const ResetPasswordForm = ({ changeFormType }: ResetPasswordFormProps) => {
    const { resetPasswordMutation } = authService()
    const [query, setQuery] = useSearchParams()

    const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
        const token = query.get('token') as string
        if (!token) {
            toast('Bạn chỉ có thể dùng tính năng này thông qua link được đính kèm trong email', toastConfig('info'))
            return
        }

        await resetPasswordMutation
            .mutateAsync({
                password: values.password,
                confirmPassword: values.confirmPassword,
                resetPasswordToken: token
            })
            .then(() => {
                query.delete('token')
                query.set('type', 'login')
                setQuery(query)
            })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-5 py-7">
                <h2 className="text-primary mb-10 text-center text-4xl font-medium">Đặt Lại Mật Khẩu</h2>

                <div className="mb-6">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="Mật khẩu..."
                                        className="h-12 rounded border-2 font-semibold"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mb-6">
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nhập lại mật khẩu</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="Nhập lại mật khẩu..."
                                        className="h-12 rounded border-2 font-semibold"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col items-center">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="h-12 w-full rounded text-base font-semibold capitalize"
                    >
                        {form.formState.isSubmitting ? 'Đang tải...' : 'Xác nhận'}
                    </Button>

                    <div className="mt-6">
                        <span className="font-medium text-[#101319]">Đã có tài khoản? </span>
                        <span
                            className="text-primary cursor-pointer font-bold hover:underline"
                            onClick={() => changeFormType('login')}
                        >
                            Đăng nhập
                        </span>
                    </div>

                    <div className="mt-2">
                        <span className="font-medium text-[#101319]">Chưa có tài khoản? </span>
                        <span
                            className="text-primary cursor-pointer font-bold hover:underline"
                            onClick={() => changeFormType('register')}
                        >
                            Đăng ký
                        </span>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default ResetPasswordForm
