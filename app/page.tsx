"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
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
              <CustomConnectWallet />
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
      {/* Social Media Icons Section */}
      <footer className="w-full flex flex-col items-center justify-center py-8 mt-8 border-t border-accent bg-gold-gradient">
        <div className="flex gap-6">
          {/* Twitter */}
          <a href="https://x.com/Goodman_Group" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 transition-colors duration-200 group-hover:bg-[#1DA1F2]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.46 5.924c-.793.352-1.645.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 11.2 9.03c0 .352.04.695.116 1.022C7.728 9.89 4.1 8.1 1.67 5.149a4.48 4.48 0 0 0-.607 2.254c0 1.555.792 2.927 2.002 3.732a4.48 4.48 0 0 1-2.03-.561v.057c0 2.172 1.545 3.984 3.594 4.396a4.5 4.5 0 0 1-2.025.077c.571 1.78 2.23 3.075 4.197 3.11A8.98 8.98 0 0 1 2 19.54a12.68 12.68 0 0 0 6.88 2.017c8.253 0 12.77-6.835 12.77-12.77 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z" fill="#333" className="group-hover:fill-white transition-colors duration-200"/>
              </svg>
            </span>
          </a>
          {/* LinkedIn */}
          <a href="https://au.linkedin.com/company/goodman" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 transition-colors duration-200 group-hover:bg-[#0077B5]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.369 4.267 5.455v6.285zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z" fill="#333" className="group-hover:fill-white transition-colors duration-200"/>
              </svg>
            </span>
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/goodman.group/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 transition-colors duration-200 group-hover:bg-[#E1306C]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6.406-8.006a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0zM21.6 6.6a5.6 5.6 0 0 0-5.6-5.6H8a5.6 5.6 0 0 0-5.6 5.6v8.8a5.6 5.6 0 0 0 5.6 5.6h8.8a5.6 5.6 0 0 0 5.6-5.6V8a5.6 5.6 0 0 0-5.6-5.6zm3.2 14.4a3.2 3.2 0 0 1-3.2 3.2H8a3.2 3.2 0 0 1-3.2-3.2V8A3.2 3.2 0 0 1 8 4.8h8.8A3.2 3.2 0 0 1 20 8v8.8z" fill="#333" className="group-hover:fill-white transition-colors duration-200"/>
              </svg>
            </span>
          </a>
          {/* YouTube */}
          <a href="https://www.youtube.com/channel/UCqPJamGrRaP3OaT16gOCCeQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="group">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 transition-colors duration-200 group-hover:bg-[#FF0000]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a2.997 2.997 0 0 0-2.112-2.112C19.13 3.6 12 3.6 12 3.6s-7.13 0-9.386.474A2.997 2.997 0 0 0 .502 6.186C0 8.442 0 12 0 12s0 3.558.502 5.814a2.997 2.997 0 0 0 2.112 2.112C4.87 20.4 12 20.4 12 20.4s7.13 0 9.386-.474a2.997 2.997 0 0 0 2.112-2.112C24 15.558 24 12 24 12s0-3.558-.502-5.814zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" fill="#333" className="group-hover:fill-white transition-colors duration-200"/>
              </svg>
            </span>
          </a>
        </div>
        <div className="mt-4 text-gray-dark text-sm">© {new Date().getFullYear()} GoodmanVest. All rights reserved.</div>
      </footer>
    </main>
  );
}

// CustomConnectWallet component
function CustomConnectWallet() {
  const [account, setAccount] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function connectWallet() {
    setError(null);
    if (typeof window === "undefined" || !(window as any).ethereum) {
      setError("No Ethereum wallet detected. Please install MetaMask or use a wallet browser.");
      return;
    }
    try {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (err: any) {
      setError(err.message || "User rejected connection.");
    }
  }

  return (
    <div>
      {account ? (
        <div className="text-green-700 font-bold">Connected: {account}</div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-gold-gradient text-gray-dark py-3 px-8 rounded-lux shadow-gold-glow hover:bg-gold-dark hover:text-white transition-all text-xl mb-4 font-bold whitespace-nowrap text-center"
        >
          <span className="font-bold whitespace-nowrap">Connect Wallet</span>
        </button>
      )}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}
