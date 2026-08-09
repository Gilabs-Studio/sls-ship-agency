import React from "react";
import { MessageSquare, Phone, Mail, Calendar, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { InteractionLog } from "../types/crm.types";

interface ActivityTimelineProps {
  interactions: InteractionLog[];
}

export function ActivityTimeline({ interactions }: ActivityTimelineProps) {
  const getIcon = (type: InteractionLog["type"]) => {
    switch (type) {
      case "Call":
        return <Phone className="h-3.5 w-3.5 text-blue-500" />;
      case "Email":
        return <Mail className="h-3.5 w-3.5 text-amber-500" />;
      case "Meeting":
        return <Calendar className="h-3.5 w-3.5 text-emerald-500" />;
      case "Proposal":
        return <FileText className="h-3.5 w-3.5 text-purple-500" />;
    }
  };

  return (
    <Card className="border border-border shadow-xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          <span>Riwayat Interaksi & Audit CRM</span>
        </CardTitle>
        <CardDescription className="text-xs">
          Catatan komunikasi follow-up Sales dengan calon mitra pelayaran
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-4 border-l border-border space-y-4">
          {interactions.map((item) => (
            <div key={item.id} className="relative group">
              <div className="absolute -left-[23px] top-0.5 h-4 w-4 rounded-full bg-background border border-border flex items-center justify-center">
                {getIcon(item.type)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">{item.summary}</span>
                  <span className="text-[10px] text-muted-foreground">{item.timestamp}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                  <span>Petugas: <strong className="text-foreground font-semibold">{item.actor}</strong></span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    Tipe: {item.type}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
