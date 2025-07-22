"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from 'wagmi';
import { supabase } from '../../lib/supabaseClient';
import ProtectedRoute from '../../components/ProtectedRoute';
import CountdownTimer from '../../components/CountdownTimer';

function countDescendants(tree: Record<string, any[]>, addr: string): number {
  if (!tree[addr]) return 0;
  let count = tree[addr].length;
  for (const child of tree[addr]) {
    count += countDescendants(tree, child.address);
  }
  return count;
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { address } = useAccount();
  const [totalInvestment, setTotalInvestment] = useState<number | null>(null);
  const [totalWithdrawal, setTotalWithdrawal] = useState<number | null>(null);
  const [totalReferrals, setTotalReferrals] = useState<number>(0);
  const [monthlyIncome, setMonthlyIncome] = useState<number | null>(null);
  const [lastTransaction, setLastTransaction] = useState<any | null>(null);
  const [income, setIncome] = useState<number | null>(null);
  const [totalIncome, setTotalIncome] = useState<number | null>(null);
  const [referralIncome, setReferralIncome] = useState<number | null>(null);
  const [investIncome, setInvestIncome] = useState<number | null>(null);
  const status = totalInvestment != null && totalInvestment > 0 ? 'Active' : 'Not Active';

  function formatAddress(addr: string) {
    if (!addr) return '';
    return addr.slice(0, 6) + '...' + addr.slice(-4);
  }

  useEffect(() => {
    if (!address) return;
    // Fetch user data and last transaction
    const fetchData = async () => {
      // Get total_invest, total_withdrawal, monthly_income, total_income, referral_income, invest_income for this user
      const { data: userData } = await supabase
        .from('users')
        .select('total_invest, total_withdrawal, monthly_income, total_income, referral_income, invest_income')
        .eq('address', address.toLowerCase())
        .maybeSingle();
      setTotalInvestment(userData?.total_invest ?? null);
      setTotalWithdrawal(userData?.total_withdrawal ?? null);
      setMonthlyIncome(userData?.monthly_income ?? null);
      setTotalIncome(userData?.total_income ?? null);
      setReferralIncome(userData?.referral_income ?? null);
      setInvestIncome(userData?.invest_income ?? null);
      // Fetch all users for referral tree
      const { data: allUsers } = await supabase
        .from('users')
        .select('address,parent_address');
      const tree: Record<string, any[]> = {};
      for (const user of allUsers || []) {
        if (!user.parent_address) continue;
        const parent = user.parent_address.toLowerCase();
        const child = { ...user, address: user.address.toLowerCase(), parent_address: parent };
        if (!tree[parent]) tree[parent] = [];
        tree[parent].push(child);
      }
      const normalizedAddress = address.toLowerCase();
      setTotalReferrals(countDescendants(tree, normalizedAddress));
      // Fetch last transaction
      const { data: txData, error } = await supabase
        .from('transactions')
        .select('*')
        .ilike('address', address.toLowerCase())
        .order('created_at', { ascending: false })
        .limit(1);
      if (!error && txData && txData.length > 0) {
        setLastTransaction(txData[0]);
      } else {
        setLastTransaction(null);
      }
    };
    fetchData();
  }, [address]);

  if (!mounted) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-gold-gradient text-gray-dark overflow-x-hidden pb-16 md:pb-0 pt-16">
        <div className="w-full max-w-5xl mx-auto px-2 md:px-0 py-8">
          {/* Welcome Header */}
          <section className="mb-10 w-full">
            <h1 className="font-serif text-4xl text-gray-dark mb-2">Welcome, Investor</h1>
            <p className="text-gray-dark">Your wallet: <span className="font-mono font-bold">{address ? formatAddress(address) : 'Not Connected'}</span></p>
            <p className="text-gray-dark">Status: <span className="font-bold">{status}</span></p>
          </section>
          {/* Countdown Timer */}
          {lastTransaction && lastTransaction.created_at && (
            <div className="mb-10 flex flex-col md:flex-row justify-center gap-4">
              <CountdownTimer startDate={lastTransaction.created_at} />
            </div>
          )}
          {/* Investment Stats Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-x-8 md:gap-y-8 mb-10 w-full">
            <div className="bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-4 w-full text-gray-dark">
              <div className="mb-1">Total Investment</div>
              <div className="text-2xl font-bold">{totalInvestment !== null ? `$${totalInvestment} USDT` : '—'}</div>
            </div>
            <div className="bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-4 w-full text-gray-dark">
              <div className="mb-1">Total Withdrawal</div>
              <div className="text-2xl font-bold">{totalWithdrawal !== null ? `$${totalWithdrawal} USDT` : '—'}</div>
            </div>
            <div className="bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-4 w-full text-gray-dark">
              <div className="mb-1">Monthly Returns</div>
              <div className="text-2xl font-bold">{monthlyIncome !== null ? `$${Number(monthlyIncome).toFixed(4)} USDT` : '—'}</div>
            </div>
            <div className="bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-4 w-full text-gray-dark">
              <div className="mb-1">Total Income</div>
              <div className="text-2xl font-bold">{totalIncome !== null ? `$${totalIncome} USDT` : '—'}</div>
            </div>
            <div className="bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-4 w-full text-gray-dark">
              <div className="mb-1">Referral Income</div>
              <div className="text-2xl font-bold">{referralIncome !== null ? `$${referralIncome} USDT` : '—'}</div>
            </div>
            <div className="bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-4 w-full text-gray-dark">
              <div className="mb-1">Invest Income</div>
              <div className="text-2xl font-bold">{investIncome !== null ? `$${investIncome} USDT` : '—'}</div>
            </div>
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
} 