import type { Metadata } from "next";
import { ClientLifecycleContainer } from "@/features/clients/components/client-lifecycle-container";

export const metadata: Metadata = {
  title: "Client Lifecycle & Manning Agreements | Nautiva Platform",
  description:
    "Monitor dan kelola siklus hidup klien outsourcing staf agen perkapalan, retensi akun, status kontrak, dan pipeline pembaruan.",
};

export default function ClientsPage() {
  return <ClientLifecycleContainer />;
}
