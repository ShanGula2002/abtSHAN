// Your personal details. Edit the text here and the whole site updates.

export const site = {
  name: 'Khyrk Shan Gula',
  firstName: 'Khyrk',

  // Change this to your real address. Every "Email me" button uses it.
  email: 'shanshangula@gmail.com',

  education: 'Bachelor of Science in Information Systems',
  roles: ['Web Developer', 'Social Media Graphic Designer'],
  statusLabel: 'Web developer / Digital creative',

  heroIntro:
    "I'm a Bachelor of Science in Information Systems student, web developer, and social media graphic designer. I combine clean code, bold visuals, and short-form video to build digital experiences that look as good as they work.",

  about: [
    'I study Information Systems and spend the rest of my time creating for the screen: building websites, designing social media graphics, and editing short-form videos.',
    'I like the point where structure meets style. A layout that loads fast and reads clearly, a post that makes people stop scrolling, a cut that lands right on the beat.',
  ],

  interests: [
    'Website development',
    'Visual design',
    'Social media content',
    'Motion design',
    'Interactive digital experiences',
  ],

  // The three tabs of the skills panel in the About section.
  skillGroups: [
    {
      id: 'develop',
      label: 'Develop',
      title: 'Web development',
      text: 'Responsive websites with clean structure, practical features, and interfaces that feel smooth on every screen.',
      skills: ['Responsive layouts', 'Front-end development', 'UI implementation', 'Interactive web experiences'],
    },
    {
      id: 'design',
      label: 'Design',
      title: 'Graphic design',
      text: 'Visuals for social media campaigns, promotions, and digital brand communication.',
      skills: ['Social media graphics', 'Posters and promotional layouts', 'Visual branding', 'Layout and typography'],
    },
    {
      id: 'create',
      label: 'Create',
      title: 'Content creation',
      text: 'Short-form video with creative editing, visual storytelling, and social-ready presentation.',
      skills: ['Short-form video editing', 'Reels and TikTok-style content', 'Transitions and motion', 'Visual storytelling'],
    },
  ],

  // Your resume, shown in the About section.
  //   url: your PDF in the "public" folder (public/resume.pdf is '/resume.pdf').
  //        Set it to null to show "Resume PDF coming soon" instead of the download button.
  //   fileName: the name a visitor's download is saved as. It doesn't have to match your file's name.
  //
  // The lists fill the Resume and Experience panels. To add an entry, copy one and change the text.
  // Only the first field is required. Any entry can also have:
  //   details: 'One short line about it.',
  //   link: 'https://...',   (turns the title into a link, for example to a certificate)
  // An empty list, like certifications: [], shows "To be added".
  resume: {
        url: '/Khyrk-Shan-Gula-Resume.pdf',
        fileName: 'Khyrk Shan Gula - Resume.pdf',

    education: [
      {
        degree: 'Bachelor of Science in Information Systems',
        school: 'I-Tech College Bago City Inc., Bago City, Philippines',
        date: 'Graduated March 2026',
      },
    ],

    experience: [
      {
        role: 'Amazon E-Commerce VA & Graphic Design Specialist',
        company: 'Remote / Freelance',
        date: 'January 2024 – Present',
      },
      {
        role: 'Web Developer',
        company: 'GRLE Car Rental, Bago City',
        date: 'January 2026 – Present',
      },
      {
        role: 'Web Developer Intern (OJT)',
        company: 'Department of Education (DepEd), Bago City Division Office',
        date: 'June 2025 – December 2025',
      },
      {
        role: 'Customer Service Representative & Chat Assistant',
        company: 'Sakura Shoppu, Bago City',
        date: 'January 2018 – November 2020',
      },
    ],

    certifications: [
      {
        name: 'Amazon Seller VA Foundations Workshop',
        issuer: 'Amazenation',
        date: 'Issued October 2026 · No expiration',
      },
      {
        name: 'SEO Training Course',
        issuer: 'Amazon Guy',
        date: 'Completed',
      },
    ],
  },

  // Social links appear in the footer only when you add them, for example:
  //   { label: 'Instagram', url: 'https://www.instagram.com/your-handle' },
  socials: [
    { label: 'Facebook', url: 'https://www.facebook.com/Shanshangula/' },
    { label: 'Instagram', url: 'https://www.instagram.com/mr_bituinnn/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/khyrk-shan-gula-bb6524407/' },
  ],
  
}
