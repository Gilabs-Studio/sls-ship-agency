"use client";

import React from "react";
import { useMaritimeStore } from "@/lib/mock-maritime-store";
import { useRole } from "@/contexts/role-context";
import {
  TrendingUp,
  Users,
  Ship,
  AlertTriangle,
  FileCheck,
  Award,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  Zap,
  Building2,
  ChevronRight,
  BarChart2,
  Filter,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

export default function DashboardPage() {
  const { isClientUser, clientCompanyName, role } = useRole();
  const {
    companies,
    vessels,
    certificates,
    leads,
    serviceRequests,
    vendors,
    renewalReminders,
  } = useMaritimeStore();

  // Role based filtering
  const filteredCompanies = isClientUser
    ? companies.filter((c) => c.name === clientCompanyName)
    : companies;
  const filteredVessels = isClientUser
    ? vessels.filter((v) => v.companyName === clientCompanyName)
    : vessels;
  const filteredCertificates = isClientUser
    ? certificates.filter((c) => c.companyName === clientCompanyName)
    : certificates;
  const filteredServiceRequests = isClientUser
    ? serviceRequests.filter((s) => s.companyName === clientCompanyName)
    : serviceRequests;

  // KPI Calculations
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(
    (l) => l.stage !== "Lead" && l.stage !== "Lost"
  ).length;
  const leadToQualifiedRate = totalLeads ? Math.round((qualifiedLeads / totalLeads) * 100) : 0;

  const wonLeads = leads.filter((l) => l.stage === "Won").length;
  const proposalSentCount = leads.filter(
    (l) => l.stage === "Proposal Sent" || l.stage === "Negotiation" || l.stage === "Won"
  ).length;
  const proposalToWinRate = proposalSentCount ? Math.round((wonLeads / proposalSentCount) * 100) : 40;

  const activeClientsCount = filteredCompanies.filter((c) => c.lifecycleStage === "Active" || c.lifecycleStage === "Renewed").length;
  const activeVesselsCount = filteredVessels.length;

  const nearExpiry30Days = filteredCertificates.filter(
    (c) => c.status === "near-expiry" && c.daysRemaining > 0 && c.daysRemaining <= 30
  ).length;
  const expiredCerts = filteredCertificates.filter((c) => c.daysRemaining <= 0).length;

  const totalVendorTasks = vendors.reduce((acc, v) => acc + v.completedTasksCount, 0);
  const vendorOnTimeRate = 96.4; // 96.4% on-time SLA rate
  const clientRenewalRate = 88.5; // 88.5% annual contract renewal
  const clientChurnRate = 3.2; // 3.2% annual churn

  // Chart Data Preparation
  const pipelineFunnelData = [
    { stage: "Lead", count: leads.filter((l) => l.stage === "Lead").length },
    { stage: "Qualified", count: leads.filter((l) => l.stage === "Qualified").length },
    { stage: "Discovery", count: leads.filter((l) => l.stage === "Discovery").length },
    { stage: "Proposal", count: leads.filter((l) => l.stage === "Proposal Sent").length },
    { stage: "Nego", count: leads.filter((l) => l.stage === "Negotiation").length },
  ];

  const expiryDistributionData = [
    { name: "Valid (>90 Hari)", value: filteredCertificates.filter((c) => c.daysRemaining > 90).length, color: "#10B981" },
    { name: "Near Expiry (30-90 Hari)", value: filteredCertificates.filter((c) => c.daysRemaining > 0 && c.daysRemaining <= 90).length, color: "#F59E0B" },
    { name: "Expired (Sangat Mendesak)", value: expiredCerts, color: "#EF4444" },
  ];

  const monthlyTrendsData = [
    { month: "Mar", requests: 12, completed: 11, revenue: 140 },
    { month: "Apr", requests: 18, completed: 17, revenue: 190 },
    { month: "Mei", requests: 15, completed: 15, revenue: 165 },
    { month: "Jun", requests: 22, completed: 20, revenue: 230 },
    { month: "Jul", requests: 25, completed: 24, revenue: 270 },
    { month: "Agt", requests: 19, completed: 16, revenue: 210 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/70 dark:bg-slate-900/80 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-white/15 dark:border-white/10 shadow-xl">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">Executive Operations Dashboard</h1>
            <Badge variant="outline" className="bg-emerald-500/15 text-emerald-400 dark:text-[#ACFCCC] border-emerald-500/30 text-xs font-bold px-2.5 py-0.5">
              Live Agency Overview
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-normal">
            Ringkasan KPI performa Sales, Armada Kapal, Expiry Status Sertifikat, dan SLA Vendor Outsourcing.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="px-3 py-2 text-xs font-semibold gap-1.5 bg-white/10 text-foreground border border-white/10">
            <Building2 className="h-3.5 w-3.5 text-[#8FC5FF]" />
            <span>Role: {role}</span>
          </Badge>
          {!isClientUser && (
            <Button asChild size="sm" className="bg-[#ACFCCC] text-black hover:bg-[#96f7bb] font-bold text-xs shadow-md min-h-[44px] sm:min-h-[36px] px-4">
              <Link href="/service-requests">
                <Zap className="h-4 w-4 mr-1.5" />
                Buat Service Request
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Primary KPI Grid (8 Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <Card className="glass-card border-white/15 dark:border-white/10 hover:border-[#ACFCCC]/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
              Total Lead Masuk
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-[#8FC5FF]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight text-foreground">{totalLeads} <span className="text-sm font-semibold text-muted-foreground">Lead</span></div>
            <div className="flex items-center text-xs text-emerald-400 font-semibold mt-1 gap-1">
              <ArrowUpRight className="h-4 w-4" />
              <span>+18% vs bulan lalu</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2 */}
        <Card className="glass-card border-white/15 dark:border-white/10 hover:border-[#ACFCCC]/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
              Lead-to-Qualified Rate
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-[#ACFCCC]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight text-foreground">{leadToQualifiedRate}%</div>
            <div className="text-xs text-slate-400 dark:text-slate-300 font-medium mt-1">
              {qualifiedLeads} dari {totalLeads} ter-kualifikasi
            </div>
          </CardContent>
        </Card>

        {/* Metric 3 */}
        <Card className="glass-card border-white/15 dark:border-white/10 hover:border-[#ACFCCC]/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
              Proposal-to-Win Rate
            </CardTitle>
            <Award className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight text-foreground">{proposalToWinRate}%</div>
            <div className="flex items-center text-xs text-emerald-400 font-semibold mt-1 gap-1">
              <ArrowUpRight className="h-4 w-4" />
              <span>Target: &gt;35%</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4 */}
        <Card className="glass-card border-white/15 dark:border-white/10 hover:border-[#ACFCCC]/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
              Klien Aktif
            </CardTitle>
            <Users className="h-4 w-4 text-[#8FC5FF]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight text-foreground">{activeClientsCount} <span className="text-sm font-semibold text-muted-foreground">Mitra</span></div>
            <div className="text-xs text-slate-400 dark:text-slate-300 font-medium mt-1">
              Dari total {filteredCompanies.length} perusahaan
            </div>
          </CardContent>
        </Card>

        {/* Metric 5 */}
        <Card className="glass-card border-white/15 dark:border-white/10 hover:border-[#ACFCCC]/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
              Armada Kapal Aktif
            </CardTitle>
            <Ship className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight text-foreground">{activeVesselsCount} <span className="text-sm font-semibold text-muted-foreground">Kapal</span></div>
            <div className="text-xs text-slate-400 dark:text-slate-300 font-medium mt-1">
              {filteredVessels.filter((v) => v.seaworthinessStatus === "Layak Operasi").length} Layak Operasi
            </div>
          </CardContent>
        </Card>

        {/* Metric 6 */}
        <Card className="glass-card border-red-500/30 hover:border-red-500/50 transition-all duration-300 bg-red-500/10 dark:bg-red-950/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-red-400 uppercase tracking-wider">
              Alert Sertifikat Expired
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400 animate-bounce" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-extrabold text-red-400">
              {expiredCerts} <span className="text-xs font-semibold text-slate-300">Expired</span> / {nearExpiry30Days} <span className="text-xs font-semibold text-slate-300">&lt;30 Hari</span>
            </div>
            <div className="text-xs text-red-300 font-semibold mt-1">
              Membutuhkan perpanjangan Syahbandar
            </div>
          </CardContent>
        </Card>

        {/* Metric 7 */}
        <Card className="glass-card border-white/15 dark:border-white/10 hover:border-[#ACFCCC]/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
              Vendor On-Time SLA
            </CardTitle>
            <Clock className="h-4 w-4 text-[#ACFCCC]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight text-foreground">{vendorOnTimeRate}%</div>
            <div className="text-xs text-emerald-400 font-semibold mt-1">
              SLA fulfillment di bawah 24-48 jam
            </div>
          </CardContent>
        </Card>

        {/* Metric 8 */}
        <Card className="glass-card border-white/15 dark:border-white/10 hover:border-[#ACFCCC]/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">
              Renewal vs Churn Rate
            </CardTitle>
            <FileCheck className="h-4 w-4 text-[#8FC5FF]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-emerald-400">
              {clientRenewalRate}% <span className="text-xs font-semibold text-slate-300">Renewal</span>
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-300 mt-1 font-medium">
              Churn Rate: <span className="text-rose-400 font-bold">{clientChurnRate}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Conversion Funnel & Request Trends */}
        <Card className="lg:col-span-2 glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Tren Permintaan Service &amp; Pipeline Conversion</CardTitle>
              <CardDescription className="text-xs">
                Perbandingan kuantitas request layanan masuk vs penyelesaian bulanan.
              </CardDescription>
            </div>
            <BarChart2 className="h-5 w-5 text-[#ACFCCC]" />
          </CardHeader>
          <CardContent className="h-72 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="month" stroke="#888888" fontSize={11} />
                <YAxis stroke="#888888" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                <Line type="monotone" dataKey="requests" name="Request Masuk" stroke="#8FC5FF" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="completed" name="Request Selesai" stroke="#ACFCCC" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Certificate Expiry Donut Chart */}
        <Card className="glass-card border-white/10">
          <CardHeader>
            <CardTitle className="text-base font-bold">Status Masa Berlaku Sertifikat</CardTitle>
            <CardDescription className="text-xs">
              Distribusi status sertifikat kapal niaga lintas client.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72 flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={expiryDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expiryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    fontSize: "11px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full space-y-1.5 px-2">
              {expiryDistributionData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value} Doc</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Expiry & Service Request Quick Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Certificate Near Expiry Warning Box */}
        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-amber-500">
                <ShieldAlert className="h-4 w-4" />
                Perhatian Khusus: Sertifikat Mendekati / Expired
              </CardTitle>
              <CardDescription className="text-xs">
                Daftar dokumen kapal yang membutuhkan pengurusan perpanjangan segera.
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs text-[#ACFCCC]">
              <Link href="/compliance">
                Lihat Semua <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {renewalReminders.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">{item.certificateName}</span>
                    <Badge
                      variant="outline"
                      className={
                        item.urgency === "Expired"
                          ? "bg-red-500/20 text-red-400 border-red-500/30 text-[10px]"
                          : "bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]"
                      }
                    >
                      {item.urgency === "Expired" ? "Expired" : `${item.daysRemaining} Hari Lagi`}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Kapal: <strong className="text-foreground">{item.vesselName}</strong> • {item.companyName}
                  </p>
                </div>
                <Button asChild size="sm" variant="outline" className="h-8 text-[11px] glass-pill">
                  <Link href="/compliance">Proses</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Service Requests Status */}
        <Card className="glass-card border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#8FC5FF]" />
                Service Request Dalam Progress
              </CardTitle>
              <CardDescription className="text-xs">
                Status terkini penanganan oleh tim internal &amp; mitra outsource.
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs text-[#ACFCCC]">
              <Link href="/service-requests">
                Pipeline View <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredServiceRequests.slice(0, 3).map((req) => (
              <div
                key={req.id}
                className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold truncate max-w-[220px]">{req.title}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {req.stage}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>Assigned: {req.assigneeName}</span>
                    <span>{req.progressPercentage}% Progress</span>
                  </div>
                  <Progress value={req.progressPercentage} className="h-1.5 bg-white/10" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
