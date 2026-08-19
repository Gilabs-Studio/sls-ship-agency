import { useState } from "react";
import { toast } from "sonner";
import type { Agent, AgentRank, AgentStatus } from "../types/vessel-agent.types";
import {
  initialAgents,
  initialFleetLocations,
  initialRotationSchedule,
  computeKpiMetrics,
  getExpiringCertificatesList,
} from "../services/vessel-agent.service";
import { useVesselAgentStore } from "../stores/useVesselAgentStore";

export function useVesselsPage() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [fleet] = useState(initialFleetLocations);
  const [rotation] = useState(initialRotationSchedule);

  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    rankFilter,
    setRankFilter,
    selectedAgentId,
    setSelectedAgentId,
    comparisonAgentIds,
    toggleComparisonAgentId,
    clearComparison,
    isAddAgentOpen,
    setIsAddAgentOpen,
    isRenewCertOpen,
    setIsRenewCertOpen,
    selectedCertIdToRenew,
    setSelectedCertIdToRenew,
  } = useVesselAgentStore();

  // Active agent selected for Detail Drawer
  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || null;

  // Selected agents for comparison side-by-side
  const comparisonAgents = agents.filter((a) => comparisonAgentIds.includes(a.id));

  // Compute KPI metrics
  const kpiMetrics = computeKpiMetrics(agents);

  // Expiring certificate list for compliance widget
  const complianceAlerts = getExpiringCertificatesList(agents);

  // Filtered agents dataset
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.mainRank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (agent.currentVessel && agent.currentVessel.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || agent.status === statusFilter;
    const matchesRank = rankFilter === "all" || agent.mainRank === rankFilter;

    return matchesSearch && matchesStatus && matchesRank;
  });

  // Action: Add new agent
  const handleAddAgent = (newAgentData: {
    name: string;
    email: string;
    phone: string;
    mainRank: AgentRank;
    status: AgentStatus;
    currentVessel?: string;
    seaTimeMonths: number;
  }) => {
    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: newAgentData.name,
      email: newAgentData.email,
      phone: newAgentData.phone,
      mainRank: newAgentData.mainRank,
      status: newAgentData.status,
      currentVessel: newAgentData.currentVessel || undefined,
      seaTimeMonths: newAgentData.seaTimeMonths,
      overallRating: 5.0,
      emergencyContactName: "Kontak Darurat",
      emergencyContactPhone: "+62 812-0000-1111",
      passportNumber: "C-" + Math.floor(1000000 + Math.random() * 9000000),
      seamanBookNumber: "SB-" + Math.floor(1000000 + Math.random() * 9000000),
      certificates: [
        {
          id: `cert-${Date.now()}-1`,
          name: "BST (Basic Safety Training)",
          certNumber: "BST-2026-NEW",
          issuingAuthority: "Hubla Kemenhub RI",
          issueDate: "2026-01-01",
          expiryDate: "2031-01-01",
          daysRemaining: 1600,
          status: "valid",
        },
        {
          id: `cert-${Date.now()}-2`,
          name: "MCU (Medical Checkup)",
          certNumber: "MCU-2026-NEW",
          issuingAuthority: "KKP Pelabuhan",
          issueDate: "2026-06-01",
          expiryDate: "2027-06-01",
          daysRemaining: 293,
          status: "valid",
        },
      ],
      placementHistory: [],
      reviews: [],
      flags: ["Kru Baru Terdaftar", "Siap Penempatan"],
      notes: "Agen pelaut baru terdaftar dalam database resmi Nautiva.",
    };

    setAgents((prev) => [newAgent, ...prev]);
    setIsAddAgentOpen(false);
    toast.success(`Agen Pelaut ${newAgent.name} berhasil didaftarkan!`);
  };

  // Action: Renew Certificate
  const handleRenewCertificate = (certId: string, newExpiryDate: string) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) => {
        const hasCert = agent.certificates.some((c) => c.id === certId);
        if (!hasCert) return agent;

        const updatedCerts = agent.certificates.map((cert) => {
          if (cert.id === certId) {
            return {
              ...cert,
              expiryDate: newExpiryDate,
              daysRemaining: 365,
              status: "valid" as const,
            };
          }
          return cert;
        });

        return { ...agent, certificates: updatedCerts };
      })
    );

    setIsRenewCertOpen(false);
    setSelectedCertIdToRenew(null);
    toast.success(`Sertifikat berhasil diperpanjang hingga ${newExpiryDate}!`);
  };

  return {
    agents: filteredAgents,
    allAgents: agents,
    fleet,
    rotation,
    kpiMetrics,
    complianceAlerts,
    selectedAgent,
    comparisonAgents,
    comparisonAgentIds,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    rankFilter,
    setRankFilter,
    setSelectedAgentId,
    toggleComparisonAgentId,
    clearComparison,
    modalState: {
      isAddAgentOpen,
      setIsAddAgentOpen,
      isRenewCertOpen,
      setIsRenewCertOpen,
      selectedCertIdToRenew,
      setSelectedCertIdToRenew,
    },
    actions: {
      addAgent: handleAddAgent,
      renewCertificate: handleRenewCertificate,
    },
  };
}
