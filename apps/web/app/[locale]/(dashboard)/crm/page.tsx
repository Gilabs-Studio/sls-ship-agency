"use client";

import React from "react";
import { toast } from "sonner";
import { Users, Handshake, FileText, Activity } from "lucide-react";

import { useCrm } from "@/features/crm/hooks/useCrm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LeadKanbanTable } from "@/features/crm/components/lead-kanban-table";
import { ContactListView } from "@/features/crm/components/contact-list-view";
import { DealQuotationTable } from "@/features/crm/components/deal-quotation-table";
import { ActivityTimeline } from "@/features/crm/components/activity-timeline";
import { CrmModals } from "@/features/crm/components/crm-modals";
import type { CrmTab } from "@/features/crm/stores/useCrmStore";
import type { LeadStage } from "@/features/crm/types/crm.types";

export default function CrmPage() {
  const {
    leads,
    contacts,
    deals,
    interactions,
    activeTab,
    setActiveTab,
    selectedLeadId,
    setSelectedLeadId,
    modalState,
    actions,
  } = useCrm();

  const handleUpdateStage = (id: string, stage: LeadStage) => {
    actions.updateLeadStage(id, stage);
    if (stage === "Menang") {
      toast.success(
        "Lead berhasil diubah ke stage Menang! Klien telah dikonversi ke Klien Aktif & Siap Didaftarkan Armadanya."
      );
    } else {
      toast.info(`Stage lead diperbarui menjadi "${stage}".`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight">CRM & Client Pipeline Management</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Kelola prospek calon mitra pelayaran, riwayat interaksi PIC, dan pembuatan proposal penawaran harga.
        </p>
      </div>

      {/* Main Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as CrmTab)}>
        <TabsList className="bg-card border border-border h-10 p-1">
          <TabsTrigger value="leads" className="text-xs gap-1.5 cursor-pointer">
            <Handshake className="h-3.5 w-3.5 text-primary" />
            <span>Pipeline Lead ({leads.length})</span>
          </TabsTrigger>
          <TabsTrigger value="contacts" className="text-xs gap-1.5 cursor-pointer">
            <Users className="h-3.5 w-3.5 text-emerald-500" />
            <span>Kontak PIC ({contacts.length})</span>
          </TabsTrigger>
          <TabsTrigger value="deals" className="text-xs gap-1.5 cursor-pointer">
            <FileText className="h-3.5 w-3.5 text-amber-500" />
            <span>Penawaran & Deals ({deals.length})</span>
          </TabsTrigger>
          <TabsTrigger value="activities" className="text-xs gap-1.5 cursor-pointer">
            <Activity className="h-3.5 w-3.5 text-purple-500" />
            <span>Log Aktivitas ({interactions.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Leads */}
        <TabsContent value="leads" className="pt-4">
          <LeadKanbanTable
            leads={leads}
            onUpdateStage={handleUpdateStage}
            onOpenAddLead={() => modalState.setIsAddLeadOpen(true)}
            onSelectLead={(id) => setSelectedLeadId(id)}
          />
        </TabsContent>

        {/* Tab 2: Contacts */}
        <TabsContent value="contacts" className="pt-4">
          <ContactListView
            contacts={contacts}
            onOpenAddContact={() => modalState.setIsAddContactOpen(true)}
          />
        </TabsContent>

        {/* Tab 3: Deals */}
        <TabsContent value="deals" className="pt-4">
          <DealQuotationTable
            deals={deals}
            onOpenAddDeal={() => modalState.setIsAddDealOpen(true)}
          />
        </TabsContent>

        {/* Tab 4: Activities */}
        <TabsContent value="activities" className="pt-4">
          <ActivityTimeline interactions={interactions} />
        </TabsContent>
      </Tabs>

      {/* CRM Modals */}
      <CrmModals
        leads={leads}
        isAddLeadOpen={modalState.isAddLeadOpen}
        onAddLeadOpenChange={modalState.setIsAddLeadOpen}
        onAddLeadSubmit={(data) => {
          actions.addLead(data);
          toast.success(`Lead prospek ${data.companyName} berhasil ditambahkan!`);
        }}
        isAddContactOpen={modalState.isAddContactOpen}
        onAddContactOpenChange={modalState.setIsAddContactOpen}
        onAddContactSubmit={(data) => {
          actions.addContact(data);
          toast.success(`Kontak ${data.name} berhasil disimpan!`);
        }}
        isAddDealOpen={modalState.isAddDealOpen}
        onAddDealOpenChange={modalState.setIsAddDealOpen}
        onAddDealSubmit={(data) => {
          actions.addDeal(data);
          toast.success(`Proposal penawaran "${data.title}" berhasil dibuat!`);
        }}
      />
    </div>
  );
}
