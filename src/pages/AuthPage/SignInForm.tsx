import { z } from 'zod'
import { FormType } from '@/pages/AuthPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import GoogleAuthButton from '@/components/common/GoogleAuthButton'
import authService from '@/services/authService'

type SignInFormProps = {
    changeFormType: (type: FormType) => void
}

const signInFormSchema = z.object({
    username: z.string().min(1, { message: 'Tên đăng nhập không được để trống.' }),
    password: z.string().min(1, { message: 'Mật khẩu không được để trống.' })
})

const SignInForm = ({ changeFormType }: SignInFormProps) => {
    const { signInMutation } = authService()

    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof signInFormSchema>) => {
        await signInMutation.mutateAsync({
            username: values.username,
            password: values.password
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-5 py-7">
                <h2 className="text-primary mb-10 text-center text-4xl font-medium">Đăng Nhập Tài Khoản</h2>

                <div className="mb-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên đăng nhập</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Tên đăng nhập..."
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

                <div className="flex flex-col items-center">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="h-12 w-full rounded text-base font-semibold capitalize"
                    >
                        {form.formState.isSubmitting ? 'Đang tải...' : 'Đăng nhập'}
                    </Button>

                    <div className="mt-10 w-full">
                        <div className="relative border-t border-[#101319]">
                            <span className="bg-primary-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 font-medium text-[#101319]">
                                Hoặc đăng nhập bằng
                            </span>
                        </div>
                        <GoogleAuthButton text="Đăng nhập bằng tài khoản Google" />
                    </div>

                    <div className="mt-6">
                        <span className="font-medium text-[#101319]">Chưa có tài khoản? </span>
                        <span
                            className="text-primary cursor-pointer font-bold hover:underline"
                            onClick={() => changeFormType('register')}
                        >
                            Đăng ký
                        </span>
                    </div>

                    <div className="mt-2">
                        <span className="font-medium text-[#101319]">Quên mật khẩu? </span>
                        <span
                            className="text-primary cursor-pointer font-bold hover:underline"
                            onClick={() => changeFormType('forgot')}
                        >
                            Đặt lại
                        </span>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default SignInForm
