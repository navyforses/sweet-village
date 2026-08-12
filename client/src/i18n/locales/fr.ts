import { applyAuthenticCopy } from "../authenticCopy";

const fr = {
  "meta": {
    "title": "Sweet Village — Cottages, piscine et restaurant à Tskaltoubo",
    "description": "Cabanes en bois, piscine extérieure, restaurant géorgien et espace couvert pour événements à Kvilishori, Tskaltoubo, Imérétie."
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
      "body": "Cinq unités indépendantes dans un seul jardin. Toutes les intérieurs en bois de conifères, lumière chaude et rideaux botaniques. Au total 17 lits, canapés-lits pour 22 invités."
    }
  },
  "stay": {
    "eyebrow": "Hébergement",
    "title": "Cabanes et chambres",
    "intro": "Cinq unités indépendantes dans un seul jardin. Toutes les intérieurs en bois de conifères, lumière chaude et rideaux botaniques. Au total 17 lits, canapés-lits pour 22 invités.",
    "units": {
      "small-a": {
        "title": "Chalet du Jardin 1",
        "body": "Un chalet en bois indépendant au cœur du jardin, avec un studio lumineux, un lit double, un canapé, une kitchenette et une véranda privée couverte. Un choix paisible pour un couple ou une petite famille, jusqu'à quatre voyageurs."
      },
      "small-b": {
        "title": "Chalet du Jardin 2",
        "body": "Le même cottage que I — souvent réservé ensemble par deux couples ou un groupe d'amis, nécessitant une entrée séparée."
      },
      "large-a": {
        "title": "Duplex Familial A",
        "body": "Niveau deux dans le grand cottage, avec entrée indépendante. Deux lits au rez-de-chaussée et deux lits dans le grenier — quatre invités confortablement."
      },
      "large-b": {
        "title": "Duplex Familial B",
        "body": "Deuxième moitié du grand cottage, également à deux étages et indépendante. Deux chambres; ensemble, huit invités peuvent loger dans une seule habitation."
      },
      "grand": {
        "title": "Maison avec vue sur la piscine",
        "body": "Un hébergement en bois sur deux niveaux, avec balcon blanc donnant directement sur la piscine. En bas : lit double, kitchenette et coin salon ; dans le loft : trois lits simples. Jusqu’à 6 personnes avec le canapé-lit."
      }
    },
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
    "types": {
      "wedding": {
        "title": "Mariage",
        "body": "Cérémonie dans le jardin, banquet dans la salle couverte, nuitée pour les proches dans les cottages."
      },
      "engagement": {
        "title": "Fiançailles",
        "body": "Une soirée intime et courte pour un petit cercle — repas, musique et jardin au coucher du soleil."
      },
      "birthday": {
        "title": "Anniversaire",
        "body": "Format journée près de la piscine ou dîner en soirée dans la salle. Pour les enfants, le jardin et la partie peu profonde de la piscine."
      },
      "corporate": {
        "title": "Événement d’entreprise",
        "body": "Journée d’équipe à une demi-heure de Koutaïssi — réunion, banquet et piscine sur place."
      }
    },
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
    "cta": "Réserver une place"
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
    "attractions": {
      "prometheus": {
        "title": "Grotte de Prométhée",
        "note": "Stalactites, rivière souterraine et promenade en barque."
      },
      "tskaltubo": {
        "title": "Station thermale de Tskaltoubo",
        "note": "Eaux curatives et sanatoriums soviétiques abandonnés."
      },
      "sataplia": {
        "title": "Réserve Sataplia",
        "note": "Vélocité des dinosaures et belvédère de verre."
      },
      "kutaisi": {
        "title": "Koutaïssi",
        "note": "La capitale de l’Imérétie, la cathédrale Bagrat et l’aéroport international."
      },
      "gelati": {
        "title": "Monastère de Gélati",
        "note": "Site UNESCO, mosaïques du XIIe siècle."
      },
      "martvili": {
        "title": "Canyon de Martvili",
        "note": "Eaux émeraude et navigation entre les rochers."
      },
      "khvamli": {
        "title": "Mont Khvamli",
        "note": "Mont plat légendaire du Léchkhoum — berceau du mythe d'Amiran."
      },
      "okatse": {
        "title": "Canyon d’Okatse",
        "note": "Ponton suspendu au-dessus du canyon et cascade de Kinchi."
      }
    },
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
    "interestOptions": {
      "cottage": "Cottage / nuitée",
      "event": "Événement",
      "pool": "Piscine / visite en journée",
      "restaurant": "Restaurant / table",
      "whole": "Complexe entier"
    }
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
