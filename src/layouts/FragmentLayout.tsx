import { Outlet } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'

const FragmentLayout = () => {
    useTheme()

    return (
        <div className="flex min-h-screen flex-col">
            <main>
                <Outlet />
            </main>
        </div>
    )
}
export default FragmentLayout
