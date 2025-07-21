import { z } from 'zod'
import { FormType } from '@/pages/AuthPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import authService from '@/services/authService'

type ForgotPasswordFormProps = {
    changeFormType: (type: FormType) => void
}

const forgotPasswordFormSchema = z.object({
    email: z.email('Email không đúng định dạng.')
})

const ForgotPasswordForm = ({ changeFormType }: ForgotPasswordFormProps) => {
    const { forgotPasswordMutation } = authService()

    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof forgotPasswordFormSchema>) => {
        await forgotPasswordMutation.mutateAsync({
            email: values.email
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-5 py-7">
                <h2 className="text-primary mb-10 text-center text-4xl font-medium">Quên Mật Khẩu</h2>

                <div className="mb-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Email..."
                                        className="rounded h-12 font-semibold border-2"
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
                        className="w-full rounded font-semibold capitalize text-base h-12"
                    >
                        {form.formState.isSubmitting ? 'Đang tải...' : 'Gửi email xác nhận'}
                    </Button>

                    <div className="mt-6">
                        <span className="font-medium">Đã có tài khoản? </span>
                        <span
                            className="text-primary cursor-pointer font-bold hover:underline"
                            onClick={() => changeFormType('login')}
                        >
                            Đăng nhập
                        </span>
                    </div>

                    <div className="mt-2">
                        <span className="font-medium">Chưa có tài khoản? </span>
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

export default ForgotPasswordForm
