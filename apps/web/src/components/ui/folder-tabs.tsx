"use client";

import React from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface FolderTab<TKey extends string = string> {
  /** Unique key identifying this tab */
  key: TKey;
  /** Visible label */
  label: string;
  /** Optional icon rendered before the label */
  icon?: React.ReactNode;
  /** Optional count badge rendered after the label */
  count?: number;
}

export interface FolderTabsProps<TKey extends string = string> {
  /** Tab definitions */
  tabs: FolderTab<TKey>[];
  /** Currently active tab key */
  activeTab: TKey;
  /** Called when a tab is clicked */
  onTabChange: (tab: TKey) => void;
  /** Optional extra content rendered inline after the tabs (e.g. stats) */
  inlineContent?: React.ReactNode;
  /** Optional toolbar actions rendered on the right (e.g. search, filter) */
  actions?: React.ReactNode;
  /** Content rendered inside the folder body */
  children: React.ReactNode;
  /** Additional className for the outermost wrapper */
  className?: string;
  /** Additional className for the folder body container */
  bodyClassName?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function FolderTabs<TKey extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  inlineContent,
  actions,
  children,
  className,
  bodyClassName,
}: FolderTabsProps<TKey>) {
  return (
    <div className={cn("space-y-0", className)}>
      {/* ── Tabs bar + actions ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-0">
        {/* Left: Filing folder tabs + optional inline content */}
        <div className="flex items-end gap-3 -mb-px z-10 overflow-x-auto scrollbar-none">
          {/* Tabs */}
          <div className="flex items-end gap-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => onTabChange(tab.key)}
                  className={cn(
                    "relative px-4 py-2 text-xs font-semibold rounded-t-xl transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap",
                    isActive
                      ? "bg-card text-foreground border-t border-x border-border/80 shadow-2xs z-20 pb-3 -mb-px"
                      : "bg-muted/70 text-muted-foreground border-t border-x border-border/40 hover:bg-muted hover:text-foreground z-10"
                  )}
                >
                  {/* Icon */}
                  {tab.icon && (
                    <span
                      className={
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground/70"
                      }
                    >
                      {tab.icon}
                    </span>
                  )}

                  {/* Label */}
                  <span>{tab.label}</span>

                  {/* Count badge */}
                  {tab.count !== undefined && (
                    <span
                      className={cn(
                        "text-[10px] px-1.5 py-px rounded-full font-bold transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-muted-foreground/10 text-muted-foreground"
                      )}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Optional inline content (e.g. projected stats) */}
          {inlineContent && (
            <>
              <div className="h-5 w-px bg-border/60 mb-1.5 hidden sm:block" />
              <div className="mb-1.5">{inlineContent}</div>
            </>
          )}
        </div>

        {/* Right: Action controls (search, filter, sort, etc.) */}
        {actions && (
          <div className="flex items-center gap-2 pb-2">{actions}</div>
        )}
      </div>

      {/* ── Folder body ────────────────────────────────────────── */}
      <div
        className={cn(
          "bg-card border border-border/80 rounded-b-2xl rounded-tr-2xl shadow-2xs overflow-hidden relative z-0",
          bodyClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
