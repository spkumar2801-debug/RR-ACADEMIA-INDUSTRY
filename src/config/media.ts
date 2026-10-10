export interface MediaItem {
  id: string;
  slotKey: string;
  title: string;
  description: string;
  url: string;
  alt: string;
  category: 'hero' | 'about' | 'service' | 'summit' | 'gallery' | 'branding';
  aspectRatio: '16/9' | '4/3' | '1/1' | '21/9' | '3/2';
  cloudinaryPublicId?: string;
  isPlaceholder?: boolean;
}

export const defaultMediaItems: Record<string, MediaItem> = {
  heroBanner: {
    id: 'hero-banner',
    slotKey: 'heroBanner',
    title: 'Google AMG Academia-Industry Connect Summit',
    description: 'RR Academia & Industry Connect summit bridging thousands of engineering students directly with industry leaders.',
    url: '/images/students-google-amg-connect.jpg',
    alt: 'Thousands of engineering students at RR Academia & Google AMG mega summit',
    category: 'hero',
    aspectRatio: '16/9'
  },
  keynoteSpeaker: {
    id: 'keynote-speaker',
    slotKey: 'keynoteSpeaker',
    title: 'Keynote Address at AMG Summit',
    description: 'Visionary leadership delivering insights on industry-aligned curricula and emerging technology competencies.',
    url: '/images/summit-keynote-podium.jpg',
    alt: 'Leadership keynote address at RR Academia and Ashokrao Mane Group symposium',
    category: 'summit',
    aspectRatio: '3/2'
  },
  ribbonCutting: {
    id: 'ribbon-cutting',
    slotKey: 'ribbonCutting',
    title: 'Inauguration of Industry Center',
    description: 'Dignitaries inaugurating advanced industry collaboration center with academic leadership.',
    url: '/images/inauguration-ribbon-cutting.jpg',
    alt: 'Ribbon cutting ceremony inaugurating industry facility with academic partners',
    category: 'about',
    aspectRatio: '3/2'
  },
  leadershipLighting: {
    id: 'leadership-lighting',
    slotKey: 'leadershipLighting',
    title: 'Dignitaries & Academic Leadership',
    description: 'Joint academic and industry leadership lighting ceremonial lamp at RR Academia summit.',
    url: '/images/industry-leadership-lighting.jpg',
    alt: 'Academic and industrial leaders at ceremonial lamp lighting ceremony',
    category: 'summit',
    aspectRatio: '16/9'
  },
  grandAuditorium: {
    id: 'grand-auditorium',
    slotKey: 'grandAuditorium',
    title: 'Grand Open-Air Campus Summit',
    description: 'Over 2,500 students and educators participating in real-time industry placement and technology orientation.',
    url: '/images/grand-auditorium-summit.jpg',
    alt: 'Panoramic view of full campus audience at RR Academia industry summit',
    category: 'gallery',
    aspectRatio: '21/9'
  },
  aboutMain: {
    id: 'about-main',
    slotKey: 'aboutMain',
    title: 'Transforming Educational Institutions into Talent Powerhouses',
    description: 'Bridging higher education institutions in Hyderabad with corporate industry standards.',
    url: '/images/original-about.jpg',
    alt: 'Modern campus collaboration and higher educational consulting',
    category: 'about',
    aspectRatio: '4/3'
  },
  serviceCollaboration: {
    id: 'service-collab',
    slotKey: 'serviceCollaboration',
    title: 'Industry–Academia Collaboration',
    description: 'Foster strategic partnerships between educational institutions and corporate leaders for mutual growth.',
    url: '/images/original-hero.jpg',
    alt: 'Industry and academia collaboration meeting and partnership',
    category: 'service',
    aspectRatio: '16/9'
  },
  servicePlacement: {
    id: 'service-placement',
    slotKey: 'servicePlacement',
    title: 'Internship & Placement Support',
    description: 'Connect students with top companies through structured internship programs and placement drives.',
    url: '/images/original-placement.jpg',
    alt: 'Students celebrating successful corporate placement offers',
    category: 'service',
    aspectRatio: '16/9'
  },
  serviceSkills: {
    id: 'service-skills',
    slotKey: 'serviceSkills',
    title: 'Student Skill Development',
    description: 'Comprehensive training programs designed to equip students with industry-relevant competencies.',
    url: '/images/original-training.jpg',
    alt: 'Practical technology training and skill development lab',
    category: 'service',
    aspectRatio: '16/9'
  },
  serviceCurriculum: {
    id: 'service-curriculum',
    slotKey: 'serviceCurriculum',
    title: 'Curriculum Enhancement',
    description: 'Modernize curricula with industry insights to ensure graduates meet dynamic real-world market demands.',
    url: '/images/original-curriculum.jpg',
    alt: 'Modernized curriculum design and faculty syllabus workshop',
    category: 'service',
    aspectRatio: '16/9'
  },
  serviceResearch: {
    id: 'service-research',
    slotKey: 'serviceResearch',
    title: 'Research & Consultancy',
    description: 'Facilitate collaborative research projects and provide expert consultancy for institutional excellence.',
    url: '/images/original-innovation.jpg',
    alt: 'Advanced research laboratory and industrial consultancy',
    category: 'service',
    aspectRatio: '16/9'
  }
};

/**
 * Registry mapping slot keys to current media items.
 * Can be dynamically augmented with Firebase Firestore overrides or Cloudinary URLs.
 */
let dynamicMediaOverrides: Record<string, Partial<MediaItem>> = {};

export function setMediaOverrides(overrides: Record<string, Partial<MediaItem>>) {
  dynamicMediaOverrides = { ...dynamicMediaOverrides, ...overrides };
}

export function getMediaItem(slotKey: string): MediaItem {
  const base = defaultMediaItems[slotKey] || {
    id: slotKey,
    slotKey,
    title: slotKey,
    description: 'RR Academia & Industry Media Asset',
    url: '/images/students-google-amg-connect.jpg',
    alt: 'RR Academia & Industry Connect',
    category: 'gallery',
    aspectRatio: '16/9',
    isPlaceholder: true
  };

  const override = dynamicMediaOverrides[slotKey];
  if (!override) return base;

  return { ...base, ...override };
}

export function getAllMediaItems(): MediaItem[] {
  return Object.keys(defaultMediaItems).map((key) => getMediaItem(key));
}
