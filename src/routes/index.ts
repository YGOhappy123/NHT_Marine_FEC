import { createBrowserRouter } from 'react-router-dom'
import MainRoutes from '@/routes/MainRoutes'
import AuthRoutes from '@/routes/AuthRoutes'
import ProfileRoutes from '@/routes/ProfileRoutes'
import FragmentRoutes from '@/routes/FragmentRoutes'

const developmentRoutes = createBrowserRouter([...MainRoutes, ...FragmentRoutes, ...ProfileRoutes, ...AuthRoutes])
const productionRoutes = createBrowserRouter([...MainRoutes, ...FragmentRoutes, ...ProfileRoutes, ...AuthRoutes])

const getRouter = (environment: 'development' | 'production') => {
    switch (environment) {
        case 'development':
            return developmentRoutes
        case 'production':
            return productionRoutes
        default:
            throw new Error('Invalid environment.')
    }
}

export default getRouter
