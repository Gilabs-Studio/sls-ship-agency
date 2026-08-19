import { useState } from "react";
import { toast } from "sonner";
import { initialComplianceReports, initialConversionMetrics } from "../services/report.service";
import { useReportStore } from "../stores/useReportStore";

export function useReports() {
  const [complianceReports] = useState(initialComplianceReports);
  const [conversionMetrics] = useState(initialConversionMetrics);

  const {
    activeTab,
    setActiveTab,
    selectedClientFilter,
    setSelectedClientFilter,
  } = useReportStore();

  const handleSimulatedExport = (format: "PDF" | "Excel") => {
    const toastId = toast.loading(`Menyiapkan ekspor laporan ${format}...`);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      if (progress < 100) {
        toast.loading(`Memproses data laporan ${format} (${progress}%)...`, { id: toastId });
      } else {
        clearInterval(interval);
        toast.success(`Laporan_${activeTab}_2026.${format.toLowerCase() === "pdf" ? "pdf" : "xlsx"} berhasil diunduh!`, { id: toastId });

        // Trigger simulated browser download
        const dummyContent = "Data Laporan Operasional Keagenan Kapal PT. Nautiva Ocean Agency";
        const blob = new Blob([dummyContent], { type: format === "PDF" ? "application/pdf" : "application/vnd.ms-excel" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Laporan_${activeTab}_2026.${format.toLowerCase() === "pdf" ? "pdf" : "xlsx"}`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }, 400);
  };

  const filteredCompliance = complianceReports.filter((c) => {
    if (selectedClientFilter !== "ALL" && c.clientCompany !== selectedClientFilter) {
      return false;
    }
    return true;
  });

  return {
    complianceReports: filteredCompliance,
    conversionMetrics,
    activeTab,
    setActiveTab,
    selectedClientFilter,
    setSelectedClientFilter,
    actions: {
      exportReport: handleSimulatedExport,
    },
  };
}
