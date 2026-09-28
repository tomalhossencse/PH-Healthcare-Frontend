import apiClient from "@/lib/apiClient";
import {
    DoctorApplicationPayload,
    IAllDoctorsResponse,
    IApproveDoctorPayload,
    IDoctorParams,
    IDoctorQuery,
    VerifyAccountPayload,
} from "@/types";

export function applyAsDoctor(payload: DoctorApplicationPayload) {
    const formData = new FormData();

    formData.append("data", JSON.stringify(payload.data));
    formData.append("resume", payload.resume);

    for (const file of payload.additionalFiles) {
        formData.append("additionalFiles", file);
    }

    return apiClient("/doctor/apply-doctor", {
        method: "POST",
        body: formData,
    });
}

export function verifyDoctorAccount(payload: VerifyAccountPayload) {
    return apiClient("/doctor/verify-email", {
        method: "POST",
        body: payload,
    });
}

export function getAllDoctors(params: IDoctorParams) {
    return apiClient<IAllDoctorsResponse>("/doctor/all-doctors", { params });
}

export function approveDoctor(payload: IApproveDoctorPayload) {
    return apiClient("/doctor/approve-doctor", {
        method: "PATCH",
        body: payload,
    });
}
