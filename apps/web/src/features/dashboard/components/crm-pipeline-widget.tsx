import React from "react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, Handshake } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CrmPipelineSummary } from "../types/dashboard.types";

interface CrmPipelineWidgetProps {
  crmSummary: CrmPipelineSummary;
}

export function CrmPipelineWidget({ crmSummary }: CrmPipelineWidgetProps) {
  const stages = [
    { label: "Lead Baru", value: crmSummary.newLeads, color: "bg-blue-500" },
    { label: "Dihubungi", value: crmSummary.contacted, color: "bg-indigo-500" },
    { label: "Presentasi", value: crmSummary.presentation, color: "bg-purple-500" },
    { label: "Negosiasi", value: crmSummary.negotiation, color: "bg-amber-500" },
    { label: "Closing (Won)", value: crmSummary.won, color: "bg-emerald-500" },
  ];

  return (
    <Card className="border border-border shadow-xs">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Handshake className="h-4 w-4 text-primary" />
            <span>Pipeline Prospek CRM</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Ringkasan status calon mitra perusahaan pelayaran
          </CardDescription>
        </div>
        <Link href="/crm">
          <Button variant="ghost" size="sm" className="h-7 text-xs text-primary gap-1 cursor-pointer">
            Detail <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {stages.map((st) => (
          <div key={st.label} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{st.label}</span>
              <span className="font-extrabold text-foreground">{st.value} Lead</span>
            </div>
            <div className="w-full bg-muted h-2 rounded-lg overflow-hidden">
              <div
                className={`h-full ${st.color} transition-all duration-300`}
                style={{ width: `${Math.min(st.value * 20, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
