"use client";
import InternalPageLayout from "@/components/InternalPageLayout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <InternalPageLayout>
            {children}
        </InternalPageLayout>
    );
}
