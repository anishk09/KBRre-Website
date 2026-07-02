export type SiteLink = {
  label: string;
  href: string;
};

export type FooterSection = {
  title: string;
  links: SiteLink[];
};

export const siteConfig = {
  brand: {
    name: 'KBR',
    fullName: 'KBR Real Estate Group',
    tagline: 'A Private Real Estate Investment & Holdings Firm',
    logo: '/KBR1.png',
  },
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ] satisfies SiteLink[],
  footerSections: [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Holdings',
      links: [{ label: 'Portfolio Overview', href: '/properties' }],
    },
  ] satisfies FooterSection[],
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ] satisfies SiteLink[],
  contact: {
    phoneLabel: 'Business Line',
    phone: '(732) 924-1308',
    address: '6 Bridge St, Building C, Metuchen, NJ 08840',
  },
} as const;
