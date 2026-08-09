import type { VesselItem, MandatoryCertificate, VesselType } from "../types/vessel.types";

export function generateMandatoryCertificates(vesselType: VesselType): MandatoryCertificate[] {
  const baseCerts = [
    {
      id: `cert-${Date.now()}-1`,
      certificateName: "SOLAS Safety Construction Certificate",
      issuingAuthority: "Biro Klasifikasi Indonesia (BKI)",
      issueDate: "2025-08-10",
      expiryDate: "2026-08-10",
      daysRemaining: 1,
      status: "Mendekati Expired" as const,
    },
    {
      id: `cert-${Date.now()}-2`,
      certificateName: "ISM Code Document of Compliance (DOC)",
      issuingAuthority: "Kementerian Perhubungan RI",
      issueDate: "2024-05-15",
      expiryDate: "2026-11-15",
      daysRemaining: 98,
      status: "Aktif" as const,
    },
    {
      id: `cert-${Date.now()}-3`,
      certificateName: "ISPS Code International Ship Security",
      issuingAuthority: "Syahbandar Utama Port Authority",
      issueDate: "2025-01-20",
      expiryDate: "2027-01-20",
      daysRemaining: 164,
      status: "Aktif" as const,
    },
  ];

  if (vesselType === "Tanker") {
    baseCerts.push({
      id: `cert-${Date.now()}-4`,
      certificateName: "IOPP International Oil Pollution Prevention",
      issuingAuthority: "Biro Klasifikasi Indonesia (BKI)",
      issueDate: "2025-09-01",
      expiryDate: "2026-09-01",
      daysRemaining: 23,
      status: "Mendekati Expired" as const,
    });
  }

  if (vesselType === "Cargo" || vesselType === "Bulk Carrier") {
    baseCerts.push({
      id: `cert-${Date.now()}-5`,
      certificateName: "International Load Line Certificate",
      issuingAuthority: "Biro Klasifikasi Indonesia (BKI)",
      issueDate: "2025-04-10",
      expiryDate: "2026-10-10",
      daysRemaining: 62,
      status: "Aktif" as const,
    });
  }

  return baseCerts;
}

export const initialVessels: VesselItem[] = [
  {
    id: "vessel-1",
    name: "KM Solid Horizon",
    imoNumber: "9821245",
    flag: "Indonesia 🇮🇩",
    vesselType: "Cargo",
    clientCompany: "PT Nusantara Cargo Line",
    builtYear: 2018,
    grossTonnage: 12500,
    seaworthinessStatus: "Tidak Layak Operasi", // Has expired certificate
    certificates: [
      {
        id: "c-101",
        certificateName: "SOLAS Safety Construction",
        issuingAuthority: "Biro Klasifikasi Indonesia",
        issueDate: "2023-08-01",
        expiryDate: "2026-08-01",
        daysRemaining: -8, // Expired
        status: "Sudah Expired",
      },
      {
        id: "c-102",
        certificateName: "ISM Code Management Certificate",
        issuingAuthority: "Kemenhub RI",
        issueDate: "2024-09-10",
        expiryDate: "2026-09-10",
        daysRemaining: 32,
        status: "Mendekati Expired",
      },
      {
        id: "c-103",
        certificateName: "International Load Line Certificate",
        issuingAuthority: "Biro Klasifikasi Indonesia",
        issueDate: "2025-02-14",
        expiryDate: "2027-02-14",
        daysRemaining: 189,
        status: "Aktif",
      },
    ],
    renewalHistory: [
      {
        id: "rh-1",
        certificateName: "ISPS Security Certificate",
        previousExpiry: "2026-01-10",
        newExpiry: "2027-01-10",
        renewedBy: "Budi Santoso (Staff)",
        renewedAt: "2026-01-05",
      },
    ],
  },
  {
    id: "vessel-2",
    name: "KM Samarinda Titan",
    imoNumber: "9482103",
    flag: "Indonesia 🇮🇩",
    vesselType: "Tanker",
    clientCompany: "PT Samarinda Trans Energi",
    builtYear: 2021,
    grossTonnage: 28000,
    seaworthinessStatus: "Layak Operasi",
    certificates: [
      {
        id: "c-201",
        certificateName: "IOPP Oil Pollution Certificate",
        issuingAuthority: "Biro Klasifikasi Indonesia",
        issueDate: "2025-08-15",
        expiryDate: "2026-08-25",
        daysRemaining: 16,
        status: "Mendekati Expired",
      },
      {
        id: "c-202",
        certificateName: "SOLAS Safety Construction",
        issuingAuthority: "Biro Klasifikasi Indonesia",
        issueDate: "2025-05-10",
        expiryDate: "2027-05-10",
        daysRemaining: 274,
        status: "Aktif",
      },
    ],
    renewalHistory: [],
  },
  {
    id: "vessel-3",
    name: "TB Lautan Perkasa 08",
    imoNumber: "9112344",
    flag: "Indonesia 🇮🇩",
    vesselType: "Tugboat",
    clientCompany: "CV Lautan Makmur Transport",
    builtYear: 2016,
    grossTonnage: 850,
    seaworthinessStatus: "Layak Operasi",
    certificates: [
      {
        id: "c-301",
        certificateName: "Sertifikat Keselamatan Kapal Barang",
        issuingAuthority: "Syahbandar Pelabuhan",
        issueDate: "2025-11-01",
        expiryDate: "2026-11-01",
        daysRemaining: 84,
        status: "Aktif",
      },
    ],
    renewalHistory: [],
  },
];
