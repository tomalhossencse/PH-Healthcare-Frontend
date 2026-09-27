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
const DoctorReviewSheet = () => {
    return (
        <Sheet>
            <SheetTrigger
                render={
                    <Button variant="outline" size="sm">
                        Review
                    </Button>
                }
            ></SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default DoctorReviewSheet;
