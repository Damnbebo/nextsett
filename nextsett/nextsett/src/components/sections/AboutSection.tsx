'use client';

import React from 'react';
import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import { Award, Heart, MapPin, Instagram } from 'lucide-react';

export function AboutSection() {
  const { content } = useLanguage();

  const features = [
    {
      icon: Award,
      title: 'Licensed Professional',
      description: 'Certified cosmetologist with years of experience in nail artistry'
    },
    {
      icon: Heart,
      title: 'Hand-Crafted Quality',
      description: 'Every set is carefully designed and made with attention to detail'
    },
    {
      icon: MapPin,
      title: 'Local Service',
      description: 'Serving Wharton, NJ and surrounding areas with personalized care'
    },
    {
      icon: Instagram,
      title: 'Follow My Work',
      description: 'See my latest creations and behind-the-scenes content'
    }
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              {/* Placeholder for Nicole's photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-nude-200 to-blush-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-accent-gold to-accent-rose rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <div className="w-24 h-24 bg-white/80 rounded-full flex items-center justify-center">
                      <span className="text-4xl">💅</span>
                    </div>
                  </div>
                  <p className="text-nude-700 text-xl font-semibold">Nicole&apos;s Photo</p>
                  <p className="text-nude-500 text-base">Professional nail artist</p>
                </div>
              </div>
            </div>
            
            {/* Floating accent */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-accent-gold/10 rounded-full blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-nude-800 mb-6">
                {content.about.title}
              </h2>
              <p className="text-lg text-nude-600 leading-relaxed mb-6">
                {content.about.content}
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-luxury"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-accent-gold" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-nude-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-nude-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <a
                href="https://www.instagram.com/next.sett"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-accent-gold hover:text-yellow-600 transition-colors duration-200 font-medium"
              >
                <Instagram className="w-5 h-5" />
                <span>Follow @next.sett on Instagram</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
