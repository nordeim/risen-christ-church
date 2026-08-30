/**
 * Canonical site constants — single source for address, contact, and
 * map URLs so Footer + Worship + any future page cannot drift.
 * Verified against risenchrist.org.sg (2026).
 */
export const site = {
  name: "Church of the Risen Christ",
  shortName: "Risen Christ Toa Payoh",
  chineseName: "耶稣复活堂",
  tagline: "Grateful, Faithful, and Sent.",
  vision: "He is risen.",
  address: {
    street: "91 Toa Payoh Central",
    city: "Singapore",
    zip: "319193",
    get full() {
      return `${this.street}, ${this.city} ${this.zip}`;
    },
    get query() {
      return encodeURIComponent(this.full);
    },
  },
  hours: {
    gates: "Open for Mass, Adoration, and parish programmes",
    mainChurch: "Open for Mass and private prayer",
    chapel:
      "Adoration Room — Mon 12.00 noon–10.00 p.m.; Tue–Sat 7.00 a.m.–10.00 p.m.; Sun 7.00 a.m.–6.00 p.m.; Public holidays 8.00 a.m.–6.00 p.m.",
    reception:
      "Parish Office: Mon–Fri 9.00 a.m.–4.00 p.m.; Sat 9.00 a.m.–12.00 noon; Sun 8.00 a.m.–1.00 p.m.",
    parishOffice:
      "Mon–Fri 9.00 a.m.–4.00 p.m.; Sat 9.00 a.m.–12.00 noon; Sun 8.00 a.m.–1.00 p.m.",
    mediaCentre:
      "Tue & Fri 12.00 noon–4.00 p.m.; Sat 12.00 noon–7.00 p.m.; Sun 8.00 a.m.–1.00 p.m. Tel +65 6356 5958",
    adorationRoom:
      "Mon 12.00 noon–10.00 p.m.; Tue–Sat 7.00 a.m.–10.00 p.m.; Sun 7.00 a.m.–6.00 p.m.; Public holidays 8.00 a.m.–6.00 p.m.",
  },
  mass: {
    weekdayMorning: "Mon–Fri, 6.30 a.m.",
    weekdayEvening: "Mon–Fri, 6.00 p.m.",
    saturday: "6.30 a.m. · 5.30 p.m. (anticipated Sunday Mass)",
    sunday: [
      "7.00 a.m. English",
      "8.15 a.m. Mandarin",
      "9.45 a.m. English",
      "11.30 a.m. English",
      "5.30 p.m. English",
    ],
    confession:
      "Please approach a priest after Mass, or contact the parish office to arrange a time of Reconciliation.",
    adoration:
      "Adoration Room — Monday 12.00 noon–10.00 p.m.; Tuesday to Saturday 7.00 a.m.–10.00 p.m.; Sunday 7.00 a.m.–6.00 p.m.; Public holidays 8.00 a.m.–6.00 p.m.",
    secondCollection: "Announced in the weekly bulletin",
    note: "All Masses are held in the Main Church unless otherwise indicated. Public holidays (Mon–Fri): 7.30 a.m. only. Saturday public holidays: 7.30 a.m. and 5.30 p.m.",
    monthly:
      "Bahasa Indonesia: 1st Friday, 8.00 p.m. · Tamil: 2nd Sunday, 7.00 p.m. · Tagalog: 4th Sunday, 3.00 p.m.",
  },
  contact: {
    parishPriestPhone: "+65 6255 7509",
    officePhone: "+65 6253 2166",
    mediaPhone: "+65 6356 5958",
    email: "crc.secretariat@catholic.org.sg",
    adminEmail: "crc.admin@catholic.org.sg",
    connectEmail: "crc.pastoral@catholic.org.sg",
    youthEmail: "crc.youth@catholic.org.sg",
    dpoEmail: "dpo.crc@catholic.org.sg",
  },
  transport: {
    mrt: "Toa Payoh (NS19) — 6 minutes' walk from Exit A",
    buses: "88, 157, 163 — 2 minutes from bus stop B52261",
  },
  feast: {
    name: "The Risen Christ",
    date: "Easter Sunday",
  },
  uen: "T08CC4042G",
  chequePayee: "Church of the Risen Christ",
  facebook: "https://www.facebook.com/risenchrist.sg",
  instagram: "https://www.instagram.com/churchoftherisenchrist",
  youtube: "https://www.youtube.com/churchoftherisenchrist",
  archdiocese: "https://www.catholic.sg/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=91+Toa+Payoh+Central+Singapore+319193",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=91+Toa+Payoh+Central,+Singapore+319193&output=embed",
  origin: "https://www.risenchrist.org.sg",
  freeMinistry: "https://free.risenchrist.org.sg/",
  ssvp: "https://ssvp.risenchrist.org.sg/",
  bulletin: "https://online.fliphtml5.com/krnap/qfut/",
  cep: "https://www.cep-sg.org",
  get url() {
    return `${this.origin}/`;
  },
  get ogImage() {
    return `${this.origin}/images/hero-church.jpg`;
  },
} as const;
