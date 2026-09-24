"use client";

import { useGetMe } from "@/hooks";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthLoading from "./auth-loading";
import { UserRole } from "@/types";
import AccessDenied from "./access-denied";

interface IProps {
    children: React.ReactNode;
    roles: UserRole[];
}

const RoleGuard = ({ children, roles }: IProps) => {
    const { data, isPending, isError } = useGetMe();
    const router = useRouter();
    const pathname = usePathname();
    // console.log(
    //     "AuthGuard data:",
    //     data,
    //     "isPending:",
    //     isPending,
    //     "isError:",
    //     isError,
    // );

    const user = data?.data;
    const isAuthenticated = !!user;
    const isAuthorized = isAuthenticated && roles.includes(user.role);

    useEffect(() => {
        if (!isPending && (isError || !isAuthenticated)) {
            router.replace(`/login?redirectTo=${encodeURIComponent(pathname)}`);
        }
    }, [isPending, isError, isAuthenticated, router]);

    if (isPending) {
        return <AuthLoading />;
    }
    if (isAuthorized) {
        return <>{children}</>;
    }
    return <AccessDenied />;
};

export default RoleGuard;
