import { applyAuthenticCopy } from "../authenticCopy";

const es = {
  meta: {
    title: "Sweet Village — Cabañas, piscina y restaurante en Tskaltubo",
    description:
      "Cabañas de madera, piscina al aire libre, restaurante georgiano y espacio cubierto para eventos en el pueblo de Kvilishori, Tskaltubo.",
    pages: {
      home: { title: "Sweet Village — Cabañas, piscina y restaurante junto a la cueva de Prometeo", description: "Cabañas de madera, piscina al aire libre, restaurante georgiano y espacio cubierto en un jardín en Kvilishori, Tskaltubo — a 2 minutos de la cueva de Prometeo y 20 de Kutaisi." },
      stay: { title: "Cabañas y habitaciones en Tskaltubo junto a la cueva de Prometeo — Sweet Village", description: "Cinco alojamientos en un mismo jardín, hasta 18 huéspedes: cabañas de madera y habitaciones con piscina, aparcamiento gratuito y desayuno. Precios y reserva." },
      menu: { title: "Carta del restaurante — cocina georgiana en Tskaltubo | Sweet Village", description: "Jachapuri, jinkali, mtsvadi, chakapuli, ensaladas y bebidas — 9 categorías con precios en lari. Una carta en línea siempre actualizada." },
      events: { title: "Bodas y celebraciones en la naturaleza cerca de Kutaisi — Sweet Village", description: "Espacio cubierto en el jardín y banquete al aire libre: bodas, compromisos, cumpleaños, eventos de empresa y fiestas junto a la piscina. Kvilishori, Tskaltubo." },
      pool: { title: "Piscina al aire libre en Tskaltubo — entrada de día | Sweet Village", description: "Piscina exterior en un jardín verde a 20 minutos de Kutaisi. Precios de la entrada de día para adultos y niños, horarios, temporada y normas." },
      location: { title: "Cómo llegar — Kvilishori, junto a la cueva de Prometeo | Sweet Village", description: "Mapa y distancias: cueva de Prometeo a 2 minutos, Kutaisi y el aeropuerto, Sataplia, cañones de Okatse y Martvili. Dirección y horario." },
      about: { title: "Sobre nosotros — Sweet Village, Kvilishori", description: "Un lugar familiar en Kvilishori: jardín verde, cabañas de madera, piscina y banquetes georgianos caseros. Nuestra historia, cifras y fotos." },
      booking: { title: "Reservar — Sweet Village", description: "Formulario de solicitud para una cabaña, un evento, la piscina o un banquete. Respondemos por teléfono o WhatsApp." },
      guides: { title: "Guías — Cueva de Prometeo, Tskaltubo, cañones | Sweet Village", description: "Guías prácticas de los lugares de Imereti: entradas, horarios, rutas y consejos de los anfitriones de Sweet Village, a dos minutos de la Cueva de Prometeo." },
      notFound: { title: "Página no encontrada — Sweet Village", description: "Este enlace ya no existe. Vuelve a la página principal." },
    },
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
    guides: "Guías",
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
      body: "Cabañas de madera y habitaciones para 2 a 6 huéspedes — todo el complejo puede alojar a 18 personas.",
    },
  },
  stay: {
    eyebrow: "Alojamiento",
    title: "Cabañas y habitaciones",
    intro:
      "Cinco alojamientos independientes en un mismo jardín. La capacidad total confirmada por el propietario es de 18 huéspedes.",
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
    faq: {
      title: "Preguntas sobre la piscina",
      items: [
        { question: "¿Puedo usar la piscina sin alojarme?", answer: "Sí, con una entrada de día. Los precios de adulto y niño están arriba; para los huéspedes alojados la piscina es gratuita." },
        { question: "¿Hay que reservar con antelación?", answer: "Los fines de semana y festivos, sí: admitimos un número limitado de visitantes al día. Entre semana suele haber sitio, pero una llamada lo asegura." },
        { question: "¿Hay tumbonas, sombra y comida?", answer: "Junto a la piscina hay tumbonas y zonas de sombra, y el restaurante y el bar están al lado, así que comer en la terraza es fácil. No hace falta traer comida." },
      ],
    },
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
    faq: {
      title: "Preguntas sobre la reserva",
      items: [
        { question: "¿Cómo se confirma la reserva y hace falta un depósito?", answer: "Tras tu solicitud confirmamos disponibilidad y precio por teléfono o WhatsApp. En temporada alta y para eventos puede pedirse un depósito para bloquear la fecha; el importe y la forma de pago te los indicamos al confirmar." },
        { question: "¿Cuál es la política de cancelación?", answer: "Las condiciones dependen de las fechas y se recogen en tu mensaje de confirmación; para eventos se acuerdan individualmente. Si necesitas flexibilidad, pregúntanos antes de reservar." },
        { question: "¿Está incluido el desayuno y a qué hora es la entrada?", answer: "El desayuno está incluido para quienes pernoctan, la piscina es gratuita y el aparcamiento está en el jardín. La recepción funciona 24 horas; avísanos con antelación si llegas de noche." },
      ],
    },
    interestOptions: {
      cottage: "Cabaña / Alojamiento",
      event: "Evento",
      pool: "Piscina / Pase de día",
      restaurant: "Restaurante / Comida",
      whole: "Todo el complejo",
    },
  },
  guides: {
    eyebrow: "Guías",
    title: "Qué ver en Imereti: nuestras guías",
    intro: "Entradas, horarios, rutas y consejos sobre los lugares por los que más nos preguntan los huéspedes. Las escribimos nosotros, los anfitriones, y las actualizamos cada temporada.",
    readGuide: "Leer la guía",
    back: "Todas las guías",
    published: "Publicado",
    updated: "Actualizado",
    readingTime: "min de lectura",
    faqTitle: "Preguntas frecuentes",
    empty: "Aún no hay guías en este idioma.",
    viewEnglish: "Ver en inglés",
    notInLanguage: "Esta guía todavía no está traducida a este idioma; abajo está la versión disponible.",
    planTitle: "Alójate a dos minutos de la Cueva de Prometeo",
    planBody: "Cabañas de madera y habitaciones para hasta 18 huéspedes, piscina exterior y mesa imeretiana en un mismo jardín: la base para todas las rutas de esta página.",
    ctaStay: "Cabañas y habitaciones",
    ctaBook: "Solicitud de reserva",
    moreTitle: "Más guías",
    onMap: "Mapa y distancias",
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
