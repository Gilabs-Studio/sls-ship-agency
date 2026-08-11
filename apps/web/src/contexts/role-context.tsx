"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type RoleType =
  | "Super Admin"
  | "Sales / Business Dev"
  | "Account Manager"
  | "Staff Operasional"
  | "Outsourcing Coordinator"
  | "Klien (Shipping Co)"
  | "Management";

interface RoleContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
  isClientUser: boolean;
  clientCompanyName: string;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<RoleType>("Super Admin");

  // Defaults to "PT Samudera Indonesia Tbk" when Client User role is selected
  const clientCompanyName = "PT Samudera Indonesia Tbk";
  const isClientUser = role === "Klien (Shipping Co)";

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        isClientUser,
        clientCompanyName,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
