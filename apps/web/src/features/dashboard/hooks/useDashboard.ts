import { useState, useEffect, useMemo } from "react";
import {
  fetchDashboardSummary,
  mockDashboardKpi,
  mockComplianceTrend,
  mockRecentActivities,
  mockCrmSummary,
  mockVmsKpis,
  mockVmsPipeline,
  mockVmsTopAgencies,
  mockVmsAgencies,
} from "../services/dashboard.service";
import { useDashboardStore } from "../stores/useDashboardStore";

export type VmsFilterTab = "semua" | "aktif" | "berjalan" | "blacklist";

export function useDashboard() {
  const [data, setData] = useState({
    kpi: mockDashboardKpi,
    trend: mockComplianceTrend,
    activities: mockRecentActivities,
    crmSummary: mockCrmSummary,
    vmsKpis: mockVmsKpis,
    vmsPipeline: mockVmsPipeline,
    vmsTopAgencies: mockVmsTopAgencies,
    vmsAgencies: mockVmsAgencies,
  });
  const [isLoading, setIsLoading] = useState(true);

  // VMS Main Agency Table filter & search state
  const [activeTab, setActiveTab] = useState<VmsFilterTab>("semua");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter agencies based on activeTab and searchQuery
  const filteredAgencies = useMemo(() => {
    return data.vmsAgencies.filter((agency) => {
      // Tab filter logic
      let matchesTab = true;
      if (activeTab === "aktif") {
        matchesTab = agency.status === "aktif";
      } else if (activeTab === "berjalan") {
        matchesTab = agency.activeProjectsCount > 0;
      } else if (activeTab === "blacklist") {
        matchesTab = agency.status === "blacklist";
      }

      // Search filter logic
      let matchesSearch = true;
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        matchesSearch =
          agency.name.toLowerCase().includes(query) ||
          agency.code.toLowerCase().includes(query) ||
          agency.pic.name.toLowerCase().includes(query) ||
          agency.pic.email.toLowerCase().includes(query) ||
          agency.skills.some((skill) => skill.toLowerCase().includes(query));
      }

      return matchesTab && matchesSearch;
    });
  }, [data.vmsAgencies, activeTab, searchQuery]);

  // Tab counters
  const counts = useMemo(() => {
    return {
      semua: data.vmsAgencies.length,
      aktif: data.vmsAgencies.filter((a) => a.status === "aktif").length,
      berjalan: data.vmsAgencies.filter((a) => a.activeProjectsCount > 0).length,
      blacklist: data.vmsAgencies.filter((a) => a.status === "blacklist").length,
    };
  }, [data.vmsAgencies]);

  return {
    ...data,
    isLoading,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredAgencies,
    counts,
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

