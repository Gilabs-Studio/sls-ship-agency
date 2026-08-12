"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  Users,
  Calendar,
  ShieldAlert,
  Scale,
  MapPin,
  LayoutGrid,
} from "lucide-react";
import { FolderTabs, type FolderTab } from "@/components/ui/folder-tabs";
import { useVesselsPage } from "../hooks/useVesselsPage";
import { VesselHeader } from "./vessel-header";
import { VesselKpiCards } from "./vessel-kpi-cards";
import { AgentTableView } from "./agent-table-view";
import { AgentDetailDrawer } from "./agent-detail-drawer";
import { RotationGanttView } from "./rotation-gantt-view";
import { ComplianceAlertWidget } from "./compliance-alert-widget";
import { AgentComparisonView } from "./agent-comparison-view";
import { FleetMapAndTrend } from "./fleet-map-and-trend";
import { AddAgentModal } from "./modals/add-agent-modal";
import { RenewCertificateModal } from "./modals/renew-certificate-modal";
import type { AgentTabKey } from "../types/vessel-agent.types";

export function VesselsContainer() {
  const t = useTranslations("vessels");

  const {
    agents,
    allAgents,
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
    modalState,
    actions,
  } = useVesselsPage();

  // Folder Tab definition
  const folderTabs: FolderTab<AgentTabKey>[] = [
    {
      key: "overview",
      label: t("tabs.overview"),
      icon: <LayoutGrid className="h-3.5 w-3.5" />,
    },
    {
      key: "directory",
      label: t("tabs.directory"),
      icon: <Users className="h-3.5 w-3.5" />,
      count: agents.length,
    },
    {
      key: "rotation",
      label: t("tabs.rotation"),
      icon: <Calendar className="h-3.5 w-3.5" />,
      count: rotation.length,
    },
    {
      key: "compliance",
      label: t("tabs.compliance"),
      icon: <ShieldAlert className="h-3.5 w-3.5" />,
      count: complianceAlerts.length,
    },
    {
      key: "comparison",
      label: t("tabs.comparison"),
      icon: <Scale className="h-3.5 w-3.5" />,
      count: comparisonAgentIds.length,
    },
    {
      key: "fleet",
      label: t("tabs.fleet"),
      icon: <MapPin className="h-3.5 w-3.5" />,
      count: fleet.length,
    },
  ];

  return (
    <div className="w-full min-w-0 space-y-5 pb-8">
      {/* 1. Header */}
      <VesselHeader
        onAddAgentClick={() => modalState.setIsAddAgentOpen(true)}
        totalAgentsCount={kpiMetrics.totalAgents}
      />

      {/* 2. KPI Summary Cards */}
      <VesselKpiCards metrics={kpiMetrics} />

      {/* 3. FolderTabs Navigation Container */}
      <FolderTabs
        tabs={folderTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <div className="p-4 sm:p-5">
          {/* Tab 1: Overview Combined View */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <AgentTableView
                agents={agents.slice(0, 5)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                rankFilter={rankFilter}
                onRankFilterChange={setRankFilter}
                onSelectAgent={setSelectedAgentId}
                comparisonAgentIds={comparisonAgentIds}
                onToggleComparison={toggleComparisonAgentId}
              />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <ComplianceAlertWidget
                    alerts={complianceAlerts}
                    onOpenRenewCert={(id) => {
                      modalState.setSelectedCertIdToRenew(id);
                      modalState.setIsRenewCertOpen(true);
                    }}
                  />
                </div>
                <div className="lg:col-span-5">
                  <FleetMapAndTrend fleet={fleet} />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Directory Table */}
          {activeTab === "directory" && (
            <AgentTableView
              agents={agents}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              rankFilter={rankFilter}
              onRankFilterChange={setRankFilter}
              onSelectAgent={setSelectedAgentId}
              comparisonAgentIds={comparisonAgentIds}
              onToggleComparison={toggleComparisonAgentId}
            />
          )}

          {/* Tab 3: Rotation Gantt */}
          {activeTab === "rotation" && (
            <RotationGanttView schedule={rotation} />
          )}

          {/* Tab 4: Compliance Alerts */}
          {activeTab === "compliance" && (
            <ComplianceAlertWidget
              alerts={complianceAlerts}
              onOpenRenewCert={(id) => {
                modalState.setSelectedCertIdToRenew(id);
                modalState.setIsRenewCertOpen(true);
              }}
            />
          )}

          {/* Tab 5: Agent Comparison */}
          {activeTab === "comparison" && (
            <AgentComparisonView
              comparisonAgents={comparisonAgents}
              allAgents={allAgents}
              onToggleComparison={toggleComparisonAgentId}
              onClearComparison={clearComparison}
            />
          )}

          {/* Tab 6: Fleet Map & Performance Trend */}
          {activeTab === "fleet" && (
            <FleetMapAndTrend fleet={fleet} />
          )}
        </div>
      </FolderTabs>

      {/* Slide-out Agent Profile Detail Drawer */}
      <AgentDetailDrawer
        agent={selectedAgent}
        onClose={() => setSelectedAgentId(null)}
        onOpenRenewCert={(id) => {
          modalState.setSelectedCertIdToRenew(id);
          modalState.setIsRenewCertOpen(true);
        }}
      />

      {/* Modals */}
      <AddAgentModal
        open={modalState.isAddAgentOpen}
        onOpenChange={modalState.setIsAddAgentOpen}
        onSubmit={actions.addAgent}
      />

      <RenewCertificateModal
        open={modalState.isRenewCertOpen}
        onOpenChange={modalState.setIsRenewCertOpen}
        certId={modalState.selectedCertIdToRenew}
        onSubmit={actions.renewCertificate}
      />
    </div>
  );
}
