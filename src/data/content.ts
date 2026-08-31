export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface GroundsPlace {
  id: string;
  title: string;
  summary: string;
  details: string[];
  image: string;
  imageFallback: string;
  imageAlt: string;
}

export interface Ministry {
  id: string;
  title: string;
  summary: string;
  details: string[];
  image: string;
  imageFallback: string;
  imageAlt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EventItem {
  title: string;
  date: string;
  summary: string;
  category: "Parish" | "Devotion" | "Formation" | "Archdiocese";
  href?: string;
}

export interface GivingOption {
  name: string;
  description: string;
  icon: "flame" | "church" | "sprout" | "heart" | "book" | "hand-heart" | "landmark" | "globe";
}

export interface Priest {
  name: string;
  role: string;
  email?: string;
  phone?: string;
}

export interface PpcMember {
  role: string;
  name: string;
}

export const images = {
  hero: "/images/hero-church.jpg",
  heroFallback: "/images/hero-church.jpg",
  chapel: "/images/chapel-interior.jpg",
  sanctuary: "/images/sanctuary.jpg",
  garden: "/images/rosary-garden.jpg",
  glass: "/images/stained-glass.jpg",
  hall: "/images/parish-hall.jpg",
  cemetery: "/images/cemetery.jpg",
  feast: "/images/feast.jpg",
  naveCdn: "/images/sanctuary.jpg",
  courtyardCdn: "/images/rosary-garden.jpg",
} as const;

export const priests: Priest[] = [
  {
    name: "Fr Brian D'Souza",
    role: "Parish Priest",
    email: "brian.dsouza@catholic.org.sg",
    phone: "+65 6255 7509",
  },
  {
    name: "Fr Arun Bellarmin",
    role: "Assistant Parish Priest",
    email: "arun.bellarmin@catholic.org.sg",
    phone: "+65 6352 8737",
  },
  {
    name: "Fr Dexter Chua",
    role: "Assistant Parish Priest",
    email: "dexter.chua@catholic.org.sg",
    phone: "+65 6253 8622",
  },
];

export const ppcMembers: PpcMember[] = [
  { role: "Parish Priest", name: "Fr Brian D'Souza" },
  { role: "Assistant Parish Priest", name: "Fr Arun Bellarmin" },
  { role: "Assistant Parish Priest", name: "Fr Dexter Chua" },
  { role: "Secretariat", name: "Peter Quek" },
  { role: "Parish Administrator", name: "Audrey Rozario" },
  { role: "Youth Coordinator", name: "Calvin Swee" },
  { role: "Pastoral Coordinator", name: "Cheryl-Anne Goh" },
];

export const lifeTimeline: TimelineEntry[] = [
  {
    year: "1969",
    title: "Mass in a new town",
    description:
      "Catholics of Toa Payoh gather at Ho Ping Centre, Block 82 Lorong 4, and at an HDB function hall. The first Mass is celebrated on 6 April. In June the government invites tenders for a 40,000-square-foot plot at Toa Payoh Central and Lorong 4; the Catholic Church is awarded the site the following month.",
  },
  {
    year: "1971",
    title: "A church of the Resurrection",
    description:
      "On 3 July Archbishop Michel Olçomendy blesses and opens the Church of the Risen Christ — the first Catholic church in Toa Payoh, and Singapore's first fully air-conditioned church. Fr Pierre Abrial, the first parish priest, has led the community in raising some $450,000 for the building.",
  },
  {
    year: "1970s",
    title: "Many tongues, one altar",
    description:
      "From the beginning the parish prays in English, Mandarin, and Tamil. The Feast of Our Lady of Velankanni takes root among Indian Catholics. The church organises childcare, tuition, and community care as Toa Payoh grows around it.",
  },
  {
    year: "2003",
    title: "Rooms for formation",
    description:
      "A four-storey addition gives the parish classrooms, a youth room, and an auditorium — space for catechesis, seminars, and the growing work of formation beside the original 1971 nave.",
  },
  {
    year: "2010s",
    title: "A wider household",
    description:
      "Filipino, Indonesian, and Myanmar Catholics find a home at Toa Payoh Central. Simbang Gabi is kept each December. Bahasa Indonesia Mass on the first Friday and Tagalog Mass on the fourth Sunday join the Tamil Mass on the second Sunday.",
  },
  {
    year: "2021",
    title: "Golden Jubilee",
    description:
      "Fifty years after the blessing, the parish looks back on a satellite town that became a household of faith — and forward to another generation of disciples at the heart of Toa Payoh.",
  },
  {
    year: "2023",
    title: "A new shepherd",
    description:
      "Fr Brian D'Souza is appointed parish priest. Fr Arun Bellarmin and Fr Dexter Chua later join him in the care of some eight thousand parishioners.",
  },
  {
    year: "2026",
    title: "Grateful, Faithful, and Sent",
    description:
      "The 54th Feast of Our Lady of Velankanni, the Couple Empowerment Programme, and F.R.E.E.'s study of Acts gather the parish around a simple call: to be grateful, faithful, and sent — because He is risen.",
  },
];

export const grounds: GroundsPlace[] = [
  {
    id: "main-church",
    title: "Main Church",
    summary:
      "The nave at Toa Payoh Central — English from dawn to evening, Mandarin at 8.15 a.m., and monthly Masses in Tamil, Tagalog, and Bahasa Indonesia.",
    details: [
      "Weekday Mass at 6.30 a.m. and 6.00 p.m.",
      "Five Sunday Masses, with Mandarin at 8.15 a.m.",
      "Anticipated Sunday Mass on Saturday at 5.30 p.m.",
      "Singapore's first fully air-conditioned church, blessed 3 July 1971",
    ],
    image: images.naveCdn,
    imageFallback: images.sanctuary,
    imageAlt: "Sanctuary of the Church of the Risen Christ looking toward the altar",
  },
  {
    id: "chapel",
    title: "Adoration Room",
    summary:
      "A quieter house of prayer beside the nave. Come and spend some time before the Blessed Sacrament — no appointment needed.",
    details: [
      "Monday 12.00 noon to 10.00 p.m.",
      "Tuesday to Saturday 7.00 a.m. to 10.00 p.m.",
      "Sunday 7.00 a.m. to 6.00 p.m.",
      "Intercessory Prayer, 8.00–9.30 p.m. on the 2nd and 4th Thursday",
    ],
    image: images.chapel,
    imageFallback: images.chapel,
    imageAlt: "Quiet adoration room with a golden monstrance and votive candles",
  },
  {
    id: "parish-hall",
    title: "Parish Hall & Media Centre",
    summary:
      "Classrooms, a youth room, and an auditorium from the 2003 wing — plus the Apostolate of Media, where the bulletin and Sunday reflections take shape.",
    details: [
      "Parish Hall for catechesis, F.R.E.E., and the Couple Empowerment Programme",
      "Media Centre: Tue & Fri 12.00–4.00 p.m.; Sat 12.00–7.00 p.m.; Sun 8.00 a.m.–1.00 p.m.",
      "Media Centre tel +65 6356 5958",
      "Weekly bulletin via FlipHTML5",
    ],
    image: images.hall,
    imageFallback: images.hall,
    imageAlt: "Parish hall prepared for catechesis and formation",
  },
];

export const ministries: Ministry[] = [
  {
    id: "liturgical",
    title: "Liturgical",
    summary:
      "Servers, singers, readers, and hospitality ministers who help the assembly pray the Mass with dignity — keeping a sense of the sacred at every language Mass.",
    details: [
      "Altar servers assisting the priests and modelling the liturgy",
      "Choirs across the weekend Masses, including Mandarin and Tamil",
      "Readers, extraordinary ministers, and sacristans",
      "Hospitality: no visitor should leave unnoticed",
    ],
    image: images.sanctuary,
    imageFallback: images.sanctuary,
    imageAlt: "Church sanctuary prepared for the celebration of Mass",
  },
  {
    id: "faith-formation",
    title: "Faith Formation",
    summary:
      "Catechesis that begins in childhood and does not stop at confirmation — forming disciples through RCIA, parish catechism, and the F.R.E.E. Bible study.",
    details: [
      "RCIA — walk toward baptism; iwanttobeacatholic@catholic.org.sg",
      "Parish catechism for children and confirmation",
      "F.R.E.E. Ministry: video-based Scripture study in the Parish Hall",
      "Adult formation, retreats, and Sunday reflections",
    ],
    image: images.hall,
    imageFallback: images.hall,
    imageAlt: "Parish hall prepared for catechesis and formation",
  },
  {
    id: "pastoral-care",
    title: "Pastoral Care",
    summary:
      "Outreach that meets Christ in the poor — the Society of St Vincent de Paul at Risen Christ, bereavement care, and a listening parish office.",
    details: [
      "SSVP Risen Christ conference — ssvp.risenchrist.org.sg",
      "Care for the sick, the grieving, and those in need",
      "Pastoral Coordinator Cheryl-Anne Goh, crc.pastoral@catholic.org.sg",
      "Data Protection Officer: dpo.crc@catholic.org.sg",
    ],
    image: images.cemetery,
    imageFallback: images.garden,
    imageAlt: "Quiet memorial garden beside the church",
  },
  {
    id: "family-life",
    title: "Family Life",
    summary:
      "Marriage, baptism, and the Couple Empowerment Programme — helping households live the sacrament they received at the altar.",
    details: [
      "Couple Empowerment Programme (CEP) — 10 sessions, cep-sg.org",
      "Baptism preparation and marriage enquiries via the parish office",
      "Childminding offered during CEP sessions",
      "A parish that prays with families, not only for them",
    ],
    image: images.feast,
    imageFallback: images.feast,
    imageAlt: "Feast flowers before Our Lady in the church",
  },
  {
    id: "youth",
    title: "Youth",
    summary:
      "Young people of Toa Payoh gathering in the youth room of the 2003 wing — formation, service, and a place to belong.",
    details: [
      "Youth Coordinator Calvin Swee, crc.youth@catholic.org.sg",
      "Youth room in the four-storey parish addition",
      "Service, retreats, and accompaniment toward confirmation and beyond",
      "A household that expects the young, not merely programmes them",
    ],
    image: images.glass,
    imageFallback: images.glass,
    imageAlt: "Stained glass of the Resurrection catching morning light",
  },
  {
    id: "language-communities",
    title: "Language Communities",
    summary:
      "Mandarin at 8.15 a.m. every Sunday; Tamil on the second Sunday; Tagalog on the fourth; Bahasa Indonesia on the first Friday — one parish, many tongues.",
    details: [
      "Mandarin Mass every Sunday at 8.15 a.m.",
      "Tamil Mass: 2nd Sunday, 7.00 p.m. — Indian Catholic Movement",
      "Tagalog Mass: 4th Sunday, 3.00 p.m. · Simbang Gabi in December",
      "Bahasa Indonesia Mass: 1st Friday, 8.00 p.m.",
    ],
    image: images.garden,
    imageFallback: images.garden,
    imageAlt: "Courtyard garden of the Church of the Risen Christ",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What are the Mass times?",
    answer:
      "Weekdays: 6.30 a.m. and 6.00 p.m. Saturday: 6.30 a.m. and 5.30 p.m. Sunday: 7.00 a.m., 8.15 a.m. (Mandarin), 9.45 a.m., 11.30 a.m., and 5.30 p.m. Public holidays (Mon–Fri) are 7.30 a.m. only; Saturday public holidays are 7.30 a.m. and 5.30 p.m. Monthly Masses: Bahasa Indonesia on the 1st Friday at 8.00 p.m., Tamil on the 2nd Sunday at 7.00 p.m., and Tagalog on the 4th Sunday at 3.00 p.m.",
  },
  {
    question: "When can I go to confession?",
    answer:
      "Please approach a priest after Mass, or contact the parish office on +65 6253 2166 to arrange a time. The priests of the parish are Fr Brian D'Souza, Fr Arun Bellarmin, and Fr Dexter Chua.",
  },
  {
    question: "How do I get there?",
    answer:
      "The church is at 91 Toa Payoh Central, Singapore 319193. Walk six minutes from Toa Payoh MRT (NS19) Exit A, or two minutes from bus stop B52261 served by buses 88, 157, and 163.",
  },
  {
    question: "Where can I park?",
    answer:
      "Nearby HDB car parks include Blk 66/70/73 Lorong 4 Toa Payoh (about a one-minute walk; free on Sundays and public holidays, 7.00 a.m.–10.30 p.m.), Blk 62B Lorong 4, Blk 71/72 Lorong 5, and Blk 81C Lorong 4. Free-parking schemes may change — check signage on arrival.",
  },
  {
    question: "How do I arrange a baptism, marriage, or Mass intention?",
    answer:
      "Write to the Secretariat at crc.secretariat@catholic.org.sg or call the parish office on +65 6253 2166 during office hours. The Parish Administrator is Audrey Rozario (crc.admin@catholic.org.sg).",
  },
  {
    question: "When is the Adoration Room open?",
    answer:
      "Monday 12.00 noon–10.00 p.m.; Tuesday to Saturday 7.00 a.m.–10.00 p.m.; Sunday 7.00 a.m.–6.00 p.m.; public holidays 8.00 a.m.–6.00 p.m. Intercessory Prayer is held from 8.00–9.30 p.m. on the 2nd and 4th Thursday of the month.",
  },
];

export const upcomingEvents: EventItem[] = [
  {
    title: "54th Feast of Our Lady of Velankanni",
    date: "10–12 September 2026",
    summary:
      "Triduum with the Indian Catholic Movement. Rosary at 7.00 p.m., Mass at 7.30 p.m. each evening. Come honour Our Lady of Good Health.",
    category: "Devotion",
  },
  {
    title: "Couple Empowerment Programme",
    date: "16 August – 11 October 2026",
    summary:
      "Ten sessions for married couples at the Church of the Risen Christ. Books, meals, and childminding available. Register at cep-sg.org.",
    category: "Formation",
    href: "https://www.cep-sg.org",
  },
  {
    title: "Acts: The Spread of the Kingdom",
    date: "30 June – 10 November 2026",
    summary:
      "F.R.E.E. Ministry presents a 20-week, video-based Bible study by Jeff Cavins. Tuesdays 7.30–9.30 p.m. in the Parish Hall.",
    category: "Formation",
    href: "https://free.risenchrist.org.sg/",
  },
  {
    title: "Sunday Reflections",
    date: "Each Sunday",
    summary:
      "A weekly meditation on the readings — currently the Twenty-second Sunday in Ordinary Time — published on the parish site and bulletin.",
    category: "Parish",
  },
  {
    title: "RCIA — When Silence Led Me to God",
    date: "Enquire anytime",
    summary:
      "Walk toward baptism and a living relationship with Christ. For inquiries, write to iwanttobeacatholic@catholic.org.sg.",
    category: "Formation",
  },
  {
    title: "Intercessory Prayer",
    date: "2nd & 4th Thursday, 8.00–9.30 p.m.",
    summary:
      "An hour and a half of prayer in the Adoration Room — bringing the needs of the parish and the city before the Lord.",
    category: "Devotion",
  },
];

export const givingOptions: GivingOption[] = [
  {
    name: "PayNow",
    // Round-12 (audit F-4): the UEN string itself renders once, in the
    // copyable detail row inside this featured card (see Give.tsx).
    description: "Scan or transfer by UEN — Church of the Risen Christ.",
    icon: "globe",
  },
  {
    name: "Weekend collections",
    description: "The offertory at Mass remains the ordinary way the household supports the altar.",
    icon: "church",
  },
  {
    name: "Mass offerings",
    description: "Intentions may be arranged at the parish office during reception hours.",
    icon: "sprout",
  },
  {
    name: "Society of St Vincent de Paul",
    description: "Give toward the poor of Toa Payoh via the CRC SSVP conference.",
    icon: "hand-heart",
  },
  {
    name: "Cheque",
    description: "Payable to Church of the Risen Christ, received at the parish office.",
    icon: "book",
  },
  {
    name: "Cash at the office",
    description: "The Secretariat receives offerings during parish office hours.",
    icon: "heart",
  },
  {
    name: "Church Maintenance",
    description: "Second collections, when announced in the bulletin, keep the 1971 house in repair.",
    icon: "landmark",
  },
  {
    name: "General Church Offering",
    description: "An undesignated gift for the ordinary life of worship, formation, and mission.",
    icon: "flame",
  },
];

export const serveRoles = [
  {
    title: "Liturgical ministers",
    summary:
      "Serve at the altar, in the choir, as a reader, or in hospitality — so that every Mass at Toa Payoh Central is prayed with care.",
  },
  {
    title: "Catechists & facilitators",
    summary:
      "Walk with children, RCIA inquirers, and F.R.E.E. participants. Formation is a ministry of presence, not only of information.",
  },
  {
    title: "Pastoral care",
    summary:
      "Visit, listen, and serve with SSVP. The poor of this new town are still at our door.",
  },
  {
    title: "Hospitality & media",
    summary:
      "Welcome at the doors, tend the grounds, or serve in the Apostolate of Media so the bulletin and Sunday reflections reach the household.",
  },
] as const;

export const devotions = [
  {
    title: "Adoration of the Blessed Sacrament",
    when: "Daily, according to Adoration Room hours",
    where: "Adoration Room",
  },
  {
    title: "Intercessory Prayer",
    when: "2nd & 4th Thursday, 8.00–9.30 p.m.",
    where: "Adoration Room",
  },
  {
    title: "Our Lady of Velankanni",
    when: "Annual triduum in September — 54th Feast, 10–12 Sep 2026",
    where: "Main Church · Indian Catholic Movement",
  },
  {
    title: "Simbang Gabi",
    when: "Nine days before Christmas",
    where: "Main Church · Filipino community",
  },
  {
    title: "Bahasa Indonesia Mass",
    when: "1st Friday, 8.00 p.m.",
    where: "Main Church",
  },
  {
    title: "Tamil & Tagalog Masses",
    when: "Tamil 2nd Sunday 7.00 p.m. · Tagalog 4th Sunday 3.00 p.m.",
    where: "Main Church",
  },
] as const;
