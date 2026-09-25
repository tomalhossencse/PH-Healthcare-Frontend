"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "../layout/public/Logo";
import { UserRole } from "@/types";
import { adminRoutes, doctorRoutes, patientRoutes } from "@/routes";
import { SidebarData } from "@/types/sidebar.type";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/hooks";
import { toast } from "../ui/toast";
import { useQueryClient } from "@tanstack/react-query";

const sidebarRoutes: Partial<Record<UserRole, SidebarData>> = {
    ADMIN: adminRoutes,
    SUPER_ADMIN: adminRoutes,
    PATIENT: patientRoutes,
    DOCTOR: doctorRoutes,
};
export function DashboardSidebar({ role }: { role: UserRole }) {
    const pathname = usePathname();
    const routes = sidebarRoutes[role] || [];
    const router = useRouter();

    const { mutate: logout } = useLogout();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                toast.add({
                    title: "Logged out suceessfully",
                    type: "success",
                });
                router.push("/login");
                queryClient.removeQueries({ queryKey: ["user"] });
            },
            onError: () => {
                toast.add({
                    title: "Logged failed",
                    type: "error",
                });
            },
        });
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {routes.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            render={<Link href={item.url} />}
                                            isActive={pathname === item.url}
                                        >
                                            {item.title}
                                        </SidebarMenuButton>
                                        <SidebarMenuButton
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
