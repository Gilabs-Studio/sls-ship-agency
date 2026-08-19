"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Clock, FileText, CheckCircle2, Users, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { RecentActivityItem, ActivityType } from "../types/clients.types";

interface RecentActivitiesCardProps {
  activities: RecentActivityItem[];
  onViewAll?: () => void;
}

export function RecentActivitiesCard({ activities, onViewAll }: RecentActivitiesCardProps) {
  const t = useTranslations("clients");

  const renderActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "contract_renewed":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "proposal_sent":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "placement_completed":
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case "meeting":
        return <Users className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card className="glass-card border border-border h-full flex flex-col justify-between">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-bold text-foreground font-heading">
          {t("recentActivities.title")}
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAll}
          className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
        >
          {t("actions.viewAll")}
        </Button>
      </CardHeader>

      <CardContent className="pt-2 pb-4 flex-1 flex flex-col justify-between space-y-3">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 rounded-lg border border-border/40 hover:bg-muted/30 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/20 shrink-0">
                {renderActivityIcon(item.type)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate font-heading">
                  {item.title}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {item.targetInfo}
                </p>
                <p className="text-[10px] text-muted-foreground/80 mt-0.5">
                  {item.timeAgo}
                </p>
              </div>
            </div>

            <div className="pl-2 shrink-0">
              <Avatar className="h-7 w-7 border border-border">
                {item.userAvatar && <AvatarImage src={item.userAvatar} alt="User Avatar" />}
                <AvatarFallback className="bg-muted text-muted-foreground text-[10px]">
                  <User className="h-3.5 w-3.5" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
