import { useState } from "react";
import type { LeadItem, ContactItem, DealItem, LeadStage } from "../types/crm.types";
import {
  initialLeads,
  initialContacts,
  initialDeals,
  initialInteractions,
} from "../services/crm.service";
import { useCrmStore, type CrmTab } from "../stores/useCrmStore";

import type { LeadFormValues } from "../schemas/crm.schema";

export function useCrm() {
  const [leads, setLeads] = useState<LeadItem[]>(initialLeads);
  const [contacts, setContacts] = useState<ContactItem[]>(initialContacts);
  const [deals, setDeals] = useState<DealItem[]>(initialDeals);
  const [interactions, setInteractions] = useState(initialInteractions);

  const {
    activeTab,
    setActiveTab,
    selectedLeadId,
    setSelectedLeadId,
    isAddLeadOpen,
    setIsAddLeadOpen,
    isAddContactOpen,
    setIsAddContactOpen,
    isAddDealOpen,
    setIsAddDealOpen,
  } = useCrmStore();

  const handleUpdateLeadStage = (leadId: string, newStage: LeadStage) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const updated = { ...lead, stage: newStage, lastActivityDate: "2026-08-09" };
          // If stage changes to "Menang" (Won), promote contact to Active Client
          if (newStage === "Menang") {
            setContacts((prevContacts) =>
              prevContacts.map((c) =>
                c.company === lead.companyName ? { ...c, isClientActive: true } : c
              )
            );
          }
          return updated;
        }
        return lead;
      })
    );
  };

  const handleAddLead = (newLeadData: LeadFormValues) => {
    // Calculate priority score: vesselCount * 10 + potentialValue / 50M
    const computedScore = Math.min(
      Math.round(newLeadData.vesselCount * 10 + newLeadData.potentialValue / 50000000),
      100
    );

    const lead: LeadItem = {
      ...newLeadData,
      id: `lead-${Date.now()}`,
      vesselTypes: ["Cargo"],
      priorityScore: computedScore,
      stage: "Baru",
      isStagnant: false,
      lastActivityDate: new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString().split("T")[0],
    };

    setLeads((prev) => [lead, ...prev]);

    // Automatically create corresponding contact
    const contact: ContactItem = {
      id: `cont-${Date.now()}`,
      name: newLeadData.picName,
      company: newLeadData.companyName,
      position: "PIC Pelayaran",
      email: newLeadData.picEmail,
      phone: newLeadData.picPhone,
      isClientActive: false,
      interactionCount: 1,
      lastContacted: new Date().toISOString().split("T")[0],
    };
    setContacts((prev) => [contact, ...prev]);
  };

  const handleAddContact = (data: Omit<ContactItem, "id" | "isClientActive" | "interactionCount" | "lastContacted">) => {
    const contact: ContactItem = {
      ...data,
      id: `cont-${Date.now()}`,
      isClientActive: false,
      interactionCount: 0,
      lastContacted: new Date().toISOString().split("T")[0],
    };
    setContacts((prev) => [contact, ...prev]);
  };

  const handleAddDeal = (data: Omit<DealItem, "id" | "companyName" | "vesselCount" | "status" | "sentDate">) => {
    const targetLead = leads.find((l) => l.id === data.leadId);
    const deal: DealItem = {
      ...data,
      id: `deal-${Date.now()}`,
      companyName: targetLead?.companyName || "Perusahaan Pelayaran",
      vesselCount: targetLead?.vesselCount || 1,
      status: "Terkirim",
      sentDate: new Date().toISOString().split("T")[0],
    };
    setDeals((prev) => [deal, ...prev]);
  };

  return {
    leads,
    contacts,
    deals,
    interactions,
    activeTab,
    setActiveTab,
    selectedLeadId,
    setSelectedLeadId,
    modalState: {
      isAddLeadOpen,
      setIsAddLeadOpen,
      isAddContactOpen,
      setIsAddContactOpen,
      isAddDealOpen,
      setIsAddDealOpen,
    },
    actions: {
      updateLeadStage: handleUpdateLeadStage,
      addLead: handleAddLead,
      addContact: handleAddContact,
      addDeal: handleAddDeal,
    },
  };
}
