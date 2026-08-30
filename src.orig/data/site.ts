/**
 * Canonical site constants — single source for address, contact, and
 * map URLs so Footer + Worship + any future page cannot drift.
 * Verified against stmary.sg (2026).
 */
export const site = {
  name: "Church of St Mary of the Angels",
  shortName: "St Mary's Bukit Batok",
  chineseName: "天神之后圣母堂",
  tagline: "Towards a Prayerful & Missionary Parish.",
  vision: "According to Thy Word.",
  address: {
    street: "5 Bukit Batok East Ave 2",
    city: "Singapore",
    zip: "659918",
    get full() {
      return `${this.street}, ${this.city} ${this.zip}`;
    },
    get query() {
      return encodeURIComponent(this.full);
    },
  },
  hours: {
    gates: "Daily, 7.00 a.m.–9.30 p.m.",
    mainChurch: "Open for Mass and private prayer",
    chapel: "Adoration Chapel, daily 7.00 a.m.–9.30 p.m.",
    reception:
      "Mon–Sat 9.00 a.m.–6.00 p.m. (lunch 1.00–2.00 p.m.); Sun 9.00 a.m.–1.00 p.m. Closed public holidays.",
    parishOffice: "Mon–Fri 9.00 a.m.–6.00 p.m. (lunch 1.00–2.00 p.m.). Closed weekends and public holidays.",
    columbarium: "Daily, 7.30 a.m.–9.30 p.m.",
    adorationRoom: "Daily, 7.00 a.m.–9.30 p.m.",
  },
  mass: {
    weekdayMorning: "Mon–Fri, 7.00 a.m. (with Morning Prayer) and 12.15 p.m. — Main Church",
    weekdayEvening: "Mon–Fri, 6.30 p.m. — Main Church",
    saturday: "4.00 p.m. · 6.00 p.m. English · 7.45 p.m. Tamil",
    sunday: [
      "7.15 a.m. Mandarin",
      "9.00 a.m. English",
      "11.00 a.m. English",
      "1.00 p.m. English",
      "5.00 p.m. English",
      "7.00 p.m. English",
    ],
    confession:
      "Weekends, 30 minutes before English Masses until 10 minutes before Mass begins. Saturday 3.30 p.m. and 5.30 p.m.; Sunday 8.30 a.m., 10.30 a.m., 12.30 p.m., 4.30 p.m. and 6.30 p.m.",
    adoration: "Adoration Chapel, daily 7.00 a.m.–9.30 p.m.",
    secondCollection: "Church Maintenance Fund — announced in the bulletin",
    note: "All Masses are held in the Main Church, Level 1, and in English, unless otherwise indicated.",
  },
  contact: {
    parishPriestPhone: "+65 6567 3866",
    officePhone: "+65 6567 3866",
    emergencyPhone: "+65 9682 7875",
    columbariumPhone: "+65 6560 6361",
    columbariumAfterHours: "+65 9774 7053",
    email: "parish.stmary@catholic.org.sg",
    connectEmail: "connect.stmary@catholic.org.sg",
  },
  transport: {
    mrt: "Bukit Batok (NS2) · Beauty World (DT5)",
    buses:
      "Ave 6: 61, 66, 157, 174, 178, 852, 871 · Ave 2: 970, 985 · Ave 3: 61, 77, 106, 157, 174, 178, 506, 852, 963, 990 · Ave 4: 173, 177, 963",
  },
  feast: {
    name: "Our Lady of the Angels · Portiuncula",
    date: "2 August",
  },
  uen: "T08CC4053H",
  uenPoorNeedy: "T08CC4053HRSM",
  chequePayee: "Church of St Mary of the Angels",
  facebook: "https://www.facebook.com/stmary.sg",
  instagram: "https://instagram.com/stmary.sg",
  youtube: "https://www.youtube.com/c/StMarysgtv",
  telegram: "https://t.me/stmarysg",
  whatsapp: "https://whatsapp.com/channel/0029Va663rp3rZZdVEyToo08",
  archdiocese: "https://www.catholic.sg/",
  franciscans: "https://franciscans.sg/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=5+Bukit+Batok+East+Ave+2+Singapore+659918",
  mapsEmbedSrc: "https://www.google.com/maps?q=5+Bukit+Batok+East+Ave+2,+Singapore+659918&output=embed",
  origin: "https://www.stmary.sg",
  get url() {
    return `${this.origin}/`;
  },
  get ogImage() {
    return `${this.origin}/images/hero-church.jpg`;
  },
} as const;
