import type { Metadata } from "next";
import { VesselsContainer } from "@/features/vessels/components/vessels-container";

export const metadata: Metadata = {
  title: "Vessel & Maritime Agent Management | Nautiva Platform",
  description:
    "Master database for vessel fleets, crewing agents, sea time tracking, and certification compliance.",
};

export default function VesselsPage() {
  return <VesselsContainer />;
}
