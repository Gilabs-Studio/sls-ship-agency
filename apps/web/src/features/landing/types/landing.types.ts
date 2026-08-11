import type { MotionValue } from "framer-motion";

export interface ParallaxOptions {
  bgFactor?: number;
  peopleFactor?: number;
}

export interface ParallaxTransforms {
  bgY: MotionValue<number>;
  peopleY: MotionValue<number>;
  contentY: MotionValue<number>;
  heroOpacity: MotionValue<number>;
  heroScale: MotionValue<number>;
  headerBlur: MotionValue<number>;
}

export interface OfficialLetterData {
  salutation: string;
  recipient: string;
  location: string;
  opening: string;
  intro: string;
  proposal: string;
  initiative: string;
  closing: string;
  signoff: string;
  companyName: string;
}

export interface LandingTranslations {
  badge: string;
  headline: string;
  headlineHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaLogin: string;
  brutalistTitle: string;
  heroTagline: string;
  heroSubtagline: string;
  nav: {
    home: string;
    services: string;
    certificates: string;
    about: string;
    proposal: string;
  };
  keyServices: {
    agencyTitle: string;
    agencyDesc: string;
    certTitle: string;
    certDesc: string;
    partnershipTitle: string;
    partnershipDesc: string;
  };
  showcase: {
    sectionTag: string;
    title: string;
    titleHighlight: string;
    description: string;
    statVessels: string;
    statVesselsLabel: string;
    statCertificates: string;
    statCertificatesLabel: string;
    statEfficiency: string;
    statEfficiencyLabel: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
  };
  letterModal: {
    title: string;
    subtitle: string;
    close: string;
    downloadText: string;
  };
  letter: OfficialLetterData;
  servicesSection: {
    tag: string;
    title: string;
    description: string;
    crewTitle: string;
    crewDesc: string;
    techTitle: string;
    techDesc: string;
    logisticsTitle: string;
    logisticsDesc: string;
    complianceTitle: string;
    complianceDesc: string;
  };
  aboutSection: {
    tag: string;
    title: string;
    description: string;
    ctaButton: string;
  };
  statsSection: {
    tag: string;
    title?: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    stat4Number: string;
    stat4Label: string;
  };
  whyChooseUsSection: {
    tag: string;
    title: string;
    description: string;
    item1Title: string;
    item1Desc: string;
    item2Title: string;
    item2Desc: string;
    item3Title: string;
    item3Desc: string;
    item4Title: string;
    item4Desc: string;
  };
  ctaSection: {
    title: string;
    description: string;
    button: string;
  };
  footerSection: {
    companyName: string;
    description: string;
    menuTitle: string;
    menuHome: string;
    menuServices: string;
    menuCertificates: string;
    menuAbout: string;
    servicesTitle: string;
    serviceCrew: string;
    serviceTech: string;
    serviceLogistics: string;
    serviceCompliance: string;
    contactTitle: string;
    address: string;
    phone: string;
    email: string;
    copyright: string;
  };
}
