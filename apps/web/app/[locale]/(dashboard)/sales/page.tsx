import type { Metadata } from "next";
import { SalesPipelineContainer } from "@/features/sales/components/sales-pipeline-container";

export const metadata: Metadata = {
  title: "Sales & Opportunity Pipeline | Nautiva Platform",
  description:
    "Kelola prospek agen kapal niaga dari Lead Inbound, Kualifikasi Discovery, Proposal, hingga Closing Contract.",
};

export default function SalesPage() {
  return <SalesPipelineContainer />;
}
