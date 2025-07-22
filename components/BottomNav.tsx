import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, HandCoins, BadgeDollarSign, Users } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/contribute', label: 'Contribute', icon: HandCoins },
  { href: '/earnings', label: 'Earnings', icon: BadgeDollarSign },
  { href: '/referrals', label: 'Referrals', icon: Users },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gold-dark z-30 md:hidden">
      <div className="flex justify-between items-center px-2 py-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center flex-1 py-2 text-gold-dark hover:text-accent transition-all"
          >
            <Icon size={22} className="mb-1" />
            <span className="text-xs font-semibold">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
} 