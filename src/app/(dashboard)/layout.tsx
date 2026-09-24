import AuthGuard from "@/components/auth/auth-guard";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return <AuthGuard>{children}</AuthGuard>;
};

export default layout;
