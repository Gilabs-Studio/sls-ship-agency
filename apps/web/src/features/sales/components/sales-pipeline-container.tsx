"use client";

import React from "react";
import { useSalesPipeline } from "../hooks/useSalesPipeline";
import { SalesHeader } from "./sales-header";
import { SalesToolbar } from "./sales-toolbar";
import { SalesKanbanBoard } from "./sales-kanban-board";
import { SalesTableView } from "./sales-table-view";
import { AddLeadModal } from "./add-lead-modal";
import { DiscoveryFormModal } from "./discovery-form-modal";
import { SalesLeadDetailModal } from "./sales-lead-detail-modal";

export function SalesPipelineContainer() {
  const {
    leads,
    selectedLead,
    kpiMetrics,
    isClientUser,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    modalState,
    actions,
  } = useSalesPipeline();

  const formattedTotalRevenue =
    kpiMetrics.totalPipelineValue >= 1000000000
      ? `Rp ${(kpiMetrics.totalPipelineValue / 1000000000).toFixed(2)}M / bln`
      : `Rp ${(kpiMetrics.totalPipelineValue / 1000000).toFixed(0)} Juta / bln`;

  return (
    <div className="w-full min-w-0 space-y-4 pb-8">
      {/* 1. Header (Title Deals Pipeline + Export + Add Deal) */}
      <SalesHeader
        onAddLeadClick={() => modalState.setIsAddLeadOpen(true)}
        isClientUser={isClientUser}
      />

      {/* 2. Folder Tabs + Content Body — uses centralized FolderTabs via SalesToolbar */}
      <SalesToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        totalLeadsCount={kpiMetrics.totalLeads}
        totalRevenueFormatted={formattedTotalRevenue}
      >
        {/* 3. Main View: KANBAN BOARD or LIST TABLE */}
        <div className="p-4">
          {viewMode === "kanban" ? (
            <SalesKanbanBoard
              leads={leads}
              onStageChange={actions.handleStageChange}
              onOpenDiscovery={actions.openDiscoveryForLead}
              onSelectLead={actions.openLeadDetail}
              isClientUser={isClientUser}
            />
          ) : (
            <SalesTableView
              leads={leads}
              onSelectLead={actions.openLeadDetail}
            />
          )}
        </div>
      </SalesToolbar>

      {/* Interactive Modals */}
      <AddLeadModal
        open={modalState.isAddLeadOpen}
        onOpenChange={modalState.setIsAddLeadOpen}
        onSubmit={actions.handleCreateLead}
      />

      <DiscoveryFormModal
        open={modalState.isDiscoveryFormOpen}
        onOpenChange={modalState.setIsDiscoveryFormOpen}
        selectedLead={selectedLead}
        onSubmit={actions.handleDiscoverySubmit}
      />

      <SalesLeadDetailModal
        open={modalState.isLeadDetailOpen}
        onOpenChange={modalState.setIsLeadDetailOpen}
        lead={selectedLead}
        onStageChange={actions.handleStageChange}
        onOpenDiscovery={actions.openDiscoveryForLead}
        isClientUser={isClientUser}
      />
    </div>
  );
}
