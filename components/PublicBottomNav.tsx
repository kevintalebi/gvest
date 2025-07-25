import React from 'react';
import Link from 'next/link';
import { Home, Users, Info, Newspaper } from 'lucide-react';

const publicNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/investor-center', label: 'Investor Center', icon: Users },
  { href: '/about-us', label: 'About Us', icon: Info },
  { href: '/news', label: 'News', icon: Newspaper },
];

export default function PublicBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gold-dark z-30 md:hidden">
      <div className="flex justify-between items-center px-2 py-1">
        {publicNavItems.map(({ href, label, icon: Icon }) => (
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