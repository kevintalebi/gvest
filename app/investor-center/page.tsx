import React from "react";

export default function InvestorCenter() {
  return (
    <main className="bg-gold-gradient min-h-screen text-lux-gray py-16 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-glass border border-accent rounded-lux shadow-gold-glow p-8">
        <h1 className="font-serif text-4xl text-accent mb-8 text-center">Investor Center</h1>
        
        {/* Investment Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Investment Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-glass border border-accent rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">6-8%</div>
              <div className="text-sm">Monthly Returns</div>
            </div>
            <div className="bg-glass border border-accent rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">$300</div>
              <div className="text-sm">Minimum Investment</div>
            </div>
            <div className="bg-glass border border-accent rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
          </div>
        </section>

        {/* Investment Tiers */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Investment Tiers</h2>
          <div className="space-y-4">
            <div className="bg-glass border border-accent rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-accent">Tier 1</h3>
                  <p className="text-sm">Investment Range: <span className="text-yellow-400">$300 - $2,999</span></p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">6%</div>
                  <div className="text-sm">Monthly Returns</div>
                </div>
              </div>
            </div>
            <div className="bg-glass border border-accent rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-accent">Tier 2</h3>
                  <p className="text-sm">Investment Range: <span className="text-yellow-400">$3,000 - $29,999</span></p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">7%</div>
                  <div className="text-sm">Monthly Returns</div>
                </div>
              </div>
            </div>
            <div className="bg-glass border border-accent rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-accent">Tier 3</h3>
                  <p className="text-sm">Investment Range: <span className="text-yellow-400">$30,000+</span></p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">8%</div>
                  <div className="text-sm">Monthly Returns</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Invest */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">How to Invest</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
              <div>
                <h3 className="font-bold text-accent">Connect Your Wallet</h3>
                <p className="text-sm">Use MetaMask, Trust Wallet, or any Web3 wallet to connect to our platform.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
              <div>
                <h3 className="font-bold text-accent">Choose Investment Amount</h3>
                <p className="text-sm">Select your investment amount starting from <span className="text-yellow-400">$300</span> USDT.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
              <div>
                <h3 className="font-bold text-accent">Confirm Transaction</h3>
                <p className="text-sm">Review and confirm your investment transaction on the blockchain.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-accent text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
              <div>
                <h3 className="font-bold text-accent">Start Earning</h3>
                <p className="text-sm">Begin receiving monthly returns based on your investment tier.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Management */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Risk Management</h2>
          <div className="bg-glass border border-accent rounded-lg p-4">
            <p className="text-sm mb-4">
              Our investment strategy focuses on diversified real estate portfolios with proven track records. 
              We implement strict risk management protocols to protect investor capital while maximizing returns.
            </p>
            <ul className="text-sm space-y-2">
              <li>• Diversified property portfolio across multiple markets</li>
              <li>• Professional property management and maintenance</li>
              <li>• Regular market analysis and portfolio rebalancing</li>
              <li>• Transparent reporting and investor communication</li>
            </ul>
          </div>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-2xl font-bold text-accent mb-4">Investor Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-glass border border-accent rounded-lg p-4">
              <h3 className="font-bold text-accent mb-2">24/7 Support</h3>
              <p className="text-sm">Our dedicated support team is available around the clock to assist with any questions or concerns.</p>
            </div>
            <div className="bg-glass border border-accent rounded-lg p-4">
              <h3 className="font-bold text-accent mb-2">Educational Resources</h3>
              <p className="text-sm">Access comprehensive guides, tutorials, and market insights to make informed investment decisions.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 