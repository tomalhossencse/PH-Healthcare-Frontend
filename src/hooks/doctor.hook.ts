import { verifyDoctorAccount } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useVerifyDoctorAccount() {
    return useMutation({
        mutationFn: verifyDoctorAccount,
    });
}
