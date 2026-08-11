"use client";

import { Linkedin, Instagram, Globe, MapPin, Phone, Mail } from "lucide-react";
import type { LandingTranslations } from "../types/landing.types";

interface FooterSectionProps {
  t: LandingTranslations;
}

export function FooterSection({ t }: FooterSectionProps) {
  const f = t.footerSection;

  return (
    <footer className="bg-[#030712] text-slate-400 pt-16 pb-8 px-6 sm:px-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Company Profile & Socials */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-wider uppercase">
              {f.companyName}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {f.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 flex items-center justify-center cursor-pointer transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 flex items-center justify-center cursor-pointer transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://solidlautansinergi.co.id"
                target="_blank"
                rel="noreferrer"
                aria-label="Website"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 flex items-center justify-center cursor-pointer transition-all duration-200"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Menu */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              {f.menuTitle}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#hero" className="hover:text-emerald-400 transition-colors cursor-pointer block">
                  {f.menuHome}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors cursor-pointer block">
                  {f.menuServices}
                </a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-emerald-400 transition-colors cursor-pointer block">
                  {f.menuCertificates}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors cursor-pointer block">
                  {f.menuAbout}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              {f.servicesTitle}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors cursor-pointer block">
                  {f.serviceCrew}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors cursor-pointer block">
                  {f.serviceTech}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors cursor-pointer block">
                  {f.serviceLogistics}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors cursor-pointer block">
                  {f.serviceCompliance}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">
              {f.contactTitle}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight">{f.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{f.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{f.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-slate-900 pt-6 text-center text-slate-500 text-xs">
          <p>{f.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
