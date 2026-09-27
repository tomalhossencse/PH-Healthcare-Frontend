export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";

export const UserStatus = {
    ACTIVE: "ACTIVE",
    BLOCKED: "BLOCKED",
    DELETED: "DELETED",
} as const;

export interface IUser {
    id: string;
    name: string;
    email: string;
    googlId: string | null;
    authProvider: "CREDENTIAL" | "GOOGLE";
    image: string | null;
    imagePublicId: string | null;
    emailVerified: boolean;
    role: UserRole;
    status: (typeof UserStatus)[keyof typeof UserStatus];
    needPasswordChange: boolean;
    isDeleted: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string | null;
}
