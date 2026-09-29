"use client";
import DoctorApprovalTabs from "@/components/modules/doctor-approval/doctor-approval-tabs";
import { useGetAllDoctors } from "@/hooks";

const ApproveDoctor = () => {
  return (
    <section className="mx-0 md:mx-4 lg:mx-8 mt-4">
      <div>
        <h1>Approve Doctor</h1>
        <p>Review and approve new doctor applications.</p>
      </div>
      <div>
        <DoctorApprovalTabs />
      </div>
    </section>
  );
};

export default ApproveDoctor;
