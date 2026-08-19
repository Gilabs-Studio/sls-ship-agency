"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { dummyClientLifecycleData } from "../utils/clients-dummy-data";
import type { ClientLifecycleData } from "../types/clients.types";

export type TimePeriodOption = "this_month" | "this_quarter" | "this_year";

export function useClientLifecycle() {
  const [timePeriod, setTimePeriod] = useState<TimePeriodOption>("this_month");
  const [data, setData] = useState<ClientLifecycleData>(dummyClientLifecycleData);
  const [isPending, startTransition] = useTransition();

  const handlePeriodChange = (period: TimePeriodOption) => {
    setTimePeriod(period);
    startTransition(() => {
      // Small variation based on period filter for dynamic interactivity
      if (period === "this_quarter") {
        setData({
          ...dummyClientLifecycleData,
          metrics: {
            ...dummyClientLifecycleData.metrics,
            totalClients: 54,
            activeContracts: 38,
            activePlacements: 210,
            contractValueUsd: 3100000,
          },
        });
      } else if (period === "this_year") {
        setData({
          ...dummyClientLifecycleData,
          metrics: {
            ...dummyClientLifecycleData.metrics,
            totalClients: 62,
            activeContracts: 45,
            activePlacements: 290,
            contractValueUsd: 4800000,
          },
        });
      } else {
        setData(dummyClientLifecycleData);
      }
    });
  };

  const handleExportReport = () => {
    toast.success("Laporan Siklus Hidup Klien berhasil diekspor (PDF/Excel)");
  };

  const handleAddContract = () => {
    toast.info("Formulir penambahan Kontrak / Manning Agreement baru dibuka");
  };

  const handleRefresh = () => {
    toast.success("Data siklus hidup klien telah diperbarui");
  };

  const handleViewAll = (section: string) => {
    toast.info(`Menampilkan rincian seluruh data ${section}`);
  };

  return {
    timePeriod,
    setTimePeriod: handlePeriodChange,
    data,
    isPending,
    handleExportReport,
    handleAddContract,
    handleRefresh,
    handleViewAll,
  };
}
