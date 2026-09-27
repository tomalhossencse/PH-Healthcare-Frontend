import { applyAsDoctor, getAllDoctors, verifyDoctorAccount } from "@/api";
import { IDoctorQuery } from "@/types";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

export function useApplyAsDoctor() {
    return useMutation({
        mutationFn: applyAsDoctor,
    });
}

export function useVerifyDoctorAccount() {
    return useMutation({
        mutationFn: verifyDoctorAccount,
    });
}

export function useGetAllDoctors(query: IDoctorQuery) {
    return useQuery({
        queryKey: ["all-doctors", query],
        queryFn: () => getAllDoctors(query),
    });
}
export function useSuspenseGetAllDoctors(query: IDoctorQuery) {
    return useSuspenseQuery({
        queryKey: ["all-doctors", query],
        queryFn: () => getAllDoctors(query),
    });
}
