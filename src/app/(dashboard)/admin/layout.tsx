import RoleGuard from "@/components/auth/role-guard";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return <RoleGuard roles={["ADMIN"]}>Admin Layout : {children}</RoleGuard>;
};

export default layout;
