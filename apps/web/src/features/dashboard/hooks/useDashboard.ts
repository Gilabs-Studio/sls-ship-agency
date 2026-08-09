import { useState, useEffect } from "react";
import {
  fetchDashboardSummary,
  mockDashboardKpi,
  mockComplianceTrend,
  mockRecentActivities,
  mockCrmSummary,
} from "../services/dashboard.service";
import { useDashboardStore } from "../stores/useDashboardStore";

export function useDashboard() {
  const [data, setData] = useState({
    kpi: mockDashboardKpi,
    trend: mockComplianceTrend,
    activities: mockRecentActivities,
    crmSummary: mockCrmSummary,
  });
  const [isLoading, setIsLoading] = useState(true);

  const {
    isAddVesselOpen,
    isUploadDocOpen,
    isAddLeadOpen,
    setAddVesselOpen,
    setUploadDocOpen,
    setAddLeadOpen,
  } = useDashboardStore();

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const res = await fetchDashboardSummary();
        if (isMounted) setData(res);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    ...data,
    isLoading,
    modalState: {
      isAddVesselOpen,
      isUploadDocOpen,
      isAddLeadOpen,
      setAddVesselOpen,
      setUploadDocOpen,
      setAddLeadOpen,
    },
  };
}
