import { Outlet } from 'react-router-dom'
import AppHeader from '@/components/layout/AppHeader'
import CategoryNavbar from '@/components/layout/CategoryNavbar'
// import Footer from '@/components/layout/Footer'

const MainLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <AppHeader />
            <CategoryNavbar />

            <main>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    )
}

export default MainLayout
