import apiClient from "@/lib/apiClient";
import type {
  IApiResponse,
  CreateSchedulePayload,
  Schedule,
  ScheduleParams,
} from "@/types";

export function createSchedule(payload: CreateSchedulePayload) {
  return apiClient<IApiResponse<Schedule>>("/schedule/create-schedule", {
    method: "POST",
    body: payload,
  });
}

export function getMySchedules(params: ScheduleParams) {
  return apiClient<IApiResponse<Schedule[]>>("/schedule/my-schedules", {
    params,
  });
}

export function publishSchedule(scheduleId: string) {
  return apiClient<IApiResponse<Schedule>>(
    `/schedule/publish-schedule/${scheduleId}`,
    { method: "PATCH" },
  );
}

export function deleteSchedule(scheduleId: string) {
  return apiClient<IApiResponse<Schedule>>(`/schedule/${scheduleId}`, {
    method: "DELETE",
  });
}
