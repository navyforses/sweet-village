import { applyAuthenticCopy } from "../authenticCopy";

const fr = {
  "meta": {
    "title": "Sweet Village — Cottages, piscine et restaurant à Tskaltoubo",
    "description": "Cabanes en bois, piscine extérieure, restaurant géorgien et espace couvert pour événements à Kvilishori, Tskaltoubo, Imérétie.",
    "pages": {
      "home": { "title": "Sweet Village — Cottages, piscine et restaurant près de la grotte de Prométhée", "description": "Cabanes en bois, piscine extérieure, restaurant géorgien et espace couvert dans un jardin à Kvilishori, Tskaltoubo — à 2 minutes de la grotte de Prométhée, 20 de Koutaïssi." },
      "stay": { "title": "Cottages et chambres à Tskaltoubo près de la grotte de Prométhée — Sweet Village", "description": "Cinq logements dans un même jardin, jusqu'à 18 personnes : cabanes en bois et chambres avec piscine, parking gratuit et petit-déjeuner. Tarifs et réservation." },
      "menu": { "title": "Menu du restaurant — cuisine géorgienne à Tskaltoubo | Sweet Village", "description": "Khatchapouri, khinkali, mtsvadi, tchakapouli, salades et boissons — 9 catégories avec prix en lari. Un menu en ligne toujours à jour." },
      "events": { "title": "Mariage et fêtes dans la nature près de Koutaïssi — Sweet Village", "description": "Espace couvert dans le jardin et banquet en plein air : mariages, fiançailles, anniversaires, séminaires et fêtes au bord de la piscine. Kvilishori, Tskaltoubo." },
      "pool": { "title": "Piscine extérieure à Tskaltoubo — entrée à la journée | Sweet Village", "description": "Piscine extérieure dans un jardin, à 20 minutes de Koutaïssi. Tarifs à la journée adultes et enfants, horaires, saison et règles." },
      "location": { "title": "Comment venir — Kvilishori, près de la grotte de Prométhée | Sweet Village", "description": "Carte et distances : grotte de Prométhée à 2 minutes, Koutaïssi et l'aéroport, Sataplia, canyons d'Okatsé et de Martvili. Adresse et horaires." },
      "about": { "title": "À propos — Sweet Village, Kvilishori", "description": "Un lieu familial à Kvilishori : jardin verdoyant, cabanes en bois, piscine et festins géorgiens faits maison. Notre histoire, nos chiffres, nos photos." },
      "booking": { "title": "Réservation — Sweet Village", "description": "Formulaire de demande pour un cottage, un événement, la piscine ou un repas. Réponse par téléphone ou WhatsApp." },
      guides: { title: "Guides — Grotte de Prométhée, Tskaltoubo, canyons | Sweet Village", description: "Guides pratiques sur les sites d'Iméréthie : billets, horaires, itinéraires et conseils des hôtes de Sweet Village, à deux minutes de la grotte de Prométhée." },
      "notFound": { "title": "Page introuvable — Sweet Village", "description": "Ce lien n'existe plus. Retournez à l'accueil." },
    },
  },
  "brand": {
    "name": "Sweet Village",
    "tagline": "Kvilishori · Tskaltoubo · Imérétie"
  },
  "nav": {
    "home": "Accueil",
    "events": "Événements",
    "pool": "Piscine",
    "restaurant": "Restaurant",
    "menu": "Menu",
    "stay": "Hébergement",
    "location": "Localisation",
    "about": "À propos",
    guides: "Guides",
    "contact": "Contact",
    "book": "Réservation"
  },
  "common": {
    "from": "à partir de",
    "perNight": "par nuit",
    "guests": "invités",
    "beds": "lits",
    "upTo": "jusqu'à",
    "call": "Appeler",
    "whatsapp": "WhatsApp",
    "viewAll": "Voir tout",
    "learnMore": "En savoir plus",
    "bookNow": "Réserver",
    "askPrice": "Demander le prix",
    "minutes": "min",
    "km": "km",
    "lari": "₾",
    "provisional": "Prix indicatifs — à confirmer par téléphone",
    "langLabel": "Langue",
    "close": "Fermer"
  },
  "hero": {
    "eyebrow": "Tskaltoubo · Kvilishori",
    "title": "Un seul endroit où la table, la piscine et le calme nocturne se conjuguent",
    "subtitle": "Cabanes en bois au jardin, piscine extérieure, gastronomie géorgienne et espace couvert où cinquante invités prennent place sans effort.",
    "ctaPrimary": "Appelez-nous et réservez",
    "ctaSecondary": "Voir le menu"
  },
  "highlights": {
    "title": "Pourquoi Sweet Village",
    "items": [
      {
        "title": "À deux minutes de la grotte de Prométhée",
        "body": "La grotte de Prométhée, la plus célèbre de Géorgie, est littéralement à votre porte — pas de perte de temps pour le transport."
      },
      {
        "title": "Piscine extérieure dans le jardin",
        "body": "Une grande piscine entourée de transats et d’ombre. L’accès est gratuit pour les visiteurs nocturnes."
      },
      {
        "title": "Table dressée sur des ketsi",
        "body": "khatchapouri tout juste sorti du four, chkmérouli, mtsvadi sur des éclats de vigne et khinkali — 68 plats."
      },
      {
        "title": "Espace pour événements",
        "body": "Une terrasse extérieure couverte pour les mariages, les fiançailles, les anniversaires ou les événements d’entreprise."
      }
    ]
  },
  "services": {
    "title": "Ce que nous proposons",
    "subtitle": "Quatre volets sur un seul site",
    "events": {
      "title": "Événements",
      "body": "Mariage, fiançailles, anniversaire et réunions d’entreprise dans l’espace extérieur couvert."
    },
    "pool": {
      "title": "Piscine et visite en journée",
      "body": " Billet journée donnant accès à la piscine sans séjour nocturne — détente familiale sans sortir de la ville."
    },
    "restaurant": {
      "title": "Restaurant et cafétéria-bar",
      "body": "Cuisine d’Imérétie, plats servis sur des ketsi et grillades. La table est en terrasse ouverte ou dans la salle."
    },
    "stay": {
      "title": "Cabanes",
      "body": "Cinq hébergements indépendants dans un même jardin, pour une capacité totale confirmée de 18 personnes."
    }
  },
  "stay": {
    "eyebrow": "Hébergement",
    "title": "Cabanes et chambres",
    "intro": "Cinq hébergements indépendants dans un même jardin. La capacité totale confirmée par le propriétaire est de 18 personnes.",
    "facilities": {
      "title": "Ce qui est inclus",
      "items": [
        "Accès gratuit à la piscine",
        "Parking gratuit sur le site",
        "Wi-Fi",
        "Coin repas et zone douche",
        "Toilettes dans chaque unité",
        "Petit-déjeuner sur demande"
      ]
    }
  },
  "events": {
    "eyebrow": "Événements",
    "title": "Un espace où la fête se prolonge",
    "intro": "Une terrasse extérieure couverte dans le jardin — par temps de pluie comme de soleil. Notre cuisine prépare le banquet, le site vous est entièrement réservé, et les invités qui souhaitent passer la nuit seront logés dans des cottages.",
    "capacityLabel": "Invité",
    "policy": {
      "title": "Conditions importantes",
      "body": "Pour les événements de plus de 20 invités, l’ensemble du complexe est à votre entière disposition. Ainsi, musique et bruit ne dérangeront pas les autres visiteurs et vous pourrez vous détendre sans contraintes."
    },
    "cta": "Discuter du projet"
  },
  "pool": {
    "eyebrow": "Piscine",
    "title": "Détente en journée près de la piscine",
    "intro": "Piscine extérieure dans le jardin, avec transats et ombre. L’accès est gratuit pour les visiteurs nocturnes ; ceux qui viennent en journée peuvent utiliser le billet journée.",
    "adultLabel": "Adulte",
    "childLabel": "Enfant",
    "childNote": "12 ans et moins",
    "guestNote": "Gratuit pour les visiteurs nocturnes",
    "hours": "Horaires",
    "season": "Saison",
    "seasonValue": "Juin — Septembre",
    "limitTitle": "Limite journalière",
    "limitBody": "Nous accueillons 40 visiteurs par jour. Il s’agit d’une limite consciente — l’emplacement et la tranquillité autour de la piscine doivent rester. Pour les jours fériés, un appel préalable est nécessaire.",
    "cta": "Réserver une place",
    faq: {
      title: "Questions sur la piscine",
      items: [
        { question: "Puis-je profiter de la piscine sans dormir sur place ?", answer: "Oui, avec un billet à la journée. Les tarifs adulte et enfant sont indiqués ci-dessus ; la piscine est gratuite pour les hôtes qui dorment chez nous." },
        { question: "Faut-il réserver à l'avance ?", answer: "Le week-end et les jours fériés, oui : nous accueillons un nombre limité de visiteurs par jour. En semaine il y a généralement de la place, mais un appel vous en assure." },
        { question: "Y a-t-il des transats, de l'ombre et de quoi manger ?", answer: "Il y a des transats et des coins d'ombre au bord de la piscine, et le restaurant et le bar sont juste à côté : déjeuner en terrasse est facile. Inutile d'apporter votre repas." },
      ],
    },
  },
  "restaurant": {
    "eyebrow": "Restaurant",
    "title": "Table géorgienne sur ketsi et braises",
    "intro": "khatchapouri tout juste sorti du four, chkmérouli dans un ketsi, mtsvadi sur des éclats de vigne et khinkali à la pièce. La table est en terrasse ouverte ou dans la salle, où 60 places sont disponibles.",
    "cta": "Voir le menu complet",
    "itemsCount": "68 plats répartis en 9 catégories"
  },
  "menu": {
    "eyebrow": "Restaurant",
    "title": "Menu",
    "intro": "Les prix sont indiqués en lari. Les plats sont préparés après la commande, donc pour les grandes tablées, il vaut mieux commander à l’avance.",
    "qrTitle": "Partage du menu",
    "qrBody": "Scannez le code ou partagez le lien — le menu s’ouvre toujours avec la version mise à jour, sans téléchargement de fichier.",
    "copyLink": "Copier le lien",
    "copied": "Copié",
    "noAlcoholNote": "La liste des vins et bières est disponible séparément — à confirmer sur place.",
    "searchPlaceholder": "Recherche d’un plat",
    "noResults": "Aucun résultat"
  },
  "location": {
    "eyebrow": "Localisation",
    "title": "Où nous sommes et ce qui est proche",
    "intro": "Kvilishori, dans la municipalité de Tskaltoubo, au cœur de l’Imérétie. En passant une nuit, vous pourrez voir deux ou trois sites — grottes, canyons et la magnifique montagne Khvamli.",
    "driveTime": "En voiture",
    "addressTitle": "Adresse",
    "addressValue": "Village de Kvilishori, municipalité de Tskaltoubo, Imérétie, Géorgie",
    "openTitle": "Horaires d’accueil",
    "openValue": "Tous les jours, 24 heures"
  },
  "about": {
    "eyebrow": "À propos",
    "title": "Un petit village construit par une famille",
    "body1": "Sweet Village à Kvilishori a été créé pour que le visiteur n’ait pas à choisir entre une belle table et une nuit de tranquillité. Dans le jardin, des cottages en bois; à côté, une piscine; la cuisine repose sur des recettes transmises de génération en génération en Imérétie.",
    "body2": "Aujourd’hui, ici se côtoient un mariage, un touriste étranger qui se repose après la grotte de Prométhée, et une famille koutaïssienne qui souhaite simplement passer la journée près de la piscine. Nous séparons soigneusement ces trois usages pour que chacun puisse en profiter sans déranger les autres.",
    "stats": {
      "units": "unités d’hébergement",
      "guests": "invités simultanément",
      "dishes": "plats au menu",
      "minutes": "minutes jusqu’à Prométhée"
    }
  },
  "booking": {
    "eyebrow": "Réservation",
    "title": "Demande de réservation",
    "intro": "Veuillez remplir le formulaire et nous vous contacterons pour confirmer la disponibilité et le prix exact. En cas d’urgence, appelez-nous directement.",
    "name": "Nom",
    "namePlaceholder": "Votre nom",
    "phone": "Téléphone",
    "phonePlaceholder": "+995 5xx xx xx xx",
    "checkIn": "Arrivée",
    "checkOut": "Départ",
    "unit": "Ce qui vous intéresse",
    "unitPlaceholder": "Sélectionnez",
    "guests": "Nombre d'invités",
    "notes": "Remarques",
    "notesPlaceholder": "Type d'événement, demandes particulières, questions",
    "submit": "Envoyer la demande",
    "submitting": "Envoi en cours",
    "orWhatsapp": "Ou envoyez via WhatsApp",
    "successTitle": "Demande reçue",
    "successBody": "Merci. Nous vous contacterons dans les plus brefs délais.",
    "errorTitle": "Échec de l'envoi",
    "errorBody": "Veuillez réessayer ou nous appeler directement.",
    "required": "Obligatoire",
    "invalidPhone": "Veuillez entrer un numéro valide",
    "anyUnit": "N'importe quel logement disponible",
    "fallbackTitle": "Demande enregistrée",
    "fallbackBody": "Votre demande a été enregistrée, mais notre notification n'est pas partie. Pour en être sûr, écrivez-nous sur WhatsApp ou appelez-nous.",
    faq: {
      title: "Questions sur la réservation",
      items: [
        { question: "Comment la réservation est-elle confirmée, et faut-il un acompte ?", answer: "Après votre demande, nous confirmons la disponibilité et le prix par téléphone ou WhatsApp. En haute saison et pour les événements, un acompte peut être demandé pour bloquer la date ; nous vous indiquons le montant et le mode de paiement lors de la confirmation." },
        { question: "Quelles sont les conditions d'annulation ?", answer: "Les conditions dépendent des dates et figurent dans votre message de confirmation ; pour les événements, elles sont convenues individuellement. Si vous avez besoin de souplesse, demandez-nous avant de réserver." },
        { question: "Le petit-déjeuner est-il inclus, et à quelle heure l'arrivée ?", answer: "Le petit-déjeuner est inclus pour les hôtes qui dorment sur place, la piscine est gratuite et le parking est dans le jardin. La réception fonctionne 24 h/24 ; prévenez-nous si vous arrivez de nuit." },
      ],
    },
    "interestOptions": {
      "cottage": "Cottage / nuitée",
      "event": "Événement",
      "pool": "Piscine / visite en journée",
      "restaurant": "Restaurant / table",
      "whole": "Complexe entier"
    }
  },
  guides: {
    eyebrow: "Guides",
    title: "Que voir en Iméréthie : nos guides",
    intro: "Billets, horaires, itinéraires et conseils sur les lieux dont nos hôtes nous parlent le plus. Écrits par nous, les propriétaires, et mis à jour chaque saison.",
    readGuide: "Lire le guide",
    back: "Tous les guides",
    published: "Publié le",
    updated: "Mis à jour le",
    readingTime: "min de lecture",
    faqTitle: "Questions fréquentes",
    empty: "Pas encore de guide dans cette langue.",
    viewEnglish: "Voir en anglais",
    notInLanguage: "Ce guide n'est pas encore traduit dans cette langue ; la version disponible est ci-dessous.",
    planTitle: "Séjournez à deux minutes de la grotte de Prométhée",
    planBody: "Chalets en bois et chambres pour 18 personnes, piscine extérieure et table iméréthienne dans un même jardin : la base de tous les itinéraires de cette page.",
    ctaStay: "Chalets et chambres",
    ctaBook: "Demande de réservation",
    moreTitle: "Autres guides",
    onMap: "Carte et distances",
  },
  "gallery": {
    "eyebrow": "Galerie",
    "title": "À quoi ressemble l’endroit"
  },
  "footer": {
    "contact": "Contact",
    "explore": "Pages",
    "follow": "Réseaux sociaux",
    "rights": "Tous droits réservés",
    "share": "Partager"
  },
  "notFound": {
    "title": "Page introuvable",
    "body": "Le lien a peut-être changé. Revenez à la page d'accueil.",
    "cta": "Page d'accueil"
  }
};

export default applyAuthenticCopy(fr, "fr");
