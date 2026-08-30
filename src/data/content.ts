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
    name: "Friar Esmond Chua, OFM",
    role: "Parish Priest",
    email: "esmond.stmary@catholic.org.sg",
  },
  {
    name: "Friar Julian Mariaratnam, OFM",
    role: "Assistant Parish Priest",
    email: "julian.stmary@catholic.org.sg",
  },
  {
    name: "Friar Justin Lim, OFM",
    role: "Assistant Parish Priest",
    email: "justin.stmary@catholic.org.sg",
  },
  {
    name: "Friar Robin Toha, OFM",
    role: "Assistant Parish Priest",
    email: "robin.stmary@catholic.org.sg",
  },
];

export const ppcMembers: PpcMember[] = [
  { role: "Parish Priest (ex-officio)", name: "Friar Esmond Chua, OFM" },
  { role: "Assistant Parish Priest", name: "Friar Julian Mariaratnam, OFM" },
  { role: "Assistant Parish Priest", name: "Friar Justin Lim, OFM" },
  { role: "Assistant Parish Priest", name: "Friar Robin Toha, OFM" },
  { role: "Parish vision", name: "Prayer · Formation · Mission" },
  { role: "Custody", name: "Custody of St Anthony (OFM)" },
];

export const lifeTimeline: TimelineEntry[] = [
  {
    year: "1957",
    title: "Friars arrive in Singapore",
    description:
      "The Order of Friars Minor is sent to Singapore to found a sociological institute. St Anthony's Friary takes root on a Bukit Batok hill then ringed by orchards, kampongs, and isolated villages.",
  },
  {
    year: "1958",
    title: "A hilltop chapel",
    description:
      "Archbishop Michel Olçomendy dedicates the friars' chapel. Neighbours walk up the hill to join the brothers for Mass — the seed of a parish still unnamed.",
  },
  {
    year: "1970",
    title: "A parish of the Portiuncula",
    description:
      "The Archbishop offers the friars a parish agreement. The chapel becomes a parish church and is named for St Mary of the Angels — the Portiuncula in Assisi, St Francis' favourite chapel and the place he chose to die.",
  },
  {
    year: "1985–2003",
    title: "The west grows",
    description:
      "Bukit Batok new town fills the orchards. The church and friary are rebuilt in stages as the flock in the western region outgrows the hilltop chapel.",
  },
  {
    year: "2004",
    title: "A house of light",
    description:
      "The present church, designed by WOHA Architects, is consecrated. Folded planes of concrete and timber gather some 8,500 parishioners. The building wins the Singapore Institute of Architects Religious Building award.",
  },
  {
    year: "2006",
    title: "Design of the Year",
    description:
      "The church receives the Design of the Year award at the first President's Design Award — a rare honour for sacred architecture in Singapore.",
  },
  {
    year: "2025",
    title: "Jubilee monstrance",
    description:
      "The Adoration Chapel becomes home to a monstrance commissioned for the Jubilee Year of Hope — a quiet axis of daily prayer beside the Main Church.",
  },
  {
    year: "2026",
    title: "Pray, Form, Go",
    description:
      "A new parish team led by Friar Esmond Chua, OFM, calls the household back to three pillars: Prayer, Formation, and Mission. The Franciscan Jubilee Year of St Francis gathers the parish around Assisi's little portion of land.",
  },
];

