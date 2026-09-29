import apiClient from "@/lib/apiClient";
import type {
  DoctorApplicationPayload,
  IAllDoctorsResponse,
  IApiResponse,
  IApproveDoctorPayload,
  IDoctorParams,
  IPubliceDoctorProfile,
  Schedule,
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

export function getAllPublicDoctors(params: IDoctorParams) {
  return apiClient<IApiResponse<IPubliceDoctorProfile[]>>(
    "doctor/public/all-doctors",
    { params },
  );
}

export function getAPublicDoctorProfile(doctorId: string) {
  return apiClient<IApiResponse<IPubliceDoctorProfile>>(
    `doctor/public/${doctorId}`,
  );
}

export function getTodayScheduleByDoctor(params: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) {
  return apiClient<IApiResponse<Schedule[]>>("/schedule/todays-schedule", {
    params,
  });
}
