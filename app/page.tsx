"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageZoomModal from "../components/ImageZoomModal";

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, visible] as const;
}

function Navbar() {
  return (
    <nav className="navbar flex items-center justify-center px-4 md:px-8 py-4 border-b border-gray-200 relative bg-white z-30">
      <div className="flex items-center gap-2">
        <span className="text-xl md:text-2xl font-bold text-white tracking-tight">GoodmanVest</span>
      </div>
      {/* Navigation links removed */}
    </nav>
  );
}

function Section({ children, className = "" }: React.PropsWithChildren<{ className?: string }>) {
  return <section className={`section w-full max-w-full box-border px-2 sm:px-4 md:px-8 ${className}`}>{children}</section>;
}

export default function HomePage() {
  const [zoomImg, setZoomImg] = React.useState<string | null>(null);
  const [zoomAlt, setZoomAlt] = React.useState<string | undefined>(undefined);
  const [isMobile, setIsMobile] = React.useState(false);
  const [portfolioIndex, setPortfolioIndex] = React.useState(0);
  const [galleryIndex, setGalleryIndex] = React.useState(0);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent));
      // Debug: log wallet providers
      console.log('window.ethereum:', window.ethereum);
      console.log('window.trustwallet:', (window as any).trustwallet);
    }
  }, []);
  const portfolioData = [
                    { img: "umbrella-chair.jpg", name: "Sunset Beach Villa", location: "Miami, FL", occupancy: 97, value: 4.2 },
                    { img: "umbrella-chair-around-swimming-pool.jpg", name: "Palm Grove Resort", location: "Dubai, UAE", occupancy: 92, value: 7.8 },
                    { img: "white-sky-umbrella-nobody-party.jpg", name: "Santorini Blue Suites", location: "Santorini, Greece", occupancy: 88, value: 3.5 },
                    { img: "water-modern-nature-pool-resort.jpg", name: "Lagoon View Retreat", location: "Phuket, Thailand", occupancy: 94, value: 2.7 },
                    { img: "hammocks-umbrellas.jpg", name: "Bali Tranquil Villas", location: "Bali, Indonesia", occupancy: 99, value: 5.1 },
                    { img: "beautiful-outdoor-swimming-pool-hotel-resort-with-chair-deck-leisure-vacation.jpg", name: "Malibu Oceanfront Estate", location: "Malibu, CA", occupancy: 85, value: 9.3 },
                    { img: "light-ocean-white-relax-umbrella.jpg", name: "Côte d’Azur Residence", location: "Nice, France", occupancy: 91, value: 6.4 },
                    { img: "big-luxe-dining-room-interior-design.jpg", name: "Bosphorus Grand Tower", location: "Istanbul, Turkey", occupancy: 73, value: 8.2 }
  ];
  const galleryData = [
                    { img: "holiday-water-nature-blue-luxury.jpg", name: "Gold Coast Residences", location: "Gold Coast, Australia", occupancy: 89, value: 2.1 },
                    { img: "sea-beautiful-blue-deck-lounge.jpg", name: "Barcelona Marina Lofts", location: "Barcelona, Spain", occupancy: 95, value: 3.9 },
                    { img: "umbrella-chair-around-outdoor-swimming-pool-hotel-resort.jpg", name: "Cancun Sun Palace", location: "Cancun, Mexico", occupancy: 86, value: 1.7 },
                    { img: "orchid-summer-resort-rattan-nature.jpg", name: "Orchid Summer Resort", location: "Singapore", occupancy: 98, value: 4.8 },
                    { img: "luxury-water-swimming-resort-hotel.jpg", name: "LA Luxe Retreat", location: "Los Angeles, CA", occupancy: 93, value: 7.2 },
                    { img: "modern-spacious-room-with-large-panoramic-window.jpg", name: "Zurich Panorama Suites", location: "Zurich, Switzerland", occupancy: 87, value: 2.9 },
                    { img: "luxury-poolside-experience-where-guests-bask-opulence-cabanas.jpg", name: "Cape Opulence Villas", location: "Cape Town, South Africa", occupancy: 90, value: 5.6 },
                    { img: "type-luxurious-summer-villa-hotel-amara-dolce-vita-luxury-hotel-beautiful-architecture-tekirova-kemer-turkey.jpg", name: "Istanbul Grand Villa", location: "Istanbul, Turkey", occupancy: 84, value: 3.3 }
  ];
  return (
    <main className="min-h-screen text-white font-sans overflow-x-hidden bg-[#0f1932]">
      <div className="container mx-auto w-full max-w-screen-lg px-2 sm:px-4 md:px-8 box-border bg-transparent">
        <Navbar />
        {/* Hero Banner */}
        <Section className="w-full max-w-full flex flex-col md:flex-row items-center justify-between py-8 md:py-16 bg-transparent">
          <div className="bg-[#0f1932] border border-white rounded-xl p-6 md:p-10 w-full h-full text-white flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 max-w-full w-full mb-6 md:mb-0">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight break-words text-center md:text-left w-full max-w-full">Reliable Real Estate Investment Solutions</h1>
              <p className="text-sm sm:text-base md:text-lg mb-6 text-white break-words text-center md:text-left w-full max-w-full">Access a professionally managed, diversified property portfolio with transparent, blockchain-secured ownership. Start with as little as <span className="text-white font-bold">$300 USDT</span>.</p>
              <div className="flex justify-center md:justify-start w-full">
                <CustomConnectWallet />
              </div>
            </div>
            <div className="flex-1 flex justify-center w-full max-w-full">
              <div className="w-full max-w-xs sm:max-w-md md:max-w-lg p-2">
                <Image src="/images/luxury-water-swimming-resort-hotel.jpg" alt="Hero" width={500} height={320} className="rounded-lg shadow w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </Section>
        {/* Investment Benefits */}
        <Section>
          <div className="bg-[#0f1932] border border-white rounded-xl p-6 md:p-10 w-full h-full text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center break-words w-full max-w-full">Investment Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2 break-words w-full max-w-full text-center md:text-left">6-8% Monthly Returns</h3>
                <p className="break-words w-full max-w-full text-center md:text-left">Consistent passive income from rental yields.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2 break-words w-full max-w-full text-center md:text-left">Property Appreciation</h3>
                <p className="break-words w-full max-w-full text-center md:text-left">Long-term capital gains potential.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2 break-words w-full max-w-full text-center md:text-left">Diversification</h3>
                <p className="break-words w-full max-w-full text-center md:text-left">Spread risk across multiple properties.</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2 break-words w-full max-w-full text-center md:text-left">Liquidity</h3>
                <p className="break-words w-full max-w-full text-center md:text-left">Easy entry/exit through USDT contributions.</p>
              </div>
            </div>
          </div>
        </Section>
        {/* How It Works */}
        <Section>
          <div className="bg-[#0f1932] border border-white rounded-xl p-6 md:p-10 w-full h-full text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center break-words w-full max-w-full">How Real Estate Investment Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-4xl mb-2 text-white font-bold">1</div>
                <h4 className="font-bold mb-2">Contribute USDT</h4>
                <p>Your funds go into a diversified real estate portfolio.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2 text-white font-bold">2</div>
                <h4 className="font-bold mb-2">Earn Monthly Returns</h4>
                <p>6-8% monthly from rental income and appreciation.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2 text-white font-bold">3</div>
                <h4 className="font-bold mb-2">Compound Growth</h4>
                <p>Reinvest returns or withdraw monthly.</p>
              </div>
            </div>
          </div>
        </Section>
        {/* Investment Portfolio */}
        <Section>
          <div className="bg-[#0f1932] border border-white rounded-xl p-6 md:p-10 w-full h-full text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center break-words w-full max-w-full">Investment Portfolio</h2>
            <p className="text-base sm:text-lg text-center max-w-2xl mx-auto mb-8 break-words w-full max-w-full">Our investment portfolio features a selection of high-value properties in prime locations, offering stable returns and long-term growth for our investors.</p>
            {isMobile ? (
              <div className="flex flex-row gap-4 overflow-x-auto pb-2 -mx-2 px-2">
                {portfolioData.map((item, idx) => (
                  <div key={item.img + idx} className="min-w-[80vw] max-w-xs p-2 rounded bg-transparent flex-shrink-0">
                    <div className="bg-[#0f1932] border border-white rounded-lg shadow p-3 flex flex-col w-full text-white">
                      <div className="relative w-full aspect-[16/9] bg-[#0f1932] rounded-lg mb-2 overflow-hidden">
                        <button
                          onClick={() => {
                            setZoomImg(`/images/${item.img}`);
                            setZoomAlt(item.name);
                          }}
                          className="w-full h-full block"
                        >
                          <Image
                            src={`/images/${item.img}`}
                            alt={`Investment Portfolio ${idx + 1}`}
                            fill
                            className="object-cover rounded"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={idx < 4}
                          />
                        </button>
                      </div>
                      <div className="font-bold text-white mb-1">{item.name}</div>
                      <div className="text-gray-600 mb-1">{item.location}</div>
                      <div className="text-sm">Occupancy: <span className="text-white font-bold">{item.occupancy}%</span> | Value: <span className="text-white font-bold">${item.value}M</span></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {portfolioData.map((item, idx) => (
                  <div key={item.img + idx} className="p-2 rounded bg-transparent">
                    <div className="bg-[#0f1932] border border-white rounded-lg shadow p-3 flex flex-col w-full text-white">
                      <div className="relative w-full aspect-[16/9] bg-[#0f1932] rounded-lg mb-2 overflow-hidden">
                        <button
                          onClick={() => {
                            setZoomImg(`/images/${item.img}`);
                            setZoomAlt(item.name);
                          }}
                          className="w-full h-full block"
                        >
                          <Image
                            src={`/images/${item.img}`}
                            alt={`Investment Portfolio ${idx + 1}`}
                            fill
                            className="object-cover rounded"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={idx < 4}
                          />
                        </button>
                      </div>
                      <div className="font-bold text-white mb-1">{item.name}</div>
                      <div className="text-gray-600 mb-1">{item.location}</div>
                      <div className="text-sm">Occupancy: <span className="text-white font-bold">{item.occupancy}%</span> | Value: <span className="text-white font-bold">${item.value}M</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Section>
        {/* Property Gallery */}
        <Section>
          <div className="bg-[#0f1932] border border-white rounded-xl p-6 md:p-10 w-full h-full text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center break-words w-full max-w-full">Property Gallery</h2>
            <p className="text-base sm:text-lg text-center max-w-2xl mx-auto mb-8 break-words w-full max-w-full">Browse our gallery of stunning properties, each representing the luxury and diversity of our real estate offerings worldwide.</p>
                  {isMobile ? (
                    <div className="flex flex-row gap-4 overflow-x-auto pb-2 -mx-2 px-2">
                      {galleryData.map((item, idx) => (
                        <div key={item.img + idx} className="min-w-[80vw] max-w-xs p-2 rounded bg-transparent flex-shrink-0">
                          <div className="bg-[#0f1932] border border-white rounded-lg shadow p-3 flex flex-col w-full text-white">
                            <div className="relative w-full aspect-[16/9] bg-[#0f1932] rounded-lg mb-2 overflow-hidden">
                                <button
                                  onClick={() => {
                                    setZoomImg(`/images/${item.img}`);
                                    setZoomAlt(item.name);
                                  }}
                                  className="w-full h-full block"
                                >
                                  <Image
                                    src={`/images/${item.img}`}
                                alt={`Property Gallery ${idx + 1}`}
                                  fill
                                className="object-cover rounded"
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </button>
                            </div>
                            <div className="font-bold text-white mb-1">{item.name}</div>
                            <div className="text-gray-600 mb-1">{item.location}</div>
                            <div className="text-sm">Occupancy: <span className="text-white font-bold">{item.occupancy}%</span> | Value: <span className="text-white font-bold">${item.value}M</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {galleryData.map((item, idx) => (
                        <div key={item.img + idx} className="p-2 rounded bg-transparent">
                          <div className="bg-[#0f1932] border border-white rounded-lg shadow p-3 flex flex-col w-full text-white">
                            <div className="relative w-full aspect-[16/9] bg-[#0f1932] rounded-lg mb-2 overflow-hidden">
                                <button
                                  onClick={() => {
                                    setZoomImg(`/images/${item.img}`);
                                    setZoomAlt(item.name);
                                  }}
                                  className="w-full h-full block"
                                >
                                  <Image
                                    src={`/images/${item.img}`}
                                alt={`Property Gallery ${idx + 1}`}
                                  fill
                                className="object-cover rounded"
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </button>
                            </div>
                            <div className="font-bold text-white mb-1">{item.name}</div>
                            <div className="text-gray-600 mb-1">{item.location}</div>
                            <div className="text-sm">Occupancy: <span className="text-white font-bold">{item.occupancy}%</span> | Value: <span className="text-white font-bold">${item.value}M</span></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
          </div>
        </Section>
        {/* Real Estate Investment Program */}
        <Section>
          <div className="bg-[#0f1932] border border-white rounded-xl p-6 md:p-10 w-full h-full text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center break-words w-full max-w-full">Real Estate Investment Program</h2>
            <div className="bg-[#0f1932] border-none rounded p-4 sm:p-8 text-center w-full max-w-full md:max-w-2xl mx-auto box-border">
              <p className="text-lg mb-6 break-words w-full max-w-full text-center md:text-left">Minimum investment is <span className="text-white font-bold">$300</span>.<br/>Your monthly income depends on your investment amount:</p>
              <ol className="space-y-4 text-left mx-auto w-full max-w-full md:max-w-md list-decimal list-inside box-border">
                <li className="flex items-start gap-3 bg-[#0f1932] border-l-4 border-white rounded-md p-4 shadow-sm break-words w-full max-w-full">
                  <span className="text-2xl font-bold text-white">1</span>
                        <div>
                    <span className="text-white font-bold">$300 - $2,999</span><br/>
                          <span className="text-lg">6% monthly income</span>
                        </div>
                      </li>
                <li className="flex items-start gap-3 bg-[#0f1932] border-l-4 border-white rounded-md p-4 shadow-sm break-words w-full max-w-full">
                  <span className="text-2xl font-bold text-white">2</span>
                        <div>
                    <span className="text-white font-bold">$3,000 - $29,999</span><br/>
                          <span className="text-lg">7% monthly income</span>
                        </div>
                      </li>
                <li className="flex items-start gap-3 bg-[#0f1932] border-l-4 border-white rounded-md p-4 shadow-sm break-words w-full max-w-full">
                  <span className="text-2xl font-bold text-white">3</span>
                        <div>
                    <span className="text-white font-bold">$30,000+</span><br/>
                          <span className="text-lg">8% monthly income</span>
                        </div>
                      </li>
                    </ol>
                  </div>
          </div>
        </Section>
          {/* Referral Investment Program */}
        <Section>
          <div className="bg-[#0f1932] border border-white rounded-xl p-6 md:p-10 w-full h-full text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center break-words w-full max-w-full">Referral Investment Program</h2>
            <div className="bg-[#0f1932] border-none rounded p-4 sm:p-8 text-center w-full max-w-full md:max-w-2xl mx-auto box-border">
              <p className="text-lg mb-4 break-words w-full max-w-full text-center md:text-left">Earn additional income by referring other real estate investors. Build your passive income network and grow your rewards through our multi-level referral program.</p>
              <ul className="mb-4 text-left mx-auto w-full max-w-full md:max-w-md break-words box-border">
                <li className="break-words w-full max-w-full">• Level 1: <span className="text-yellow-400 font-bold">30%</span> monthly commission from direct referrals</li>
                <li className="break-words w-full max-w-full">• Level 2: <span className="text-yellow-400 font-bold">20%</span> monthly commission from second-level referrals</li>
                <li className="break-words w-full max-w-full">• Level 3: <span className="text-yellow-400 font-bold">10%</span> monthly commission from third-level referrals</li>
                    </ul>
                  </div>
          </div>
        </Section>
        {/* Reward Program */}
        <Section>
          <div className="bg-[#0f1932] border border-white rounded-xl p-6 md:p-10 w-full h-full text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">Reward Program</h2>
            <ul className="space-y-4 text-lg">
              <li>1. If you have 3 line each with above 3000 volume you will earn reward <span className="font-bold text-yellow-400">$300</span></li>
              <li>2. If you have 3 line each with above 30000 volume you will earn reward <span className="font-bold text-yellow-400">$3000</span></li>
              <li>3. If you have 3 line each with above 300000 volume you will earn reward <span className="font-bold text-yellow-400">$30000</span></li>
            </ul>
          </div>
        </Section>
        {/* Our Partners */}
        <Section>
          <div className="bg-[#0f1932] border border-white rounded-xl p-6 md:p-10 w-full h-full text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">Our Partners</h2>
            <div className="flex flex-row gap-6 overflow-x-auto pb-2 -mx-2 px-2 items-center">
              {['bitget.png', 'metamask.png', 'polygon.png', 'tron.png', 'trust.png'].map((img) => (
                <div key={img} className="bg-[#0f1932] border border-white rounded-lg p-2 flex-shrink-0 flex items-center justify-center">
                  <img src={`/partnership/${img}`} alt={img.replace('.png', '')} className="h-16 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </Section>
        {/* Footer */}
        <footer className="w-full flex flex-col items-center justify-center py-8 border-t border-gray-200 bg-gray-50 mt-8 px-2 sm:px-4 md:px-8">
          <div className="flex flex-row gap-6 mb-4">
            <a href="https://x.com/Goodman_Group" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#d32f2f]">Twitter</a>
            <a href="https://au.linkedin.com/company/goodman" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#d32f2f]">LinkedIn</a>
            <a href="https://www.instagram.com/goodman.group/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#d32f2f]">Instagram</a>
            <a href="https://www.youtube.com/channel/UCqPJamGrRaP3OaT16gOCCeQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-[#d32f2f]">YouTube</a>
                </div>
          <div className="flex flex-col md:flex-row items-center gap-2 text-gray-500 text-sm">
          <span>© {new Date().getFullYear()} GoodmanVest. All rights reserved.</span>
          <span className="hidden md:inline-block mx-2">|</span>
            <Link href="/privacy-policy" className="underline hover:text-[#d32f2f] transition-colors">Privacy Policy</Link>
        </div>
      </footer>
      </div>
      {zoomImg && (
        <ImageZoomModal src={zoomImg} alt={zoomAlt} onClose={() => setZoomImg(null)} />
      )}
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
          className="bg-gold-gradient text-gray-dark py-3 px-8 rounded-lux shadow-gold-glow hover:bg-gold-dark hover:text-white transition-all text-xl mb-4 font-bold whitespace-nowrap text-center border border-white"
        >
          <span className="font-bold whitespace-nowrap">Connect Wallet</span>
        </button>
      )}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}
