
export type LegislationCategory = 'Regulatory Decision' | 'Executive Regulations' | 'Federal Law' | 'Residence' | 'Work' | 'Health' | 'Education';

export type Legislation = {
  id: string;
  slug: string;
  title: string;
  category: LegislationCategory;
  date: string;
  summary: string;
  fullText: string;
};

const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam. Modiin telus. Praesent dictum, velit non conseqrci nec nonummy molestie, enim est. ";

const legislations: Legislation[] = [
  {
    id: '1',
    slug: 'federal-law-no-1-2024',
    title: 'Federal Law No. 1 of 2024 on Corporate Governance',
    category: 'Federal Law',
    date: '2024-01-15',
    summary: 'Establishes new frameworks for corporate governance applicable to all mainland companies in the UAE.',
    fullText: `Article 1: Definitions. ${LOREM_IPSUM} Article 2: Scope of Application. ${LOREM_IPSUM} Article 3: Board of Directors Composition. ${LOREM_IPSUM} Article 4: Shareholder Rights. ${LOREM_IPSUM}`
  },
  {
    id: '2',
    slug: 'executive-regulation-no-5-2023',
    title: 'Executive Regulation No. 5 of 2023 for Data Protection',
    category: 'Executive Regulations',
    date: '2023-11-20',
    summary: 'Details the implementation of the UAE Data Protection Law, including data controller and processor obligations.',
    fullText: `Chapter 1: General Provisions. ${LOREM_IPSUM} Chapter 2: Data Processing Records. ${LOREM_IPSUM} Chapter 3: Data Protection Impact Assessments. ${LOREM_IPSUM}`
  },
  {
    id: '3',
    slug: 'regulatory-decision-no-12-2024',
    title: 'Regulatory Decision No. 12 of 2024 on Digital Assets',
    category: 'Regulatory Decision',
    date: '2024-03-05',
    summary: 'Introduces a licensing regime for digital asset exchanges and custodians operating within the financial free zones.',
    fullText: `Section A: Licensing Requirements. ${LOREM_IPSUM} Section B: Technology and Security Standards. ${LOREM_IPSUM} Section C: Anti-Money Laundering (AML) Compliance. ${LOREM_IPSUM}`
  },
  {
    id: '4',
    slug: 'residence-visa-update-2024',
    title: 'Updates to Golden Visa and Green Visa Programs',
    category: 'Residence',
    date: '2024-02-10',
    summary: 'Expands the eligibility criteria for long-term residence visas, including new categories for professionals and investors.',
    fullText: `Part 1: Golden Visa Amendments. ${LOREM_IPSUM} Part 2: Green Visa for Skilled Professionals. ${LOREM_IPSUM} Part 3: Application Process. ${LOREM_IPSUM}`
  },
  {
    id: '5',
    slug: 'work-permit-reforms-2024',
    title: 'New Ministerial Decree on Work Permit Reforms',
    category: 'Work',
    date: '2024-04-01',
    summary: 'Streamlines the process for obtaining work permits and introduces new flexible and part-time work options.',
    fullText: `Decree Article 1: New Permit Types. ${LOREM_IPSUM} Decree Article 2: Sponsorship Rules. ${LOREM_IPSUM}`
  },
  {
    id: '6',
    slug: 'federal-law-no-2-2024-environment',
    title: 'Federal Law No. 2 of 2024 on Environmental Protection',
    category: 'Federal Law',
    date: '2024-05-20',
    summary: 'Imposes stricter regulations on industrial emissions and waste management to align with national climate goals.',
    fullText: `Article 1: Scope. ${LOREM_IPSUM} Article 2: Prohibited Activities. ${LOREM_IPSUM} Article 3: Penalties. ${LOREM_IPSUM}`
  },
  {
    id: '7',
    slug: 'executive-regulation-no-2-2024-real-estate',
    title: 'Executive Regulation No. 2 of 2024 on Real Estate Transparency',
    category: 'Executive Regulations',
    date: '2024-06-11',
    summary: 'Mandates disclosure of ultimate beneficial ownership for all real estate transactions.',
    fullText: `Provision 1. ${LOREM_IPSUM} Provision 2. ${LOREM_IPSUM}`
  },
  {
    id: '8',
    slug: 'health-data-law-2024',
    title: 'Federal Law No. 3 of 2024 on Health Data Management',
    category: 'Health',
    date: '2024-07-15',
    summary: 'Regulates the processing and sharing of health data to ensure patient privacy and security.',
    fullText: `Article 1: Definitions. ${LOREM_IPSUM} Article 2: Patient Consent. ${LOREM_IPSUM}`
  },
  {
    id: '9',
    slug: 'education-licensing-standards-2024',
    title: 'Regulatory Decision No. 15 of 2024 on Higher Education Licensing',
    category: 'Education',
    date: '2024-08-01',
    summary: 'Sets new standards for the accreditation and licensing of universities and academic programs.',
    fullText: `Section A: Institutional Licensing. ${LOREM_IPSUM} Section B: Program Accreditation. ${LOREM_IPSUM}`
  }
];

export const getLegislations = (query?: string | null) => {
  if (!query) {
    return legislations;
  }
  const lowerCaseQuery = query.toLowerCase();
  return legislations.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerCaseQuery) ||
      item.summary.toLowerCase().includes(lowerCaseQuery) ||
      item.category.toLowerCase().includes(lowerCaseQuery)
  );
};

export const getLegislationBySlug = (slug: string) => {
  return legislations.find((item) => item.slug === slug);
};

export const getLegislationsByCategory = (category: string) => {
  const decodedCategory = decodeURIComponent(category).replace(/-/g, ' ');
  return legislations.filter((item) => item.category.toLowerCase() === decodedCategory.toLowerCase());
};

export const getCategories = () => {
    const categories: { name: LegislationCategory, slug: string }[] = [
        { name: 'Regulatory Decision', slug: 'regulatory-decision' },
        { name: 'Executive Regulations', slug: 'executive-regulations' },
        { name: 'Federal Law', slug: 'federal-law' },
        { name: 'Residence', slug: 'residence' },
        { name: 'Work', slug: 'work' },
        { name: 'Health', slug: 'health' },
        { name: 'Education', slug: 'education' },
    ];
    return categories;
}

export const getLegislationStats = () => {
  const stats: { [key in LegislationCategory]: number } = {
    'Regulatory Decision': 0,
    'Executive Regulations': 0,
    'Federal Law': 0,
    'Residence': 0,
    'Work': 0,
    'Health': 0,
    'Education': 0
  };
  legislations.forEach((item) => {
    if (stats[item.category] !== undefined) {
      stats[item.category] += 1;
    }
  });
  return Object.entries(stats).map(([name, value]) => ({ name: name as LegislationCategory, value }));
};
