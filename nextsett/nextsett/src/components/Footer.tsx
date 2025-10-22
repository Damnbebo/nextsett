'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  const { language, content } = useLanguage();


  const footerContent = {
    en: {
      tagline: "Your Next Set Awaits",
      description: "Professional nail artistry tailored to your style. Located in Wharton, NJ.",
      quickLinks: "Quick Links",
      contact: "Contact Info",
      location: "Wharton, NJ",
      phone: "(555) 123-4567",
      email: "hello@nextsett.com",
      instagram: "@next.sett",
      copyright: "© 2024 next.sett. All rights reserved.",
      madeWith: "Made with 💅🏻 in Wharton, NJ"
    },
    es: {
      tagline: "Tu Próximo Set Te Espera",
      description: "Arte de uñas profesional adaptado a tu estilo. Ubicado en Wharton, NJ.",
      quickLinks: "Enlaces Rápidos",
      contact: "Información de Contacto",
      location: "Wharton, NJ",
      phone: "(555) 123-4567",
      email: "hello@nextsett.com",
      instagram: "@next.sett",
      copyright: "© 2024 next.sett. Todos los derechos reservados.",
      madeWith: "Hecho con 💅🏻 en Wharton, NJ"
    }
  };

  const t = footerContent[language];

  const quickLinks = [
    { label: content.navigation.home, href: '/' },
    { label: content.navigation.about, href: '/#about' },
    { label: content.navigation.services, href: '/#services' },
    { label: content.navigation.gallery, href: '/#gallery' },
    { label: content.navigation.customizer, href: '/#customizer' },
    { label: content.navigation.contact, href: '/#contact' },
  ];

  return (
    <footer className="bg-nude-100 text-nude-800">
      <div className="container-custom">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block">
                <div className="text-3xl font-serif font-bold text-gradient mb-4">
                  next.sett
                </div>
              </Link>
              <p className="text-lg text-nude-600 mb-4 max-w-md">
                {t.description}
              </p>
              <p className="text-sm text-nude-500 italic">
                {t.madeWith}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-serif font-semibold mb-4">
                {t.quickLinks}
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-nude-600 hover:text-accent-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-serif font-semibold mb-4">
                {t.contact}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-accent-gold" />
                  <span className="text-nude-600">{t.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-accent-gold" />
                  <a
                    href="tel:+15551234567"
                    className="text-nude-600 hover:text-accent-gold transition-colors duration-200"
                  >
                    {t.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-accent-gold" />
                  <a
                    href="mailto:hello@nextsett.com"
                    className="text-nude-600 hover:text-accent-gold transition-colors duration-200"
                  >
                    {t.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Instagram className="w-4 h-4 text-accent-gold" />
                  <a
                    href="https://www.instagram.com/next.sett"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-nude-600 hover:text-accent-gold transition-colors duration-200"
                  >
                    {t.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-nude-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-nude-500">
              {t.copyright}
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/next.sett"
                target="_blank"
                rel="noopener noreferrer"
                className="text-nude-500 hover:text-accent-gold transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
