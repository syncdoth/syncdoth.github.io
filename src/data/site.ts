export const profile = {
  name: 'Sehyun Choi',
  firstName: 'Sehyun',
  lastName: 'Choi',
  role: 'ML Research Scientist at TwelveLabs',
  location: 'South Korea',
  email: 'choisehyun98@gmail.com',
  photo: '/assets/img/prof_pic.jpg',
  resume: '/assets/pdf/resume.pdf',
  description:
    'Sehyun Choi is a machine learning researcher interested in language models, multimodal AI, and dependable model behavior.',
  introduction:
    'I work on language and multimodal models, with a focus on making their capabilities more grounded, reliable, and useful.',
};

export const socialLinks = [
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'GitHub', href: 'https://github.com/syncdoth' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=I_wmwsUAAAAJ' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sehyun-choi-synch/' },
  { label: 'ORCID', href: 'https://orcid.org/0009-0009-3225-9379' },
  { label: 'Medium', href: 'https://medium.com/@choisehyun98' },
  { label: 'X', href: 'https://twitter.com/schoiaj' },
  { label: 'Instagram', href: 'https://www.instagram.com/sync.h/' },
];

export const researchAreas = [
  {
    number: '01',
    title: 'Inference-time optimization',
    description: 'Adapting model behavior at inference time to meet explicit goals and constraints.',
  },
  {
    number: '02',
    title: 'Knowledge grounding',
    description: 'Connecting generated answers to evidence and reducing unsupported claims.',
  },
  {
    number: '03',
    title: 'Compositional generalization',
    description: 'Understanding how models combine familiar concepts to handle new situations.',
  },
  {
    number: '04',
    title: 'World models',
    description: 'Studying how AI systems represent commonsense and how the world works.',
  },
];

export const navigation = [
  { label: 'About', href: '/' },
  { label: 'Research', href: '/research/' },
  { label: 'Experience', href: '/experiences/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Writing', href: '/blog/' },
];
