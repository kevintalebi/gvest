"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ImageZoomModal from "../components/ImageZoomModal";

export default function HomePage() {
  const [zoomImg, setZoomImg] = React.useState<string | null>(null);
  const [zoomAlt, setZoomAlt] = React.useState<string | undefined>(undefined);
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent));
      // Debug: log wallet providers
      console.log('window.ethereum:', window.ethereum);
      console.log('window.trustwallet:', (window as any).trustwallet);
    }
  }, []);
  return (
    <main className="bg-gold-gradient min-h-screen text-lux-gray overflow-x-hidden">
      <div className="w-3/4 mx-auto">
        {/* Hero Section */}
        <section className="w-3/4 min-h-[70vh] flex flex-col justify-center items-center text-center px-4 py-16 bg-transparent mx-auto">
          <div className="max-w-3xl w-full mx-auto flex flex-col items-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-accent mb-4 md:mb-6 tracking-wide drop-shadow-lg mt-3">Invest in Real Estate Through Blockchain</h1>
            <p className="text-xl md:text-2xl mb-6 md:mb-8 max-w-2xl mx-auto">Access a professionally managed, diversified property portfolio with transparent, blockchain-secured ownership. Start with as little as <span className="text-accent font-bold">$10 USDT</span>.</p>
            <div className="w-full flex justify-center mb-6 md:mb-8">
              <button className="focus:outline-none" onClick={() => { setZoomImg('/images/luxury-water-swimming-resort-hotel.jpg'); setZoomAlt('Luxury Property'); }}>
                <Image src="/images/luxury-water-swimming-resort-hotel.jpg" alt="Luxury Property" width={600} height={320} className="rounded-lux shadow-gold-glow border-4 border-accent/30 object-cover cursor-zoom-in" />
              </button>
            </div>
            <div className="w-full flex justify-center mb-4">
              {isMobile ? (
                <div className="w-full text-center bg-yellow-100 text-yellow-900 font-semibold py-2 px-4 rounded mb-4">
                  Please use WalletConnect from a desktop browser, or open this site in your wallet app’s built-in browser for the best experience.
                </div>
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>
        </section>
          {/* REIT Overview */}
          <section className="w-3/4 px-4 py-12 flex flex-col md:flex-row items-center md:items-start md:justify-center gap-10 max-w-6xl mx-auto">
            <div className="flex-1 max-w-lg w-full mb-8 md:mb-0 md:mr-8">
              <h2 className="font-serif text-3xl text-accent mb-4 text-left md:text-left">Why Our Real Estate Fund?</h2>
              <ul className="space-y-3 text-lg text-left">
                <li>• <span className="text-accent font-bold">Professional</span> real estate portfolio management</li>
                <li>• Diversified investments: residential, commercial, industrial</li>
                <li>• Blockchain-secured ownership & transparent returns</li>
                <li>• Minimum investment: <span className="text-accent font-bold">$10 USDT</span></li>
              </ul>
            </div>
            <div className="flex-1 flex justify-center max-w-md w-full">
              <button className="focus:outline-none" onClick={() => { setZoomImg('/images/modern-spacious-room-with-large-panoramic-window.jpg'); setZoomAlt('REIT Overview'); }}>
                <Image src="/images/modern-spacious-room-with-large-panoramic-window.jpg" alt="REIT Overview" width={400} height={260} className="rounded-lux shadow-gold-glow border-4 border-accent/20 object-cover cursor-zoom-in" />
              </button>
            </div>
          </section>
          {/* Investment Benefits */}
          <section className="w-full px-2 py-8">
            <h2 className="font-serif text-3xl text-accent mb-8 text-center">Investment Benefits</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-glass border border-accent rounded-lux shadow-gold-glow p-6 text-center">
                <h3 className="text-xl font-bold text-accent mb-2">6% Monthly Returns</h3>
                <p>Consistent passive income from rental yields.</p>
              </div>
              <div className="bg-glass border border-accent rounded-lux shadow-gold-glow p-6 text-center">
                <h3 className="text-xl font-bold text-accent mb-2">Property Appreciation</h3>
                <p>Long-term capital gains potential.</p>
              </div>
              <div className="bg-glass border border-accent rounded-lux shadow-gold-glow p-6 text-center">
                <h3 className="text-xl font-bold text-accent mb-2">Diversification</h3>
                <p>Spread risk across multiple properties.</p>
              </div>
              <div className="bg-glass border border-accent rounded-lux shadow-gold-glow p-6 text-center">
                <h3 className="text-xl font-bold text-accent mb-2">Liquidity</h3>
                <p>Easy entry/exit through USDT contributions.</p>
              </div>
            </div>
          </section>
          {/* How It Works */}
          <section className="w-full px-2 py-8">
            <h2 className="font-serif text-3xl text-accent mb-8 text-center">How Real Estate Investment Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-glass border border-accent rounded-lux shadow-gold-glow p-6 text-center">
                <div className="text-4xl mb-2 text-accent font-bold">1</div>
                <h4 className="font-bold mb-2">Contribute USDT</h4>
                <p>Your funds go into a diversified real estate portfolio.</p>
              </div>
              <div className="bg-glass border border-accent rounded-lux shadow-gold-glow p-6 text-center">
                <div className="text-4xl mb-2 text-accent font-bold">2</div>
                <h4 className="font-bold mb-2">Earn Monthly Returns</h4>
                <p>6% monthly from rental income and appreciation.</p>
              </div>
              <div className="bg-glass border border-accent rounded-lux shadow-gold-glow p-6 text-center">
                <div className="text-4xl mb-2 text-accent font-bold">3</div>
                <h4 className="font-bold mb-2">Compound Growth</h4>
                <p>Reinvest returns or withdraw monthly.</p>
              </div>
            </div>
          </section>
          {/* Investment Portfolio - Section 1 (now 8 images) */}
          <section className="w-full px-2 py-8">
            <h2 className="font-serif text-3xl text-accent mb-8 text-center">Investment Portfolio</h2>
            <p className="text-lg text-center max-w-2xl mx-auto mb-8">Our investment portfolio features a selection of high-value properties in prime locations, offering stable returns and long-term growth for our investors.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { img: "umbrella-chair.jpg", name: "Sunset Beach Villa", location: "Miami, FL", occupancy: 97, value: 4.2 },
                { img: "umbrella-chair-around-swimming-pool.jpg", name: "Palm Grove Resort", location: "Dubai, UAE", occupancy: 92, value: 7.8 },
                { img: "white-sky-umbrella-nobody-party.jpg", name: "Santorini Blue Suites", location: "Santorini, Greece", occupancy: 88, value: 3.5 },
                { img: "water-modern-nature-pool-resort.jpg", name: "Lagoon View Retreat", location: "Phuket, Thailand", occupancy: 94, value: 2.7 },
                { img: "hammocks-umbrellas.jpg", name: "Bali Tranquil Villas", location: "Bali, Indonesia", occupancy: 99, value: 5.1 },
                { img: "beautiful-outdoor-swimming-pool-hotel-resort-with-chair-deck-leisure-vacation.jpg", name: "Malibu Oceanfront Estate", location: "Malibu, CA", occupancy: 85, value: 9.3 },
                { img: "light-ocean-white-relax-umbrella.jpg", name: "Côte d’Azur Residence", location: "Nice, France", occupancy: 91, value: 6.4 },
                { img: "big-luxe-dining-room-interior-design.jpg", name: "Bosphorus Grand Tower", location: "Istanbul, Turkey", occupancy: 73, value: 8.2 }
              ].map((item, idx) => (
                <div key={item.img + idx} className="p-[2px] rounded-lux bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600">
                  <div key={item.img} className="bg-glass rounded-lux shadow-gold-glow p-3 flex flex-col w-full">
                    <button className="relative w-full aspect-[16/9] bg-background rounded-lux mb-2 overflow-hidden focus:outline-none" onClick={() => { setZoomImg(`/images/${item.img}`); setZoomAlt(item.name); }}>
                      <Image
                        src={`/images/${item.img}`}
                        alt={`Investment Portfolio ${idx + 1}`}
                        fill
                        className="object-cover rounded-lux cursor-zoom-in"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={idx < 4}
                      />
                    </button>
                    <div className="font-bold text-accent mb-1">{item.name}</div>
                    <div className="text-lux-gray mb-1">{item.location}</div>
                    <div className="text-sm">Occupancy: <span className="text-accent font-bold">{item.occupancy}%</span> | Value: <span className="text-accent font-bold">${item.value}M</span></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Property Gallery - Section 2 (now 8 images) */}
          <section className="w-full px-2 py-8">
            <h2 className="font-serif text-3xl text-accent mb-8 text-center">Property Gallery</h2>
            <p className="text-lg text-center max-w-2xl mx-auto mb-8">Browse our gallery of stunning properties, each representing the luxury and diversity of our real estate offerings worldwide.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { img: "holiday-water-nature-blue-luxury.jpg", name: "Gold Coast Residences", location: "Gold Coast, Australia", occupancy: 89, value: 2.1 },
                { img: "sea-beautiful-blue-deck-lounge.jpg", name: "Barcelona Marina Lofts", location: "Barcelona, Spain", occupancy: 95, value: 3.9 },
                { img: "umbrella-chair-around-outdoor-swimming-pool-hotel-resort.jpg", name: "Cancun Sun Palace", location: "Cancun, Mexico", occupancy: 86, value: 1.7 },
                { img: "orchid-summer-resort-rattan-nature.jpg", name: "Orchid Summer Resort", location: "Singapore", occupancy: 98, value: 4.8 },
                { img: "luxury-water-swimming-resort-hotel.jpg", name: "LA Luxe Retreat", location: "Los Angeles, CA", occupancy: 93, value: 7.2 },
                { img: "modern-spacious-room-with-large-panoramic-window.jpg", name: "Zurich Panorama Suites", location: "Zurich, Switzerland", occupancy: 87, value: 2.9 },
                { img: "luxury-poolside-experience-where-guests-bask-opulence-cabanas.jpg", name: "Cape Opulence Villas", location: "Cape Town, South Africa", occupancy: 90, value: 5.6 },
                { img: "type-luxurious-summer-villa-hotel-amara-dolce-vita-luxury-hotel-beautiful-architecture-tekirova-kemer-turkey.jpg", name: "Istanbul Grand Villa", location: "Istanbul, Turkey", occupancy: 84, value: 3.3 }
              ].map((item, idx) => (
                <div key={item.img + idx} className="p-[2px] rounded-lux bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600">
                  <div key={item.img} className="bg-glass rounded-lux shadow-gold-glow p-3 flex flex-col w-full">
                    <button className="relative w-full aspect-[16/9] bg-background rounded-lux mb-2 overflow-hidden focus:outline-none" onClick={() => { setZoomImg(`/images/${item.img}`); setZoomAlt(item.name); }}>
                      <Image
                        src={`/images/${item.img}`}
                        alt={`Property Gallery ${idx + 1}`}
                        fill
                        className="object-cover rounded-lux cursor-zoom-in"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </button>
                    <div className="font-bold text-accent mb-1">{item.name}</div>
                    <div className="text-lux-gray mb-1">{item.location}</div>
                    <div className="text-sm">Occupancy: <span className="text-accent font-bold">{item.occupancy}%</span> | Value: <span className="text-accent font-bold">${item.value}M</span></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* International Real Estate Trust - Section 3 (now 8 images) */}
          <section className="w-full px-2 py-8">
            <h2 className="font-serif text-3xl text-accent mb-8 text-center">International Real Estate Trust</h2>
            <p className="text-lg text-center max-w-2xl mx-auto mb-8">Our international real estate trust includes exclusive properties in iconic cities and resort destinations, providing global exposure and diversification.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { img: "hotel-outside-table-deck-balcony.jpg", name: "Central Park Residences", location: "New York, NY", occupancy: 99, value: 10.0 },
                { img: "swimming-pool-beach-luxury-hotel-type-entertainment-complex-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer-turkey.jpg", name: "Roman Holiday Villas", location: "Rome, Italy", occupancy: 77, value: 6.7 },
                { img: "nature-travel-blue-beauty-decoration.jpg", name: "Lisbon Garden Homes", location: "Lisbon, Portugal", occupancy: 82, value: 2.5 },
                { img: "outside-view-restaurant-cottage-night-time.jpg", name: "Tokyo Night Cottages", location: "Tokyo, Japan", occupancy: 91, value: 4.4 },
                { img: "mosque-pictures-moroccan-wall-pattern.jpg", name: "Casablanca Mosaic Palace", location: "Casablanca, Morocco", occupancy: 85, value: 3.8 },
                { img: "modern-villa-with-multiple-lights-sun-loungers-asprovalta-greece.jpg", name: "Aegean Light Villas", location: "Athens, Greece", occupancy: 95, value: 5.9 },
                { img: "romantic-villa-ephrussie-french-riviera-beauty-nature.jpg", name: "Monaco Riviera Estate", location: "Monaco", occupancy: 89, value: 8.6 },
                { img: "colonial-style-house-night-scene.jpg", name: "Golden Horn Colonial House", location: "Istanbul, Turkey", occupancy: 71, value: 1.3 }
              ].map((item, idx) => (
                <div key={item.img + idx} className="p-[2px] rounded-lux bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600">
                  <div key={item.img} className="bg-glass rounded-lux shadow-gold-glow p-3 flex flex-col w-full">
                    <button className="relative w-full aspect-[16/9] bg-background rounded-lux mb-2 overflow-hidden focus:outline-none" onClick={() => { setZoomImg(`/images/${item.img}`); setZoomAlt(item.name); }}>
                      <Image
                        src={`/images/${item.img}`}
                        alt={`International Real Estate Trust ${idx + 1}`}
                        fill
                        className="object-cover rounded-lux cursor-zoom-in"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </button>
                    <div className="font-bold text-accent mb-1">{item.name}</div>
                    <div className="text-lux-gray mb-1">{item.location}</div>
                    <div className="text-sm">Occupancy: <span className="text-accent font-bold">{item.occupancy}%</span> | Value: <span className="text-accent font-bold">${item.value}M</span></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Referral Investment Program */}
          <section className="w-full px-2 py-8">
            <h2 className="font-serif text-3xl text-accent mb-8 text-center">Referral Investment Program</h2>
            <div className="bg-glass border border-accent rounded-lux shadow-gold-glow p-8 text-center max-w-2xl mx-auto">
              <p className="text-lg mb-4">Earn additional income by referring other real estate investors. Build your passive income network and grow your rewards through our multi-level referral program.</p>
              <ul className="mb-4 text-left mx-auto max-w-md">
                <li>• Level 1: <span className="text-accent font-bold">1.8%</span> monthly commission from direct referrals</li>
                <li>• Level 2: <span className="text-accent font-bold">1.2%</span> monthly commission from second-level referrals</li>
                <li>• Level 3: <span className="text-accent font-bold">0.6%</span> monthly commission from third-level referrals</li>
              </ul>
              <Link href="/referrals">
                <button className="bg-gold-gradient text-primary font-bold px-8 py-3 rounded-lux shadow-gold-glow hover:scale-105 transition-all text-lg">Learn More & Share</button>
              </Link>
            </div>
          </section>
        </div>
      {/* At the end of the main render, add the modal */}
      {zoomImg && (
        <ImageZoomModal src={zoomImg} alt={zoomAlt} onClose={() => setZoomImg(null)} />
      )}
    </main>
  );
}
