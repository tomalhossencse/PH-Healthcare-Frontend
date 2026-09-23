import {
    getMe,
    googleAuth,
    userLogin,
    userLogout,
    userRegistration,
    verifyAccount,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
    return useMutation({
        mutationFn: userLogin,
    });
}

export function useRegistration() {
    return useMutation({
        mutationFn: userRegistration,
    });
}

export function useVerifyAccount() {
    return useMutation({
        mutationFn: verifyAccount,
    });
}

export function useLogout() {
    return useMutation({
        mutationFn: userLogout,
    });
}

export function useGetMe() {
    return useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false,
    });
}

export function useGoogleAuth() {
    return useMutation({
        mutationFn: googleAuth,
    });
}
