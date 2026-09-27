import { IApiResponse } from "./api.type";
import { IUser } from "./user.type";

export interface DoctorApplicationData {
    user: {
        name: string;
        email: string;
    };
    doctor: {
        specialization: string;
        licenseNumber: string;
        qualifications: string;
        experienceYears: number;
        contactNumber: string;
        address: string;
        consultationFee: number | undefined;
        bio: string;
    };
}

export interface DoctorApplicationPayload {
    resume: File;
    additionalFiles: File[];
    data: DoctorApplicationData;
}

export interface IDoctorQuery {
    searchTerm?: string;
    specialization?: string;
    licenseNumber?: string;
    verificationStatus?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
}

export interface IAdditionalFile {
    url: string;
    publicId: string;
}

export enum VerificationStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export interface IDoctor {
    id: string;
    userId: string;
    name: string;
    email: string;
    contactNumber?: string | null;
    licenseNumber: string;
    specialization: string;
    qualifications: string;
    experienceYears: number;
    consultationFee?: number | string | null;
    bio?: string | null;
    address?: string | null;
    resume?: string | null;
    resumePublicId: string;
    additionalFiles: IAdditionalFile[] | null;
    verificationStatus: VerificationStatus;
    rejectionReason?: string | null;
    reviewedAt?: string | null;
    reviewedBy?: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    isDeleted: boolean;
    user: IUser;
}

export type IAllDoctorsResponse = IApiResponse<IDoctor[]>;

export interface IDoctorParams {
    verificationStatus?: VerificationStatus;
    searchTerm?: string;
    specialization?: string;
    licenseNumber?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    email?: string;
    name?: string;
}
