export type Publication = {
  title: string;
  authors: string[];
  year: number;
  venue: string;
  links: { label: string; href: string }[];
  selected?: boolean;
  abstract?: string;
};

export const publications: Publication[] = [
  {
    title: 'AbsInstruct: Eliciting Abstraction Ability from LLMs through Explanation Tuning with Plausibility Estimation',
    authors: ['Zhaowei Wang', 'Wei Fan', 'Qing Zong', 'Hongming Zhang', 'Sehyun Choi', 'Tianqing Fang', 'Xin Liu', 'Yangqiu Song', 'Ginny Wong', 'Simon See'],
    year: 2024,
    venue: 'ACL 2024',
    links: [
      { label: 'Paper', href: 'https://aclanthology.org/2024.acl-long.55/' },
      { label: 'DOI', href: 'https://doi.org/10.18653/v1/2024.acl-long.55' },
    ],
    abstract: 'AbsInstruct enhances language models’ abstraction ability through instruction tuning with detailed explanations and a plausibility estimator, while maintaining general instruction-following abilities.',
  },
  {
    title: 'AbsPyramid: Benchmarking the Abstraction Ability of Language Models with a Unified Entailment Graph',
    authors: ['Zhaowei Wang', 'Haochen Shi', 'Weiqi Wang', 'Tianqing Fang', 'Hongming Zhang', 'Sehyun Choi', 'Xin Liu', 'Yangqiu Song'],
    year: 2024,
    venue: 'NAACL 2024 Findings',
    links: [
      { label: 'Paper', href: 'https://aclanthology.org/2024.findings-naacl.252/' },
      { label: 'DOI', href: 'https://doi.org/10.18653/v1/2024.findings-naacl.252' },
    ],
    abstract: 'AbsPyramid is a unified entailment graph of 221K textual descriptions of abstraction knowledge, designed to evaluate language models’ abstraction ability across diverse events.',
  },
  {
    title: 'Parameter-Efficient Checkpoint Merging via Metrics-Weighted Averaging',
    authors: ['Shi Jie Yu, Sehyun Choi'],
    year: 2025,
    venue: 'arXiv preprint',
    selected: true,
    links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/2504.18580' }],
  },
  {
    title: 'Cross-Architecture Transfer Learning for Linear-Cost Inference Transformers',
    authors: ['Sehyun Choi'],
    year: 2024,
    venue: 'arXiv preprint',
    selected: true,
    links: [{ label: 'arXiv', href: 'https://arxiv.org/abs/2404.02684' }],
  },
  {
    title: 'KCTS: Knowledge-Constrained Tree Search Decoding with Token-Level Hallucination Detection',
    authors: ['Sehyun Choi', 'Tianqing Fang', 'Zhaowei Wang', 'Yangqiu Song'],
    year: 2023,
    venue: 'EMNLP 2023',
    selected: true,
    links: [
      { label: 'Paper', href: 'https://aclanthology.org/2023.emnlp-main.867/' },
      { label: 'PDF', href: '/assets/pdf/emnlp2023-kcts.pdf' },
      { label: 'Code', href: 'https://github.com/HKUST-KnowComp/Knowledge-Constrained-Decoding' },
      { label: 'Poster', href: '/assets/pdf/kcts_poster.pdf' },
      { label: 'Slides', href: '/assets/pdf/kcts_slides.pdf' },
    ],
    abstract: 'KCTS guides a frozen language model to generate text aligned with reference knowledge using knowledge-classifier scores and Monte Carlo Tree Search. It also introduces RIPA, a token-level hallucination detection method.',
  },
  {
    title: 'CKBP v2: An Expert-Annotated Evaluation Set for Commonsense Knowledge Base Population',
    authors: ['Tianqing Fang', 'Quyet V. Do', 'Sehyun Choi', 'Weiqi Wang', 'Yangqiu Song'],
    year: 2023,
    venue: 'arXiv preprint',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2304.10392' },
      { label: 'Code', href: 'https://github.com/HKUST-KnowComp/CSKB-Population' },
    ],
  },
  {
    title: 'Benchmarking Commonsense Knowledge Base Population with an Effective Evaluation Dataset',
    authors: ['Tianqing Fang', 'Weiqi Wang', 'Sehyun Choi', 'Shibo Hao', 'Hongming Zhang', 'Yangqiu Song', 'Bin He'],
    year: 2021,
    venue: 'EMNLP 2021',
    selected: true,
    links: [
      { label: 'Paper', href: 'https://aclanthology.org/2021.emnlp-main.705/' },
      { label: 'Code', href: 'https://github.com/HKUST-KnowComp/CSKB-Population' },
    ],
  },
  {
    title: 'Fine-grained Pneumonia Detection from Chest X-Rays Using Complementary Model Training',
    authors: ['Duhyeuk Chang', 'Sungbin Lee', 'Sehyun Choi'],
    year: 2021,
    venue: '한국정보과학회 학술발표논문집',
    links: [{ label: 'DBpia', href: 'https://www.dbpia.co.kr/Journal/articleDetail?nodeId=NODE10583150' }],
  },
];
