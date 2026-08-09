import React from "react";
import { Sliders, Clock, Mail, MessageSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import type { ReminderThresholdRule } from "../types/notification.types";

interface ReminderRuleConfigProps {
  rules: ReminderThresholdRule[];
  onToggleRule: (ruleId: string, key: keyof ReminderThresholdRule) => void;
}

export function ReminderRuleConfig({ rules, onToggleRule }: ReminderRuleConfigProps) {
  return (
    <Card className="border border-border shadow-xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <Sliders className="h-4 w-4 text-primary" />
          <span>Konfigurasi Ambang Batas Reminder</span>
        </CardTitle>
        <CardDescription className="text-xs">
          Atur jadwal pengingat otomatis (H-30, H-15, H-7, H-1) dan saluran pengiriman
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="p-3 border border-border rounded-lg bg-card space-y-3 text-xs">
            <h5 className="font-bold text-foreground">{rule.categoryName}</h5>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 border-t border-border">
              <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                <span>Ambang H-30</span>
                <Switch
                  checked={rule.threshold30Days}
                  onCheckedChange={() => onToggleRule(rule.id, "threshold30Days")}
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                <span>Ambang H-15</span>
                <Switch
                  checked={rule.threshold15Days}
                  onCheckedChange={() => onToggleRule(rule.id, "threshold15Days")}
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                <span>Ambang H-7</span>
                <Switch
                  checked={rule.threshold7Days}
                  onCheckedChange={() => onToggleRule(rule.id, "threshold7Days")}
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/30">
                <span>Ambang H-1</span>
                <Switch
                  checked={rule.threshold1Day}
                  onCheckedChange={() => onToggleRule(rule.id, "threshold1Day")}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground pt-1">
              <span>Saluran:</span>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <Switch
                  checked={rule.sendEmail}
                  onCheckedChange={() => onToggleRule(rule.id, "sendEmail")}
                />
                <span>Email Otomatis</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <Switch
                  checked={rule.sendWhatsApp}
                  onCheckedChange={() => onToggleRule(rule.id, "sendWhatsApp")}
                />
                <span>WhatsApp Gateway</span>
              </label>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
