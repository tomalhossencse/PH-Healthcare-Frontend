import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DoctorReviewSheet from "./doctor-review-sheet";
import { useSuspenseGetAllDoctors } from "@/hooks";
import { IDoctorParams } from "@/types";

interface Props extends IDoctorParams {}

const DoctorApprovalTable = ({ ...params }: Props) => {
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
                                <DoctorReviewSheet />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DoctorApprovalTable;
