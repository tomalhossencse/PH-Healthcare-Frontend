import AuthGuard from "@/components/auth/auth-guard";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return <AuthGuard>Dashboard Layout : {children}</AuthGuard>;
};

export default layout;
