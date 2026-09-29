import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useApproveDoctor, useGetAllDoctors } from "@/hooks";
import {
  IApproveDoctorPayload,
  IDoctorParams,
  VerificationStatus,
} from "@/types";
import { titleCase } from "@/utils";
import { useState } from "react";

interface Props extends IDoctorParams {
  selectedId: string;
  onClose: () => void;
}
const DoctorReviewSheet = ({ selectedId, onClose, ...params }: Props) => {
  const [confirmRejection, setConfirmRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data } = useGetAllDoctors(params);
  const { mutate: review, isPending } = useApproveDoctor();

  const handleClose = () => {
    setConfirmRejection(false);
    onClose();
    setRejectionReason("");
  };

  const handleReviewAction = (
    status: Exclude<VerificationStatus, VerificationStatus.PENDING>,
  ) => {
    const reviewData: IApproveDoctorPayload = {
      doctorId: selectedId,
      verificationStatus: status,
      rejectReason: rejectionReason,
    };
    review(reviewData, {
      onSuccess: () => {
        toast.add({
          title: `${titleCase(status)}`,
          type: "success",
          description: `Doctor ${titleCase(status)} successfully`,
          timeout: 500,
        });
        handleClose();
      },
      onError: () => {
        toast.add({
          title: "Review failed",
          type: "error",
          timeout: 500,
        });
        setRejectionReason("");
      },
    });
  };

  const slectedDoctor = data?.data?.find((doctor) => doctor.id === selectedId);
  console.log("slectedDoctor", slectedDoctor);
  return (
    <Sheet
      open={!!selectedId}
      onOpenChange={() => {
        onClose();
      }}
    >
      {/* <SheetTrigger
                render={
                    <Button variant="outline" size="sm">
                        Review
                    </Button>
                }
            ></SheetTrigger> */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Review and Take Action</SheetTitle>
          <SheetDescription>
            <span> Doctor Name :</span> {slectedDoctor?.name}
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          {confirmRejection ? (
            <div className="flex flex-col space-y-4">
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
              <div className="flex justify-between gap-4">
                <Button className="flex-1" size="lg" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  size="lg"
                  variant="destructive"
                  disabled={!rejectionReason || isPending}
                  onClick={() => {
                    handleReviewAction(VerificationStatus.REJECTED);
                  }}
                >
                  {isPending ? (
                    <>
                      <Spinner /> Rejecting...
                    </>
                  ) : (
                    "Confirm Rejection"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between gap-4">
              <Button
                className="flex-1"
                size="lg"
                variant="default"
                disabled={isPending}
                onClick={() => {
                  handleReviewAction(VerificationStatus.APPROVED);
                }}
              >
                {isPending ? (
                  <>
                    <Spinner /> Approving...
                  </>
                ) : (
                  "Approve"
                )}
              </Button>
              <Button
                onClick={() => setConfirmRejection(true)}
                className="flex-1"
                size="lg"
                variant="destructive"
              >
                Reject
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DoctorReviewSheet;
