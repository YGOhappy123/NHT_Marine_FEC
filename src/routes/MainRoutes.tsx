import { Suspense } from 'react'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import ProductsPage from '@/pages/ProductsPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import ErrorPage from '@/pages/ErrorPage'
import AboutPage from '@/pages/AboutPage'

const MainRoutes = [
    {
        path: '/',
        element: (
            <Suspense>
                <MainLayout />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: 'products',
                element: <ProductsPage />
            },
            {
                path: 'products/:productId',
                element: <ProductDetailPage />
            },
            {
                path: 'about-us',
                element: <AboutPage />
            }
        ]
    }
]

export default MainRoutes
