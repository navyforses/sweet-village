import { applyAuthenticCopy } from "../authenticCopy";

const en = {
  meta: {
    title: "Sweet Village — Cottages, Pool and Restaurant in Tskaltubo",
    description:
      "Wooden cottages, an outdoor pool, a Georgian restaurant, and a covered event space in the village of Kvilishori, Tskaltubo.",
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
      body: "Wooden cottages and rooms for 2 to 6 guests — the whole complex accommodates 22 people.",
    },
  },
  stay: {
    eyebrow: "Stay",
    title: "Cottages and rooms",
    intro:
      "Five independent units in one garden. All interiors feature pine wood, warm lighting, and botanical curtains. 17 beds in total, accommodating up to 22 guests with sofa beds.",
    units: {
      "small-a": {
        title: "Garden Cottage 1",
        body: "A private wooden cottage in the green garden, with a bright studio interior, double bed, sofa, compact kitchenette, and its own covered porch. A peaceful choice for a couple or small family, accommodating up to four guests.",
      },
      "small-b": {
        title: "Garden Cottage 2",
        body: "Identical to the first cottage — often booked together by two couples or a group of friends who need separate entrances.",
      },
      "large-a": {
        title: "Family Duplex A",
        body: "A two-story room in the large cottage with a separate entrance. Two beds on the ground floor and two in the attic — comfortably sleeps four guests.",
      },
      "large-b": {
        title: "Family Duplex B",
        body: "The other half of the large cottage, also two-story and independent. Booking both rooms together accommodates eight guests in one house.",
      },
      grand: {
        title: "Pool View House",
        body: "A two-level wooden suite with a white balcony directly overlooking the pool. The lower floor has a double bed, compact kitchen and lounge; the loft has three single beds, with space for 6 guests using the sofa bed.",
      },
    },
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
    types: {
      wedding: {
        title: "Wedding",
        body: "Ceremony in the garden, banquet in the covered hall, overnight stay for close ones in the cottages.",
      },
      engagement: {
        title: "Engagement",
        body: "A small, intimate evening for a close circle — food, music, and the garden at sunset.",
      },
      birthday: {
        title: "Birthday",
        body: "A daytime format by the pool or an evening feast in the hall. The garden and the shallow part of the pool for children.",
      },
      corporate: {
        title: "Corporate",
        body: "A team away day half an hour from Kutaisi — meeting, dining, and pool in one place.",
      },
    },
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
    attractions: {
      prometheus: { title: "Prometheus Cave", note: "Stalactites, an underground river, and a boat trip." },
      tskaltubo: { title: "Tskaltubo Resort", note: "Healing waters and abandoned Soviet sanatoriums." },
      sataplia: { title: "Sataplia Nature Reserve", note: "Real dinosaur footprints and a glass viewing platform." },
      kutaisi: { title: "Kutaisi", note: "The capital of Imereti, Bagrati Cathedral, and the international airport." },
      gelati: { title: "Gelati Monastery", note: "UNESCO World Heritage site, 12th-century mosaics." },
      martvili: { title: "Martvili Canyon", note: "Emerald water and gliding on a boat between cliffs." },
      khvamli: { title: "Mount Khvamli", note: "The legendary table mountain in Lechkhumi — home of the Amirani myth." },
      okatse: { title: "Okatse Canyon", note: "A suspended trail over the canyon and Kinchkha Waterfall." },
    },
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
    interestOptions: {
      cottage: "Cottage / Overnight stay",
      event: "Event",
      pool: "Pool / Day visit",
      restaurant: "Restaurant / Feast",
      whole: "Entire complex",
    },
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
