import { useMemo } from "react";
import { toast } from "sonner";
import { useMaritimeStore } from "@/lib/mock-maritime-store";
import { useRole } from "@/contexts/role-context";
import { useSalesStore } from "../stores/useSalesStore";
import { calculateSalesKpiMetrics } from "../services/sales.service";
import type { SalesStage, QualificationDiscoveryForm } from "../types/sales.types";
import type { AddLeadFormValues, DiscoveryFormValues } from "../schemas/sales.schema";

export function useSalesPipeline() {
  const { leads, updateLeadStage, addLead, updateLeadQualification } = useMaritimeStore();
  const { isClientUser } = useRole();

  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    stageFilter,
    setStageFilter,
    selectedLeadId,
    setSelectedLeadId,
    isAddLeadOpen,
    setIsAddLeadOpen,
    isDiscoveryFormOpen,
    setIsDiscoveryFormOpen,
    isLeadDetailOpen,
    setIsLeadDetailOpen,
  } = useSalesStore();

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.businessType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStage = stageFilter === "all" || lead.stage === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [leads, searchQuery, stageFilter]);

  const selectedLead = useMemo(() => {
    return leads.find((l) => l.id === selectedLeadId) || null;
  }, [leads, selectedLeadId]);

  const kpiMetrics = useMemo(() => {
    return calculateSalesKpiMetrics(leads);
  }, [leads]);

  const handleStageChange = (leadId: string, newStage: SalesStage) => {
    updateLeadStage(leadId, newStage);
    if (newStage === "Won") {
      toast.success(`🎉 Lead BERHASIL WON! Klien resmi di-onboard ke Client Lifecycle.`);
    } else {
      toast.info(`Stage lead diperbarui menjadi "${newStage}"`);
    }
  };

  const handleCreateLead = (values: AddLeadFormValues) => {
    addLead({
      companyName: values.companyName,
      businessType: values.businessType,
      contactName: values.contactName,
      contactEmail: values.contactEmail,
      contactPhone: values.contactPhone,
      leadSource: values.leadSource,
      stage: "Lead",
      potentialValueMonthly: values.potentialValueMonthly,
      priorityScore: 80,
      assignedSales: "Sales Team",
      notes: values.notes || "Lead prospek baru diajukan melalui portal.",
    });
    toast.success(`Lead ${values.companyName} berhasil ditambahkan!`);
    setIsAddLeadOpen(false);
  };

  const handleDiscoverySubmit = (leadId: string, values: DiscoveryFormValues) => {
    const qualificationData: QualificationDiscoveryForm = {
      vesselCountNeeded: values.vesselCountNeeded,
      frequentlyExpiringCerts: values.frequentlyExpiringCerts.split(",").map((s) => s.trim()),
      outsourcingNeeds: values.outsourcingNeeds.split(",").map((s) => s.trim()),
      currentAgencyPainPoints: values.currentAgencyPainPoints,
      expectedStartDate: values.expectedStartDate,
      budgetRangeMonthly: values.budgetRangeMonthly,
      decisionMakerName: selectedLead?.contactName || "PIC Utama",
    };
    updateLeadQualification(leadId, qualificationData);
    toast.success(`Form Kualifikasi & Discovery berhasil disimpan! Stage diubah ke Qualified.`);
    setIsDiscoveryFormOpen(false);
  };

  const openDiscoveryForLead = (leadId: string) => {
    setSelectedLeadId(leadId);
    setIsDiscoveryFormOpen(true);
  };

  const openLeadDetail = (leadId: string) => {
    setSelectedLeadId(leadId);
    setIsLeadDetailOpen(true);
  };

  return {
    leads: filteredLeads,
    allLeads: leads,
    selectedLead,
    kpiMetrics,
    isClientUser,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    stageFilter,
    setStageFilter,
    modalState: {
      isAddLeadOpen,
      setIsAddLeadOpen,
      isDiscoveryFormOpen,
      setIsDiscoveryFormOpen,
      isLeadDetailOpen,
      setIsLeadDetailOpen,
    },
    actions: {
      handleStageChange,
      handleCreateLead,
      handleDiscoverySubmit,
      openDiscoveryForLead,
      openLeadDetail,
    },
  };
}