export const grounds: GroundsPlace[] = [
  {
    id: "main-church",
    title: "Main Church",
    summary:
      "The heart of Sunday worship — Mandarin at dawn, English through the day, Tamil at Saturday dusk — under the Corpus of Christ with outstretched arms.",
    details: [
      "Baptismal font on the east–west axis, from death into new life",
      "Ambo and altar at the centre; Ambry of the holy oils to the right",
      "Side chapels of Our Lady and St Anthony, facing away from the nave",
      "Weekend Masses from Saturday 4.00 p.m. through Sunday 7.00 p.m.",
    ],
    image: images.naveCdn,
    imageFallback: images.sanctuary,
    imageAlt: "Sanctuary of St Mary of the Angels looking toward the Corpus of Christ",
  },
  {
    id: "chapel",
    title: "Adoration Chapel",
    summary:
      "A quieter house next to the Main Church at Level 1. Come and spend some time before the Blessed Sacrament — the Jubilee monstrance rests here.",
    details: [
      "Open daily, 7.00 a.m. to 9.30 p.m.",
      "Jubilee Year of Hope monstrance",
      "No appointment needed for a visit of prayer",
      "Beside the Main Church, Level 1",
    ],
    image: images.chapel,
    imageFallback: images.chapel,
    imageAlt: "Quiet adoration chapel with a golden monstrance and votive candles",
  },
  {
    id: "rosary-garden",
    title: "Garden of Peace & Piazza",
    summary:
      "Mary at the west end of the garden looks toward her Son in the church. St Francis with a bird and St Clare with roses greet you at the roundabout.",
    details: [
      "Garden Shrine of Mother Mary, west of the nave",
      "Sculptures of St Francis and St Clare at the drop-off",
      "St Anthony preaching to the fishes on the piazza",
      "St Clare Hall and Gubbio for formation and gathering",
    ],
    image: images.courtyardCdn,
    imageFallback: images.garden,
    imageAlt: "Tropical garden shrine of Mother Mary beside the church",
  },
];

