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
}
