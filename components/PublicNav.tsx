"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function PublicNav() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="w-full py-3 bg-white/70 backdrop-blur-md shadow fixed top-0 left-0 z-30">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
          <span className="font-serif text-2xl font-bold tracking-wide text-gold-dark">Goodmanvest</span>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gold-dark hover:text-accent transition-colors font-medium">Home</Link>
            <Link href="/investor-center" className="text-gold-dark hover:text-accent transition-colors font-medium">Investor Center</Link>
            <Link href="/about-us" className="text-gold-dark hover:text-accent transition-colors font-medium">About Us</Link>
            <Link href="/news" className="text-gold-dark hover:text-accent transition-colors font-medium">News</Link>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-gold-dark hover:text-accent transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          />
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-64 bg-[#0f1932] shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <span className="font-serif text-xl font-bold text-white">Menu</span>
                <button
                  onClick={toggleSidebar}
                  className="p-2 text-white hover:text-yellow-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Navigation Items */}
              <nav className="flex-1 p-4">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/"
                      onClick={toggleSidebar}
                      className="flex items-center gap-3 px-4 py-3 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <span className="text-lg">🏠</span>
                      <span className="font-semibold">Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/investor-center"
                      onClick={toggleSidebar}
                      className="flex items-center gap-3 px-4 py-3 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <span className="text-lg">👥</span>
                      <span className="font-semibold">Investor Center</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us"
                      onClick={toggleSidebar}
                      className="flex items-center gap-3 px-4 py-3 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <span className="text-lg">ℹ️</span>
                      <span className="font-semibold">About Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news"
                      onClick={toggleSidebar}
                      className="flex items-center gap-3 px-4 py-3 text-white hover:text-yellow-400 hover:bg-white/10 rounded-lg transition-all"
                    >
                      <span className="text-lg">📰</span>
                      <span className="font-semibold">News</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 