// ALL site copy lives here. Edit this file to update the site.
// Lines marked with a to-do note show details Edwin still needs to supply (run: npm run check:launch).

export type Project = {
  slug: string;
  name: string;
  group: "featured" | "security";
  status: "live" | "in-progress" | "completed";
  tags: string[];
  summary: string;
  art: "cards" | "cube" | "grid" | "nodes" | "chat" | "image" | "shield" | "cipher" | "book" | "device";
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
};

export const site = {
  name: "Edwin Safo",
  role: "Software Developer",
  location: "Accra, Ghana",
  email: "official.edwinsafo@gmail.com",
  linkedin: "https://www.linkedin.com/in/edwin-safo-6264662ba",
  github: "https://github.com/Ed-crze" as string | undefined,
  cv: "/Edwin-Safo-CV.pdf", // TODO: Edwin supplies public/Edwin-Safo-CV.pdf
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  school: "Ghana Communication Technology University",
  description:
    "Edwin Safo is a software developer in Accra, Ghana building full-stack and AI-driven products, with IT support and cybersecurity skills.",
};

export const nav = [
  { label: "Projects", id: "projects" },
  { label: "Security lab", id: "security-lab" },
  { label: "Stack", id: "stack" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
] as const;

export const hero = {
  before: "I build software that works and",
  italic: "holds up.",
  sub: "Software developer and BSc IT graduate from GCTU. I build full-stack and AI-driven products with TypeScript, Next.js, Supabase and Python, with a growing focus on cybersecurity.",
  primary: "View projects",
  secondary: "Download CV",
};

export const tools = {
  label: "Tools I work with",
  items: ["TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Express", "Supabase", "PostgreSQL", "MySQL", "Python", "C++"],
};

export const showcase = {
  heading: "Full-stack products, built end to end.",
  sub: "From the database to the interface, with security in mind.",
  filename: "edwin.ts",
};

export const projectsSection = { heading: "Projects" };

export const projects: Project[] = [
  {
    slug: "gt-vote",
    name: "GT Vote",
    group: "featured",
    status: "completed",
    tags: [], // TODO: add the GT Vote stack
    summary: "An election management platform for running and managing voting.",
    art: "cards",
  },
  {
    slug: "ticketing-platform",
    name: "Ticketing platform",
    group: "featured",
    status: "in-progress",
    tags: [], // TODO: add the ticketing platform stack
    summary: "A ticketing platform I'm building now.",
    art: "cube",
  },
  {
    slug: "student-registration",
    name: "Student Registration Platform",
    group: "featured",
    status: "completed",
    tags: ["C++", "MySQL"],
    summary: "A student registration system written in C++ with a MySQL database connected through code.",
    art: "grid",
  },
  {
    slug: "tiny-sparkles",
    name: "Tiny Sparkles school platform",
    group: "featured",
    status: "in-progress",
    tags: [], // TODO: add the Tiny Sparkles stack
    summary: "A school website with a school management platform for Tiny Sparkles. I'm building it now.",
    art: "book",
  },
  {
    slug: "gses",
    name: "GSES",
    group: "featured",
    status: "completed",
    tags: [], // TODO: add the GSES stack and live link
    summary:
      "A platform for reliable electronic device services: fast, affordable and efficient, keeping gadgets running smoothly. I collaborated on it.",
    art: "device",
  },
  {
    slug: "cyber-pulse",
    name: "Cyber Pulse",
    group: "featured",
    status: "completed",
    tags: [], // TODO: add the Cyber Pulse stack
    summary: "A website that delivers cybersecurity news.",
    art: "nodes",
  },
  {
    slug: "chat-app",
    name: "Chat app",
    group: "featured",
    status: "completed",
    tags: [], // TODO: add chat app details
    summary: "A chat application.",
    art: "chat",
  },
  {
    slug: "image-encryption",
    name: "Image encryption",
    group: "security",
    status: "completed",
    tags: ["Python"],
    summary: "Encrypts images by manipulating pixel data.",
    art: "image",
  },
  {
    slug: "password-strength-checker",
    name: "Password strength checker",
    group: "security",
    status: "completed",
    tags: ["Python"],
    summary: "Checks how strong a password is.",
    art: "shield",
  },
  {
    slug: "caesar-cipher",
    name: "Caesar cipher",
    group: "security",
    status: "completed",
    tags: ["Python"],
    summary: "An implementation of the classic substitution cipher.",
    art: "cipher",
  },
];

export const securityLab = {
  heading: "Security lab",
  sub: "Small tools I built to understand how encryption and password security work.",
  note: "Also completed Microsoft Student SOC Program Foundations training.",
};

export const stack = {
  heading: "Stack",
  groups: [
    { label: "Frontend", icon: "monitor", items: ["Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"] },
    { label: "Backend and data", icon: "database", items: ["Node.js", "Express", "Supabase", "PostgreSQL", "MySQL", "SQL"] },
    { label: "Languages", icon: "braces", items: ["TypeScript", "JavaScript", "Python", "C++"] },
    {
      label: "AI",
      icon: "sparkles",
      items: ["AI-assisted development with Claude", "Building AI-driven products"],
    },
    {
      label: "Security and IT",
      icon: "shield",
      items: [
        "Cybersecurity fundamentals",
        "Cryptography basics",
        "SOC fundamentals",
        "IT support",
        "Troubleshooting",
      ],
    },
  ],
} as const;

export const about = {
  heading: "About",
  paragraphs: [
    "I'm a BSc Information Technology graduate from GCTU, about to start National Service. I build software from the database to the interface.",
    "I build AI-driven products and use Claude throughout planning, building and debugging. I make sure I understand what I ship.",
    "Building made me curious about how systems get attacked and defended, so I train in cybersecurity alongside development.",
  ],
  portraitAlt: "Portrait of Edwin Safo",
};

export const facts = [
  { value: projects.length, caption: "projects listed on this site" },
  { value: 3, caption: "certifications on LinkedIn" },
  { value: 4, caption: "core languages: TypeScript, JavaScript, Python, C++" },
  { value: "2023 to 2026", caption: "at GCTU (BSc IT)" },
  { value: "SIC", caption: "IT support internship" },
  { value: "Accra", caption: "based in Ghana" },
] as const;

export const experience = {
  heading: "Experience and training",
  items: [
    {
      title: "IT Support Intern, SIC",
      body: "Provided IT support and resolved technical issues for real users within a professional team.",
      meta: "", // TODO: add internship dates
    },
    { title: "BSc Information Technology, GCTU", body: "", meta: "" },
    { title: "Microsoft Student SOC Program Foundations training", body: "", meta: "", url: undefined as string | undefined },
    { title: "ALX AiCE (graduate)", body: "", meta: "", url: undefined as string | undefined },
    { title: "Upcoming: National Service (NSS)", body: "", meta: "" },
  ] as { title: string; body: string; meta: string; url?: string }[],
  // TODO: two more LinkedIn certifications to add above
};

export const faq = {
  heading: "Quick answers.",
  items: [
    {
      q: "What roles are you open to?",
      a: "NSS placements, and graduate and entry-level roles in software development, AI-driven product development, IT support, and cybersecurity or SOC analysis.",
    },
    { q: "What do you build?", a: "Full-stack and AI-driven products with TypeScript, Next.js, Supabase and Python." },
    {
      q: "How do you use AI?",
      a: "I use Claude throughout planning, building and debugging, and I make sure I understand what I ship.",
    },
    {
      q: "Do you have IT support experience?",
      a: "Yes. I was an IT Support Intern at SIC, resolving technical issues for real users within a professional team.",
    },
    { q: "Where are you based?", a: "Accra, Ghana." },
    { q: "How can I reach you?", a: "Use the form below or email official.edwinsafo@gmail.com." },
  ],
};

export const contact = {
  heading: "Let's talk.",
  line: "Open to graduate, development or security roles.",
  button: "Send message",
  success: "Message sent. I'll reply by email.",
  error: "Message not sent. Check your connection and try again, or email me directly.",
};

export const footer = {
  tagline: "Software developer, Accra",
};
