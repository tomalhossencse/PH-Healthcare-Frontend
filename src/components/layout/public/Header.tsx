"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks/auth.hook";
import { UserRole } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { HeartPlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const routes = [
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
    ];

    const { data, isLoading } = useGetMe();
    const router = useRouter();

    const { mutate: logout } = useLogout();
    const queryClient = useQueryClient();

    const role: UserRole = !!data?.data ? data.data.role : null;

    if (role === "ADMIN" || role === "SUPER_ADMIN") {
        routes.push({ name: "Admin", url: "/admin" });
    } else if (role === "DOCTOR") {
        routes.push({ name: "Doctor", url: "/doctor" });
    } else if (role === "PATIENT") {
        routes.push({ name: "Patient", url: "/patient" });
    }

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                toast.add({
                    title: "Logged out suceessfully",
                    type: "success",
                });
                queryClient.removeQueries({ queryKey: ["user"] });
                router.push("/login");
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
        <header className="w-full h-16 border border-b">
            <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-2 font-medium">
                    <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <HeartPlusIcon className="size-4" />
                    </div>
                    PH Healthcare
                </Link>
                <nav className="flex gap-5">
                    {routes.map((route) => (
                        <Link key={route.url} href={route.url}>
                            {route.name}
                        </Link>
                    ))}
                </nav>
                <div>
                    {!isLoading && !data ? (
                        <Button
                            variant="outline"
                            render={<Link href="/login">Login</Link>}
                            nativeButton={false}
                        ></Button>
                    ) : (
                        <Button onClick={handleLogout} variant="destructive">
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
