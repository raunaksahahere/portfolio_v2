export const PROFILE = {
  name: 'Raunak Saha',
  title: 'Full-Stack Developer & Language Creator & Game Dev',
  tagline: 'Code is the new civilization.',
  subtitle: 'From ancient scrolls to modern programming languages.',
  bio: `I'm an 18-year-old Full-Stack Developer, Language Creator & Game Developer based in Kolkata, India with 2 years of hands-on experience. Currently pursuing B.Tech in AI & Data Science at Meghnad Saha Institute of Technology. I created the B# programming language from scratch — complete with its own interpreter, package manager, and VS Code extension.`,
  available: true,
  age: 18,
  location: 'Kolkata, India',
  college: 'Meghnad Saha Institute of Technology',
  degree: 'B.Tech in AI & Data Science',
  experience: '2 years',
  github: 'raunaksahahere',
}

export const SKILLS = [
  { name: 'AI / ML', icon: '🧠', techs: ['Python', 'TensorFlow', 'PyTorch'] },
  { name: 'Backend', icon: '⚙️', techs: ['Node.js', 'Supabase', 'PostgreSQL'] },
  { name: 'Frontend', icon: '🌐', techs: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
  { name: 'JavaScript', icon: '⚡', techs: ['JavaScript', 'Node.js', 'React'] },
  { name: 'Language Design', icon: '🔤', techs: ['B# Language', 'Interpreters', 'Compilers'] },
  { name: 'Game Dev', icon: '🎮', techs: ['Unity', 'C#', 'Blender', 'Game Design'] },
  { name: 'Version Control', icon: '📦', techs: ['Git', 'GitHub', 'GitLab'] },
  { name: 'Cloud & Infra', icon: '☁️', techs: ['Docker', 'AWS'] },
]

export const PROJECTS = [
  {
    title: 'B# Programming Language',
    tag: 'Language',
    desc: 'A complete programming language built from scratch with its own interpreter, package manager, and VS Code extension.',
    techs: ['Python', 'Interpreter', 'Compiler Design', 'AST'],
    gh: 'https://github.com/raunaksahahere/Bsharp-b-',
    featured: true,
    color: '#00f5ff',
  },
  {
    title: 'BuggyButBrilliant',
    tag: 'Startup',
    desc: 'A startup company for digital marketing and web development.',
    techs: ['Business', 'Web Dev', 'Marketing'],
    gh: 'https://github.com/buggybutbrilliant',
    color: '#ff00c8',
    live: 'https://buggybutbrilliant.vercel.app',
  },
  {
    title: 'B# Package Manager',
    tag: 'CLI Tool',
    desc: 'A package manager for B# — install, manage, and publish packages for the B# ecosystem.',
    techs: ['Python', 'CLI', 'Package Registry', 'PyPI'],
    gh: 'https://github.com/raunaksahahere/bsharp-b--packages',
    color: '#a855f7',
  },
  {
    title: 'FAST Attendance Portal',
    tag: 'Web App',
    desc: 'A website for attendance management in colleges, schools and offices to reduce issues like bunking or proxy attendance.',
    techs: ['React', 'Tailwind', 'TypeScript'],
    gh: '#',
    color: '#22c55e',
  },
  {
    title: 'Codelens',
    tag: 'Web IDE',
    desc: 'An IDE which visualizes the working codes.',
    techs: ['React', 'Custom JS Engine', 'Code Visualization'],
    gh: 'https://github.com/raunaksahahere/codelens',
    color: '#ff0000',
  },
  {
    title: 'Smart Campus Reporter',
    tag: 'Website',
    desc: 'A website for reporting campus issues directly to concerned authorities.',
    techs: ['VanillaJS', 'HTML', 'CSS', 'Firebase'],
    gh: 'https://github.com/raunaksahahere/Smart-Campus-Issue-Reporter',
    color: '#f59e0b',
  },
  {
    title: 'Smart Hotel Allocation',
    tag: 'Website',
    desc: 'A system for allocating hotel rooms to guests without needing a receptionist, usable by both guests and staff.',
    techs: ['VanillaJS', 'HTML', 'CSS', 'Firebase'],
    gh: 'https://github.com/raunaksahahere/Smart-Hotel-Room-Allocation-System',
    color: '#e7490a',
  },
].map((p, i) => ({ ...p, id: i + 1 }))

export const ACHIEVEMENTS = [
  { icon: '📜', title: 'B# Programming Language', desc: 'Created an entire programming language from scratch' },
  { icon: '📦', title: 'B# Package Manager', desc: 'Built a full package ecosystem for B#' },
  { icon: '🚀', title: 'BuggyButBrilliant', desc: 'Founded a digital marketing & web dev startup' },
  { icon: '🛠️', title: 'VS Code Extension', desc: 'Developer tooling for the B# language' },
]

export const CONTACTS = [
  { icon: '🔗', label: 'GitHub', url: 'https://github.com/raunaksahahere' },
  { icon: '💼', label: 'LinkedIn', url: 'https://www.linkedin.com/in/raunak-saha-855375399/' },
  { icon: '📧', label: 'Email', url: 'mailto:raunaksaha22@gmail.com' },
]

export const STATS = [
  { label: 'Projects', value: PROJECTS.length, suffix: '+' },
  { label: 'Years Exp', value: 2, suffix: '+' },
  { label: 'Skill Domains', value: SKILLS.length, suffix: '' },
  { label: 'Achievements', value: ACHIEVEMENTS.length, suffix: '+' },
]

export const TAGLINES = [
  'Code is the new civilization.',
  'Built different.',
  'From Kolkata to the universe.',
  'Creating languages, not just using them.',
]

export const LOADER_LINES = [
  { prompt: '$ raunak init', output: 'Initializing portfolio...' },
  { prompt: '$ raunak add .', output: `Staging ${PROJECTS.length} projects, ${SKILLS.length} skill domains, ${ACHIEVEMENTS.length} achievements...` },
  { prompt: '$ raunak commit -m "built different"', output: '[main 1a2b3c4] built different\n 2 years of experience committed' },
  { prompt: '$ raunak push origin world', output: 'Enumerating objects: done.\nPushing to the universe... ✓' },
]
