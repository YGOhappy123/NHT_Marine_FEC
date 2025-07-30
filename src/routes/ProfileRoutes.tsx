import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import AuthProtector from '@/components/container/AuthProtector'
import ProfileLayout from '@/layouts/ProfileLayout'
import ErrorPage from '@/pages/ErrorPage'
import ProfilePage from '@/pages/ProfileAccount/ProfilePage'
import ChangePasswordPage from '@/pages/ProfileAccount/ChangePasswordPage'

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
            }
        ]
    }
]

export default ProfileRoutes
