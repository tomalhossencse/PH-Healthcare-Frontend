"use client";

import { useGetMe } from "@/hooks";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AuthLoading from "./auth-loading";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
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

    useEffect(() => {
        if (!isPending && (isError || !isAuthenticated)) {
            router.replace(`/login?redirectTo=${encodeURIComponent(pathname)}`);
        }
    }, [isPending, isError, isAuthenticated, router]);

    if (isPending) {
        return <AuthLoading />;
    }
    if (isAuthenticated) {
        return <>{children}</>;
    }
    return <AuthLoading />;
};

export default AuthGuard;
