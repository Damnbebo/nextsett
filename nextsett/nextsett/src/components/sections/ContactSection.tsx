'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Send, CheckCircle } from 'lucide-react';

export function ContactSection() {
  const { content } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    preferredContact: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        preferredContact: 'email'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@next.sett',
      link: 'https://www.instagram.com/next.sett',
      description: 'Follow for inspiration & DM for quotes'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@nextsett.com',
      link: 'mailto:hello@nextsett.com',
      description: 'Send detailed inquiries'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '(555) 123-4567',
      link: 'tel:+15551234567',
      description: 'Call for urgent matters'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Wharton, NJ',
      link: '#',
      description: 'Home studio serving local area'
    }
  ];

  const services = [
    'Gel-X Extensions',
    'Structured Manicures',
    'Custom Press-Ons',
    'Nail Art Design',
    'Consultation',
    'Other'
  ];

  return (
    <section id="contact" className="section-padding bg-nude-50">
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
            {content.contact.title}
          </h2>
          <p className="text-xl text-nude-600 max-w-2xl mx-auto">
            {content.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-serif font-semibold text-nude-800 mb-6">
                Get in Touch
              </h3>
              <p className="text-nude-600 mb-8">
                Ready to create your perfect nail set? I&apos;d love to hear from you! 
                Choose your preferred way to reach out.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-accent-gold/10 rounded-lg flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors duration-200">
                    <info.icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-nude-800 mb-1">
                      {info.label}
                    </h4>
                    <p className="text-accent-gold font-medium mb-1">
                      {info.value}
                    </p>
                    <p className="text-sm text-nude-600">
                      {info.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick DM Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 text-center"
            >
              <h4 className="font-semibold text-nude-800 mb-2">
                Quick Quote Request
              </h4>
              <p className="text-sm text-nude-600 mb-4">
                For fastest response, send me a DM on Instagram with your inspiration photos!
              </p>
              <a
                href="https://www.instagram.com/next.sett"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                <Instagram className="w-4 h-4 mr-2" />
                DM on Instagram
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-serif font-semibold text-nude-800 mb-6">
              Send a Message
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-nude-800 mb-2">
                  Message Sent!
                </h4>
                <p className="text-nude-600">
                  Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-nude-700 mb-2">
                      {content.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-nude-200 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nude-700 mb-2">
                      {content.contact.form.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-nude-200 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-nude-700 mb-2">
                      {content.contact.form.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-nude-200 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-nude-700 mb-2">
                      {content.contact.form.service} *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-nude-200 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-nude-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Email
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Phone
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="preferredContact"
                        value="instagram"
                        checked={formData.preferredContact === 'instagram'}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Instagram
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-nude-700 mb-2">
                    {content.contact.form.message} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-nude-200 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200"
                    placeholder="Tell me about your vision, inspiration photos, nail size, preferred shape, etc."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="w-4 h-4 mr-2" />
                      {content.contact.form.submit}
                    </div>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
