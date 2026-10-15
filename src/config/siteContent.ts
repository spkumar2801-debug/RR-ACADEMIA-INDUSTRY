export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  mediaSlot: string;
  imageUrl: string;
  highlights: string[];
  deliverables: string[];
  order: number;
  published: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  institution: string;
  testimonial: string;
  rating: number;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string;
  category?: string;
  websiteUrl?: string;
  sortOrder: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  imageUrl: string;
  cloudinaryPublicId?: string;
  altText: string;
  category: 'summits' | 'orientations' | 'mou' | 'workshops' | 'all';
  sortOrder: number;
  published: boolean;
  date?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  email: string;
  location: string;
  officeHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  phoneDisplay: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  heroHeadline: string;
  heroSubheadline: string;
}

export const defaultSiteSettings: SiteSettings = {
  brandName: "RR Academia & Industry Connect",
  tagline: "Bridging Education & Industry in Hyderabad and Nationwide",
  email: "contact@rracademiaindustry.com",
  location: "Hyderabad, Telangana, India",
  phoneDisplay: "Available upon institutional request",
  officeHours: {
    weekdays: "9:00 AM - 6:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Closed"
  },
  socials: {
    linkedin: "https://linkedin.com/company/rr-academia",
    twitter: "https://twitter.com/RRAcademia"
  },
  heroHeadline: "Where Academia Meets Industry Excellence",
  heroSubheadline: "We bridge the gap between education and employment. Partner with us to deliver industry-aligned curriculum, hands-on training, and guaranteed placement opportunities that transform students into career-ready professionals."
};

