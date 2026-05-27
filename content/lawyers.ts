export type Department =
  | "Leadership"
  | "Litigation"
  | "Corporate"
  | "Corporate & Conveyancing";

export interface Lawyer {
  slug: string;
  name: string;
  role: string;
  department: Department;
  portrait: string;
  linkedin?: string;
  shortBio: string;
  /** Full bio paragraphs — scrape from legacy /our-team and replace TODO markers. */
  bio: string[];
  practice?: string[];
  isPartner?: boolean;
}

// TODO(content): replace each `bio` array with the verbatim long-form text
// from https://www.theotismutemi.com/our-team — the legacy site has full
// bios per lawyer. The `shortBio` fields below are conservative one-liners
// authored to be safe pending replacement.
export const lawyers: Lawyer[] = [
  {
    slug: "anne-desiree-armanda-theotis",
    name: "Anne Desiree Armanda Theotis",
    role: "Managing Partner",
    department: "Leadership",
    portrait: "/images/people/anne-desiree-armanda-theotis.jpg",
    linkedin: "https://www.linkedin.com/company/theotis-mutemi-legal-practitioners/",
    shortBio:
      "Founding partner and managing partner; Fellow of the Chartered Institute of Arbitrators and panel member of the Lusaka International Arbitration Centre.",
    bio: [
      // TODO(content): paste verbatim bio from legacy site.
    ],
    practice: ["Arbitration", "Mediation", "Corporate Advisory"],
    isPartner: true,
  },
  {
    slug: "joy-rachel-mutemi-mondoka",
    name: "Joy Rachel Mutemi Mondoka",
    role: "Partner, Head of Litigation & Dispute Resolution",
    department: "Litigation",
    portrait: "/images/people/joy-rachel-mutemi-mondoka.jpg",
    linkedin: "https://www.linkedin.com/company/theotis-mutemi-legal-practitioners/",
    shortBio:
      "Partner leading the firm's litigation and dispute-resolution practice across commercial, employment, and regulatory matters.",
    bio: [
      // TODO(content): paste verbatim bio from legacy site.
    ],
    practice: ["Commercial Litigation", "Employment", "Regulatory"],
    isPartner: true,
  },
  {
    slug: "natasha-mutambo",
    name: "Natasha Mutambo",
    role: "Associate Partner, Head of Corporate",
    department: "Corporate",
    portrait: "/images/people/natasha-mutambo.jpg",
    linkedin: "https://www.linkedin.com/company/theotis-mutemi-legal-practitioners/",
    shortBio:
      "Associate partner leading the corporate practice, with a focus on M&A, licensing, and inbound-investment work.",
    bio: [
      // TODO(content): paste verbatim bio from legacy site.
    ],
    practice: ["M&A", "Licensing & Compliance", "Investment Advisory"],
    isPartner: true,
  },
  {
    slug: "ethel-thelma-changufu",
    name: "Ethel Thelma Z Changufu",
    role: "Associate",
    department: "Litigation",
    portrait: "/images/people/ethel-thelma-changufu.jpg",
    shortBio:
      "Litigation associate handling commercial and labour matters before the High Court and the Industrial Relations Division.",
    bio: [
      // TODO(content): paste verbatim bio from legacy site.
    ],
  },
  {
    slug: "melissa-phiri",
    name: "Melissa Phiri",
    role: "Senior Associate",
    department: "Litigation",
    portrait: "/images/people/melissa-phiri.jpg",
    shortBio:
      "Senior associate in the litigation department, with experience across commercial and family practice.",
    bio: [
      // TODO(content): paste verbatim bio from legacy site.
    ],
  },
  {
    slug: "nandi-lourna-moyo",
    name: "Nandi Lourna Moyo",
    role: "Associate",
    department: "Litigation",
    portrait: "/images/people/nandi-lourna-moyo.jpg",
    shortBio:
      "Litigation associate focused on commercial disputes and judicial review.",
    bio: [
      // TODO(content): paste verbatim bio from legacy site.
    ],
  },
  {
    slug: "thokozile-neeta",
    name: "Thokozile Neeta",
    role: "Advocate",
    department: "Litigation",
    portrait: "/images/people/thokozile-neeta.png",
    shortBio:
      "Advocate in the litigation department supporting commercial and employment matters.",
    bio: [
      // TODO(content): paste verbatim bio from legacy site.
    ],
  },
  {
    slug: "francis-mwewa",
    name: "Francis Mwewa",
    role: "Associate",
    department: "Corporate & Conveyancing",
    portrait: "/images/people/francis-mwewa.jpg",
    shortBio:
      "Corporate associate with a focus on conveyancing and land transactions.",
    bio: [
      // TODO(content): paste verbatim bio from legacy site.
    ],
  },
  {
    slug: "esther-nyirenda",
    name: "Esther Nyirenda",
    role: "Advocate",
    department: "Corporate",
    portrait: "/images/people/esther-nyirenda.jpg",
    shortBio:
      "Corporate advocate supporting licensing, compliance, and transactional matters.",
    bio: [
      // TODO(content): paste verbatim bio from legacy site.
    ],
  },
];

export const departments: Department[] = [
  "Leadership",
  "Litigation",
  "Corporate",
  "Corporate & Conveyancing",
];

export function getLawyer(slug: string): Lawyer | undefined {
  return lawyers.find((l) => l.slug === slug);
}

export function lawyersByDepartment(): Record<Department, Lawyer[]> {
  return departments.reduce(
    (acc, dept) => {
      acc[dept] = lawyers.filter((l) => l.department === dept);
      return acc;
    },
    {} as Record<Department, Lawyer[]>,
  );
}
