'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { motion } from 'framer-motion';
import { 
  Image, 
  Instagram, 
  FileText, 
  Settings, 
  LogOut, 
  Plus, 
  Eye, 
  EyeOff,
  Edit,
  Trash2,
} from 'lucide-react';

interface GalleryItem {
  _id: string;
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  visible: boolean;
  order: number;
}

interface InstagramPost {
  _id: string;
  url: string;
  thumbnail: string;
  caption: string;
  visible: boolean;
  order: number;
}

export default function AdminDashboard() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('gallery');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      const [galleryRes, instagramRes] = await Promise.all([
        fetch('/api/admin/gallery'),
        fetch('/api/admin/instagram')
      ]);

      const galleryData = await galleryRes.json();
      const instagramData = await instagramRes.json();

      if (galleryData.success) {
        setGalleryItems(galleryData.data);
      }
      if (instagramData.success) {
        setInstagramPosts(instagramData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Implement logout logic
    router.push('/admin/login');
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-nude-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-nude-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const tabs = [
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'instagram', label: 'Instagram', icon: Instagram },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-nude-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-nude-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-serif font-bold text-nude-800">
                next.sett Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-nude-600">
                Welcome, {session.user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-nude-600 hover:text-nude-800 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-accent-gold text-white'
                      : 'text-nude-600 hover:bg-white hover:text-nude-800'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'gallery' && (
                <GalleryTab 
                  items={galleryItems} 
                />
              )}
              {activeTab === 'instagram' && (
                <InstagramTab 
                  posts={instagramPosts} 
                />
              )}
              {activeTab === 'content' && (
                <ContentTab />
              )}
              {activeTab === 'settings' && (
                <SettingsTab />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Gallery Tab Component
function GalleryTab({ items }: { items: GalleryItem[] }) {

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-nude-800">
          Gallery Management
        </h2>
        <button
          className="btn-primary inline-flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow-sm border border-nude-200 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-nude-200 to-blush-200 flex items-center justify-center">
              <div className="text-center">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image className="w-12 h-12 text-nude-400 mx-auto mb-2" />
                <p className="text-sm text-nude-600">{item.title}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-nude-800">{item.title}</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-nude-400 hover:text-nude-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-nude-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-nude-600 mb-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 bg-nude-100 text-xs rounded-full text-nude-700">
                  {item.category}
                </span>
                <div className="flex items-center space-x-2">
                  {item.visible ? (
                    <Eye className="w-4 h-4 text-green-500" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Instagram Tab Component
function InstagramTab({ posts }: { posts: InstagramPost[] }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-nude-800">
          Instagram Posts
        </h2>
        <button className="btn-primary inline-flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-xl shadow-sm border border-nude-200 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
              <div className="text-center">
                <Instagram className="w-12 h-12 text-pink-400 mx-auto mb-2" />
                <p className="text-sm text-pink-600">Instagram Post</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-nude-800 truncate">{post.caption}</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-nude-400 hover:text-nude-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-nude-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View Post
                </a>
                <div className="flex items-center space-x-2">
                  {post.visible ? (
                    <Eye className="w-4 h-4 text-green-500" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Content Tab Component
function ContentTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-nude-800">
        Content Management
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-nude-200 p-6">
        <p className="text-nude-600">Content management features coming soon...</p>
      </div>
    </div>
  );
}

// Settings Tab Component
function SettingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-nude-800">
        Settings
      </h2>
      <div className="bg-white rounded-xl shadow-sm border border-nude-200 p-6">
        <p className="text-nude-600">Settings features coming soon...</p>
      </div>
    </div>
  );
}
