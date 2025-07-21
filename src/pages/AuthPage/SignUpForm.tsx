import { z } from 'zod'
import { FormType } from '@/pages/AuthPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import authService from '@/services/authService'

type SignUpFormProps = {
    changeFormType: (type: FormType) => void
}

const signUpFormSchema = z
    .object({
        fullName: z
            .string()
            .min(1, { message: 'Họ và tên không được để trống.' })
            .max(255, { message: 'Họ và tên không vượt quá 255 ký tự.' }),
        username: z
            .string()
            .min(8, { message: 'Tên đăng nhập phải lớn hơn 8 ký tự.' })
            .max(20, { message: 'Tên đăng nhập không vượt quá 20 ký tự.' }),
        password: z
            .string()
            .min(8, { message: 'Mật khẩu phải lớn hơn 8 ký tự.' })
            .max(20, { message: 'Mật khẩu không vượt quá 20 ký tự.' }),
        confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu không trùng khớp.',
        path: ['confirmPassword']
    })

const SignUpForm = ({ changeFormType }: SignUpFormProps) => {
    const { signUpMutation } = authService()

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            fullName: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
        await signUpMutation.mutateAsync({
            fullName: values.fullName,
            username: values.username,
            password: values.password,
            confirmPassword: values.confirmPassword
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-5 py-7">
                <h2 className="text-primary mb-10 text-center text-4xl font-medium">Đăng Ký Tài Khoản</h2>

                <div className="mb-6">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ và tên</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Họ và tên..."
                                        className="rounded h-12 font-semibold border-2"
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên đăng nhập</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Tên đăng nhập..."
                                        className="rounded h-12 font-semibold border-2"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="Mật khẩu..."
                                        className="rounded h-12 font-semibold border-2"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nhập lại mật khẩu</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        placeholder="Nhập lại mật khẩu..."
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
                        {form.formState.isSubmitting ? 'Đang tải...' : 'Đăng ký'}
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
                        <span className="font-medium">Quên mật khẩu? </span>
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

export default SignUpForm
