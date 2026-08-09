import React from "react";
import { FileText, Ship, Handshake, Bell, Settings } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ActivityTimelineItem } from "../types/dashboard.types";

interface RecentActivityTimelineProps {
  activities: ActivityTimelineItem[];
}

export function RecentActivityTimeline({ activities }: RecentActivityTimelineProps) {
  const getIcon = (module: string) => {
    switch (module) {
      case "vessels":
        return <Ship className="h-4 w-4 text-blue-500" />;
      case "documents":
        return <FileText className="h-4 w-4 text-amber-500" />;
      case "crm":
        return <Handshake className="h-4 w-4 text-emerald-500" />;
      case "notifications":
        return <Bell className="h-4 w-4 text-rose-500" />;
      default:
        return <Settings className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <Card className="border border-border shadow-xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold">Timeline Aktivitas Terbaru</CardTitle>
        <CardDescription className="text-xs">
          Jejak audit dan pergerakan status lintas modul operasional
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-4 border-l border-border space-y-4">
          {activities.map((act) => (
            <div key={act.id} className="relative group">
              {/* Timeline Bullet */}
              <div className="absolute -left-[23px] top-0.5 h-4 w-4 rounded-full bg-background border border-border flex items-center justify-center">
                {getIcon(act.module)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-semibold text-foreground leading-none">
                    {act.title}
                  </h5>
                  <span className="text-[10px] text-muted-foreground">{act.timestamp}</span>
                </div>
                <p className="text-xs text-muted-foreground">{act.description}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-muted-foreground font-medium">
                    Oleh: {act.actor}
                  </span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 capitalize">
                    {act.module}
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
