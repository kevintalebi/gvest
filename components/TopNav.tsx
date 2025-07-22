"use client";

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, HandCoins, BadgeDollarSign, Users } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/contribute', label: 'Contribute', icon: HandCoins },
  { href: '/earnings', label: 'Earnings', icon: BadgeDollarSign },
  { href: '/referrals', label: 'Referrals', icon: Users },
];

export default function TopNav() {
  return (
    <nav className="w-full py-3 bg-white/70 backdrop-blur-md shadow fixed top-0 left-0 z-30">
      <div className="max-w-6xl mx-auto flex justify-center md:justify-between items-center px-4">
        <span className="font-serif text-2xl font-bold tracking-wide text-gold-dark text-center w-full md:w-auto">Goodmanvest</span>
        <div className="hidden md:flex gap-4 items-center ml-8">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-gold-dark hover:text-accent hover:bg-gold/10 font-semibold transition-all"
            >
              <Icon size={18} />
              <span className="text-base">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 