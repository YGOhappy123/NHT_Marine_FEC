import { Link } from 'react-router-dom'
import { ChevronRight, LockKeyhole } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
    Sidebar,
    SidebarTrigger,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton
} from '@/components/ui/sidebar'
import { sidebarGroups, SidebarGroupData } from '@/configs/sidebarGroups'
import SidebarUserButton from '@/components/common/SidebarUserButton'
import AppLogo from '@/components/common/AppLogo'
import ConfirmationDialog from '@/components/common/ConfirmationDialog'
import authService from '@/services/authService'

const AppSidebar = () => {
    const { deactivateAccountMutation } = authService()

    return (
        <Sidebar collapsible="icon" className="overflow-hidden">
            <SidebarHeader className="flex-row gap-2 items-center justify-between border-b-2">
                <SidebarTrigger />
                <AppLogo reverse />
            </SidebarHeader>
            <SidebarContent className="gap-0">
                {sidebarGroups.map((group, i) => (
                    <SidebarGroupItem key={i} {...group} />
                ))}

                <ConfirmationDialog
                    title="Bạn có chắc muốn khóa tài khoản của mình không?"
                    description="Không thể hoàn tác hành động này. Thao tác này sẽ xóa vĩnh viễn tài khoản khỏi hệ thống NHT Marine."
                    onConfirm={async () => {
                        await deactivateAccountMutation.mutateAsync()
                    }}
                    trigger={
                        <SidebarGroup>
                            <SidebarMenu>
                                <SidebarMenuItem className="flex items-center gap-2">
                                    <SidebarMenuButton
                                        tooltip="Khóa tài khoản"
                                        className="cursor-pointer bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60"
                                    >
                                        <LockKeyhole />
                                        <span className="font-semibold">Khóa tài khoản</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroup>
                    }
                />
            </SidebarContent>
            <SidebarFooter className="border-t-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarUserButton />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

const SidebarGroupItem = (group: SidebarGroupData) => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarMenu>
                {group.items.map((item) =>
                    item.children?.length ? (
                        <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton tooltip={item.title}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                                    <SidebarMenuSub>
                                        {item.children.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <Link to={subItem.url}>
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} asChild>
                                <Link to={item.url!}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                )}
            </SidebarMenu>
        </SidebarGroup>
    )
}

export default AppSidebar
