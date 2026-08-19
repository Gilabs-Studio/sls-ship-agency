"use client";

import React from "react";
import { useClientLifecycle } from "../hooks/useClientLifecycle";
import { ClientLifecycleHeader } from "./client-lifecycle-header";
import { ClientKpiCards } from "./client-kpi-cards";
import { ClientLifecycleFunnelCard } from "./client-lifecycle-funnel-card";
import { ContractsByStatusCard } from "./contracts-by-status-card";
import { UpcomingRenewalsCard } from "./upcoming-renewals-card";
import { ClientHealthOverviewCard } from "./client-health-overview-card";
import { RecentActivitiesCard } from "./recent-activities-card";
import { TopClientsCard } from "./top-clients-card";

export function ClientLifecycleContainer() {
  const {
    timePeriod,
    setTimePeriod,
    data,
    handleExportReport,
    handleAddContract,
    handleRefresh,
    handleViewAll,
  } = useClientLifecycle();

  return (
    <div className="space-y-5 pb-8">
      {/* 1. Header with Title & Quick Actions */}
      <ClientLifecycleHeader
        timePeriod={timePeriod}
        onPeriodChange={setTimePeriod}
        onExportReport={handleExportReport}
        onAddContract={handleAddContract}
        onRefresh={handleRefresh}
      />

      {/* 2. Top Metric KPI Cards (5 Cards) */}
      <ClientKpiCards metrics={data.metrics} />

      {/* 3. Middle Section: Funnel, Contracts by Status, Upcoming Renewals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-4">
          <ClientLifecycleFunnelCard stages={data.funnelStages} />
        </div>
        <div className="lg:col-span-4">
          <ContractsByStatusCard
            segments={data.contractsByStatus}
            onViewAll={() => handleViewAll("Status Kontrak")}
          />
        </div>
        <div className="lg:col-span-4">
          <UpcomingRenewalsCard
            renewals={data.upcomingRenewals}
            onViewAll={() => handleViewAll("Pembaruan Kontrak")}
          />
        </div>
      </div>

      {/* 4. Bottom Section: Health Overview, Recent Activities, Top Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-4">
          <ClientHealthOverviewCard
            items={data.clientHealthOverview}
            onViewAll={() => handleViewAll("Kesehatan Klien")}
          />
        </div>
        <div className="lg:col-span-4">
          <RecentActivitiesCard
            activities={data.recentActivities}
            onViewAll={() => handleViewAll("Aktivitas Terkini")}
          />
        </div>
        <div className="lg:col-span-4">
          <TopClientsCard
            topClients={data.topClients}
            onViewAll={() => handleViewAll("Klien Teratas")}
          />
        </div>
      </div>
    </div>
  );
}
