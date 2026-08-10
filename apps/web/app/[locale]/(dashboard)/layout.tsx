"use client";

import React, { useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import {
  Bell,
  Search,
  User,
  LogOut,
  Globe,
  Ship,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronDown,
  Shield,
} from "lucide-react";

import { navigationConfig } from "@/lib/navigation-config";
import { getMenuIcon } from "@/lib/menu-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeToggleButton as ThemeToggle } from "@/components/ui/theme-toggle";
import { PageMotion } from "@/components/motion/page-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState<string>("Super Admin");

  const toggleLocale = () => {
    const nextLocale = locale === "id" ? "en" : "id";
    router.replace(pathname, { locale: nextLocale });
  };

  const handleRoleChange = (role: string) => {
    setCurrentRole(role);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex overflow-x-hidden">
      {/* Background Ambient Atmospheric Light Spots (AtlanticX Glass Environment) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#ACFCCC]/15 blur-[120px] dark:bg-[#ACFCCC]/10" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-[#8FC5FF]/15 blur-[140px] dark:bg-[#8FC5FF]/10" />
        <div className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-[#ACFCCC]/10 blur-[130px]" />
      </div>

      {/* Glassmorphic Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col backdrop-blur-2xl bg-card/40 text-sidebar-foreground border-r border-white/10 dark:border-white/5 shadow-2xl">
        {/* Brand Logo & Header */}
        <div className="flex h-16 items-center px-4 gap-3 border-b border-white/10 dark:border-white/5">
          <div className="h-9 w-9 rounded-lg bg-[#ACFCCC] text-black font-bold flex items-center justify-center shadow-lg shadow-[#ACFCCC]/20">
            <Ship className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-foreground flex items-center gap-1.5">
              SOLID MARITIME
              <Sparkles className="h-3 w-3 text-[#ACFCCC] animate-pulse" />
            </span>
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase font-medium">
              Ship Agency System
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          <div className="px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            Menu Utama
          </div>
          {navigationConfig.map((item) => {
            const isActive =
              pathname === item.url || pathname.startsWith(`${item.url}/`);
            return (
              <Link
                key={item.id || item.url}
                href={item.url}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer relative overflow-hidden",
                  isActive
                    ? "bg-[#ACFCCC] text-black shadow-lg shadow-[#ACFCCC]/25 font-bold"
                    : "text-foreground/75 hover:bg-white/10 dark:hover:bg-white/5 hover:text-foreground"
                )}
              >
                <span className={cn("flex items-center justify-center transition-transform duration-300", isActive ? "text-black scale-110" : "text-[#8FC5FF]")}>
                  {getMenuIcon(item.icon)}
                </span>
                <span className="flex-1 truncate tracking-wide">{item.name}</span>
                {item.badge && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[9px] px-1.5 py-0.5 border-transparent font-bold",
                      isActive
                        ? "bg-black/20 text-black"
                        : "bg-[#8FC5FF]/20 text-[#8FC5FF]"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Current Active Role Badge */}
        <div className="p-3 border-t border-white/10 dark:border-white/5 bg-black/5 dark:bg-white/5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between text-xs bg-white/5 border-white/10 text-foreground hover:bg-white/10 cursor-pointer rounded-lg"
              >
                <div className="flex items-center gap-2 truncate">
                  <Shield className="h-3.5 w-3.5 text-[#ACFCCC]" />
                  <span className="truncate font-medium">{currentRole}</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 backdrop-blur-xl bg-card/80 border border-white/10">
              <DropdownMenuLabel className="text-xs">Switch Preview Role</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleRoleChange("Super Admin")}>
                Super Admin
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleRoleChange("Staff Operasional")}>
                Staff Operasional
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleRoleChange("Sales / Business Dev")}>
                Sales / Business Dev
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleRoleChange("Klien (Shipping Co)")}>
                Klien (Read-Only Portal)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen z-10 relative">
        {/* Top Floating Glass Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 dark:border-white/5 backdrop-blur-xl bg-background/30 px-6">
          {/* Global Search Bar */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari kapal, dokumen, IMO, lead... (⌘K)"
              className="pl-9 pr-4 h-9 text-xs glass-input rounded-full"
            />
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-3">
            {/* Quick Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLocale}
              className="h-9 px-3 text-xs font-semibold gap-1.5 cursor-pointer glass-pill rounded-full hover:bg-white/15"
            >
              <Globe className="h-3.5 w-3.5 text-[#ACFCCC]" />
              <span className="uppercase text-xs tracking-wider">{locale}</span>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notification Bell Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 rounded-full cursor-pointer glass-pill hover:bg-white/15"
                >
                  <Bell className="h-4 w-4 text-foreground" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#ACFCCC] animate-pulse" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0 backdrop-blur-2xl bg-card/90 border border-white/10 shadow-2xl">
                <div className="p-3 border-b border-white/10 flex items-center justify-between">
                  <h4 className="font-bold text-xs">Notifikasi Operasional</h4>
                  <Badge variant="outline" className="text-[10px] text-[#ACFCCC] border-[#ACFCCC]/30 bg-[#ACFCCC]/10">
                    3 Baru
                  </Badge>
                </div>
                <div className="divide-y divide-white/10 max-h-72 overflow-y-auto">
                  <div className="p-3 hover:bg-white/5 transition-colors text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-destructive font-semibold">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Sertifikat SOLAS Expired</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      KM Solid Horizon (IMO 982124) membutuhkan perpanjangan mendesak.
                    </p>
                    <span className="text-[10px] text-muted-foreground">10 menit yang lalu</span>
                  </div>
                  <div className="p-3 hover:bg-white/5 transition-colors text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-[#8FC5FF] font-semibold">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Dokumen Menunggu Approval</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      Sertifikat Pengawakan KM Ocean Star diunggah oleh Staff.
                    </p>
                    <span className="text-[10px] text-muted-foreground">1 jam yang lalu</span>
                  </div>
                  <div className="p-3 hover:bg-white/5 transition-colors text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-[#ACFCCC] font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Lead Menang (Closing)</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      PT Samarinda Trans Energi menyetujui kontrak keagenan.
                    </p>
                    <span className="text-[10px] text-muted-foreground">3 jam yang lalu</span>
                  </div>
                </div>
                <div className="p-2 border-t border-white/10 text-center">
                  <Link
                    href="/notifications"
                    className="text-[11px] font-semibold text-[#ACFCCC] hover:underline cursor-pointer"
                  >
                    Lihat Semua Notifikasi
                  </Link>
                </div>
              </PopoverContent>
            </Popover>

            <div className="h-4 w-px bg-white/10 my-auto" />

            {/* User Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2.5 p-1 h-auto cursor-pointer glass-pill rounded-full hover:bg-white/15 px-2">
                  <Avatar className="h-7 w-7 border border-[#ACFCCC]/40">
                    <AvatarImage src="/avatar-placeholder.png" alt="User" />
                    <AvatarFallback className="bg-[#ACFCCC]/20 text-[#ACFCCC] text-xs font-bold">
                      KN
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left hidden sm:flex pr-1">
                    <span className="text-xs font-bold leading-none">Arafat Nayeem</span>
                    <span className="text-[10px] text-[#8FC5FF] leading-none mt-1">
                      {currentRole}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 backdrop-blur-2xl bg-card/90 border border-white/10">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">Arafat Nayeem</p>
                    <p className="text-xs text-muted-foreground leading-none">
                      arafat@solidmaritime.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/settings")}>
                  <User className="mr-2 h-4 w-4 text-[#8FC5FF]" />
                  <span>Pengaturan Profil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-destructive cursor-pointer" onClick={() => router.push("/login")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Keluar Sistem</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Main Canvas */}
        <main className="flex-1 p-6">
          <PageMotion>{children}</PageMotion>
        </main>
      </div>
    </div>
  );
}
