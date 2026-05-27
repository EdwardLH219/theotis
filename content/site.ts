export const site = {
  name: "Theotis Mutemi Legal Practitioners",
  shortName: "TMLP",
  url: "https://www.theotismutemi.com",
  tagline: "Counsel for Zambia's most consequential matters.",
  description:
    "A Lusaka-based law firm uniting nearly four decades of partner experience across business litigation, corporate advisory, and alternative dispute resolution.",
  address: {
    streetAddress: "No. 13 Benakale Road, Northmead",
    postalAddress: "P.O. Box 36125",
    locality: "Lusaka",
    region: "Lusaka Province",
    country: "Zambia",
    countryCode: "ZM",
    latitude: -15.397,
    longitude: 28.322,
  },
  hours: "Mon–Fri 08:00–17:00 CAT",
  email: "info@tmlp.com.zm",
  phones: ["+260 211 222 511", "+260 211 222 512"],
  socials: {
    x: "https://x.com/TheotisMutemi",
    linkedin:
      "https://www.linkedin.com/company/theotis-mutemi-legal-practitioners/",
  },
  recognitions: [
    "Recognized in Chambers & Partners 2026",
  ],
  affiliations: [
    {
      name: "Europlaw Group",
      logo: "/images/affiliations/europlaw-group.png",
    },
    {
      name: "Global Law Experts",
      logo: "/images/affiliations/global-law-experts.jpg",
    },
    {
      name: "Association of European Attorneys",
      logo: "/images/affiliations/association-european-attorneys.png",
    },
  ],
} as const;

export type Site = typeof site;
