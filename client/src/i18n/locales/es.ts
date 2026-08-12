import { applyAuthenticCopy } from "../authenticCopy";

const es = {
  meta: {
    title: "Sweet Village — Cabañas, piscina y restaurante en Tskaltubo",
    description:
      "Cabañas de madera, piscina al aire libre, restaurante georgiano y espacio cubierto para eventos en el pueblo de Kvilishori, Tskaltubo.",
  },
  brand: {
    name: "Sweet Village",
    tagline: "Kvilishori · Tskaltubo · Imereti",
  },
  nav: {
    home: "Inicio",
    events: "Eventos",
    pool: "Piscina",
    restaurant: "Restaurante",
    menu: "Menú",
    stay: "Alojamiento",
    location: "Ubicación",
    about: "Sobre nosotros",
    contact: "Contacto",
    book: "Reservar",
  },
  common: {
    from: "Desde",
    perNight: "noche",
    guests: "huéspedes",
    beds: "camas",
    upTo: "hasta",
    call: "Llamar",
    whatsapp: "WhatsApp",
    viewAll: "Ver todo",
    learnMore: "Más detalles",
    bookNow: "Reservar ahora",
    askPrice: "Consultar precio",
    minutes: "min",
    km: "km",
    lari: "₾",
    provisional: "Los precios son orientativos — confirmar por teléfono",
    langLabel: "Idioma",
    close: "Cerrar",
  },
  hero: {
    eyebrow: "Tskaltubo · Kvilishori",
    title: "Un lugar donde la buena mesa, la piscina y el descanso nocturno se encuentran",
    subtitle:
      "Cabañas de madera en el jardín, piscina al aire libre, cocina de Imereti y un espacio cubierto donde cincuenta invitados pueden sentarse cómodamente.",
    ctaPrimary: "Llámanos y reserva",
    ctaSecondary: "Ver el menú",
  },
  highlights: {
    title: "Por qué elegir Sweet Village",
    items: [
      {
        title: "A 2 minutos de la cueva de Prometeo",
        body: "La cueva más famosa de Georgia está prácticamente en la puerta — nuestros huéspedes no pierden tiempo en transporte.",
      },
      {
        title: "Piscina al aire libre en el jardín",
        body: "Una gran piscina con tumbonas y sombra. El uso es gratuito para los huéspedes que pasan la noche.",
      },
      {
        title: "Un festín preparado en ketsi",
        body: "Jachapuri de Imereti, shkmeruli, mtsvadi en sarmientos de vid y jinkali — 68 opciones en el menú.",
      },
      {
        title: "Espacio para eventos",
        body: "Un salón exterior cubierto para bodas, compromisos, cumpleaños o eventos corporativos.",
      },
    ],
  },
  services: {
    title: "Qué ofrecemos",
    subtitle: "Cuatro áreas en un solo lugar",
    events: {
      title: "Eventos",
      body: "Bodas, compromisos, cumpleaños y reuniones corporativas en nuestro espacio exterior cubierto.",
    },
    pool: {
      title: "Piscina y pase de día",
      body: "Pase de día para la piscina sin necesidad de pasar la noche — descanso familiar sin salir de la ciudad.",
    },
    restaurant: {
      title: "Restaurante y café-bar",
      body: "Cocina de Imereti, platos en ketsi y mtsvadi. Disfruta de una comida en la terraza abierta o en el salón.",
    },
    stay: {
      title: "Cabañas",
      body: "Cabañas de madera y habitaciones para 2 a 6 huéspedes — todo el complejo puede alojar a 22 personas.",
    },
  },
  stay: {
    eyebrow: "Alojamiento",
    title: "Cabañas y habitaciones",
    intro:
      "Cinco unidades independientes en un mismo jardín. Todos los interiores son de madera de pino, con iluminación cálida y cortinas botánicas. Un total de 17 camas, y con sofás cama hasta 22 huéspedes.",
    units: {
      "small-a": {
        title: "Cabaña del Jardín 1",
        body: "Una cabaña de madera independiente en el jardín, con un estudio luminoso, cama doble, sofá, cocina compacta y porche privado cubierto. Una opción tranquila para una pareja o una familia pequeña, con capacidad para cuatro huéspedes.",
      },
      "small-b": {
        title: "Cabaña del Jardín 2",
        body: "Cabaña idéntica a la primera — a menudo reservada junto con la otra por dos parejas o un grupo de amigos que necesitan entradas separadas.",
      },
      "large-a": {
        title: "Cabaña grande · Habitación A",
        body: "Habitación de dos pisos en la cabaña grande, con entrada independiente. Dos camas en la planta baja y dos en el ático — cuatro huéspedes cómodamente.",
      },
      "large-b": {
        title: "Cabaña grande · Habitación B",
        body: "La segunda mitad de la cabaña grande, también de dos pisos e independiente. Reservando ambas habitaciones juntas, ocho huéspedes pueden alojarse en una sola casa.",
      },
      grand: {
        title: "Habitación grande",
        body: "La unidad más espaciosa del complejo — cinco camas y un sofá cama. Esta es la habitación ideal para un grupo grande de amigos.",
      },
    },
    facilities: {
      title: "Qué incluye",
      items: [
        "Uso gratuito de la piscina",
        "Aparcamiento gratuito en el recinto",
        "Wi-Fi",
        "Zona de barbacoa y pinchos",
        "Baño privado en todas las unidades",
        "Desayuno bajo petición",
      ],
    },
  },
  events: {
    eyebrow: "Eventos",
    title: "Un espacio donde las celebraciones duran",
    intro:
      "Salón exterior cubierto en el jardín — para la lluvia y el sol. Nuestra cocina prepara el banquete, el área está completamente a tu disposición, y los invitados que deseen pasar la noche pueden alojarse en las cabañas.",
    capacityLabel: "huéspedes",
    types: {
      wedding: {
        title: "Boda",
        body: "Ceremonia en el jardín, banquete en el salón cubierto, alojamiento para los más cercanos en las cabañas.",
      },
      engagement: {
        title: "Compromiso",
        body: "Una velada pequeña e íntima para el círculo cercano — comida, música y el jardín al atardecer.",
      },
      birthday: {
        title: "Cumpleaños",
        body: "Formato de día junto a la piscina o cena por la noche en el salón. Para los niños, el jardín y la parte poco profunda de la piscina.",
      },
      corporate: {
        title: "Corporativo",
        body: "Día de retiro para el equipo a media hora de Kutaisi — reunión, comida y piscina en un solo lugar.",
      },
    },
    policy: {
      title: "Condición importante",
      body: "Para eventos de más de 20 invitados, todo el complejo está exclusivamente a tu disposición. Así, la música y el ruido no molestarán a otros huéspedes, y podrás relajarte sin restricciones.",
    },
    cta: "Discutir un evento",
  },
  pool: {
    eyebrow: "Piscina",
    title: "Día de descanso junto a la piscina",
    intro:
      "Piscina al aire libre en el jardín, con tumbonas y sombra. Gratuita para los huéspedes que pasan la noche; quienes vienen solo por el día usan un pase de día.",
    adultLabel: "Adulto",
    childLabel: "Niño",
    childNote: "Hasta 12 años",
    guestNote: "Gratis para huéspedes nocturnos",
    hours: "Horario de apertura",
    season: "Temporada",
    seasonValue: "Junio — Septiembre",
    limitTitle: "Límite diario",
    limitBody:
      "Recibimos a 40 visitantes por día. Esta es una restricción consciente — el espacio y la tranquilidad junto a la piscina deben mantenerse. En días festivos, es necesario llamar con antelación.",
    cta: "Reservar un lugar",
  },
  restaurant: {
    eyebrow: "Restaurante",
    title: "Banquete de Imereti con ketsi y brasas",
    intro:
      "Jachapuri del horno, shkmeruli en ketsi, mtsvadi en sarmientos de vid y jinkali por unidad. Disfruta de una comida en la terraza abierta o en el salón, que tiene 60 asientos.",
    cta: "Ver el menú completo",
    itemsCount: "68 opciones en 9 categorías",
  },
  menu: {
    eyebrow: "Restaurante",
    title: "Menú",
    intro:
      "Los precios están en lari. Los platos se preparan bajo pedido, por lo que para grandes banquetes preferimos pedidos por adelantado.",
    qrTitle: "Compartir el menú",
    qrBody:
      "Escanea el código o comparte el enlace — el menú siempre se abre con la versión actualizada, sin necesidad de descargar un archivo.",
    copyLink: "Copiar enlace",
    copied: "Copiado",
    noAlcoholNote:
      "Tenemos una lista separada de vinos y cervezas — se confirmará en el lugar.",
    searchPlaceholder: "Buscar un plato",
    noResults: "No se encontró nada",
  },
  location: {
    eyebrow: "Ubicación",
    title: "Dónde estamos y qué hay cerca",
    intro:
      "Kvilishori en el municipio de Tskaltubo, en el corazón de Imereti. Con una estancia de una noche puedes visitar dos o tres lugares de interés — cuevas, cañones y la hermosa montaña Khvamli.",
    driveTime: "En coche",
    attractions: {
      prometheus: { title: "Cueva de Prometeo", note: "Estalactitas, un río subterráneo y un viaje en bote." },
      tskaltubo: { title: "Balneario de Tskaltubo", note: "Aguas curativas y sanatorios soviéticos abandonados." },
      sataplia: { title: "Reserva de Sataplia", note: "Huellas de dinosaurios reales y una plataforma de observación de cristal." },
      kutaisi: { title: "Kutaisi", note: "La capital de Imereti, la catedral de Bagrati y el aeropuerto internacional." },
      gelati: { title: "Monasterio de Gelati", note: "Sitio de la UNESCO, mosaicos del siglo XII." },
      martvili: { title: "Cañón de Martvili", note: "Agua esmeralda y paseos en bote entre las rocas." },
      khvamli: { title: "Montaña Khvamli", note: "La legendaria montaña en forma de mesa en Lechkhumi — hogar del mito de Amirani." },
      okatse: { title: "Cañón de Okatse", note: "Un sendero suspendido sobre el cañón y la cascada de Kinchkha." },
    },
    addressTitle: "Dirección",
    addressValue: "Pueblo de Kvilishori, municipio de Tskaltubo, Imereti, Georgia",
    openTitle: "Horario de recepción",
    openValue: "Todos los días, 24 horas",
  },
  about: {
    eyebrow: "Sobre nosotros",
    title: "Un pequeño pueblo construido por una familia",
    body1:
      "Sweet Village en Kvilishori fue creado con un propósito — que el huésped no tenga que elegir entre una buena comida y una noche tranquila. Construimos cabañas de madera en el jardín, hicimos una piscina al lado, y basamos la cocina en recetas que se han transmitido por generaciones en Imereti.",
    body2:
      "Hoy, aquí se celebra una boda, un turista extranjero descansa después de la cueva de Prometeo, y viene una familia de Kutaisi que simplemente quiere pasar el día junto a la piscina. Separamos cuidadosamente estos tres escenarios para que nadie se vea afectado.",
    stats: {
      units: "unidades de alojamiento",
      guests: "huéspedes a la vez",
      dishes: "platos en el menú",
      minutes: "minutos a Prometeo",
    },
  },
  booking: {
    eyebrow: "Reservar",
    title: "Solicitud de reserva",
    intro:
      "Completa el formulario y nos pondremos en contacto contigo para confirmar la disponibilidad y el precio exacto. En caso de urgencia, llámanos directamente.",
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    phone: "Teléfono",
    phonePlaceholder: "+995 5xx xx xx xx",
    checkIn: "Llegada",
    checkOut: "Salida",
    unit: "Qué te interesa",
    unitPlaceholder: "Seleccionar",
    guests: "Número de huéspedes",
    notes: "Notas",
    notesPlaceholder: "Tipo de evento, peticiones especiales, preguntas",
    submit: "Enviar solicitud",
    submitting: "Enviando",
    orWhatsapp: "O enviar por WhatsApp",
    successTitle: "Solicitud recibida",
    successBody: "Gracias. Nos pondremos en contacto contigo pronto.",
    errorTitle: "No se pudo enviar",
    errorBody: "Inténtalo de nuevo o llámanos directamente.",
    required: "Obligatorio",
    invalidPhone: "Introduce un número válido",
    anyUnit: "Cualquier unidad disponible",
    fallbackTitle: "Solicitud guardada",
    fallbackBody:
      "Tu solicitud quedó registrada, pero la notificación no se envió. Para asegurarte, escríbenos por WhatsApp o llámanos.",
    interestOptions: {
      cottage: "Cabaña / Alojamiento",
      event: "Evento",
      pool: "Piscina / Pase de día",
      restaurant: "Restaurante / Comida",
      whole: "Todo el complejo",
    },
  },
  gallery: {
    eyebrow: "Galería",
    title: "Cómo es el lugar",
  },
  footer: {
    contact: "Contacto",
    explore: "Páginas",
    follow: "Redes sociales",
    rights: "Todos los derechos reservados",
    share: "Compartir",
  },
  notFound: {
    title: "Página no encontrada",
    body: "El enlace puede haber cambiado. Vuelve a la página de inicio.",
    cta: "Ir a la página de inicio",
  },
};

export default applyAuthenticCopy(es, "es");
