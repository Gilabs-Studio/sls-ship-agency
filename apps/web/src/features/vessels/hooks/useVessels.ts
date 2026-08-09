import { useState } from "react";
import type { VesselItem } from "../types/vessel.types";
import type { VesselRegistrationValues, CertificateRenewValues } from "../schemas/vessel.schema";
import { initialVessels, generateMandatoryCertificates } from "../services/vessel.service";
import { useVesselStore } from "../stores/useVesselStore";

export function useVessels() {
  const [vessels, setVessels] = useState<VesselItem[]>(initialVessels);

  const {
    selectedVesselId,
    setSelectedVesselId,
    isAddVesselOpen,
    setIsAddVesselOpen,
    isRenewCertOpen,
    setIsRenewCertOpen,
    selectedCertificateId,
    setSelectedCertificateId,
    searchQuery,
    setSearchQuery,
  } = useVesselStore();

  const activeVessel = vessels.find((v) => v.id === selectedVesselId) || vessels[0];

  const handleAddVessel = (data: VesselRegistrationValues) => {
    const mandatoryCerts = generateMandatoryCertificates(data.vesselType);

    const newVessel: VesselItem = {
      ...data,
      id: `vessel-${Date.now()}`,
      seaworthinessStatus: "Layak Operasi",
      certificates: mandatoryCerts,
      renewalHistory: [],
    };

    setVessels((prev) => [newVessel, ...prev]);
    setSelectedVesselId(newVessel.id);
  };

  const handleRenewCertificate = (data: CertificateRenewValues) => {
    if (!selectedVesselId) return;

    setVessels((prev) =>
      prev.map((vessel) => {
        if (vessel.id === selectedVesselId) {
          const targetCert = vessel.certificates.find((c) => c.id === data.certificateId);
          if (!targetCert) return vessel;

          const updatedCerts = vessel.certificates.map((cert) => {
            if (cert.id === data.certificateId) {
              return {
                ...cert,
                issueDate: data.issueDate,
                expiryDate: data.newExpiryDate,
                issuingAuthority: data.issuingAuthority,
                daysRemaining: 365,
                status: "Aktif" as const,
                lastRenewedBy: "Arafat Nayeem (Super Admin)",
              };
            }
            return cert;
          });

          // Re-evaluate seaworthiness: if no expired certs, vessel becomes Layak Operasi
          const hasExpired = updatedCerts.some((c) => c.status === "Sudah Expired");
          const newSeaworthiness = hasExpired ? "Tidak Layak Operasi" : "Layak Operasi";

          const historyItem = {
            id: `rh-${Date.now()}`,
            certificateName: targetCert.certificateName,
            previousExpiry: targetCert.expiryDate,
            newExpiry: data.newExpiryDate,
            renewedBy: "Arafat Nayeem (Super Admin)",
            renewedAt: new Date().toISOString().split("T")[0],
          };

          return {
            ...vessel,
            seaworthinessStatus: newSeaworthiness,
            certificates: updatedCerts,
            renewalHistory: [historyItem, ...vessel.renewalHistory],
          };
        }
        return vessel;
      })
    );
  };

  const filteredVessels = vessels.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.imoNumber.includes(searchQuery) ||
      v.clientCompany.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    vessels: filteredVessels,
    activeVessel,
    selectedVesselId,
    setSelectedVesselId,
    searchQuery,
    setSearchQuery,
    modalState: {
      isAddVesselOpen,
      setIsAddVesselOpen,
      isRenewCertOpen,
      setIsRenewCertOpen,
      selectedCertificateId,
      setSelectedCertificateId,
    },
    actions: {
      addVessel: handleAddVessel,
      renewCertificate: handleRenewCertificate,
    },
  };
}
