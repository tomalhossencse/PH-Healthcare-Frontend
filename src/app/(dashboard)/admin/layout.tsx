import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <RoleGuard roles={["ADMIN"]}>
            <DashboardShell role="ADMIN">{children}</DashboardShell>
        </RoleGuard>
    );
};

export default layout;