export const verifiedServices: ServiceItem[] = [
  {
    id: "serv-1",
    slug: "industry-academia-collaboration",
    title: "Industry–Academia Collaboration",
    shortDescription: "Foster strategic partnerships between educational institutions and leading corporations for mutual growth.",
    fullDescription: "We build long-term, mutually beneficial bridges between universities and Fortune 500 corporations. Our structured collaboration framework facilitates industry visits, guest lectures, corporate sponsorship, joint labs, and bilateral MoUs that empower academic departments with current market relevancy.",
    iconName: "Handshake",
    mediaSlot: "serviceCollaboration",
    imageUrl: "/images/original-hero.jpg",
    highlights: [
      "Strategic bilateral MoUs with corporate partners",
      "Executive guest lectures and masterclasses",
      "Industry-sponsored centers of excellence",
      "Collaborative project mentorship"
    ],
    deliverables: ["Institutional MoU Framework", "Corporate Partner Network Access", "Quarterly Advisory Board Engagements"],
    order: 1,
    published: true
  },
  {
    id: "serv-2",
    slug: "internship-placement-support",
    title: "Internship & Placement Support",
    shortDescription: "Connect students with top companies through structured internship programs and placement assistance.",
    fullDescription: "Maximize career placement rates for your graduating cohorts. We provide rigorous pre-placement bootcamps, resume audits, mock technical and HR interviews, accompanied by active corporate placement recruitment drives across engineering, management, and technology sectors.",
    iconName: "Briefcase",
    mediaSlot: "servicePlacement",
    imageUrl: "/images/original-placement.jpg",
    highlights: [
      "Direct campus placement drives with vetted recruiters",
      "Paid internships and pre-placement offer pipelines",
      "Interview simulation and technical coding readiness",
      "Alumni tracking and continuous placement analytics"
    ],
    deliverables: ["Dedicated Placement Drives", "Student Portfolio Optimization", "Placement Analytics Dashboard"],
    order: 2,
    published: true
  },
  {
    id: "serv-3",
    slug: "student-skill-development",
    title: "Student Skill Development",
    shortDescription: "Comprehensive training programs designed to equip students with industry-relevant skills and competencies.",
    fullDescription: "Bridge the disconnect between theoretical textbook learning and practical enterprise workflows. Our specialized training programs cover Full-Stack Development, Cloud Computing, AI & Data Science, DevOps, and Essential Professional Communication.",
    iconName: "GraduationCap",
    mediaSlot: "serviceSkills",
    imageUrl: "/images/original-training.jpg",
    highlights: [
      "Hands-on project-based technical immersion",
      "Industry credentialing and certification roadmaps",
      "Soft skills, leadership, and workplace ethics",
      "Domain-specific hackathons and capstone evaluation"
    ],
    deliverables: ["Competency Assessment Reports", "Verified Student Credentials", "Capstone Showcase Days"],
    order: 3,
    published: true
  },
  {
    id: "serv-4",
    slug: "curriculum-enhancement",
    title: "Curriculum Enhancement",
    shortDescription: "Modernize curricula with industry insights to ensure graduates meet current market demands.",
    fullDescription: "Syllabi that lag behind technological shifts disservice students. Our academic consultants work alongside university boards of studies to integrate emerging technological practices, industry case studies, and agile problem solving into course curricula.",
    iconName: "BookOpen",
    mediaSlot: "serviceCurriculum",
    imageUrl: "/images/original-curriculum.jpg",
    highlights: [
      "Curriculum alignment with ABET, NBA, and AICTE frameworks",
      "Integration of real corporate case studies",
      "Laboratory syllabus overhaul for practical application",
      "Interdisciplinary elective modules"
    ],
    deliverables: ["Syllabus Modernization Dossier", "Pedagogical Guide for Faculty", "Resource & Lab Blueprint"],
    order: 4,
    published: true
  },
  {
    id: "serv-5",
    slug: "research-consultancy",
    title: "Research & Consultancy",
    shortDescription: "Facilitate collaborative research projects and provide expert consultancy for academic excellence.",
    fullDescription: "Accelerate institutional intellectual property generation and research publications. We link faculty scholars with corporate research challenges, grant-writing resources, and patent application guidance.",
    iconName: "FlaskConical",
    mediaSlot: "serviceResearch",
    imageUrl: "/images/original-innovation.jpg",
    highlights: [
      "Industry-sponsored research grants and contracts",
      "Patent drafting and intellectual property filing guidance",
      "High-impact journal publication assistance",
      "Inter-institutional research consortiums"
    ],
    deliverables: ["R&D Project Proposals", "Patent Submission Dossiers", "Research Output Metrics"],
    order: 5,
    published: true
  },
  {
    id: "serv-6",
    slug: "startup-innovation-support",
    title: "Startup & Innovation Support",
    shortDescription: "Nurture entrepreneurial mindset through incubation support and innovation workshops.",
    fullDescription: "Turn innovative student and faculty ideas into viable commercial enterprises. We assist colleges in establishing recognized on-campus incubators, securing seed funding, and connecting with angel networks and startup accelerators.",
    iconName: "Rocket",
    mediaSlot: "keynoteSpeaker",
    imageUrl: "/images/summit-keynote-podium.jpg",
    highlights: [
      "Campus incubation setup and governance models",
      "Seed pitch days with active venture investors",
      "Mentorship from experienced tech founders",
      "Legal structuring and intellectual property protection"
    ],
    deliverables: ["Incubator Operational Framework", "Investor Demo Day Access", "Founder Mentorship Sessions"],
    order: 6,
    published: true
  },
  {
    id: "serv-7",
    slug: "institutional-training-programs",
    title: "Institutional Training Programs",
    shortDescription: "Customized faculty development and institutional capability building initiatives.",
    fullDescription: "World-class education requires inspired and continually updated faculty. Our Faculty Development Programs (FDP) expose teaching staff to the latest industry methodologies, hybrid teaching technologies, and research methodologies.",
    iconName: "Users",
    mediaSlot: "heroBanner",
    imageUrl: "/images/students-google-amg-connect.jpg",
    highlights: [
      "Faculty Development Programs (FDPs) led by corporate leads",
      "Digital learning tools and classroom pedagogy",
      "Industry immersion sabbaticals for teaching staff",
      "Institutional leadership and department management training"
    ],
    deliverables: ["Certified FDP Completion", "Faculty Pedagogical Audits", "Teaching Resource Repository"],
    order: 7,
    published: true
  },
  {
    id: "serv-8",
    slug: "accreditation-quality-support",
    title: "Accreditation & Quality Support",
    shortDescription: "Guide institutions through accreditation processes and quality enhancement frameworks.",
    fullDescription: "Achieve the highest national and international accreditation benchmarks. We provide strategic consulting for NAAC, NBA, NIRF, and autonomous status certification, ensuring institutional documentation and quality standards stand up to rigorous peer review.",
    iconName: "Award",
    mediaSlot: "aboutMain",
    imageUrl: "/images/original-about.jpg",
    highlights: [
      "NAAC & NBA gap analysis and readiness assessments",
      "Institutional data compilation and criteria optimization",
      "Mock peer-team inspection visits and reports",
      "Internal Quality Assurance Cell (IQAC) reinforcement"
    ],
    deliverables: ["Accreditation Gap Analysis Report", "Self-Study Report (SSR) Optimization", "Mock Inspection Scorecard"],
    order: 8,
    published: true
  },
  {
    id: "serv-9",
    slug: "institutional-branding-outreach",
    title: "Institutional Branding & Outreach",
    shortDescription: "Strengthen institutional reputation through strategic branding and stakeholder engagement.",
    fullDescription: "Position your educational institution as a top-tier choice for prospective students, faculty, and corporate recruiters. We create comprehensive digital outreach campaigns, stakeholder engagement summits, and PR positioning.",
    iconName: "Megaphone",
    mediaSlot: "leadershipLighting",
    imageUrl: "/images/industry-leadership-lighting.jpg",
    highlights: [
      "Institutional reputation management and positioning",
      "Recruitment branding and admission campaign strategy",
      "National and regional media visibility",
      "Alumni engagement and community outreach systems"
    ],
    deliverables: ["Brand Identity & Communication Guidelines", "Outreach Campaign Metrics", "Media Relations Strategy"],
    order: 9,
    published: true
  },
  {
    id: "serv-10",
    slug: "custom-solutions",
    title: "Custom Solutions",
    shortDescription: "Tailored services to address unique challenges and opportunities in your educational ecosystem.",
    fullDescription: "Every educational institution has distinctive demographic strengths, legacy traditions, and regional demands. We develop customized consultancy packages covering everything from campus digitization to niche vocational alliances.",
    iconName: "Sliders",
    mediaSlot: "ribbonCutting",
    imageUrl: "/images/inauguration-ribbon-cutting.jpg",
    highlights: [
      "Diagnostic institutional health assessments",
      "Bespoke technology infrastructure consulting",
      "Specialized vocational and corporate training modules",
      "Executive transformation advisory for college leadership"
    ],
    deliverables: ["Customized Roadmap & Milestones", "Dedicated Advisory Account Manager", "Impact KPI Audit"],
    order: 10,
    published: true
  }
];

