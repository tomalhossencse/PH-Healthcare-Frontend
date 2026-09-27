"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorApprovalTable from "./doctor-approval-table";

const DoctorApprovalTabs = () => {
    return (
        <Tabs defaultValue="all">
            <TabsList>
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value="All">
                <DoctorApprovalTable />
            </TabsContent>
            <TabsContent value="pending">
                View pending doctor applications.
            </TabsContent>
            <TabsContent value="approved">
                View approved doctor applications.
            </TabsContent>
            <TabsContent value="rejected">
                View rejected doctor applications.
            </TabsContent>
        </Tabs>
    );
};

export default DoctorApprovalTabs;
