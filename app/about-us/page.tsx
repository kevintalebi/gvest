import React from "react";

export default function AboutUs() {
  return (
    <main className="bg-gold-gradient min-h-screen text-lux-gray py-16 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-glass border border-accent rounded-lux shadow-gold-glow p-8">
        <h1 className="font-serif text-4xl text-accent mb-8 text-center">About Us</h1>
        
        {/* Company Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Our Story</h2>
          <p className="text-sm leading-relaxed mb-4">
            GoodmanVest was founded with a vision to democratize access to premium real estate investments through blockchain technology. 
            We believe that everyone should have the opportunity to invest in high-quality properties and earn consistent returns, 
            regardless of their initial capital.
          </p>
          <p className="text-sm leading-relaxed">
            Since our inception, we have built a reputation for transparency, reliability, and exceptional returns. 
            Our platform combines traditional real estate expertise with cutting-edge blockchain technology to create 
            a seamless investment experience for our global community of investors.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-glass border border-accent rounded-lg p-4">
              <h3 className="font-bold text-accent mb-2">Our Mission</h3>
              <p className="text-sm">
                To provide accessible, transparent, and profitable real estate investment opportunities 
                to investors worldwide through innovative blockchain solutions.
              </p>
            </div>
            <div className="bg-glass border border-accent rounded-lg p-4">
              <h3 className="font-bold text-accent mb-2">Our Vision</h3>
              <p className="text-sm">
                To become the leading platform for fractional real estate ownership, 
                making premium property investments accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-glass border border-accent rounded-lg p-4 text-center">
              <h3 className="font-bold text-accent mb-2">Transparency</h3>
              <p className="text-sm">Complete transparency in all our operations, from property selection to financial reporting.</p>
            </div>
            <div className="bg-glass border border-accent rounded-lg p-4 text-center">
              <h3 className="font-bold text-accent mb-2">Security</h3>
              <p className="text-sm">Advanced blockchain technology ensures the highest level of security for all transactions.</p>
            </div>
            <div className="bg-glass border border-accent rounded-lg p-4 text-center">
              <h3 className="font-bold text-accent mb-2">Innovation</h3>
              <p className="text-sm">Continuously innovating to provide the best investment opportunities and user experience.</p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-glass border border-accent rounded-lg p-4">
              <h3 className="font-bold text-accent mb-2">Real Estate Experts</h3>
              <p className="text-sm mb-2">
                Our team includes seasoned real estate professionals with decades of experience in:
              </p>
              <ul className="text-sm space-y-1">
                <li>• Property acquisition and management</li>
                <li>• Market analysis and due diligence</li>
                <li>• Portfolio optimization</li>
                <li>• Risk management</li>
              </ul>
            </div>
            <div className="bg-glass border border-accent rounded-lg p-4">
              <h3 className="font-bold text-accent mb-2">Technology Specialists</h3>
              <p className="text-sm mb-2">
                Our technical team brings expertise in:
              </p>
              <ul className="text-sm space-y-1">
                <li>• Blockchain development</li>
                <li>• Smart contract security</li>
                <li>• Web3 integration</li>
                <li>• Platform optimization</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-accent mb-4">Key Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-glass border border-accent rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-2">$50M+</div>
              <div className="text-sm">Total Assets Under Management</div>
            </div>
            <div className="bg-glass border border-accent rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-2">10,000+</div>
              <div className="text-sm">Active Investors</div>
            </div>
            <div className="bg-glass border border-accent rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-2">25+</div>
              <div className="text-sm">Premium Properties</div>
            </div>
          </div>
        </section>

        {/* Partnerships */}
        <section>
          <h2 className="text-2xl font-bold text-accent mb-4">Strategic Partnerships</h2>
          <p className="text-sm leading-relaxed mb-4">
            We have established strong partnerships with leading companies in the blockchain and real estate industries 
            to ensure the highest quality of service and security for our investors.
          </p>
          <div className="bg-glass border border-accent rounded-lg p-4">
            <h3 className="font-bold text-accent mb-2">Our Partners Include:</h3>
            <ul className="text-sm space-y-1">
              <li>• Leading blockchain infrastructure providers</li>
              <li>• Premium real estate developers</li>
              <li>• Professional property management companies</li>
              <li>• Financial institutions and auditors</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
} 