export const verifiedStats: StatItem[] = [
  { value: 500, suffix: "+", label: "Industry Partners", description: "Leading corporate organizations collaborating with our institutional network" },
  { value: 50000, suffix: "+", label: "Students Impacted", description: "Graduates trained in industry competencies and enterprise workflows" },
  { value: 95, suffix: "%", label: "Placement Rate", description: "Consistently achieved placement track record across partner colleges" },
  { value: 100, suffix: "+", label: "Institutional MoUs", description: "Accredited engineering colleges and universities in active partnership" }
];

export const verifiedWhyUs = [
  {
    title: "Proven Track Record",
    description: "Over 500+ successful industry partnerships and a verified 95% student placement rate across institutions.",
    iconName: "TrendingUp"
  },
  {
    title: "Expert Team",
    description: "Led by veteran educationists and corporate leadership who understand both curriculum frameworks and enterprise hiring needs.",
    iconName: "UsersCheck"
  },
  {
    title: "Wide Network",
    description: "Deep roots across tech giants, manufacturing leaders, healthcare, and engineering conglomerates in Hyderabad and nationwide.",
    iconName: "Network"
  },
  {
    title: "Customized Approach",
    description: "No boilerplate blueprints. We tailor every intervention to your institution's specific tier, region, faculty profile, and goals.",
    iconName: "Settings"
  },
  {
    title: "Measurable Results",
    description: "Data-driven metrics including placement percentages, salary increments, accreditation scores, and research publications.",
    iconName: "BarChart"
  },
  {
    title: "End-to-End Support",
    description: "We don't just deliver advice—we partner with your administration to execute programs, manage corporate drives, and ensure success.",
    iconName: "ShieldCheck"
  }
];

export const verifiedCoreValues = [
  { title: "Innovation", description: "Pioneering new approaches to bridge the academia-industry gap with modern technologies and dynamic curricula." },
  { title: "Excellence", description: "Delivering world-class training, high standards of accreditation support, and exceptional placement benchmarks." },
  { title: "Collaboration", description: "Building transparent, mutually rewarding partnerships across universities, students, and corporate institutions." },
  { title: "Impact", description: "Focusing on tangible, measurable transformations in student careers and institutional prestige." }
];

