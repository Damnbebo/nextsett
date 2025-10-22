'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Camera, CreditCard, Truck, CheckCircle } from 'lucide-react';

export function HowToOrderSection() {

  const steps = [
    {
      number: 1,
      icon: MessageCircle,
      title: 'Send a DM',
      description: 'Message me on Instagram @next.sett with your inspiration photos and ideas',
      details: 'Include your nail size, preferred shape, and any specific requests'
    },
    {
      number: 2,
      icon: Camera,
      title: 'Send Measurements',
      description: 'Use our sizing guide to measure your nails and send me the measurements',
      details: 'I&apos;ll provide a detailed guide on how to measure each nail accurately'
    },
    {
      number: 3,
      icon: CreditCard,
      title: 'Payment & Quote',
      description: 'I&apos;ll send you a custom quote and payment information',
      details: 'Payment is required before I start creating your custom set'
    },
    {
      number: 4,
      icon: CheckCircle,
      title: 'Approval & Creation',
      description: 'I&apos;ll send you a preview for approval before shipping',
      details: 'Once approved, I&apos;ll create your custom set with love and attention to detail'
    },
    {
      number: 5,
      icon: Truck,
      title: 'Shipping & Delivery',
      description: 'Your custom set will be carefully packaged and shipped to you',
      details: 'Tracking information will be provided for your peace of mind'
    }
  ];

  return (
    <section id="how-to-order" className="section-padding bg-white">
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
            How to Order
          </h2>
          <p className="text-xl text-nude-600 max-w-2xl mx-auto">
            Getting your custom press-on nails is easy! Follow these simple steps 
            to create your perfect set.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:flex-row items-center gap-8 mb-16 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Step Number & Icon */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 bg-accent-gold rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-accent-rose rounded-full flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-serif font-semibold text-nude-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-nude-600 mb-3">
                  {step.description}
                </p>
                <p className="text-sm text-nude-500 italic">
                  {step.details}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-nude-200 -mt-8"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-nude-50 to-blush-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-3xl font-serif font-bold text-nude-800 mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-nude-600 mb-8">
              Send me a DM on Instagram with your inspiration photos and let&apos;s create 
              something beautiful together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/next.sett"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                DM on Instagram
              </a>
              <button className="btn-secondary">
                View Sizing Guide
              </button>
            </div>
          </div>
        </motion.div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-yellow-800 mb-2">Payment Required</h4>
            <p className="text-sm text-yellow-700">
              Payment is required before I start creating your custom set
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-blue-800 mb-2">Custom Made</h4>
            <p className="text-sm text-blue-700">
              All sets are custom-made and non-refundable
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-green-800 mb-2">Preview First</h4>
            <p className="text-sm text-green-700">
              I&apos;ll send a picture for your approval before shipping
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
