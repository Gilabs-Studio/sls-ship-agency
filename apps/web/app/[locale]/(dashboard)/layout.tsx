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
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Dark Icon Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-xl">
        {/* Brand Logo & Header */}
        <div className="flex h-16 items-center px-4 gap-3 border-b border-sidebar-border bg-sidebar-dark">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-md">
            <Ship className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-white">
              SOLID MARITIME
            </span>
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase font-medium">
              Ship Agency System
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 py-1 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <span className={cn("flex items-center justify-center", isActive ? "text-primary-foreground" : "text-primary")}>
                  {getMenuIcon(item.icon)}
                </span>
                <span className="flex-1 truncate">{item.name}</span>
                {item.badge && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Current Active Role Badge */}
        <div className="p-3 border-t border-sidebar-border bg-sidebar-dark/50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between text-xs bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate">{currentRole}</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel className="text-xs">Switch Preview Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
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
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 backdrop-blur px-6 shadow-xs">
          {/* Global Search Bar */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari kapal, dokumen, IMO, lead... (⌘K)"
              className="pl-9 pr-4 h-9 text-xs bg-background border-border"
            />
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-3">
            {/* Quick Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLocale}
              className="h-9 px-2.5 text-xs font-semibold gap-1.5 cursor-pointer hover:bg-accent"
            >
              <Globe className="h-4 w-4 text-primary" />
              <span className="uppercase">{locale}</span>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notification Bell Dropdown */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 rounded-lg cursor-pointer hover:bg-accent"
                >
                  <Bell className="h-4 w-4 text-foreground" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive animate-pulse" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0">
                <div className="p-3 border-b border-border flex items-center justify-between">
                  <h4 className="font-semibold text-xs">Notifikasi Operasional</h4>
                  <Badge variant="outline" className="text-[10px] text-primary border-primary">
                    3 Baru
                  </Badge>
                </div>
                <div className="divide-y divide-border max-h-72 overflow-y-auto">
                  <div className="p-3 hover:bg-accent/50 transition-colors text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-destructive font-medium">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Sertifikat SOLAS Expired</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      KM Solid Horizon (IMO 982124) membutuhkan perpanjangan mendesak.
                    </p>
                    <span className="text-[10px] text-muted-foreground">10 menit yang lalu</span>
                  </div>
                  <div className="p-3 hover:bg-accent/50 transition-colors text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-warning font-medium">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Dokumen Menunggu Approval</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      Sertifikat Pengawakan KM Ocean Star diunggah oleh Staff.
                    </p>
                    <span className="text-[10px] text-muted-foreground">1 jam yang lalu</span>
                  </div>
                  <div className="p-3 hover:bg-accent/50 transition-colors text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-success font-medium">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Lead Menang (Closing)</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      PT Samarinda Trans Energi menyetujui kontrak keagenan.
                    </p>
                    <span className="text-[10px] text-muted-foreground">3 jam yang lalu</span>
                  </div>
                </div>
                <div className="p-2 border-t border-border text-center">
                  <Link
                    href="/notifications"
                    className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Lihat Semua Notifikasi
                  </Link>
                </div>
              </PopoverContent>
            </Popover>

            <div className="h-4 w-px bg-border my-auto" />

            {/* User Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2.5 p-1 h-auto cursor-pointer hover:bg-accent rounded-lg">
                  <Avatar className="h-8 w-8 border border-primary/20">
                    <AvatarImage src="/avatar-placeholder.png" alt="User" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      KN
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left hidden sm:flex">
                    <span className="text-xs font-semibold leading-none">Arafat Nayeem</span>
                    <span className="text-[10px] text-muted-foreground leading-none mt-1">
                      {currentRole}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">Arafat Nayeem</p>
                    <p className="text-xs text-muted-foreground leading-none">
                      arafat@solidmaritime.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/settings")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Pengaturan Profil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer" onClick={() => router.push("/login")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Keluar Sistem</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Main Canvas */}
        <main className="flex-1 p-6 bg-background">
          <PageMotion>{children}</PageMotion>
        </main>
      </div>
    </div>
  );
}
