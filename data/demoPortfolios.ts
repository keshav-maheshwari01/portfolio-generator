export interface DemoProject {
  title: string;
  description: string;
  tag: string;
}

export interface DemoPortfolio {
  slug: string;
  name: string;
  role: string;
  category: string;
  tagline: string;
  accent: string;
  accentSubtle: string;
  initials: string;
  about: string;
  skills: string[];
  projects: DemoProject[];
  location: string;
  email: string;
}

export const demoPortfolios: DemoPortfolio[] = [
  {
    slug: 'maya-chen',
    name: 'Maya Chen',
    role: 'Product Designer',
    category: 'Design',
    tagline: 'Designing calm, usable products for fast-moving teams.',
    accent: '#A45C43',
    accentSubtle: '#F3E9E4',
    initials: 'MC',
    about:
      'I’m a product designer with 6 years of experience shaping design systems, onboarding flows, and dashboards for early-stage startups. I care about clarity over cleverness.',
    skills: ['Product Design', 'Design Systems', 'Figma', 'Prototyping', 'User Research'],
    projects: [
      {
        title: 'Atlas Design System',
        description: 'A component library used across 12 product teams, cutting design handoff time in half.',
        tag: 'Design System',
      },
      {
        title: 'Nimbus Onboarding',
        description: 'Redesigned first-run experience that lifted activation rate by 34%.',
        tag: 'Product Design',
      },
      {
        title: 'Finch Analytics Dashboard',
        description: 'A data-dense dashboard rebuilt around three key user goals instead of every metric at once.',
        tag: 'UX / UI',
      },
    ],
    location: 'Seattle, WA',
    email: 'hello@mayachen.design',
  },
  {
    slug: 'jordan-lee',
    name: 'Jordan Lee',
    role: 'Full-Stack Developer',
    category: 'Engineering',
    tagline: 'Building fast, reliable web apps end to end.',
    accent: '#6D5DFB',
    accentSubtle: '#EDEBFF',
    initials: 'JL',
    about:
      'Full-stack engineer focused on TypeScript, React, and distributed systems. I’ve shipped products from zero to production at two YC startups and led a team of four engineers.',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
    projects: [
      {
        title: 'Ledger — Billing Engine',
        description: 'Usage-based billing system processing 2M+ events a day with sub-second latency.',
        tag: 'Backend',
      },
      {
        title: 'Realtime Collab Editor',
        description: 'CRDT-based collaborative text editor built from scratch, similar to Notion’s core editor.',
        tag: 'Full-Stack',
      },
      {
        title: 'Open-source CLI: shiplog',
        description: 'A changelog generator CLI with 3,000+ GitHub stars and an active contributor base.',
        tag: 'Open Source',
      },
    ],
    location: 'Austin, TX',
    email: 'jordan@jordanlee.dev',
  },
  {
    slug: 'priya-nair',
    name: 'Priya Nair',
    role: 'Photographer',
    category: 'Photography',
    tagline: 'Documentary-style photography for people and places.',
    accent: '#2F6F4F',
    accentSubtle: '#E7F1EB',
    initials: 'PN',
    about:
      'I shoot editorial, travel, and portrait photography with a focus on natural light and honest moments. Published in three regional magazines and counting.',
    skills: ['Portrait', 'Editorial', 'Travel', 'Lightroom', 'Film Photography'],
    projects: [
      {
        title: 'Coastline Series',
        description: 'A 40-photo essay on fishing communities along the western coastline.',
        tag: 'Documentary',
      },
      {
        title: 'Faces of the Market',
        description: 'Portrait series shot at six local markets over one year.',
        tag: 'Portrait',
      },
      {
        title: 'Home Studio Sessions',
        description: 'Editorial portrait work for independent musicians and small brands.',
        tag: 'Editorial',
      },
    ],
    location: 'Mumbai, India',
    email: 'priya@priyanair.photo',
  },
  {
    slug: 'sam-okafor',
    name: 'Sam Okafor',
    role: 'Content Writer',
    category: 'Writing',
    tagline: 'Clear, human writing for products people actually read.',
    accent: '#B23A48',
    accentSubtle: '#F6E7E9',
    initials: 'SO',
    about:
      'I write onboarding copy, help docs, and long-form content for SaaS companies. Previously led content at a fintech startup, taking their docs from confusing to genuinely helpful.',
    skills: ['UX Writing', 'Technical Writing', 'SEO', 'Content Strategy', 'Editing'],
    projects: [
      {
        title: 'Docs Overhaul',
        description: 'Rewrote 120+ help articles, cutting support tickets by 22% in the first quarter.',
        tag: 'Technical Writing',
      },
      {
        title: 'Weekly Product Newsletter',
        description: 'Grew a B2B newsletter from 400 to 9,000 subscribers over 18 months.',
        tag: 'Content',
      },
      {
        title: 'Onboarding Copy Refresh',
        description: 'Rewrote in-app onboarding copy that improved trial-to-paid conversion by 11%.',
        tag: 'UX Writing',
      },
    ],
    location: 'Lagos, Nigeria',
    email: 'sam@samokafor.co',
  },
];

export function getDemoPortfolio(slug: string): DemoPortfolio | undefined {
  return demoPortfolios.find((portfolio) => portfolio.slug === slug);
}
