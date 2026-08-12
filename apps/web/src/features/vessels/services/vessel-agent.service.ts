import type {
  Agent,
  VesselFleetItem,
  VesselAgentKpiMetrics,
  RotationScheduleItem,
  AgentCertificate,
} from "../types/vessel-agent.types";

export const initialAgents: Agent[] = [
  {
    id: "agent-1",
    name: "Capt. Bambang Suryo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    email: "bambang.suryo@maritime-agency.com",
    phone: "+62 812-3456-7890",
    mainRank: "Master Captain",
    status: "On Duty",
    currentVessel: "MV Nusantara Glory",
    currentVesselImo: "IMO 9283741",
    seaTimeMonths: 84, // 7 years sea time
    overallRating: 4.9,
    emergencyContactName: "Dewi Suryo (Istri)",
    emergencyContactPhone: "+62 812-9988-7766",
    passportNumber: "C-9871234",
    seamanBookNumber: "SB-8876123",
    flags: ["Re-recommended by Captain", "Bilingual", "Heavy Cargo Expert"],
    notes: "Kapten berpengalaman tinggi di rute internasional dan kapal container super jumbo.",
    certificates: [
      {
        id: "cert-101",
        name: "ANT-I (Ahli Nautika Tingkat I)",
        certNumber: "ANT1-2022-8871",
        issuingAuthority: "Hubla Kemenhub RI",
        issueDate: "2022-01-15",
        expiryDate: "2027-01-15",
        daysRemaining: 156,
        status: "valid",
      },
      {
        id: "cert-102",
        name: "BST (Basic Safety Training)",
        certNumber: "BST-2023-9912",
        issuingAuthority: "STIP Jakarta",
        issueDate: "2023-03-10",
        expiryDate: "2028-03-10",
        daysRemaining: 574,
        status: "valid",
      },
      {
        id: "cert-103",
        name: "MCU (Medical Fitness Cert)",
        certNumber: "MCU-2026-0044",
        issuingAuthority: "KKP Tanjung Priok",
        issueDate: "2026-02-01",
        expiryDate: "2026-08-30",
        daysRemaining: 18,
        status: "near-expiry",
      },
      {
        id: "cert-104",
        name: "Buku Pelaut (Seaman Book)",
        certNumber: "SB-2021-9981",
        issuingAuthority: "Syahbandar Utama",
        issueDate: "2021-09-01",
        expiryDate: "2026-09-01",
        daysRemaining: 20,
        status: "near-expiry",
      },
    ],
    placementHistory: [
      {
        id: "hist-1",
        vesselName: "MV Nusantara Glory",
        imoNumber: "IMO 9283741",
        vesselType: "Container Ship",
        signOnDate: "2026-01-10",
        signOffDate: "2026-09-10",
        durationMonths: 8,
        rank: "Master Captain",
        captainFeedback: "Kepemimpinan sangat tegas, navigasi alur sempit sangat presisi.",
        rating: 5.0,
      },
      {
        id: "hist-2",
        vesselName: "KM Samudra Express",
        imoNumber: "IMO 9128374",
        vesselType: "General Cargo",
        signOnDate: "2025-02-01",
        signOffDate: "2025-10-30",
        durationMonths: 9,
        rank: "Master Captain",
        captainFeedback: "Manajemen kru luar biasa dan komunikasi pelabuhan sangat lancar.",
        rating: 4.8,
      },
    ],
    reviews: [
      {
        id: "rev-1",
        reviewerName: "Capt. Herman Santoso",
        reviewerTitle: "General Manager Fleet Ops",
        vesselName: "MV Nusantara Glory",
        reviewDate: "2026-06-15",
        rating: 4.9,
        comment: "Kinerja navigasi tanpa cela. Sangat direkomendasikan untuk kapal niaga berat.",
        recommended: true,
      },
    ],
  },
  {
    id: "agent-2",
    name: "Chief Eng. Hendra Wijaya",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    email: "hendra.wijaya@maritime-agency.com",
    phone: "+62 813-8877-6655",
    mainRank: "Chief Engineer",
    status: "On Duty",
    currentVessel: "TB Kalimantan Star 08",
    currentVesselImo: "IMO 9821345",
    seaTimeMonths: 96, // 8 years sea time
    overallRating: 4.8,
    emergencyContactName: "Rina Wijaya (Istri)",
    emergencyContactPhone: "+62 813-1122-3344",
    passportNumber: "C-1122334",
    seamanBookNumber: "SB-4455667",
    flags: ["Engine Overhaul Specialist", "Zero Breakdown Record"],
    notes: "Spesialis mesin diesel 2-tak MAN B&W dan sistem hidrolik tugboat.",
    certificates: [
      {
        id: "cert-201",
        name: "ATT-I (Ahli Teknik Tingkat I)",
        certNumber: "ATT1-2021-9988",
        issuingAuthority: "Hubla Kemenhub RI",
        issueDate: "2021-05-10",
        expiryDate: "2026-05-10",
        daysRemaining: -94,
        status: "expired",
      },
      {
        id: "cert-202",
        name: "Advanced Fire Fighting (AFF)",
        certNumber: "AFF-2023-4412",
        issuingAuthority: "BP3IP Jakarta",
        issueDate: "2023-08-12",
        expiryDate: "2028-08-12",
        daysRemaining: 730,
        status: "valid",
      },
      {
        id: "cert-203",
        name: "MCU (Medical Fitness Cert)",
        certNumber: "MCU-2025-1102",
        issuingAuthority: "Rumkital Dr. Ramelan",
        issueDate: "2025-07-01",
        expiryDate: "2026-07-01",
        daysRemaining: -42,
        status: "expired",
      },
    ],
    placementHistory: [
      {
        id: "hist-3",
        vesselName: "TB Kalimantan Star 08",
        imoNumber: "IMO 9821345",
        vesselType: "Tugboat & Barge",
        signOnDate: "2025-11-01",
        signOffDate: "2026-10-31",
        durationMonths: 12,
        rank: "Chief Engineer",
        captainFeedback: "Perawatan kamar mesin sangat rapi, efisiensi bahan bakar naik 8%.",
        rating: 4.8,
      },
    ],
    reviews: [
      {
        id: "rev-2",
        reviewerName: "Bambang Suherman",
        reviewerTitle: "Technical Superintendent",
        vesselName: "TB Kalimantan Star 08",
        reviewDate: "2026-04-10",
        rating: 4.8,
        comment: "Keterampilan troubleshooting mesin auxiliary luar biasa cepat.",
        recommended: true,
      },
    ],
  },
  {
    id: "agent-3",
    name: "Aris Setiawan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    email: "aris.setiawan@maritime-agency.com",
    phone: "+62 856-7788-9900",
    mainRank: "AB Seaman",
    status: "Ready",
    currentVessel: undefined,
    currentVesselImo: undefined,
    seaTimeMonths: 36, // 3 years sea time
    overallRating: 4.7,
    emergencyContactName: "Siti Rahma (Ibu)",
    emergencyContactPhone: "+62 856-4433-2211",
    passportNumber: "C-7766554",
    seamanBookNumber: "SB-3322110",
    flags: ["Ready for Immediate Deployment", "Mooring Specialist"],
    notes: "AB Seaman yang sangat siap ditempatkan di kapal tanker atau bulker.",
    certificates: [
      {
        id: "cert-301",
        name: "Rating Certificate (Deck)",
        certNumber: "RAT-2024-5512",
        issuingAuthority: "Syahbandar Surabaya",
        issueDate: "2024-02-14",
        expiryDate: "2029-02-14",
        daysRemaining: 916,
        status: "valid",
      },
      {
        id: "cert-302",
        name: "BST (Basic Safety Training)",
        certNumber: "BST-2024-1188",
        issuingAuthority: "Poltekpel Surabaya",
        issueDate: "2024-01-10",
        expiryDate: "2029-01-10",
        daysRemaining: 881,
        status: "valid",
      },
      {
        id: "cert-303",
        name: "MCU (Medical Checkup)",
        certNumber: "MCU-2026-7788",
        issuingAuthority: "RS Pelabuhan Surabaya",
        issueDate: "2026-05-10",
        expiryDate: "2027-05-10",
        daysRemaining: 271,
        status: "valid",
      },
    ],
    placementHistory: [
      {
        id: "hist-4",
        vesselName: "MT Celebes Prospect",
        imoNumber: "IMO 9732104",
        vesselType: "Oil Tanker",
        signOnDate: "2025-05-01",
        signOffDate: "2026-03-01",
        durationMonths: 10,
        rank: "AB Seaman",
        captainFeedback: "Kewaspadaan jaga laut tinggi, paham aturan keselamatan tanker.",
        rating: 4.7,
      },
    ],
    reviews: [
      {
        id: "rev-3",
        reviewerName: "Capt. Danang Wicaksono",
        reviewerTitle: "Master Tanker",
        vesselName: "MT Celebes Prospect",
        reviewDate: "2026-03-05",
        rating: 4.7,
        comment: "Sangat kooperatif, tanggap saat bongkar muat kargo minyak bumi.",
        recommended: true,
      },
    ],
  },
  {
    id: "agent-4",
    name: "Maya Putri, S.S.T.Pel",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    email: "maya.putri@maritime-agency.com",
    phone: "+62 811-2233-4455",
    mainRank: "Deck Officer",
    status: "On Duty",
    currentVessel: "KM Samudra Express",
    currentVesselImo: "IMO 9128374",
    seaTimeMonths: 42,
    overallRating: 4.9,
    emergencyContactName: "Budi Santoso (Ayah)",
    emergencyContactPhone: "+62 811-9900-1122",
    passportNumber: "C-4455667",
    seamanBookNumber: "SB-8899001",
    flags: ["ECDIS Certified", "Safety Officer", "High Precision"],
    notes: "Perwira navigasi deck dengan sertifikasi ECDIS Transas & Furuno.",
    certificates: [
      {
        id: "cert-401",
        name: "ANT-II (Ahli Nautika Tingkat II)",
        certNumber: "ANT2-2023-7722",
        issuingAuthority: "STIP Jakarta",
        issueDate: "2023-06-20",
        expiryDate: "2028-06-20",
        daysRemaining: 677,
        status: "valid",
      },
      {
        id: "cert-402",
        name: "GMDSS Radio Operator",
        certNumber: "GMDSS-2023-1109",
        issuingAuthority: "Postel Kemenkominfo",
        issueDate: "2023-07-01",
        expiryDate: "2028-07-01",
        daysRemaining: 688,
        status: "valid",
      },
      {
        id: "cert-403",
        name: "MCU (Medical Checkup)",
        certNumber: "MCU-2026-3321",
        issuingAuthority: "KKP Tanjung Priok",
        issueDate: "2026-01-15",
        expiryDate: "2026-08-25",
        daysRemaining: 13,
        status: "near-expiry",
      },
    ],
    placementHistory: [
      {
        id: "hist-5",
        vesselName: "KM Samudra Express",
        imoNumber: "IMO 9128374",
        vesselType: "General Cargo",
        signOnDate: "2025-12-01",
        signOffDate: "2026-08-30",
        durationMonths: 9,
        rank: "Deck Officer",
        captainFeedback: "Perencanaan rute navigasi cepat, akurat, dan taat aturan SOLAS.",
        rating: 5.0,
      },
    ],
    reviews: [
      {
        id: "rev-4",
        reviewerName: "Capt. Agung Nugroho",
        reviewerTitle: "Port Captain",
        vesselName: "KM Samudra Express",
        reviewDate: "2026-05-20",
        rating: 4.9,
        comment: "Perwira deck muda yang sangat berdedikasi dan teliti dalam dokumentasi kargo.",
        recommended: true,
      },
    ],
  },
  {
    id: "agent-5",
    name: "Thomas Eric",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    email: "thomas.eric@maritime-agency.com",
    phone: "+62 821-4455-6677",
    mainRank: "Cook",
    status: "Ready",
    currentVessel: undefined,
    currentVesselImo: undefined,
    seaTimeMonths: 60,
    overallRating: 4.6,
    emergencyContactName: "Maria Eric (Istri)",
    emergencyContactPhone: "+62 821-7788-9900",
    passportNumber: "C-8899112",
    seamanBookNumber: "SB-1122445",
    flags: ["HACCP Food Safety", "Multi-Cuisine Specialist"],
    notes: "Koki kapal dengan pengalaman menyajikan masakan Asia & Western untuk kru internasional.",
    certificates: [
      {
        id: "cert-501",
        name: "Ship's Cook Certificate (MLC 2006)",
        certNumber: "COOK-2024-3311",
        issuingAuthority: "Hubla Kemenhub RI",
        issueDate: "2024-04-10",
        expiryDate: "2029-04-10",
        daysRemaining: 971,
        status: "valid",
      },
      {
        id: "cert-502",
        name: "BST (Basic Safety Training)",
        certNumber: "BST-2022-8810",
        issuingAuthority: "BP3IP Jakarta",
        issueDate: "2022-09-01",
        expiryDate: "2027-09-01",
        daysRemaining: 385,
        status: "valid",
      },
    ],
    placementHistory: [
      {
        id: "hist-6",
        vesselName: "MV Barito Pioneer",
        imoNumber: "IMO 9642109",
        vesselType: "Bulk Carrier",
        signOnDate: "2025-03-01",
        signOffDate: "2026-01-01",
        durationMonths: 10,
        rank: "Cook",
        captainFeedback: "Kru sangat puas dengan kualitas makanan, higienis dapur terjamin.",
        rating: 4.6,
      },
    ],
    reviews: [],
  },
  {
    id: "agent-6",
    name: "Rahmat Hidayat",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    email: "rahmat.hidayat@maritime-agency.com",
    phone: "+62 878-1122-3344",
    mainRank: "2nd Engineer",
    status: "Cuti",
    currentVessel: undefined,
    currentVesselImo: undefined,
    seaTimeMonths: 54,
    overallRating: 4.5,
    emergencyContactName: "Fitri Hidayat (Istri)",
    emergencyContactPhone: "+62 878-5566-7788",
    passportNumber: "C-2233445",
    seamanBookNumber: "SB-6677889",
    flags: ["Refrigeration Expert", "On Vacation until Sept"],
    notes: "Sedang mengambil cuti tahunan resmi hingga 1 September 2026.",
    certificates: [
      {
        id: "cert-601",
        name: "ATT-II (Ahli Teknik Tingkat II)",
        certNumber: "ATT2-2023-4490",
        issuingAuthority: "Hubla Kemenhub RI",
        issueDate: "2023-11-10",
        expiryDate: "2028-11-10",
        daysRemaining: 820,
        status: "valid",
      },
    ],
    placementHistory: [],
    reviews: [],
  },
];