export const verifiedTestimonials: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Dr. Rajesh Kumar",
    role: "Dean, Engineering College",
    institution: "Hyderabad Institute of Technology",
    testimonial: "RR Academia has transformed our placement outcomes. Their industry connections and strategic approach helped us achieve a 92% placement rate, up from 65% last year.",
    rating: 5
  },
  {
    id: "test-2",
    name: "Prof. Sunita Reddy",
    role: "Head of Department",
    institution: "Global Business School",
    testimonial: "The curriculum enhancement program was exactly what we needed. Our students now graduate with skills that companies actually want, not just theoretical knowledge.",
    rating: 5
  },
  {
    id: "test-3",
    name: "Priya Sharma",
    role: "Student, Final Year",
    institution: "Technology University",
    testimonial: "Thanks to the internship program, I landed my dream job at a Fortune 500 company. The training sessions were invaluable in preparing me for interviews.",
    rating: 5
  },
  {
    id: "test-4",
    name: "Dr. Anil Mehta",
    role: "Principal",
    institution: "Modern College of Engineering",
    testimonial: "Outstanding support throughout our accreditation process. Their expertise and guidance ensured we met all standards with flying colors.",
    rating: 5
  }
];

export const verifiedFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "What services does RR Academia & Industry Connect offer?",
    answer: "We provide comprehensive solutions including industry-academia collaboration, internship and placement support, student skill development, curriculum enhancement, research consultancy, startup support, institutional training, accreditation guidance, branding services, and custom educational solutions."
  },
  {
    id: "faq-2",
    question: "How can my institution benefit from your services?",
    answer: "Our services help institutions improve placement rates, enhance curriculum relevance, build industry partnerships, achieve accreditation standards, develop faculty capabilities, and strengthen institutional reputation in the competitive education landscape."
  },
  {
    id: "faq-3",
    question: "What is your approach to industry partnerships?",
    answer: "We facilitate strategic partnerships by understanding both institutional goals and industry requirements, creating mutually beneficial collaborations through structured programs, regular engagement, and measurable outcomes."
  },
  {
    id: "faq-4",
    question: "How long does it take to see tangible results?",
    answer: "Results vary based on the service and institutional context. Typically, placement programs show improvement within 6-12 months, while curriculum changes and accreditation support may take 1-2 years for full implementation and impact."
  },
  {
    id: "faq-5",
    question: "What makes RR Academia different from other consultancies?",
    answer: "Our unique combination of deep industry connections, academic expertise, customized solutions, proven track record, and end-to-end support sets us apart. We don't just advise — we partner with you for success."
  },
  {
    id: "faq-6",
    question: "How do you measure success?",
    answer: "We use data-driven metrics including placement rates, student skill assessments, employer feedback, accreditation outcomes, research outputs, and long-term career progression of students."
  },
  {
    id: "faq-7",
    question: "Can customized programs be designed for specific colleges?",
    answer: "Yes, every institution has unique student demographics and institutional strengths. We tailor programs specifically to your department requirements, regional context, and growth targets."
  },
  {
    id: "faq-8",
    question: "How can we get started with RR Academia?",
    answer: "Simply schedule a consultation with us. We'll understand your needs, conduct an assessment, propose tailored solutions, and create an implementation roadmap. Contact us at contact@rracademiaindustry.com or submit the enquiry form on our website."
  }
];

