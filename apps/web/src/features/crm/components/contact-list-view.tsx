import React from "react";
import { User, Phone, Mail, Building2, CheckCircle2, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ContactItem } from "../types/crm.types";

interface ContactListViewProps {
  contacts: ContactItem[];
  onOpenAddContact: () => void;
}

export function ContactListView({ contacts, onOpenAddContact }: ContactListViewProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">Direktori Kontak PIC Pelayaran</h3>
          <p className="text-xs text-muted-foreground">
            Daftar seluruh penanggung jawab perusahaan pelayaran mitra & prospek
          </p>
        </div>
        <Button size="sm" onClick={onOpenAddContact} className="h-8 text-xs gap-1.5 cursor-pointer">
          <Plus className="h-3.5 w-3.5" />
          <span>Tambah Kontak PIC</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((c) => (
          <Card key={c.id} className="border border-border shadow-xs hover:-translate-y-0.5 transition-all duration-300">
            <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                  {c.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <CardTitle className="text-xs font-bold leading-none">{c.name}</CardTitle>
                  <p className="text-[11px] text-muted-foreground mt-1">{c.position}</p>
                </div>
              </div>
              {c.isClientActive ? (
                <Badge variant="outline" className="text-[10px] text-success border-success/30 bg-success/10 font-semibold">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Klien Aktif
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] text-muted-foreground">
                  Prospek Lead
                </Badge>
              )}
            </CardHeader>
            <CardContent className="space-y-2 text-xs pt-2 border-t border-border mt-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold text-foreground">{c.company}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{c.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{c.phone}</span>
              </div>
              <div className="flex items-center justify-between pt-2 text-[10px] text-muted-foreground border-t border-border">
                <span>{c.interactionCount} Riwayat Interaksi</span>
                <span>Terakhir: {c.lastContacted}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
