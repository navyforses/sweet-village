import { applyAuthenticCopy } from "../authenticCopy";

const en = {
  meta: {
    title: "Sweet Village — Cottages, Pool and Restaurant in Tskaltubo",
    description:
      "Wooden cottages, an outdoor pool, a Georgian restaurant, and a covered event space in the village of Kvilishori, Tskaltubo.",
    pages: {
      home: { title: "Sweet Village — Cottages, Pool and Restaurant near Prometheus Cave", description: "Wooden cottages, an outdoor pool, a Georgian restaurant and a covered garden venue in Kvilishori, Tskaltubo — 2 minutes from Prometheus Cave, 20 from Kutaisi." },
      stay: { title: "Cottages and Rooms in Tskaltubo near Prometheus Cave — Sweet Village", description: "Five units in one garden for up to 18 guests: wooden cottages and rooms with pool, free parking and breakfast. Kvilishori, Tskaltubo. Prices and booking." },
      menu: { title: "Restaurant Menu — Georgian Cuisine in Tskaltubo | Sweet Village", description: "Khachapuri, khinkali, mtsvadi, chakapuli, salads and drinks — 9 categories with prices in GEL. A live menu that is always up to date." },
      events: { title: "Garden Wedding and Event Venue near Kutaisi — Sweet Village", description: "Covered garden venue with an open-air feast: weddings, engagements, birthdays, corporate days and poolside parties in Kvilishori, Tskaltubo." },
      pool: { title: "Outdoor Pool Day Pass in Tskaltubo | Sweet Village", description: "Outdoor pool in a green garden, 20 minutes from Kutaisi. Day-pass prices for adults and children, opening hours, season and house rules." },
      location: { title: "How to Get Here — Kvilishori, near Prometheus Cave | Sweet Village", description: "Map and distances: Prometheus Cave 2 minutes, Kutaisi and the airport, Sataplia, Okatse and Martvili canyons. Address and reception hours." },
      about: { title: "About Sweet Village — a Family Place in Kvilishori", description: "A family-run place in Kvilishori: green garden, wooden cottages, a pool and home-cooked Georgian feasts. Our story, numbers and photos." },
      booking: { title: "Book Your Stay — Sweet Village", description: "Request form for a cottage, an event, the pool or a feast. We reply by phone or WhatsApp." },
      guides: { title: "Travel Guides — Prometheus Cave, Tskaltubo, Canyons | Sweet Village", description: "Practical guides to Imereti's sights: tickets, hours, routes and tips from the hosts of Sweet Village, two minutes from Prometheus Cave." },
      notFound: { title: "Page Not Found — Sweet Village", description: "This link no longer exists. Go back to the home page." },
    },
  },
  brand: {
    name: "Sweet Village",
    tagline: "Kvilishori · Tskaltubo · Imereti",
  },
  nav: {
    home: "Home",
    events: "Events",
    pool: "Pool",
    restaurant: "Restaurant",
    menu: "Menu",
    stay: "Stay",
    location: "Location",
    about: "About",
    guides: "Guides",
    contact: "Contact",
    book: "Book",
  },
  common: {
    from: "From",
    perNight: "night",
    guests: "guests",
    beds: "beds",
    upTo: "Up to",
    call: "Call",
    whatsapp: "WhatsApp",
    viewAll: "View all",
    learnMore: "Learn more",
    bookNow: "Book now",
    askPrice: "Ask for price",
    minutes: "min",
    km: "km",
    lari: "₾",
    provisional: "Prices are provisional — please call to confirm",
    langLabel: "Language",
    close: "Close",
  },
  hero: {
    eyebrow: "Tskaltubo · Kvilishori",
    title: "A place where good food, a pool, and a quiet night come together",
    subtitle:
      "Wooden cottages in the garden, an outdoor pool, Imeretian cuisine, and a covered space that comfortably seats fifty guests.",
    ctaPrimary: "Call to book",
    ctaSecondary: "View menu",
  },
  highlights: {
    title: "Why Sweet Village",
    items: [
      {
        title: "2 minutes from Prometheus Cave",
        body: "Georgia's most famous cave is practically at our door — you won't waste time on transport.",
      },
      {
        title: "Outdoor pool in the garden",
        body: "A large pool with sun loungers and shade. Free for overnight guests.",
      },
      {
        title: "Food prepared in a ketsi",
        body: "Imeretian khachapuri, shkmeruli, mtsvadi on vine embers, and khinkali — 68 items in total.",
      },
      {
        title: "Space for events",
        body: "A covered outdoor hall for weddings, engagement parties, birthdays, or corporate days.",
      },
    ],
  },
  services: {
    title: "What we offer",
    subtitle: "Four directions in one space",
    events: {
      title: "Events",
      body: "Weddings, engagement parties, birthdays, and corporate meetings in a covered outdoor space.",
    },
    pool: {
      title: "Pool and day visits",
      body: "Day passes for the pool without an overnight stay — a family getaway without leaving the area.",
    },
    restaurant: {
      title: "Restaurant and cafe-bar",
      body: "Imeretian cuisine, ketsi dishes, and mtsvadi. Dine on the open terrace or in the hall.",
    },
    stay: {
      title: "Cottages",
      body: "Wooden cottages and rooms for 2 to 6 guests — the whole complex accommodates 18 people.",
    },
  },
  stay: {
    eyebrow: "Stay",
    title: "Cottages and rooms",
    intro:
      "Five independent units in one garden. All interiors feature pine wood, warm lighting, and botanical curtains. The owner-confirmed total capacity is 18 guests.",
    facilities: {
      title: "What's included",
      items: [
        "Free pool access",
        "Free on-site parking",
        "Wi-Fi",
        "Barbecue and skewer area",
        "En-suite bathroom in all units",
        "Breakfast by arrangement",
      ],
    },
  },
  events: {
    eyebrow: "Events",
    title: "A space where the feast lasts long",
    intro:
      "A covered outdoor hall in the garden — rain or shine. The food is prepared by our kitchen, the area is entirely at your disposal, and guests who wish to stay the night will be accommodated in the cottages.",
    capacityLabel: "guests",
    policy: {
      title: "Important policy",
      body: "For events with more than 20 guests, the entire complex is exclusively yours. This way, music and noise won't disturb other guests, and you can relax without restrictions.",
    },
    cta: "Discuss an event",
  },
  pool: {
    eyebrow: "Pool",
    title: "A day of rest by the pool",
    intro:
      "An outdoor pool in the garden, with sun loungers and shade. Free for overnight guests; those visiting just for the day use a day pass.",
    adultLabel: "Adult",
    childLabel: "Child",
    childNote: "Under 12",
    guestNote: "Free for overnight guests",
    hours: "Opening hours",
    season: "Season",
    seasonValue: "June — September",
    limitTitle: "Daily limit",
    limitBody:
      "We welcome 40 visitors a day. This is a deliberate limit — space and tranquility by the pool must be maintained. Calling ahead is essential on holidays.",
    cta: "Book a spot",
    faq: {
      title: "Pool questions",
      items: [
        { question: "Can I use the pool without staying overnight?", answer: "Yes, with a day pass. Adult and child prices are listed above; for overnight guests the pool is free." },
        { question: "Do I need to book in advance?", answer: "On weekends and holidays, yes: we admit a limited number of visitors a day. On weekdays there is usually space, but one call makes it certain." },
        { question: "Are there sun loungers, shade and food?", answer: "There are loungers and shaded spots by the pool, and the restaurant and bar are right next to it, so lunch on the terrace is easy. No need to bring your own food." },
      ],
    },
  },
  restaurant: {
    eyebrow: "Restaurant",
    title: "Imeretian feast with ketsi and embers",
    intro:
      "Khachapuri from the tone, shkmeruli in a ketsi, mtsvadi on vine embers, and khinkali by the piece. Dine on the open terrace or in the hall, which seats 60.",
    cta: "View full menu",
    itemsCount: "68 items in 9 categories",
  },
  menu: {
    eyebrow: "Restaurant",
    title: "Menu",
    intro:
      "Prices are in GEL. Dishes are prepared to order, so for a large feast, we prefer advance orders.",
    qrTitle: "Share menu",
    qrBody:
      "Scan the code or share the link — the menu always opens with the updated version, without downloading a file.",
    copyLink: "Copy link",
    copied: "Copied",
    noAlcoholNote:
      "We have a separate list for wine and beer — to be confirmed on site.",
    searchPlaceholder: "Search for a dish",
    noResults: "Nothing found",
  },
  location: {
    eyebrow: "Location",
    title: "Where we are and what's nearby",
    intro:
      "Kvilishori in Tskaltubo municipality, in the heart of Imereti. With a one-night stay, you can manage two or three sights — caves, canyons, and the beautiful Mount Khvamli.",
    driveTime: "By car",
    addressTitle: "Address",
    addressValue: "Village Kvilishori, Tskaltubo Municipality, Imereti, Georgia",
    openTitle: "Reception hours",
    openValue: "Every day, 24 hours",
  },
  about: {
    eyebrow: "About us",
    title: "A small village built by a family",
    body1:
      "Sweet Village in Kvilishori was created with one goal — so a guest doesn't have to choose between a good feast and a quiet night. We placed wooden cottages in the garden, built a pool next to them, and based the kitchen on recipes passed down through generations in Imereti.",
    body2:
      "Today, a wedding might be taking place, a foreign tourist resting after Prometheus Cave, and a family from Kutaisi arriving just to spend the day by the pool, all at the same time. We carefully separate these three scenarios so no one is inconvenienced.",
    stats: {
      units: "Accommodation units",
      guests: "Guests at once",
      dishes: "Dishes on the menu",
      minutes: "Minutes to Prometheus",
    },
  },
  booking: {
    eyebrow: "Booking",
    title: "Booking request",
    intro:
      "Fill out the form and we will contact you to confirm availability and exact pricing. In case of urgency, call us directly.",
    name: "Name",
    namePlaceholder: "Your name",
    phone: "Phone",
    phonePlaceholder: "+995 5xx xx xx xx",
    checkIn: "Check-in",
    checkOut: "Check-out",
    unit: "What are you interested in",
    unitPlaceholder: "Select",
    guests: "Number of guests",
    notes: "Notes",
    notesPlaceholder: "Event type, special requests, questions",
    submit: "Send request",
    submitting: "Sending",
    orWhatsapp: "Or send via WhatsApp",
    successTitle: "Request received",
    successBody: "Thank you. We will contact you shortly.",
    errorTitle: "Could not send",
    errorBody: "Please try again or call us directly.",
    required: "Required",
    invalidPhone: "Enter a valid number",
    anyUnit: "Any available unit",
    fallbackTitle: "Request saved",
    fallbackBody:
      "Your request was recorded, but our notification did not go through. To be certain, message us on WhatsApp or call us.",
    faq: {
      title: "Booking questions",
      items: [
        { question: "How is a booking confirmed, and is a deposit required?", answer: "After your request we confirm availability and the price by phone or WhatsApp. In high season and for events a deposit may be needed to hold the date; we tell you the amount and payment method when confirming." },
        { question: "What is the cancellation policy?", answer: "The terms depend on the dates and are written into your confirmation message; for events they are agreed individually. If you need flexibility, ask us before booking." },
        { question: "Is breakfast included, and when is check-in?", answer: "Breakfast is included for overnight guests, the pool is free and parking is in the garden. Reception works 24 hours; please let us know in advance if you arrive at night." },
      ],
    },
    interestOptions: {
      cottage: "Cottage / Overnight stay",
      event: "Event",
      pool: "Pool / Day visit",
      restaurant: "Restaurant / Feast",
      whole: "Entire complex",
    },
  },
  guides: {
    eyebrow: "Guides",
    title: "What to see in Imereti: our guides",
    intro: "Tickets, hours, routes and tips for the places guests ask us about most. Written by us, the hosts, and updated every season.",
    readGuide: "Read the guide",
    back: "All guides",
    published: "Published",
    updated: "Updated",
    readingTime: "min read",
    faqTitle: "Frequently asked questions",
    empty: "No guides in this language yet.",
    viewEnglish: "View in English",
    notInLanguage: "This guide has not been translated into this language yet; the available version is below.",
    planTitle: "Stay two minutes from Prometheus Cave",
    planBody: "Wooden cottages and rooms for up to 18 guests, an outdoor pool and Imeretian feasts in one garden: the base for every route on this page.",
    ctaStay: "Cottages and rooms",
    ctaBook: "Booking request",
    moreTitle: "More guides",
    onMap: "Map and distances",
  },
  gallery: {
    eyebrow: "Gallery",
    title: "What it looks like on site",
  },
  footer: {
    contact: "Contact",
    explore: "Explore",
    follow: "Social media",
    rights: "All rights reserved",
    share: "Share",
  },
  notFound: {
    title: "Page not found",
    body: "The link might have changed. Return to the home page.",
    cta: "To home page",
  },
};

export default applyAuthenticCopy(en, "en");