export const initialFleetLocations: VesselFleetItem[] = [
  {
    id: "vessel-1",
    name: "MV Nusantara Glory",
    imoNumber: "IMO 9283741",
    vesselType: "Container Ship",
    companyName: "PT Pelayaran Nusantara Line",
    currentPort: "Pelabuhan Tanjung Priok, Jakarta",
    lat: -6.1021,
    lng: 106.8833,
    seaworthinessStatus: "Layak Operasi",
    deployedCrewCount: 24,
  },
  {
    id: "vessel-2",
    name: "TB Kalimantan Star 08",
    imoNumber: "IMO 9821345",
    vesselType: "Tugboat & Barge",
    companyName: "PT Trans Coal Logistics",
    currentPort: "Pelabuhan Balikpapan, Kaltim",
    lat: -1.2654,
    lng: 116.8312,
    seaworthinessStatus: "Layak Operasi",
    deployedCrewCount: 12,
  },
  {
    id: "vessel-3",
    name: "KM Samudra Express",
    imoNumber: "IMO 9128374",
    vesselType: "General Cargo",
    companyName: "PT Lintas Niaga Barat",
    currentPort: "Pelabuhan Tanjung Perak, Surabaya",
    lat: -7.1994,
    lng: 112.7303,
    seaworthinessStatus: "Layak Operasi",
    deployedCrewCount: 18,
  },
  {
    id: "vessel-4",
    name: "MT Celebes Prospect",
    imoNumber: "IMO 9732104",
    vesselType: "Oil Tanker",
    companyName: "PT Energy Maritime Carrier",
    currentPort: "Pelabuhan Batam Center, Kepri",
    lat: 1.1301,
    lng: 104.0529,
    seaworthinessStatus: "Tidak Layak Operasi",
    deployedCrewCount: 20,
  },
];

