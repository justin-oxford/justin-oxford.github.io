// Site-wide settings used by the layout, header, and footer.
export const site = {
  name: 'Justin Oxford',
  // Contact is the domain email only (Site Rules #5).
  email: 'contact@justinoxford.com',
  github: 'https://github.com/justin-oxford',
  signOff: 'Safe Travels', // from the old site's footer
  // Home page intro. Justin provides this (2–4 sentences, no "currently").
  bio: 'TODO(Justin): short bio, 2–4 sentences.',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/projects/', label: 'Projects' },
    { href: '/writing/', label: 'Writing' },
    { href: '/about/', label: 'About' },
  ],
} as const;
