import { LanguageContent } from '@/types';

export const languageContent: Record<'en' | 'es', LanguageContent> = {
  en: {
    hero: {
      title: "Your Next Set Awaits",
      subtitle: "Modern Custom Press-Ons, Made For You",
      cta1: "Shop Press-Ons",
      cta2: "Book Appointment"
    },
    about: {
      title: "About Nicole",
      content: "I'm Nicole, a licensed cosmetologist passionate about creating beautiful, custom nail designs. Based in Wharton, NJ, I specialize in Gel-X, Structured Manicures, and hand-crafted Press-Ons. Every set is uniquely designed and made with love in my home studio."
    },
    services: {
      title: "Our Services",
      subtitle: "Professional nail artistry tailored to your style"
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Ready for your next set? Let's create something beautiful together.",
      form: {
        name: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        service: "Service Interest",
        message: "Tell us about your vision",
        submit: "Send Message"
      }
    },
    navigation: {
      home: "Home",
      about: "About",
      services: "Services",
      gallery: "Gallery",
      customizer: "Customizer",
      contact: "Contact"
    }
  },
  es: {
    hero: {
      title: "Tu Próximo Set Te Espera",
      subtitle: "Press-Ons Personalizados Modernos, Hechos Para Ti",
      cta1: "Comprar Press-Ons",
      cta2: "Reservar Cita"
    },
    about: {
      title: "Acerca de Nicole",
      content: "Soy Nicole, una cosmetóloga licenciada apasionada por crear diseños de uñas hermosos y personalizados. Con sede en Wharton, NJ, me especializo en Gel-X, Manicuras Estructuradas y Press-Ons hechos a mano. Cada set está diseñado de manera única y hecho con amor en mi estudio en casa."
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Arte de uñas profesional adaptado a tu estilo"
    },
    contact: {
      title: "Ponte en Contacto",
      subtitle: "¿Lista para tu próximo set? Creemos algo hermoso juntas.",
      form: {
        name: "Nombre Completo",
        email: "Dirección de Email",
        phone: "Número de Teléfono",
        service: "Interés en Servicio",
        message: "Cuéntanos sobre tu visión",
        submit: "Enviar Mensaje"
      }
    },
    navigation: {
      home: "Inicio",
      about: "Acerca de",
      services: "Servicios",
      gallery: "Galería",
      customizer: "Personalizador",
      contact: "Contacto"
    }
  }
};

export const services = {
  en: [
    {
      id: 'gelx',
      name: 'Gel-X Extensions',
      description: 'Long-lasting, natural-looking nail extensions that won\'t damage your natural nails.',
      price: 'Starting at $65',
      features: ['Up to 3 weeks wear', 'Natural nail protection', 'Custom length & shape', 'Premium gel products']
    },
    {
      id: 'structured',
      name: 'Structured Manicures',
      description: 'Professional manicures with added strength and durability for your natural nails.',
      price: 'Starting at $45',
      features: ['Nail strengthening', 'Cuticle care', 'Custom nail art', 'Long-lasting finish']
    },
    {
      id: 'presson',
      name: 'Custom Press-Ons',
      description: 'Hand-crafted press-on nails designed specifically for you. Perfect for special occasions or everyday wear.',
      price: 'Starting at $35',
      features: ['Fully customizable', 'Multiple sizes included', 'Easy application', 'Reusable design']
    }
  ],
  es: [
    {
      id: 'gelx',
      name: 'Extensiones Gel-X',
      description: 'Extensiones de uñas duraderas y de aspecto natural que no dañarán tus uñas naturales.',
      price: 'Desde $65',
      features: ['Hasta 3 semanas de duración', 'Protección de uñas naturales', 'Longitud y forma personalizada', 'Productos de gel premium']
    },
    {
      id: 'structured',
      name: 'Manicuras Estructuradas',
      description: 'Manicuras profesionales con fuerza y durabilidad adicional para tus uñas naturales.',
      price: 'Desde $45',
      features: ['Fortalecimiento de uñas', 'Cuidado de cutículas', 'Arte de uñas personalizado', 'Acabado duradero']
    },
    {
      id: 'presson',
      name: 'Press-Ons Personalizados',
      description: 'Uñas press-on hechas a mano diseñadas específicamente para ti. Perfectas para ocasiones especiales o uso diario.',
      price: 'Desde $35',
      features: ['Totalmente personalizables', 'Múltiples tamaños incluidos', 'Fácil aplicación', 'Diseño reutilizable']
    }
  ]
};