export const initialRotationSchedule: RotationScheduleItem[] = [
  {
    id: "rot-1",
    agentId: "agent-1",
    agentName: "Capt. Bambang Suryo",
    rank: "Master Captain",
    vesselName: "MV Nusantara Glory",
    signOnDate: "2026-01-10",
    signOffDate: "2026-09-10",
    status: "Active",
    progressPercentage: 88,
  },
  {
    id: "rot-2",
    agentId: "agent-2",
    agentName: "Chief Eng. Hendra Wijaya",
    rank: "Chief Engineer",
    vesselName: "TB Kalimantan Star 08",
    signOnDate: "2025-11-01",
    signOffDate: "2026-10-31",
    status: "Active",
    progressPercentage: 75,
  },
  {
    id: "rot-3",
    agentId: "agent-4",
    agentName: "Maya Putri, S.S.T.Pel",
    rank: "Deck Officer",
    vesselName: "KM Samudra Express",
    signOnDate: "2025-12-01",
    signOffDate: "2026-08-30",
    status: "Active",
    progressPercentage: 95,
  },
  {
    id: "rot-4",
    agentId: "agent-3",
    agentName: "Aris Setiawan",
    rank: "AB Seaman",
    vesselName: "KM Samudra Express (Rotasi Siap)",
    signOnDate: "2026-09-01",
    signOffDate: "2027-05-01",
    status: "Upcoming",
    progressPercentage: 0,
  },
];

