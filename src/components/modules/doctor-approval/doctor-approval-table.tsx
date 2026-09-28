import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useSuspenseGetAllDoctors } from "@/hooks";
import { IDoctorParams } from "@/types";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface Props extends IDoctorParams {
    handleReview: Dispatch<SetStateAction<string>>;
}

const DoctorApprovalTable = ({ handleReview, ...params }: Props) => {
    const { data } = useSuspenseGetAllDoctors(params);
    const doctors = data?.data || [];
    return (
        <div className="border rounded-md">
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-50">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>License Number</TableHead>
                        <TableHead>Years of Experience</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {doctors.map((doctor) => (
                        <TableRow key={doctor.id}>
                            <TableCell className="font-medium">
                                {doctor.name}
                            </TableCell>
                            <TableCell>{doctor.email}</TableCell>
                            <TableCell>{doctor.specialization}</TableCell>
                            <TableCell>{doctor.licenseNumber}</TableCell>
                            <TableCell>{doctor.experienceYears}</TableCell>
                            <TableCell className="text-right">
                                {doctor.user.emailVerified ? (
                                    <Button
                                        className="w-28"
                                        variant={
                                            doctor.verificationStatus ===
                                            "PENDING"
                                                ? "default"
                                                : "outline"
                                        }
                                        disabled={
                                            doctor.verificationStatus !==
                                            "PENDING"
                                        }
                                        onClick={() => handleReview(doctor.id)}
                                    >
                                        Review
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-28"
                                        variant="destructive"
                                        onClick={() => handleReview(doctor.id)}
                                        disabled
                                    >
                                        Not Verified
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DoctorApprovalTable;
