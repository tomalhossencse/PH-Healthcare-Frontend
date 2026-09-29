import {
  applyAsDoctor,
  approveDoctor,
  getAllDoctors,
  getAllPublicDoctors,
  getAPublicDoctorProfile,
  getTodayScheduleByDoctor,
  verifyDoctorAccount,
} from "@/api";
import type { IDoctorParams, IPublicDoctorParams } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

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

export function useGetAllDoctors(params: IDoctorParams) {
  return useQuery({
    queryKey: ["all-doctors", params],
    queryFn: () => getAllDoctors(params),
  });
}

export function useSuspenseGetAllDoctors(params: IDoctorParams) {
  return useSuspenseQuery({
    queryKey: ["all-doctors", params],
    queryFn: () => getAllDoctors(params),
  });
}

export function useApproveDoctor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-doctors"] });
    },
  });
}

export function useGetAllPublicDoctors(params: IPublicDoctorParams) {
  return useQuery({
    queryKey: ["doctor", "public", params],
    queryFn: () => getAllPublicDoctors(params),
  });
}

export function useSuspenseGetPublicDoctors(params: IPublicDoctorParams) {
  return useSuspenseQuery({
    queryKey: ["doctor", "public", params],
    queryFn: () => getAllPublicDoctors(params),
  });
}

export function useGetAPublicDoctorProfile(doctorId: string) {
  return useQuery({
    queryKey: ["doctor", "public", doctorId],
    queryFn: () => getAPublicDoctorProfile(doctorId),
    enabled: !!doctorId,
  });
}

export function useGetTodayScheduleByDoctor(params: {
  doctorId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["schedule", params],
    queryFn: () => getTodayScheduleByDoctor(params),
  });
}
