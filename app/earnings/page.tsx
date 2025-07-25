"use client";
import React from "react";
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAccount } from 'wagmi';
import { supabase } from '../../lib/supabaseClient';

export default function EarningsPage() {
  const { address } = useAccount();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [referralIncome, setReferralIncome] = React.useState<number>(0);
  const [investIncome, setInvestIncome] = React.useState<number>(0);
  const [totalIncome, setTotalIncome] = React.useState<number>(0);
  const [totalWithdrawn, setTotalWithdrawn] = React.useState<number>(0);
  const [totalClaimable, setTotalClaimable] = React.useState<number>(0);
  const [claiming, setClaiming] = React.useState(false);
  const [incomeHistory, setIncomeHistory] = React.useState<any[]>([]);
  // Remove investIncome, referralIncome, totalIncome states

  React.useEffect(() => {
    if (!address) return;
    setLoading(true);
    setError(null);
    Promise.all([
      supabase
        .from('users')
        .select('total_income, referral_income, invest_income')
        .eq('address', address.toLowerCase())
        .maybeSingle()
        .then((userRes) => {
          console.log('Supabase user income fields:', userRes);
          return userRes;
        }),
      supabase
        .from('withdrawal')
        .select('amount, type, created_at')
        .eq('address', address.toLowerCase())
    ]).then(([userRes, withdrawalsRes]) => {
      if (userRes.error) {
        setError('Failed to fetch user data.');
        setLoading(false);
        return;
      }
      if (withdrawalsRes.error) {
        setError('Failed to fetch withdrawals.');
        setLoading(false);
        return;
      }
      setReferralIncome(Number(userRes.data?.referral_income) || 0);
      setInvestIncome(Number(userRes.data?.invest_income) || 0);
      setTotalIncome(Number(userRes.data?.total_income) || 0);
      const withdrawals = withdrawalsRes.data || [];
      setTotalWithdrawn(withdrawals
        .filter((w: any) => w.type === 'claim')
        .reduce((sum: number, w: any) => sum + Number(w.amount), 0));
      setTotalClaimable(Number(userRes.data?.invest_income) || 0);
      setIncomeHistory(withdrawals); // show all withdrawals, not just claims
      setLoading(false);
    });
  }, [address]);

  const handleClaim = async () => {
    if (!address || totalClaimable <= 0) return;
    setClaiming(true);
    setError(null);
    // 1. Insert withdrawal record with status 'no' and amount = totalIncome
    const { error: withdrawError } = await supabase.from('withdrawal').insert({
      address: address.toLowerCase(),
      amount: totalIncome,
      type: 'claim',
      status: 'no',
      created_at: new Date().toISOString(),
    });
    if (withdrawError) {
      setError('Failed to claim income: ' + withdrawError.message);
      setClaiming(false);
      return;
    }
    // 2. Zero out total_income, invest_income, referral_income
    const { error: userError } = await supabase.from('users').update({
      total_income: 0,
      invest_income: 0,
      referral_income: 0
    }).eq('address', address.toLowerCase());
    if (userError) {
      setError('Failed to update user income: ' + userError.message);
      setClaiming(false);
      return;
    }
    // 3. Refresh data
    setClaiming(false);
    setLoading(true);
    Promise.all([
      supabase
        .from('users')
        .select('total_income, referral_income, invest_income')
        .eq('address', address.toLowerCase())
        .maybeSingle(),
      supabase
        .from('withdrawal')
        .select('amount, type, created_at')
        .eq('address', address.toLowerCase())
    ]).then(([userRes, withdrawalsRes]) => {
      if (userRes.error) {
        setError('Failed to fetch user data.');
        setLoading(false);
        return;
      }
      if (withdrawalsRes.error) {
        setError('Failed to fetch withdrawals.');
        setLoading(false);
        return;
      }
      setReferralIncome(Number(userRes.data?.referral_income) || 0);
      setInvestIncome(Number(userRes.data?.invest_income) || 0);
      setTotalIncome(Number(userRes.data?.total_income) || 0);
      const withdrawals = withdrawalsRes.data || [];
      setTotalWithdrawn(withdrawals
        .filter((w: any) => w.type === 'claim')
        .reduce((sum: number, w: any) => sum + Number(w.amount), 0));
      setTotalClaimable(Number(userRes.data?.invest_income) || 0);
      setIncomeHistory(withdrawals); // show all withdrawals, not just claims
      setLoading(false);
    });
  };

  // Helper to get next month's first day at 00:00
  function getNextMonthFirstDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    // First day of next month
    return new Date(year, month + 1, 1, 0, 0, 0, 0);
  }

  function getTimeRemaining(target: Date) {
    const now = new Date();
    const total = target.getTime() - now.getTime();
    if (total <= 0) return { days: 0, hours: 0, minutes: 0 };
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { days, hours, minutes };
  }

  const [distributionCountdown, setDistributionCountdown] = React.useState(getTimeRemaining(getNextMonthFirstDate()));
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDistributionCountdown(getTimeRemaining(getNextMonthFirstDate()));
    }, 1000 * 30); // update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-gold-gradient text-gray-dark overflow-x-hidden pb-16 md:pb-0 pt-16">
        <div className="w-full max-w-2xl mx-auto px-2 md:px-0 py-8">
          {/* Returns Overview */}
          <section className="mb-10 bg-gold border border-gold-dark rounded-lux shadow-gold-glow backdrop-blur-lux p-8">
            <h1 className="font-serif text-3xl text-gray-dark mb-6">Your Earnings</h1>
            {/* Income Card */}
            <div className="mb-6 w-full flex justify-center">
              <div className="bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-6 w-full max-w-md text-gray-dark flex flex-col items-center">
                <div className="font-serif text-2xl mb-2">Income</div>
                <div className="text-4xl font-bold mb-2 text-yellow-400">${totalIncome.toFixed(2)} <span className="text-2xl">USDT</span></div>
              </div>
            </div>
            {/* Referral and Invest Income below the card */}
            <div className="flex flex-col gap-2 w-full max-w-md mx-auto text-lg mb-6">
              <div className="flex justify-between w-full"><span>Referral Income:</span><span className="font-bold text-yellow-400">${referralIncome.toFixed(2)} USDT</span></div>
              <div className="flex justify-between w-full"><span>Invest Income:</span><span className="font-bold text-yellow-400">${investIncome.toFixed(2)} USDT</span></div>
            </div>
            {loading ? (
              <div className="mb-4">Loading...</div>
            ) : error ? (
              <div className="mb-4 text-red-600">{error}</div>
            ) : null}
            {/* Next Distribution Countdown */}
            <div className="mb-4 text-gray-dark">Next distribution in: <span className="font-bold">{distributionCountdown.days}d {distributionCountdown.hours}h {distributionCountdown.minutes}m</span></div>
            {/* Claim Button */}
            <button className="w-full bg-gold border border-gold-dark text-gray-dark font-bold py-3 rounded-lux shadow-gold-glow hover:bg-gold-dark hover:text-white transition-all text-xl mb-4" onClick={handleClaim} disabled={claiming || loading || totalClaimable <= 0}>
              {claiming ? 'Claiming...' : 'Claim Monthly Income'}
            </button>
          </section>
          {/* Income History */}
          <section className="mb-10">
            <h2 className="font-serif text-2xl text-gray-dark mb-4">Income History</h2>
            <div className="bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-4 text-gray-dark">
              {incomeHistory.length === 0 ? (
                <div>No income history yet.</div>
              ) : (
                <ul className="space-y-2">
                  {incomeHistory.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{item.created_at ? new Date(item.created_at).toLocaleString() : ''} <span className="italic text-sm">[{item.type}]</span></span>
                      <span className="font-bold">${item.amount}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
} 