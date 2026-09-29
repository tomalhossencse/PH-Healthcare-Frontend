"use client";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type IDoctorParams, VerificationStatus } from "@/types";
import { titleCase } from "@/utils";
import { Search } from "lucide-react";
import { Suspense, useState } from "react";
import DoctorApprovalLoading from "./doctor-approval-loading";
import DoctorApprovalTable from "./doctor-approval-table";
import DoctorReviewSheet from "./doctor-review-sheet";
import useDebounce from "@/hooks/debounce.hook";

const verificationStatusOptions: (VerificationStatus | "ALL")[] = [
  "ALL",
  VerificationStatus.PENDING,
  VerificationStatus.APPROVED,
  VerificationStatus.REJECTED,
];

const DoctorApprovalTabs = () => {
  const [tab, setTab] = useState(verificationStatusOptions[0]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const debounceSearch = useDebounce(searchInput, setPage, 500);

  const queryParams: IDoctorParams = {
    // verificationStatus: tab === "ALL" ? undefined : tab,
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
    page,
    limit: 2,
    ...(debounceSearch ? { searchTerm: debounceSearch } : {}),
  };

  return (
    <>
      <Tabs value={tab} onValueChange={(value) => setTab(value)}>
        <div className="flex justify-between items-center">
          <div className="md:w-1/3 relative mt-4">
            <Search className="absolute inset-0 size-3 top-1/2 -translate-y-1/2 left-2" />
            <Input
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-8"
              type="search"
              placeholder="Search by name or email"
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
            <DoctorApprovalTable
              {...queryParams}
              handleReview={setSelectedId}
              handlePageChange={setPage}
            />
          </Suspense>

          <DoctorReviewSheet
            selectedId={selectedId}
            onClose={() => setSelectedId("")}
            {...queryParams}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DoctorApprovalTabs;