// Helper to compute summary metrics
export function computeKpiMetrics(agents: Agent[]): VesselAgentKpiMetrics {
  const totalAgents = agents.length;
  const readyCount = agents.filter((a) => a.status === "Ready").length;
  const onDutyCount = agents.filter((a) => a.status === "On Duty").length;

  let expiringCertsCount = 0;
  let totalRatingSum = 0;

  agents.forEach((agent) => {
    totalRatingSum += agent.overallRating;
    const hasExpiringOrExpired = agent.certificates.some(
      (c) => c.status === "near-expiry" || c.status === "expired"
    );
    if (hasExpiringOrExpired) {
      expiringCertsCount++;
    }
  });

  const avgRating = totalAgents > 0 ? Number((totalRatingSum / totalAgents).toFixed(1)) : 0;

  return {
    totalAgents,
    readyCount,
    onDutyCount,
    expiringCertsCount,
    avgRating,
    activeComplaintsCount: 1, // Mock value
  };
}

// Helper to get all expiring certs across all agents
export function getExpiringCertificatesList(agents: Agent[]) {
  const alertList: {
    agentId: string;
    agentName: string;
    agentRank: string;
    cert: AgentCertificate;
  }[] = [];

  agents.forEach((agent) => {
    agent.certificates.forEach((cert) => {
      if (cert.status === "near-expiry" || cert.status === "expired") {
        alertList.push({
          agentId: agent.id,
          agentName: agent.name,
          agentRank: agent.mainRank,
          cert,
        });
      }
    });
  });

  // Sort by urgency: expired first (lowest daysRemaining), then near-expiry
  return alertList.sort((a, b) => a.cert.daysRemaining - b.cert.daysRemaining);
}
