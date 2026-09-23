import apiClient from "@/lib/apiClient";
import { VerifyAccountPayload } from "@/types/auth.type";

export function verifyDoctorAccount(payload: VerifyAccountPayload) {
    return apiClient("/doctor/apply-as-doctor/verify-email", {
        method: "POST",
        body: payload,
    });
}