export const ministries: Ministry[] = [
  {
    id: "liturgical",
    title: "Liturgical",
    summary:
      "Servers, singers, readers, and hospitality ministers who help the assembly pray the Mass with dignity — not merely performing functions, but keeping a sense of the sacred.",
    details: [
      "Altar servers assisting the friars and modelling the liturgy",
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
      "Catechesis that begins in childhood and does not stop at confirmation — forming disciples, not merely teaching information.",
    details: [
      "Catechesis of the Good Shepherd (CGS) for the youngest",
      "Parish catechism for children and confirmation",
      "Adult formation, retreats, and Scripture",
      "Walking with St Francis: living the Beatitudes",
    ],
    image: images.hall,
    imageFallback: images.hall,
    imageAlt: "Parish hall prepared for catechesis and formation",
  },
  {
    id: "pastoral-care",
    title: "Pastoral Care",
    summary:
      "Outreach that meets Christ in the poor — not merely material assistance, but encounter. Counselling, bereavement, and the Poor & Needy Fund.",
    details: [
      "Coaching and counselling — intake.stmary@catholic.org.sg",
      "Poor & Needy Fund (PayNow UEN T08CC4053HRSM)",
      "Wakes, funerals, and the columbarium",
      "Pastoral emergencies after hours: +65 9682 7875",
    ],
    image: images.cemetery,
    imageFallback: images.cemetery,
    imageAlt: "Quiet columbarium corridor of remembrance",
  },
  {
    id: "family-life",
    title: "Family Life",
    summary:
      "Marriage, baptism, and the household of faith — accompanying couples, parents, and seniors as the first church.",
    details: [
      "Baptism and marriage preparation with the friars",
      "First Holy Communion for Primary 3 children",
      "Family Masses and children's liturgy",
      "Seniors and neighbourhood Christian communities",
    ],
    image: images.feast,
    imageFallback: images.feast,
    imageAlt: "Parish families gathering on the piazza at dusk",
  },
  {
    id: "youth",
    title: "Youth",
    summary:
      "Young people are not merely the future Church — they are the Church today. World Youth Day, Alpha, and a place at the table.",
    details: [
      "World Youth Day 2027 preparation",
      "Youth Masses and peer formation",
      "Hearts for the Lord — vocation discernment, 18–35",
      "Mentoring the next generation of ministry leaders",
    ],
    image: images.glass,
    imageFallback: images.glass,
    imageAlt: "Blue stained glass catching afternoon light in the nave",
  },
  {
    id: "mandarin",
    title: "Language Communities",
    summary:
      "A parish of many tongues: Mandarin at dawn, Tamil at Saturday dusk, and monthly Masses in Sinhala, Malayalam, and Indonesian.",
    details: [
      "Sunday 7.15 a.m. Mandarin Mass",
      "Saturday 7.45 p.m. Tamil Mass",
      "Sinhala Mass, Sundays 11.30 a.m. at St Clare Hall",
      "Syro-Malabar Qurbana (3rd Saturday) and Indonesian Mass (4th Sunday)",
    ],
    image: images.garden,
    imageFallback: images.garden,
    imageAlt: "Garden path beside the church under tropical trees",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What are the Mass times?",
    answer:
      "Weekdays: 7.00 a.m. (with Morning Prayer), 12.15 p.m., and 6.30 p.m. Saturday: 4.00 p.m., 6.00 p.m., and 7.45 p.m. Tamil. Sunday: 7.15 a.m. Mandarin, then 9.00 a.m., 11.00 a.m., 1.00 p.m., 5.00 p.m., and 7.00 p.m. English. All Masses are in the Main Church, Level 1, unless otherwise indicated.",
  },
  {
    question: "When can I go to confession?",
    answer:
      "From 1 January 2026 there are no weekday confessions. Confessions are heard on weekends, 30 minutes before the English Masses until 10 minutes before Mass begins: Saturday 3.30 p.m. and 5.30 p.m.; Sunday 8.30 a.m., 10.30 a.m., 12.30 p.m., 4.30 p.m., and 6.30 p.m. No appointment is needed. Outside these times, please arrange privately with a friar.",
  },
  {
    question: "How do I get there?",
    answer:
      "We are at 5 Bukit Batok East Ave 2, Singapore 659918. Nearest MRT: Bukit Batok (NS2) and Beauty World (DT5). Buses serve Bukit Batok East Avenues 2, 3, 4, and 6. Wheelchair ramps run from the Ave 6 bus stop to Level 1 and from Block 286 to Level B2 (Gubbio). Enter by car along Bukit Batok East Ave 2.",
  },
  {
    question: "Is there parking?",
    answer:
      "Parking is available at Levels B1 and B2. Weekend intervals are short and space is limited — please exit soon after Mass so others may arrive. Public car parks at HDB Blocks 271 and 269, and the open car park opposite at Bukit Batok Nature Park, offer more space. A 'no standing' fire-safety ruling keeps walkways clear; follow the hospitality team.",
  },
  {
    question: "How do I arrange baptism, marriage, or a Mass intention?",
    answer:
      "Call Reception at +65 6567 3866 during opening hours, or email parish.stmary@catholic.org.sg. Reception is at Level 1 beside the sacristy: Monday to Saturday 9.00 a.m.–6.00 p.m. (lunch 1.00–2.00 p.m.), Sunday 9.00 a.m.–1.00 p.m., closed public holidays. The Parish Office on Level B1 is open Monday to Friday only.",
  },
  {
    question: "How do I reach the columbarium or arrange a funeral?",
    answer:
      "The columbarium is open daily 7.30 a.m.–9.30 p.m. For wakes, funerals, niches, and the Wall of Remembrance, call the Columbarium office at +65 6560 6361 (Monday to Friday, 9.00 a.m.–6.00 p.m.) or +65 9774 7053 after hours, on weekends, and on public holidays. For Last Rites after Reception hours, call +65 9682 7875.",
  },
];

export const upcomingEvents: EventItem[] = [
  {
    title: "First Holy Communion",
    date: "29 August 2026",
    summary:
      "Congratulations to our Primary 3 children on receiving their First Holy Communion.",
    category: "Parish",
  },
  {
    title: "Catechesis of the Good Shepherd — Information Session",
    date: "September 2026",
    summary:
      "An invitation to parents considering CGS for 2027. Come and see how the youngest pray.",
    category: "Formation",
  },
  {
    title: "World Youth Day 2027 briefing",
    date: "11 & 13 September 2026",
    summary:
      "Friday 11 September, 7.30–9.30 p.m. at Gubbio, or Sunday 13 September, 2.30–4.30 p.m. in Rooms 1–3.",
    category: "Parish",
  },
  {
    title: "Walking with St Francis: the Beatitudes",
    date: "September 2026",
    summary:
      "A Mandarin retreat on living out the Beatitudes as Christians, in the school of Assisi.",
    category: "Devotion",
  },
  {
    title: "Life of St Francis — an art exhibition",
    date: "17–18 September 2026",
    summary:
      "Talks 17 & 18 September, 7.30 p.m. in the Main Church. Exhibition at St Clare Hall from 6.00 p.m. (17th) and 12.00 p.m. (18th) until 10.00 p.m.",
    category: "Devotion",
  },
  {
    title: "Franciscan Jubilee Year of St Francis",
    date: "2026",
    summary:
      "A message from the Custos on the Jubilee Year — check what is in store for this Franciscan year of grace.",
    category: "Archdiocese",
  },
];

export const givingOptions: GivingOption[] = [
  {
    name: "PayNow",
    description:
      "UEN T08CC4053H — Church of St Mary of the Angels. Indicate General Church Offering or Church Maintenance Fund in the transfer details.",
    icon: "globe",
  },
  {
    name: "Poor & Needy Fund",
    description:
      "PayNow UEN T08CC4053HRSM. Enables the parish to respond quickly to those in genuine or urgent need.",
    icon: "hand-heart",
  },
  {
    name: "Weekend collections",
    description:
      "Tap and Give via NETS or credit card at terminals near the church entrances before and after weekend Masses. Cash offerings at Mass remain welcome.",
    icon: "church",
  },
  {
    name: "Church Maintenance Fund",
    description:
      "For the upkeep of the WOHA church and its facilities — a house of prayer that must also be kept standing.",
    icon: "landmark",
  },
  {
    name: "Cheque",
    description:
      "Payable to Church of St Mary of the Angels. On the reverse: name, contact, address if a receipt is needed, and the purpose of donation.",
    icon: "book",
  },
  {
    name: "Cash at Reception",
    description:
      "Cash donations in person at the Parish Reception, Level 1. Please do not mail cash to the church.",
    icon: "heart",
  },
  {
    name: "General Church Offering",
    description:
      "Supports the day-to-day life of a Franciscan parish of some 10,000 — liturgy, formation, and the household of faith.",
    icon: "flame",
  },
  {
    name: "Mass offerings",
    description:
      "Intentions may be offered through Reception. The friars will remember your dead, your sick, and your thanksgiving at the altar.",
    icon: "sprout",
  },
];

export const serveRoles = [
  {
    title: "Liturgical ministers",
    summary:
      "Serve at the altar, in the choir, at the ambo, or in the flow of Holy Communion. Preserve a sense of the sacred.",
  },
  {
    title: "Catechists & facilitators",
    summary:
      "Walk with children in CGS and parish catechism, and with adults who want formation that changes a life, not a notebook.",
  },
  {
    title: "Pastoral care",
    summary:
      "Visit the sick, accompany the bereaved, and meet Christ in the poor. Outreach that is encounter, not only assistance.",
  },
  {
    title: "Hospitality & grounds",
    summary:
      "No visitor should leave unnoticed. Ushers, welcomers, and those who keep the piazza, garden, and car park a place of peace.",
  },
] as const;

export const devotions = [
  {
    title: "Devotion to St Anthony",
    when: "Tuesdays, 6.30 p.m.",
    where: "Incorporated into the Mass — Main Church. Confessions after, until 10 January 2027.",
  },
  {
    title: "Adoration of the Blessed Sacrament",
    when: "Daily, 7.00 a.m.–9.30 p.m.",
    where: "Adoration Chapel, Level 1, beside the Main Church.",
  },
  {
    title: "Sacrament of Reconciliation",
    when: "Weekends, 30 minutes before English Masses",
    where: "Confessionals in the Main Church. No appointment needed.",
  },
  {
    title: "Morning Prayer (Lauds)",
    when: "Weekdays, with the 7.00 a.m. Mass",
    where: "Main Church, Level 1.",
  },
  {
    title: "Mass for the Deaf Community",
    when: "Sundays, 4.00 p.m.",
    where: "Venue announced with SignLight. See the latest bulletin.",
  },
  {
    title: "Portiuncula · Our Lady of the Angels",
    when: "2 August",
    where: "Parish feast of the little portion of land in Assisi, for which this church is named.",
  },
] as const;
