'use client';

import React from 'react';
import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { services } from '@/lib/language-content';

export function ServicesSection() {
  const { language, content } = useLanguage();
  const servicesData = services[language];

  return (
    <section id="services" className="section-padding bg-nude-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-nude-800 mb-6">
            {content.services.title}
          </h2>
          <p className="text-xl text-nude-600 max-w-2xl mx-auto">
            {content.services.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card-luxury group hover:scale-105"
            >
              {/* Service Image Placeholder */}
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-nude-200 to-blush-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent-gold/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-accent-gold" />
                    </div>
                    <p className="text-nude-600 font-medium">{service.name}</p>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Service Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-serif font-semibold text-nude-800 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-nude-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent-gold">
                    {service.price}
                  </span>
                  <button className="btn-outline group">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-2 pt-4 border-t border-nude-200">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-accent-gold flex-shrink-0" />
                      <span className="text-sm text-nude-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-semibold text-nude-800 mb-4">
              Ready to Book Your Next Set?
            </h3>
            <p className="text-nude-600 mb-6">
              Contact me to discuss your vision and get a personalized quote for your custom nail design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Get a Quote
              </button>
              <a
                href="https://www.instagram.com/next.sett"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                DM on Instagram
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
