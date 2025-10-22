'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Instagram, Heart, Eye } from 'lucide-react';

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All Work' },
    { id: 'gelx', label: 'Gel-X' },
    { id: 'structured', label: 'Structured' },
    { id: 'presson', label: 'Press-Ons' },
  ];

  // Mock gallery data - in real app, this would come from the database
  const galleryItems = [
    {
      id: 1,
      category: 'gelx',
      imageUrl: '/gallery/gelx-1.jpg',
      title: 'Classic French Gel-X',
      description: 'Elegant French tips with gel extensions',
      likes: 42,
    },
    {
      id: 2,
      category: 'presson',
      imageUrl: '/gallery/presson-1.jpg',
      title: 'Custom Press-On Set',
      description: 'Hand-painted floral design',
      likes: 38,
    },
    {
      id: 3,
      category: 'structured',
      imageUrl: '/gallery/structured-1.jpg',
      title: 'Structured Manicure',
      description: 'Natural nail strengthening treatment',
      likes: 29,
    },
    {
      id: 4,
      category: 'gelx',
      imageUrl: '/gallery/gelx-2.jpg',
      title: 'Ombré Gel-X',
      description: 'Beautiful gradient from nude to gold',
      likes: 56,
    },
    {
      id: 5,
      category: 'presson',
      imageUrl: '/gallery/presson-2.jpg',
      title: 'Holiday Press-Ons',
      description: 'Festive design with glitter accents',
      likes: 67,
    },
    {
      id: 6,
      category: 'structured',
      imageUrl: '/gallery/structured-2.jpg',
      title: 'Minimalist Design',
      description: 'Clean and simple nail art',
      likes: 34,
    },
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="section-padding bg-nude-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-nude-800 mb-6">
            Our Work
          </h2>
          <p className="text-xl text-nude-600 max-w-2xl mx-auto">
            Browse through our portfolio of custom nail designs and see the artistry 
            that goes into every set.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-accent-gold text-white shadow-lg'
                  : 'bg-white text-nude-600 hover:bg-nude-100 border border-nude-200'
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                {/* Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-nude-200 to-blush-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent-gold/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Heart className="w-8 h-8 text-accent-gold" />
                      </div>
                      <p className="text-nude-600 font-medium">{item.title}</p>
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Eye className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">View Details</p>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-nude-700">
                      {filters.find(f => f.id === item.category)?.label}
                    </span>
                  </div>

                  {/* Likes */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 text-white">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.likes}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-nude-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-nude-600 text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <Instagram className="w-12 h-12 text-accent-gold mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-semibold text-nude-800 mb-4">
              Follow for More Inspiration
            </h3>
            <p className="text-nude-600 mb-6">
              See our latest work, behind-the-scenes content, and get inspired for your next set.
            </p>
            <a
              href="https://www.instagram.com/next.sett"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow @next.sett
            </a>
          </div>
        </motion.div>
      </div>

      {/* Modal for image details */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 bg-gradient-to-br from-nude-200 to-blush-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-accent-gold/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Heart className="w-10 h-10 text-accent-gold" />
                    </div>
                    <p className="text-nude-600 font-medium text-lg">
                      {filteredItems[selectedImage]?.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-nude-600 hover:text-nude-800"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif font-semibold text-nude-800 mb-2">
                  {filteredItems[selectedImage]?.title}
                </h3>
                <p className="text-nude-600 mb-4">
                  {filteredItems[selectedImage]?.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-nude-600">
                      <Heart className="w-4 h-4" />
                      <span>{filteredItems[selectedImage]?.likes} likes</span>
                    </div>
                    <span className="px-3 py-1 bg-nude-100 rounded-full text-xs font-medium text-nude-700">
                      {filters.find(f => f.id === filteredItems[selectedImage]?.category)?.label}
                    </span>
                  </div>
                  <button className="btn-primary">
                    Order This Design
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
