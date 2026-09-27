"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";
import { Suspense, useState } from "react";
import DoctorApprovalLoading from "./doctor-approval-loading";
import { IDoctorParams, VerificationStatus } from "@/types";
import { titleCase } from "@/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const verificationStatusOptions: (VerificationStatus | "ALL")[] = [
    "ALL",
    VerificationStatus.PENDING,
    VerificationStatus.APPROVED,
    VerificationStatus.REJECTED,
];

const DoctorApprovalTabs = () => {
    const [tab, setTab] = useState(verificationStatusOptions[0]);

    const queryParams: IDoctorParams = {
        // verificationStatus: tab === "ALL" ? undefined : tab,
        ...(tab === "ALL" ? {} : { verificationStatus: tab }),
        page: 1,
        limit: 10,
    };

    return (
        <>
            <Tabs value={tab} onValueChange={(value) => setTab(value)}>
                <div className="flex justify-between items-center">
                    <div className="md:w-1/3 relative mt-4">
                        <Search className="absolute inset-0 size-3 top-1/2 -translate-y-1/2 left-2" />
                        <Input
                            className="pl-8"
                            type="search"
                            placeholder="Search by name, email"
                        />
                    </div>
                    <TabsList>
                        {verificationStatusOptions.map((status) => (
                            <TabsTrigger key={status} value={status}>
                                {titleCase(status)}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                <TabsContent value={tab}>
                    <Suspense fallback={<DoctorApprovalLoading />}>
                        <DoctorApprovalTable {...queryParams} />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </>
    );
};

export default DoctorApprovalTabs;
