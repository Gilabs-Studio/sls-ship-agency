"use client";

import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import type { AgentRank, AgentStatus } from "../../types/vessel-agent.types";

interface AddAgentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    mainRank: AgentRank;
    status: AgentStatus;
    currentVessel?: string;
    seaTimeMonths: number;
  }) => void;
}

export function AddAgentModal({ open, onOpenChange, onSubmit }: AddAgentModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mainRank, setMainRank] = useState<AgentRank>("AB Seaman");
  const [status, setStatus] = useState<AgentStatus>("Ready");
  const [currentVessel, setCurrentVessel] = useState("");
  const [seaTimeMonths, setSeaTimeMonths] = useState(24);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    onSubmit({
      name,
      email,
      phone: phone || "+62 812-3456-7890",
      mainRank,
      status,
      currentVessel: currentVessel || undefined,
      seaTimeMonths: Number(seaTimeMonths) || 12,
    });

    // Reset
    setName("");
    setEmail("");
    setPhone("");
    setCurrentVessel("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-lg border-border">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <span>Registrasi Agen Pelaut Baru</span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            Masukkan kredensial dan data kualifikasi agen pelaut untuk didaftarkan ke sistem master Nautiva.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs pt-2">
          <FieldGroup className="space-y-3">
            <Field className="space-y-1">
              <FieldLabel htmlFor="agent-name">Nama Lengkap & Gelar</FieldLabel>
              <Input
                id="agent-name"
                placeholder="mis. Capt. Ahmad Fauzi / Aris Setiawan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-9 text-xs glass-input"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field className="space-y-1">
                <FieldLabel htmlFor="agent-email">Alamat Email</FieldLabel>
                <Input
                  id="agent-email"
                  type="email"
                  placeholder="ahmad.fauzi@agency.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-9 text-xs glass-input"
                />
              </Field>
              <Field className="space-y-1">
                <FieldLabel htmlFor="agent-phone">No. Telepon / WhatsApp</FieldLabel>
                <Input
                  id="agent-phone"
                  placeholder="+62 812-xxxx-xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-9 text-xs glass-input"
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field className="space-y-1">
                <FieldLabel htmlFor="agent-rank">Jabatan Utama (Rank)</FieldLabel>
                <select
                  id="agent-rank"
                  value={mainRank}
                  onChange={(e) => setMainRank(e.target.value as AgentRank)}
                  className="w-full h-9 bg-card border border-border rounded-lg px-3 outline-none text-xs cursor-pointer"
                >
                  <option value="Master Captain">Master Captain</option>
                  <option value="Chief Engineer">Chief Engineer</option>
                  <option value="Deck Officer">Deck Officer</option>
                  <option value="AB Seaman">AB Seaman</option>
                  <option value="Cook">Cook</option>
                  <option value="2nd Engineer">2nd Engineer</option>
                </select>
              </Field>

              <Field className="space-y-1">
                <FieldLabel htmlFor="agent-status">Status Kerja Awal</FieldLabel>
                <select
                  id="agent-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as AgentStatus)}
                  className="w-full h-9 bg-card border border-border rounded-lg px-3 outline-none text-xs cursor-pointer"
                >
                  <option value="Ready">Ready / Standby</option>
                  <option value="On Duty">On Duty</option>
                  <option value="Cuti">Cuti</option>
                </select>
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field className="space-y-1">
                <FieldLabel htmlFor="agent-seatime">Masa Berlayar (Bulan)</FieldLabel>
                <Input
                  id="agent-seatime"
                  type="number"
                  value={seaTimeMonths}
                  onChange={(e) => setSeaTimeMonths(Number(e.target.value))}
                  className="h-9 text-xs glass-input"
                />
              </Field>

              <Field className="space-y-1">
                <FieldLabel htmlFor="agent-vessel">Penempatan Kapal (Opsional)</FieldLabel>
                <Input
                  id="agent-vessel"
                  placeholder="mis. MV Nusantara Glory"
                  value={currentVessel}
                  onChange={(e) => setCurrentVessel(e.target.value)}
                  className="h-9 text-xs glass-input"
                />
              </Field>
            </div>
          </FieldGroup>

          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-8 text-xs cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-8 text-xs bg-primary text-primary-foreground font-bold cursor-pointer hover:bg-primary/90"
            >
              Simpan & Daftarkan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
