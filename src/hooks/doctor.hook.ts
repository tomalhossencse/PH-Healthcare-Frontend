import { applyAsDoctor, getAllDoctors, verifyDoctorAccount } from "@/api";
import { IDoctorParams, VerificationStatus } from "@/types";
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

export function useGetAllDoctors(status: VerificationStatus) {
    return useQuery({
        queryKey: ["all-doctors", status],
        queryFn: () => getAllDoctors({ verificationStatus: status }),
    });
}
export function useSuspenseGetAllDoctors(parmas: IDoctorParams) {
    return useSuspenseQuery({
        queryKey: ["all-doctors", parmas],
        queryFn: () => getAllDoctors(parmas),
    });
}
