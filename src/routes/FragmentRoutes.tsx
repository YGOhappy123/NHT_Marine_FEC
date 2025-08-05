import { Suspense } from 'react'
import AuthProtector from '@/components/container/AuthProtector'
import FragmentLayout from '@/layouts/FragmentLayout'
import ThankYouPage from '@/pages/ThankYouPage'
import CheckoutPage from '@/pages/CheckoutPage'
import ErrorPage from '@/pages/ErrorPage'

const FragmentRoutes = [
    {
        path: '/',
        element: (
            <Suspense>
                <FragmentLayout />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'checkout',
                element: <AuthProtector children={<CheckoutPage />} redirect="/auth" />
            },
            {
                path: 'thank-you/:orderId?',
                element: <AuthProtector children={<ThankYouPage />} redirect="/auth" />
            }
        ]
    }
]

export default FragmentRoutes
