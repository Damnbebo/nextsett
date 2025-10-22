'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CreditCard, Truck, RotateCcw, Clock, CheckCircle } from 'lucide-react';

export function PoliciesSection() {

  const policies = [
    {
      icon: CreditCard,
      title: 'Payment Policy',
      description: 'Payment is required before I start creating your custom set',
      details: [
        'Full payment must be received before work begins',
        'Accepted payment methods: Zelle, Cash App, Venmo',
        'No partial payments or payment plans available',
        'Payment confirms your order and reserves your spot'
      ]
    },
    {
      icon: RotateCcw,
      title: 'Refund Policy',
      description: 'All sets are custom-made and non-refundable',
      details: [
        'Each set is hand-crafted specifically for you',
        'No returns or exchanges due to custom nature',
        'I will work with you to ensure satisfaction',
        'Quality guarantee on all workmanship'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Approval Process',
      description: 'I will send a picture for your approval before shipping',
      details: [
        'Preview photo sent before final completion',
        'Minor adjustments can be made at this stage',
        'Approval required before shipping',
        'No changes after approval and shipping'
      ]
    },
    {
      icon: Truck,
      title: 'Shipping Policy',
      description: 'Careful packaging and tracking provided',
      details: [
        'Items shipped within 3-5 business days after approval',
        'Tracking information provided via email',
        'Careful packaging to prevent damage',
        'Shipping costs included in quote'
      ]
    },
    {
      icon: Clock,
      title: 'Timeline Policy',
      description: 'Custom sets take 3-5 business days to create',
      details: [
        'Rush orders may be available for additional fee',
        'Timeline starts after payment and approval',
        'I will keep you updated on progress',
        'Delays will be communicated immediately'
      ]
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'I stand behind the quality of my work',
      details: [
        'Professional-grade materials used',
        'Careful attention to detail in every set',
        'Satisfaction with workmanship guaranteed',
        'Contact me with any concerns'
      ]
    }
  ];

  return (
    <section id="policies" className="section-padding bg-white">
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
            Our Policies
          </h2>
          <p className="text-xl text-nude-600 max-w-2xl mx-auto">
            Clear and transparent policies to ensure a smooth experience. 
            Please read through these important details before ordering.
          </p>
        </motion.div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policies.map((policy, index) => (
            <motion.div
              key={policy.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-luxury group hover:scale-105"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-gold/20 transition-colors duration-300">
                  <policy.icon className="w-8 h-8 text-accent-gold" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-nude-800 mb-2">
                  {policy.title}
                </h3>
                <p className="text-nude-600">
                  {policy.description}
                </p>
              </div>

              <div className="space-y-3">
                {policy.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent-gold rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-sm text-nude-600">{detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-semibold text-yellow-800 mb-4">
                  Important Notice
                </h3>
                <p className="text-yellow-700 mb-4">
                  By placing an order, you agree to these policies. I take pride in creating 
                  beautiful, custom nail sets and want to ensure you have the best experience possible. 
                  If you have any questions about these policies, please don&apos;t hesitate to ask!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://www.instagram.com/next.sett"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Ask Questions via DM
                  </a>
                  <button className="btn-outline">
                    Download Full Terms
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact for Questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-nude-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-semibold text-nude-800 mb-4">
              Questions About Our Policies?
            </h3>
            <p className="text-nude-600 mb-6">
              I&apos;m here to help! Feel free to reach out if you need clarification 
              on any of our policies or have special requests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/next.sett"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Contact Me on Instagram
              </a>
              <a
                href="mailto:hello@nextsett.com"
                className="btn-secondary"
              >
                Send Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
