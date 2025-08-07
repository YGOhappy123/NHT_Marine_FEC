import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import AuthProtector from '@/components/container/AuthProtector'
import ProfileLayout from '@/layouts/ProfileLayout'
import ProfilePage from '@/pages/ProfileAccount/ProfilePage'
import ChangePasswordPage from '@/pages/ProfileAccount/ChangePasswordPage'
import ProfileOrderPage from '@/pages/ProfileOrderPage'
import ErrorPage from '@/pages/ErrorPage'

const ProfileRoutes = [
    {
        path: '/profile',
        element: (
            <Suspense>
                <AuthProtector children={<ProfileLayout />} redirect="/auth" />
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Navigate to="/profile/edit" replace />
            },
            {
                path: 'edit',
                element: <ProfilePage />
            },
            {
                path: 'change-password',
                element: <ChangePasswordPage />
            },
            {
                path: 'orders',
                element: <ProfileOrderPage />
            }
        ]
    }
]

export default ProfileRoutes
