export interface PracticeSubArea {
  numeral: string;
  title: string;
  summary?: string;
}

export interface PracticeArea {
  number: string;
  slug: "litigation" | "corporate" | "adr";
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  image?: string;
  subAreas: PracticeSubArea[];
}

export const practices: PracticeArea[] = [
  {
    number: "01",
    slug: "litigation",
    title: "Business & Corporate Litigation",
    shortTitle: "Litigation",
    summary:
      "Strategically resolving legal disputes to safeguard your business interests.",
    description:
      "Our Litigation & Dispute Resolution team represents Zambian and international clients across commercial, employment, intellectual-property, and regulatory matters. We combine forensic preparation with a steady advocacy style — pursuing the outcome that protects the client's commercial position, not the loudest argument.",
    image: "/images/litigation-hero.jpg",
    subAreas: [
      {
        numeral: "I",
        title: "Commercial Litigation",
        summary:
          "Contract disputes, shareholder actions, debt recovery, restructuring, and judicial review work in the High Court and Court of Appeal.",
      },
      {
        numeral: "II",
        title: "Family Law",
        summary:
          "Matrimonial causes, custody, maintenance, and the division of matrimonial property — handled with discretion.",
      },
      {
        numeral: "III",
        title: "Labour & Employment",
        summary:
          "Disciplinary, redundancy, and constructive-dismissal matters; appearances before the Industrial Relations Division.",
      },
      {
        numeral: "IV",
        title: "Intellectual Property",
        summary:
          "Trademark, copyright, and patent enforcement; infringement, passing-off, and counterfeit-goods proceedings.",
      },
      {
        numeral: "V",
        title: "Real Estate Litigation",
        summary:
          "Lease disputes, title contests, encroachments, and recovery of possession.",
      },
      {
        numeral: "VI",
        title: "Environmental Law",
        summary:
          "Statutory compliance disputes, ZEMA enforcement actions, and licensing appeals.",
      },
      {
        numeral: "VII",
        title: "Consumer Law",
        summary:
          "Product liability, unfair trade practices, and Competition and Consumer Protection Commission matters.",
      },
      {
        numeral: "VIII",
        title: "Banking & Finance Litigation",
        summary:
          "Recovery actions, security enforcement, and disputes involving financial institutions.",
      },
      {
        numeral: "IX",
        title: "Mining Law Disputes",
        summary:
          "Mining title disputes, royalty claims, joint-venture disagreements, and Mining Cadastre appeals.",
      },
    ],
  },
  {
    number: "02",
    slug: "corporate",
    title: "Corporate",
    shortTitle: "Corporate",
    summary:
      "Meticulous legal guidance across 13 specialized units, ensuring compliance and unlocking growth.",
    description:
      "Our Corporate practice is organised into thirteen specialist units. We act for local enterprises, multinational investors, and public-sector institutions on the full lifecycle of a transaction — from incorporation and licensing, through deal execution, to compliance and succession.",
    image: "/images/corporate-hero.jpg",
    subAreas: [
      {
        numeral: "I",
        title: "Corporate & Commercial Advisory",
        summary:
          "Day-to-day counsel on company law, shareholder arrangements, and commercial contracting.",
      },
      {
        numeral: "II",
        title: "Conveyance & Land Transactions",
        summary:
          "Acquisitions, transfers, leases, mortgages, and Lands Tribunal work.",
      },
      {
        numeral: "III",
        title:
          "Licensing & Compliance — Energy, Petroleum, Local Government, Trade, Health, Investment, Mining, Trademarks",
        summary:
          "Sector-specific permitting and ongoing regulatory compliance across Zambia's licensing regimes.",
      },
      {
        numeral: "IV",
        title: "Mining & Construction",
        summary:
          "Mining title acquisition, EPCM contracts, JOAs, and concession agreements.",
      },
      {
        numeral: "V",
        title: "Mergers & Acquisitions",
        summary:
          "Buy-side and sell-side execution, due diligence, CCPC merger control, and post-completion integration.",
      },
      {
        numeral: "VI",
        title: "Immigration & Citizenship",
        summary:
          "Employment permits, investor permits, residence applications, and citizenship by descent or registration.",
      },
      {
        numeral: "VII",
        title: "Intellectual Property & Patents",
        summary:
          "Trademark, patent, and copyright registration with PACRA and ARIPO; portfolio management.",
      },
      {
        numeral: "VIII",
        title: "Banking & Finance",
        summary:
          "Lending, security, project finance, syndicated facilities, and DFI work.",
      },
      {
        numeral: "IX",
        title: "Employment & Labour",
        summary:
          "Contracting, executive compensation, secondments, and HR policy frameworks.",
      },
      {
        numeral: "X",
        title: "Wills, Probate, Intestacy & Trusts",
        summary:
          "Estate planning, drafting, administration of estates, and trust structures.",
      },
      {
        numeral: "XI",
        title: "Tax Advisory",
        summary:
          "Transactional tax structuring, ZRA disputes, and treaty-relief positioning.",
      },
      {
        numeral: "XII",
        title: "Insurance, Pensions & Securities Advisory",
        summary:
          "PIA, NAPSA, and SEC compliance; product structuring and regulator engagement.",
      },
      {
        numeral: "XIII",
        title: "Investment & International Trade Advisory",
        summary:
          "ZDA incentives, EPZ structuring, AfCFTA positioning, and inbound investment strategy.",
      },
    ],
  },
  {
    number: "03",
    slug: "adr",
    title: "Alternative Dispute Resolution",
    shortTitle: "ADR",
    summary:
      "Arbitration, mediation, and adjudication that protect relationships and preserve value.",
    description:
      "Our Alternative Dispute Resolution Department helps clients resolve disputes quickly, privately, and cost-effectively without going through lengthy court proceedings. We focus on arbitration, mediation, and adjudication, offering clients practical options that save time and preserve relationships.",
    image: "/images/adr-hero.jpg",
    subAreas: [
      {
        numeral: "I",
        title: "Commercial Arbitration",
        summary:
          "Ad-hoc and institutional arbitration under LIAC, CIArb, ICC, and UNCITRAL rules.",
      },
      {
        numeral: "II",
        title: "Mediation",
        summary:
          "Commercial, employment, and family mediation with accredited mediators.",
      },
      {
        numeral: "III",
        title: "Adjudication",
        summary:
          "Construction and infrastructure adjudication under FIDIC and bespoke contracts.",
      },
      {
        numeral: "IV",
        title: "Investor–State Disputes",
        summary:
          "BIT-based claims and treaty-protection counsel for inbound investors in Zambia.",
      },
    ],
  },
];

export function getPractice(slug: PracticeArea["slug"]): PracticeArea {
  const found = practices.find((p) => p.slug === slug);
  if (!found) throw new Error(`Practice "${slug}" not found`);
  return found;
}