export const verifiedPartners: PartnerItem[] = [
  {
    id: "partner-google",
    name: "Google",
    logoUrl: "",
    description: "Global Technology & Cloud Ecosystem Partner for Student Enablement and Digital Skilling.",
    category: "Technology",
    websiteUrl: "https://about.google",
    sortOrder: 1,
    published: true
  },
  {
    id: "partner-redington",
    name: "Redington",
    logoUrl: "",
    description: "Enterprise Supply Chain & IT Distribution Partner connecting academia with corporate infrastructure.",
    category: "Enterprise IT",
    websiteUrl: "https://redingtongroup.com",
    sortOrder: 2,
    published: true
  },
  {
    id: "partner-amg",
    name: "Aahokrao Mane Group",
    logoUrl: "",
    description: "Premier Institutional Education Group collaborating on regional placement drives and faculty empowerment.",
    category: "Institutional",
    websiteUrl: "#",
    sortOrder: 3,
    published: true
  },
  {
    id: "partner-upl",
    name: "UPL",
    logoUrl: "/images/upl.png.jpeg",
    description: "Global Sustainable Agriculture & Chemical Enterprise Partner for industrial internships and sustainability research.",
    category: "Industrial & Agrotech",
    websiteUrl: "https://www.upl-ltd.com",
    sortOrder: 4,
    published: true
  },
  {
    id: "partner-nasscom",
    name: "NASSCOM",
    logoUrl: "",
    description: "National IT-BPM Industry Association Partner advancing future skills curriculum and corporate placement standards.",
    category: "Industry Body",
    websiteUrl: "https://nasscom.in",
    sortOrder: 5,
    published: true
  }
];

export const verifiedGalleryItems: GalleryItem[] = [
  {
    id: "gal-brand-identity",
    title: "RR Academia & Industry Connect — Brand Identity",
    caption: "Official institutional emblem combining 3D metallic RR monogram, interconnected molecular nodes, and corporate collaboration identity.",
    imageUrl: "/images/rr-logo-master.png",
    altText: "RR Academia & Industry Connect — Brand Identity",
    category: "mou",
    sortOrder: 1,
    published: true,
    date: "Brand Identity Release",
    location: "Executive Directorate"
  },
  {
    id: "gal-1",
    title: "Grand Auditorium Industry Summit",
    caption: "Over 2,500 students and academic deans gathered for the national Industry–Academia Conclave.",
    imageUrl: "/images/grand-auditorium-summit.jpg",
    altText: "Packed auditorium at RR Academia & Industry Summit with corporate dignitaries",
    category: "summits",
    sortOrder: 2,
    published: true,
    date: "Annual Conclave",
    location: "Main Convention Center"
  },
  {
    id: "gal-2",
    title: "Google & AMG Orientation Drive",
    caption: "Student leadership orientation session conducted in partnership with Google and AMG representatives.",
    imageUrl: "/images/students-google-amg-connect.jpg",
    altText: "Engineering students attending Google & AMG career orientation program",
    category: "orientations",
    sortOrder: 3,
    published: true,
    date: "Corporate Orientation",
    location: "Auditorium Hall"
  },
  {
    id: "gal-3",
    title: "Auspicious Lamp Lighting Ceremony",
    caption: "Dignitaries inaugurating the National Skill Alignment and Placement Conclave.",
    imageUrl: "/images/industry-leadership-lighting.jpg",
    altText: "Corporate executives and academic heads performing the inaugural lamp lighting",
    category: "summits",
    sortOrder: 4,
    published: true,
    date: "Inaugural Ceremony",
    location: "Executive Stage"
  },
  {
    id: "gal-4",
    title: "MoU & Facility Ribbon Cutting",
    caption: "Formal inauguration of the Corporate Excellence Centre and institutional collaboration hub.",
    imageUrl: "/images/inauguration-ribbon-cutting.jpg",
    altText: "Leadership cutting ribbon for the new institutional collaboration facility",
    category: "mou",
    sortOrder: 5,
    published: true,
    date: "Campus Launch",
    location: "Technology Block"
  },
  {
    id: "gal-5",
    title: "Keynote Address by Industry Leaders",
    caption: "Executive address on navigating industry 4.0 transitions, AI skills, and corporate recruitment expectations.",
    imageUrl: "/images/summit-keynote-podium.jpg",
    altText: "Keynote speaker addressing university vice-chancellors and corporate delegates",
    category: "summits",
    sortOrder: 6,
    published: true,
    date: "Executive Keynote",
    location: "Summit Stage"
  },
  {
    id: "gal-6",
    title: "Curriculum Modernization & Pedagogy Workshop",
    caption: "Academic department heads reviewing industry-benchmarked syllabi for NAAC and NBA criteria.",
    imageUrl: "/images/original-curriculum.jpg",
    altText: "Faculty and corporate mentors working together on curriculum enhancement",
    category: "workshops",
    sortOrder: 7,
    published: true,
    date: "Academic Review",
    location: "Academic Council Room"
  }
];

