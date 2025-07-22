"use client";

import React, { useEffect, useState } from "react";
import { AdminProtectedRoute } from "../../components/ProtectedRoute";
import { supabase } from "../../lib/supabaseClient";

export default function AdminPage() {
  const [deposits, setDeposits] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      supabase.from("transactions").select("*"),
      supabase.from("withdrawal").select("*")
    ]).then(([depositsRes, withdrawalsRes]) => {
      setDeposits(depositsRes.data || []);
      setWithdrawals(withdrawalsRes.data || []);
      setLoading(false);
    });
  }, []);

  const totalDeposit = deposits.reduce((sum, d) => sum + Number(d.amount || 0), 0);
  const totalWithdrawal = withdrawals.reduce((sum, w) => sum + Number(w.amount || 0), 0);

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen w-full bg-gold-gradient text-gray-dark overflow-x-hidden pb-16 pt-16">
        <div className="w-full max-w-5xl mx-auto px-2 py-8">
          <h1 className="font-serif text-4xl mb-8">Admin Panel</h1>
          {/* Summary Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-6 flex flex-col items-center">
              <div className="font-serif text-xl mb-2">Total Deposit</div>
              <div className="text-3xl font-bold">${totalDeposit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT</div>
            </div>
            <div className="bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-6 flex flex-col items-center">
              <div className="font-serif text-xl mb-2">Total Withdrawal</div>
              <div className="text-3xl font-bold">${totalWithdrawal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT</div>
            </div>
          </div>
          <section className="mb-10 bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-6 w-full">
            <h2 className="font-serif text-2xl mb-4">Deposits</h2>
            <div className="overflow-x-auto">
              {loading ? <div>Loading...</div> : (
                <ul className="space-y-2 min-w-[320px]">
                  {deposits.length === 0 ? <li>No deposits found.</li> : deposits.map((d, i) => (
                    <li key={i} className="flex flex-col md:flex-row md:items-center justify-between bg-gold-dark/20 rounded p-2 break-all">
                      <span className="font-mono break-all">{d.created_at ? new Date(d.created_at).toLocaleString() : ''}</span>
                      <span className="ml-2 break-all">{d.address}</span>
                      <span className="ml-2 font-bold">${d.amount} USDT</span>
                      {d.txid && <a href={`https://polygonscan.com/tx/${d.txid}`} target="_blank" rel="noopener noreferrer" className="underline text-sm ml-2 break-all">View Tx</a>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
          <section className="mb-10 bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-6 w-full">
            <h2 className="font-serif text-2xl mb-4">Withdrawals</h2>
            <div className="overflow-x-auto">
              {loading ? <div>Loading...</div> : (
                <ul className="space-y-2 min-w-[320px]">
                  {withdrawals.length === 0 ? <li>No withdrawals found.</li> : withdrawals.map((w, i) => (
                    <li key={i} className="flex flex-col md:flex-row md:items-center justify-between bg-gold-dark/20 rounded p-2 break-all">
                      <span className="font-mono break-all">{w.created_at ? new Date(w.created_at).toLocaleString() : ''}</span>
                      <span className="ml-2 break-all">{w.address}</span>
                      <span className="ml-2 font-bold">${w.amount} USDT</span>
                      <span className="ml-2 break-all">{w.type}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </AdminProtectedRoute>
  );
} 