export interface NavLink {
  label: string;
  to: string;
}

export interface NavItem {
  label: string;
  to: string;
  description?: string;
  children?: (NavLink & { description?: string })[];
}

export const primaryNav: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About",
    to: "/about",
    children: [
      {
        label: "The Parish",
        to: "/about",
        description: "Priests, household, and a people of the Resurrection.",
      },
      {
        label: "Our History",
        to: "/history",
        description: "From Ho Ping Centre in 1969 to the church of 1971.",
      },
      {
        label: "FAQ",
        to: "/faq",
        description: "Mass, adoration, parking, and visiting questions.",
      },
    ],
  },
  {
    label: "Worship",
    to: "/worship",
    children: [
      {
        label: "Mass Times",
        to: "/worship#mass",
        description: "Weekday, weekend, and language Masses.",
      },
      {
        label: "Confession & Adoration",
        to: "/worship#confession",
        description: "Reconciliation, the Adoration Room, and monthly prayer.",
      },
      {
        label: "Find Us",
        to: "/worship#visit",
        description: "MRT, buses, parking, and a map of Toa Payoh Central.",
      },
    ],
  },
  {
    label: "Ministries",
    to: "/ministries",
    children: [
      {
        label: "Liturgical",
        to: "/ministries#liturgical",
        description: "Servers, choirs, and hospitality at Mass.",
      },
      {
        label: "Faith Formation",
        to: "/ministries#faith-formation",
        description: "RCIA, catechism, and the F.R.E.E. Bible study.",
      },
      {
        label: "Pastoral Care",
        to: "/ministries#pastoral-care",
        description: "SSVP, outreach, and care for the poor.",
      },
    ],
  },
  { label: "News & Events", to: "/news-events" },
  { label: "Serve", to: "/serve" },
];

export const footerNav: NavLink[] = [
  { label: "The Parish", to: "/about" },
  { label: "Mass Times", to: "/worship#mass" },
  { label: "History", to: "/history" },
  { label: "FAQ", to: "/faq" },
  { label: "Liturgical", to: "/ministries#liturgical" },
  { label: "Faith Formation", to: "/ministries#faith-formation" },
  { label: "Pastoral Care", to: "/ministries#pastoral-care" },
  { label: "News & Events", to: "/news-events" },
  { label: "Serve", to: "/serve" },
  { label: "Give", to: "/give" },
];
