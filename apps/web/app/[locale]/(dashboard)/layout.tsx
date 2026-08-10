"use client";

import React from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
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
  Eye,
  Building2,
  Menu,
} from "lucide-react";

import { useRole, type RoleType } from "@/contexts/role-context";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  const { role, setRole, isClientUser, clientCompanyName } = useRole();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleLocale = () => {
    const nextLocale = locale === "id" ? "en" : "id";
    router.replace(pathname, { locale: nextLocale });
  };

  const handleRoleChange = (newRole: RoleType) => {
    setRole(newRole);
    setMobileMenuOpen(false);
  };

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand Logo & Header */}
      <div className="flex h-16 items-center px-4 gap-3 border-b border-white/10 dark:border-white/5 shrink-0">
        <div className="h-9 w-9 rounded-xl bg-[#ACFCCC] text-black font-bold flex items-center justify-center shadow-lg shadow-[#ACFCCC]/20">
          <Ship className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm tracking-tight text-foreground flex items-center gap-1.5">
            SOLID MARITIME
            <Sparkles className="h-3 w-3 text-[#ACFCCC] animate-pulse" />
          </span>
          <span className="text-[10px] text-muted-foreground tracking-wider uppercase font-semibold">
            Ship Agency System
          </span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Menu Navigation
        </div>
        {navigationConfig.map((item) => {
          const isActive =
            pathname === item.url || pathname.startsWith(`${item.url}/`);
          return (
            <Link
              key={item.id || item.url}
              href={item.url}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer relative overflow-hidden min-h-[44px]",
                isActive
                  ? "bg-[#ACFCCC] text-black shadow-lg shadow-[#ACFCCC]/25 font-bold"
                  : "text-foreground/80 hover:bg-white/10 dark:hover:bg-white/5 hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center transition-transform duration-200 shrink-0",
                  isActive ? "text-black scale-110" : "text-[#8FC5FF]"
                )}
              >
                {getMenuIcon(item.icon)}
              </span>
              <span className="flex-1 truncate tracking-wide">{item.name}</span>
              {item.badge && (
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[9px] px-1.5 py-0.5 border-transparent font-bold shrink-0",
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

      {/* Role Switcher */}
      <div className="p-3 border-t border-white/10 dark:border-white/5 bg-black/5 dark:bg-white/5 space-y-1.5 shrink-0">
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-1 flex items-center justify-between">
          <span>Simulasi Role Demo</span>
          <Eye className="h-3 w-3 text-[#ACFCCC]" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-xs bg-white/5 border-white/10 text-foreground hover:bg-white/10 cursor-pointer rounded-xl h-10 px-3"
            >
              <div className="flex items-center gap-2 truncate">
                <Shield className="h-4 w-4 text-[#ACFCCC] shrink-0" />
                <span className="truncate font-semibold">{role}</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 opacity-60 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 backdrop-blur-xl bg-card/95 dark:bg-[#0f172a] border border-white/15">
            <DropdownMenuLabel className="text-[11px] text-muted-foreground">Pilih Role Demo Client</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => handleRoleChange("Super Admin")}>
              Super Admin
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => handleRoleChange("Sales / Business Dev")}>
              Sales / Business Dev
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => handleRoleChange("Account Manager")}>
              Account Manager
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => handleRoleChange("Staff Operasional")}>
              Staff Operasional (Ops)
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => handleRoleChange("Outsourcing Coordinator")}>
              Outsourcing Coordinator
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-xs font-semibold text-[#8FC5FF]" onClick={() => handleRoleChange("Klien (Shipping Co)")}>
              Klien User (Client Portal)
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-xs" onClick={() => handleRoleChange("Management")}>
              Management (Executive)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground flex overflow-x-hidden">
      {/* Ambient Background Light Spot */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#ACFCCC]/15 blur-[120px] dark:bg-[#ACFCCC]/10" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-[#8FC5FF]/15 blur-[140px] dark:bg-[#8FC5FF]/10" />
        <div className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-[#ACFCCC]/10 blur-[130px]" />
      </div>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col backdrop-blur-2xl bg-card/40 text-sidebar-foreground border-r border-white/10 dark:border-white/5 shadow-2xl">
        {SidebarContent}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-0 lg:pl-64 flex flex-col min-h-screen z-10 relative w-full">
        {/* Top Role Notification Banner if Client User */}
        {isClientUser && (
          <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-600 dark:text-amber-300 px-4 sm:px-6 py-2 text-xs flex items-center justify-between font-medium backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 shrink-0 text-amber-500 animate-pulse" />
              <span className="text-[11px] sm:text-xs">
                <strong>Mode Portal Klien (Read-Only Demo):</strong> Tampilan data terbatas armada &amp; request milik <strong>{clientCompanyName}</strong>.
              </span>
            </div>
            <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-300 text-[10px] shrink-0 hidden sm:inline-flex">
              Demo Read-Only
            </Badge>
          </div>
        )}

        {/* Top Floating Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 dark:border-white/5 backdrop-blur-xl bg-background/60 px-4 sm:px-6 gap-3">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Drawer Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-10 w-10 min-h-[44px] min-w-[44px] rounded-xl border border-white/10 text-foreground"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 bg-card dark:bg-[#090d16] border-r border-white/10">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                {SidebarContent}
              </SheetContent>
            </Sheet>

            {/* Search Bar */}
            <div className="relative w-48 sm:w-72 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari kapal, IMO, dokumen..."
                className="pl-9 pr-3 h-9 text-xs glass-input rounded-full"
              />
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLocale}
              className="h-9 px-2.5 sm:px-3 text-xs font-semibold gap-1 cursor-pointer glass-pill rounded-full hover:bg-white/15"
            >
              <Globe className="h-3.5 w-3.5 text-[#ACFCCC]" />
              <span className="uppercase text-xs tracking-wider">{locale}</span>
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notification Bell */}
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
              <PopoverContent align="end" className="w-80 p-0 backdrop-blur-2xl bg-card/95 dark:bg-[#0f172a] border border-white/15 shadow-2xl">
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
                      <span>Sertifikat MARPOL Expired</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      KM Samudera Sejahtera (IMO 9821245) butuh perpanjangan cepat.
                    </p>
                    <span className="text-[10px] text-muted-foreground">10 menit yang lalu</span>
                  </div>
                  <div className="p-3 hover:bg-white/5 transition-colors text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-[#8FC5FF] font-semibold">
                      <FileText className="h-3.5 w-3.5" />
                      <span>Laporan Subsea Submitted</span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      PT Divers Technical mengunggah laporan survey UWILD.
                    </p>
                    <span className="text-[10px] text-muted-foreground">1 jam yang lalu</span>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <div className="h-4 w-px bg-white/10 my-auto hidden sm:block" />

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 p-1 h-auto cursor-pointer glass-pill rounded-full hover:bg-white/15 px-2">
                  <Avatar className="h-7 w-7 border border-[#ACFCCC]/40">
                    <AvatarFallback className="bg-[#ACFCCC]/20 text-[#ACFCCC] text-xs font-bold">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left hidden md:flex pr-1">
                    <span className="text-xs font-bold leading-none">
                      {isClientUser ? "Bambang P." : "Arafat Nayeem"}
                    </span>
                    <span className="text-[10px] text-[#8FC5FF] leading-none mt-1">
                      {role}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card dark:bg-[#0f172a] border border-white/15">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">
                      {isClientUser ? "Bambang Prasetyo" : "Arafat Nayeem"}
                    </p>
                    <p className="text-xs text-muted-foreground leading-none">
                      {isClientUser ? "bambang.p@samudera.id" : "arafat@solidmaritime.com"}
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

        {/* Page Main Canvas with container max-width limit */}
        <main className="flex-1 p-4 sm:p-6 w-full max-w-[1440px] mx-auto">
          <PageMotion>{children}</PageMotion>
        </main>
      </div>
    </div>
  );
}
