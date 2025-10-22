'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler, Download, Info } from 'lucide-react';

export function SizingGuideSection() {
  const [selectedFinger, setSelectedFinger] = useState<number | null>(null);

  const fingers = [
    { id: 1, name: 'Thumb', size: 'T' },
    { id: 2, name: 'Index', size: 'I' },
    { id: 3, name: 'Middle', size: 'M' },
    { id: 4, name: 'Ring', size: 'R' },
    { id: 5, name: 'Pinky', size: 'P' },
  ];

  const sizingInstructions = [
    'Cut a strip of paper or use a flexible ruler',
    'Wrap it around the widest part of your nail bed',
    'Mark where the paper meets',
    'Measure the length with a ruler in millimeters',
    'Repeat for all 5 fingers on each hand'
  ];

  return (
    <section id="sizing-guide" className="section-padding bg-nude-50">
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
            Nail Sizing Guide
          </h2>
          <p className="text-xl text-nude-600 max-w-2xl mx-auto">
            Getting the perfect fit is crucial for your custom press-on nails. 
            Follow this guide to measure your nails accurately.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="card-luxury">
              <h3 className="text-2xl font-serif font-semibold text-nude-800 mb-6 flex items-center">
                <Ruler className="w-6 h-6 mr-3 text-accent-gold" />
                How to Measure
              </h3>
              <ol className="space-y-4">
                {sizingInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-gold text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-nude-600">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Pro Tips</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Measure your dominant hand (right if you&apos;re right-handed)</li>
                    <li>• Measure at the widest part of your nail bed</li>
                    <li>• Don&apos;t include the skin around your nail</li>
                    <li>• If between sizes, choose the larger one</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="btn-primary inline-flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Download Sizing Chart
              </button>
            </div>
          </motion.div>

          {/* Interactive Hand */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-serif font-semibold text-nude-800 mb-6 text-center">
                Click on each finger to see measurements
              </h3>
              
              {/* Hand Diagram */}
              <div className="relative w-80 h-80 mx-auto">
                {/* Hand outline */}
                <div className="absolute inset-0 bg-gradient-to-br from-nude-200 to-nude-300 rounded-full opacity-20"></div>
                
                {/* Fingers */}
                {fingers.map((finger, index) => (
                  <motion.button
                    key={finger.id}
                    className={`absolute w-12 h-16 rounded-lg transition-all duration-200 ${
                      selectedFinger === finger.id
                        ? 'bg-accent-gold text-white shadow-lg scale-110'
                        : 'bg-nude-300 hover:bg-nude-400 text-nude-700'
                    }`}
                    style={{
                      left: `${15 + index * 18}%`,
                      top: `${20 + index * 3}%`,
                      transform: `rotate(${-5 + index * 2}deg)`,
                    }}
                    onClick={() => setSelectedFinger(selectedFinger === finger.id ? null : finger.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-center pt-2">
                      <div className="text-xs font-bold">{finger.size}</div>
                      <div className="text-xs mt-1">{finger.name}</div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Measurement Display */}
              {selectedFinger && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-accent-gold/10 rounded-xl p-4 text-center"
                >
                  <h4 className="font-semibold text-nude-800 mb-2">
                    {fingers[selectedFinger - 1]?.name} Finger
                  </h4>
                  <div className="text-2xl font-bold text-accent-gold mb-2">
                    15mm
                  </div>
                  <p className="text-sm text-nude-600">
                    Typical size range: 12-18mm
                  </p>
                </motion.div>
              )}

              {/* Size Chart */}
              <div className="mt-8">
                <h4 className="font-semibold text-nude-800 mb-4 text-center">Size Reference</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-nude-100 rounded-lg p-2 text-center">
                    <div className="font-semibold">XS</div>
                    <div className="text-xs text-nude-600">10-12mm</div>
                  </div>
                  <div className="bg-nude-100 rounded-lg p-2 text-center">
                    <div className="font-semibold">S</div>
                    <div className="text-xs text-nude-600">12-14mm</div>
                  </div>
                  <div className="bg-nude-100 rounded-lg p-2 text-center">
                    <div className="font-semibold">M</div>
                    <div className="text-xs text-nude-600">14-16mm</div>
                  </div>
                  <div className="bg-nude-100 rounded-lg p-2 text-center">
                    <div className="font-semibold">L</div>
                    <div className="text-xs text-nude-600">16-18mm</div>
                  </div>
                  <div className="bg-nude-100 rounded-lg p-2 text-center">
                    <div className="font-semibold">XL</div>
                    <div className="text-xs text-nude-600">18-20mm</div>
                  </div>
                  <div className="bg-nude-100 rounded-lg p-2 text-center">
                    <div className="font-semibold">XXL</div>
                    <div className="text-xs text-nude-600">20mm+</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-semibold text-nude-800 mb-4">
              Ready to Order?
            </h3>
            <p className="text-nude-600 mb-6">
              Once you have your measurements, send them to me along with your inspiration photos!
            </p>
            <a
              href="https://www.instagram.com/next.sett"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Send Measurements via DM
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
