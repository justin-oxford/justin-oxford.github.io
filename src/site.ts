// Site-wide settings used by the layout, header, and footer.
export const site = {
  name: 'Justin Oxford',
  // Contact is the domain email only (Site Rules #5).
  email: 'TODO(Justin): domain email address',
  github: 'https://github.com/justin-oxford',
  signOff: 'Safe Travels', // from the old site's footer; set to '' to drop it
  nav: [
    { href: '/', label: 'Home' },
    { href: '/projects/', label: 'Projects' },
    { href: '/writing/', label: 'Writing' },
    { href: '/about/', label: 'About' },
  ],
} as const;
