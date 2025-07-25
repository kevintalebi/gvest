import React from "react";

export default function News() {
  return (
    <main className="bg-gold-gradient min-h-screen text-lux-gray py-16 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-glass border border-accent rounded-lux shadow-gold-glow p-8">
        <h1 className="font-serif text-4xl text-accent mb-8 text-center">Latest News & Updates</h1>
        
        {/* Featured News */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Featured News</h2>
          <div className="bg-glass border border-accent rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-accent text-white px-2 py-1 rounded text-xs font-bold">BREAKING</span>
              <span className="text-sm text-gray-600">December 15, 2024</span>
            </div>
            <h3 className="font-bold text-accent text-lg mb-2">GoodmanVest Reaches $50M in Assets Under Management</h3>
            <p className="text-sm leading-relaxed mb-4">
              We're excited to announce that GoodmanVest has reached a significant milestone of $50 million in assets under management. 
              This achievement reflects the trust and confidence our growing community of investors has placed in our platform.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-yellow-400 font-bold">$50M+</span>
              <span>Total Assets Under Management</span>
            </div>
          </div>
        </section>

        {/* Latest Updates */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Latest Updates</h2>
          <div className="space-y-4">
            <div className="bg-glass border border-accent rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">UPDATE</span>
                <span className="text-sm text-gray-600">December 10, 2024</span>
              </div>
              <h3 className="font-bold text-accent mb-2">New Property Added to Portfolio</h3>
              <p className="text-sm">
                We've added a luxury resort property in Bali, Indonesia to our investment portfolio. 
                This premium property offers excellent rental yields and long-term appreciation potential.
              </p>
            </div>

            <div className="bg-glass border border-accent rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">TECH</span>
                <span className="text-sm text-gray-600">December 5, 2024</span>
              </div>
              <h3 className="font-bold text-accent mb-2">Platform Security Enhancement</h3>
              <p className="text-sm">
                We've implemented advanced security measures to further protect our investors' assets. 
                The new security protocols include enhanced encryption and multi-factor authentication.
              </p>
            </div>

            <div className="bg-glass border border-accent rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">PARTNERSHIP</span>
                <span className="text-sm text-gray-600">November 28, 2024</span>
              </div>
              <h3 className="font-bold text-accent mb-2">Strategic Partnership with SafePal</h3>
              <p className="text-sm">
                We're pleased to announce our new partnership with SafePal, a leading Web3 wallet provider. 
                This collaboration will enhance the user experience for SafePal wallet users on our platform.
              </p>
            </div>
          </div>
        </section>

        {/* Market Insights */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Market Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-glass border border-accent rounded-lg p-4">
              <h3 className="font-bold text-accent mb-2">Real Estate Market Trends</h3>
              <p className="text-sm mb-3">
                The global real estate market continues to show strong fundamentals, with luxury properties 
                in prime locations maintaining their value and generating consistent rental income.
              </p>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Luxury Property Demand:</span>
                  <span className="text-yellow-400 font-bold">+15%</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Rental Yield Average:</span>
                  <span className="text-yellow-400 font-bold">6.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Price Appreciation:</span>
                  <span className="text-yellow-400 font-bold">+8.2%</span>
                </div>
              </div>
            </div>

            <div className="bg-glass border border-accent rounded-lg p-4">
              <h3 className="font-bold text-accent mb-2">Blockchain Adoption</h3>
              <p className="text-sm mb-3">
                The adoption of blockchain technology in real estate continues to accelerate, 
                providing greater transparency and efficiency in property transactions.
              </p>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span>Global Adoption Rate:</span>
                  <span className="text-yellow-400 font-bold">+23%</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Transaction Volume:</span>
                  <span className="text-yellow-400 font-bold">$2.1B</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Growth:</span>
                  <span className="text-yellow-400 font-bold">+45%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investor Success Stories */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Investor Success Stories</h2>
          <div className="space-y-4">
            <div className="bg-glass border border-accent rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">JS</div>
                <div>
                  <h3 className="font-bold text-accent mb-1">John Smith</h3>
                  <p className="text-sm text-gray-600 mb-2">Investor since March 2024</p>
                  <p className="text-sm">
                    "I started with a $1,000 investment and have seen consistent monthly returns. 
                    The platform is transparent and the support team is always helpful. 
                    I've already earned back my initial investment!"
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="text-yellow-400 font-bold">Total Returns: $1,200+</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-glass border border-accent rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">MJ</div>
                <div>
                  <h3 className="font-bold text-accent mb-1">Maria Johnson</h3>
                  <p className="text-sm text-gray-600 mb-2">Investor since January 2024</p>
                  <p className="text-sm">
                    "GoodmanVest has been a game-changer for my investment portfolio. 
                    The diversification across multiple properties gives me peace of mind, 
                    and the returns have exceeded my expectations."
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="text-yellow-400 font-bold">Total Returns: $3,500+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section>
          <div className="bg-glass border border-accent rounded-lg p-6 text-center">
            <h3 className="font-bold text-accent text-lg mb-2">Stay Updated</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter to receive the latest news, market insights, and investment opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-4 py-2 border border-accent rounded-lg bg-white text-gray-dark focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 