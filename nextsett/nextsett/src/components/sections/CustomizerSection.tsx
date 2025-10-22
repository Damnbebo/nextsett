'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Scissors, Sparkles, Download } from 'lucide-react';

export function CustomizerSection() {
  const [selectedShape, setSelectedShape] = useState('almond');
  const [selectedColor, setSelectedColor] = useState('#E8B4B8');
  const [selectedLength, setSelectedLength] = useState(15);

  const shapes = [
    { id: 'almond', name: 'Almond', icon: '🥜' },
    { id: 'square', name: 'Square', icon: '⬜' },
    { id: 'coffin', name: 'Coffin', icon: '⚰️' },
    { id: 'stiletto', name: 'Stiletto', icon: '🔺' },
  ];

  const colors = [
    { id: 'nude', name: 'Nude', hex: '#E8B4B8' },
    { id: 'blush', name: 'Blush', hex: '#F6EDE4' },
    { id: 'gold', name: 'Gold', hex: '#D4AF37' },
    { id: 'sage', name: 'Sage', hex: '#9CAF88' },
    { id: 'rose', name: 'Rose', hex: '#E8B4B8' },
    { id: 'white', name: 'White', hex: '#FFFFFF' },
  ];

  return (
    <section id="customizer" className="section-padding bg-white">
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
            Design Your Own Set
          </h2>
          <p className="text-xl text-nude-600 max-w-2xl mx-auto">
            Customize your perfect nail design with our interactive tool. 
            Choose your shape, color, and length to create your dream set.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 3D Preview Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-nude-50 to-blush-50 rounded-2xl p-8 min-h-[500px] flex items-center justify-center">
              {/* 3D Nail Preview Placeholder */}
              <div className="relative">
                {/* Hand outline */}
                <div className="w-80 h-80 relative">
                  {/* Hand shape */}
                  <div className="absolute inset-0 bg-gradient-to-br from-nude-200 to-nude-300 rounded-full opacity-20"></div>
                  
                  {/* Nails */}
                  {Array.from({ length: 5 }).map((_, index) => (
                    <motion.div
                      key={index}
                      className="absolute"
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + index * 2}%`,
                        width: '8%',
                        height: `${selectedLength}%`,
                        backgroundColor: selectedColor,
                        borderRadius: selectedShape === 'almond' ? '50% 50% 50% 50% / 60% 60% 40% 40%' : 
                                     selectedShape === 'square' ? '0' : 
                                     selectedShape === 'coffin' ? '0 0 20% 20%' : '0 0 50% 50%',
                        transform: `rotate(${-10 + index * 5}deg)`,
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      }}
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                  ))}
                  
                  {/* Sparkle effects */}
                  <motion.div
                    className="absolute top-4 right-4"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-accent-gold" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 right-4 btn-primary"
            >
              <Download className="w-4 h-4 mr-2" />
              Save Design
            </motion.button>
          </motion.div>

          {/* Customization Controls */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Shape Selection */}
            <div>
              <h3 className="text-xl font-serif font-semibold text-nude-800 mb-4 flex items-center">
                <Scissors className="w-5 h-5 mr-2 text-accent-gold" />
                Nail Shape
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {shapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setSelectedShape(shape.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedShape === shape.id
                        ? 'border-accent-gold bg-accent-gold/10 text-accent-gold'
                        : 'border-nude-200 hover:border-nude-300 text-nude-600'
                    }`}
                  >
                    <div className="text-2xl mb-2">{shape.icon}</div>
                    <div className="font-medium">{shape.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-xl font-serif font-semibold text-nude-800 mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-accent-gold" />
                Nail Color
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedColor === color.hex
                        ? 'border-accent-gold ring-2 ring-accent-gold/20'
                        : 'border-nude-200 hover:border-nude-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="text-xs font-medium text-nude-600 mt-1">
                      {color.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Length Slider */}
            <div>
              <h3 className="text-xl font-serif font-semibold text-nude-800 mb-4">
                Nail Length
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={selectedLength}
                  onChange={(e) => setSelectedLength(Number(e.target.value))}
                  className="w-full h-2 bg-nude-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-nude-600">
                  <span>Short</span>
                  <span className="font-medium">{selectedLength}mm</span>
                  <span>Long</span>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary text-lg py-4"
            >
              Order This Design
            </motion.button>

            {/* Note */}
            <div className="bg-nude-50 rounded-xl p-4">
              <p className="text-sm text-nude-600">
                <strong>Note:</strong> This is a preview tool. Final designs may vary slightly 
                based on your natural nail shape and size. Contact me for a personalized consultation!
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #D4AF37;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #D4AF37;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </section>
  );
}
