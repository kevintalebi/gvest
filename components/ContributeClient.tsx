"use client";
import React, { useState, useEffect } from "react";
import ProtectedRoute from './ProtectedRoute';
import { useAccount, useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import { supabase } from '../lib/supabaseClient';

const USDT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
const USDT_ABI = [
  {
    "constant": false,
    "inputs": [
      { "name": "_to", "type": "address" },
      { "name": "_value", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "name": "", "type": "bool" }],
    "type": "function"
  }
];

const ADMIN_WALLET = process.env.NEXT_PUBLIC_ADMIN_WALLET;

export default function ContributeClient() {
  const [amount, setAmount] = useState("");
  const [referral, setReferral] = useState("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const parsedAmount = parseFloat(amount) || 0;
  
  // Calculate monthly returns based on tiered percentages
  const getMonthlyReturnRate = (amount: number) => {
    if (amount >= 0 && amount <= 2999) return 0.06; // 6%
    if (amount >= 3000 && amount <= 30000) return 0.07; // 7%
    if (amount > 30000) return 0.08; // 8%
    return 0.06; // Default 6%
  };
  
  const monthlyReturnRate = getMonthlyReturnRate(parsedAmount);
  const monthlyReturns = parsedAmount * monthlyReturnRate;
  const total = parsedAmount + 0.5;
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [pendingTransaction, setPendingTransaction] = useState<{amount: number, referral: string} | null>(null);
  const [hasParent, setHasParent] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  const { address, isConnected } = useAccount();
  const { writeContract, isPending, isSuccess, data, error } = useWriteContract();

  // Fetch user's transactions
  useEffect(() => {
    if (address) {
      fetchTransactions();
    }
  }, [address]);

  useEffect(() => {
    if (!address) return;
    // Check if user already has a parent_address
    (async () => {
      const { data: user } = await supabase
        .from('users')
        .select('parent_address')
        .eq('address', address.toLowerCase())
        .maybeSingle();
      if (user && user.parent_address) setHasParent(true);
      else setHasParent(false);
    })();
  }, [address]);

  const fetchTransactions = async () => {
    if (!address) return;
    try {
      setLoadingTransactions(true);
      console.log('Querying transactions for address:', address);
      const { data: txData, error } = await supabase
        .from('transactions')
        .select('*')
        .ilike('address', address.toLowerCase())
        .order('created_at', { ascending: false });
      console.log('Raw transactions data from backend:', txData);
      console.log('Transactions returned:', txData);
      if (error) {
        console.error('Error fetching transactions:', error);
      } else {
        setTransactions(txData || []);
      }
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoadingTransactions(false);
    }
  };

  // Watch for successful transactions and update database
  useEffect(() => {
    if (isSuccess && data && pendingTransaction) {
      console.log('Transaction successful, updating database...');
      updateDatabase(data, pendingTransaction.amount, pendingTransaction.referral);
      setPendingTransaction(null);
    }
  }, [isSuccess, data, pendingTransaction]);

  const updateDatabase = async (txHash: string, amount: number, referral: string) => {
    if (!address) return;
    
    console.log('Starting database operations...');
    
    try {
      // Insert transaction record first
      const transactionData = {
        address: address.toLowerCase(),
        amount: amount.toString(),
        txid: txHash
      };
      
      console.log('Inserting transaction data:', transactionData);
      const transactionResult = await supabase
        .from('transactions')
        .insert(transactionData);
      
      if (transactionResult.error) {
        console.error('Transaction insert error:', transactionResult.error);
        setTxStatus(`Transaction insert failed: ${transactionResult.error.message}`);
        return;
      }
      
      console.log('Transaction data inserted successfully:', transactionResult);
      
      // Refresh transactions list
      await fetchTransactions();
      
      // Now update user data
      const { data: existingUser } = await supabase
        .from('users')
        .select('total_invest, monthly_income')
        .eq('address', address.toLowerCase())
        .maybeSingle();
      
      const currentTotalInvest = Number(existingUser?.total_invest) || 0;
      const currentMonthlyIncome = Number(existingUser?.monthly_income) || 0;
      const newTotalInvest = currentTotalInvest + amount;
      const transactionReturnRate = getMonthlyReturnRate(amount);
      const newMonthlyIncome = currentMonthlyIncome + (amount * transactionReturnRate);
      
      console.log('Current values:', { currentTotalInvest, currentMonthlyIncome });
      console.log('New values:', { newTotalInvest, newMonthlyIncome });
      
      // Update or insert user data
      const userData: any = {
        address: address.toLowerCase(),
        total_invest: newTotalInvest,
        monthly_income: newMonthlyIncome
      };
      
      if (referral) {
        userData.parent_address = referral.toLowerCase();
      }
      
      console.log('Upserting user data:', userData);
      const userResult = await supabase
        .from('users')
        .upsert(userData, { onConflict: 'address' });
      
      if (userResult.error) {
        console.error('User upsert error:', userResult.error);
        setTxStatus(`User update failed: ${userResult.error.message}`);
        return;
      }
      
      console.log('User data updated successfully:', userResult);
      setTxStatus('Success! Transaction completed and database updated.');
      
    } catch (dbError: any) {
      console.error('Database operation failed:', dbError);
      setTxStatus(`Database error: ${dbError.message}`);
    }
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const num = parseFloat(value);
    if (value === "") {
      setInputError(null);
    } else if (isNaN(num) || num < 300) {
      setInputError("Minimum amount is 300 USDT.");
    } else {
      setInputError(null);
    }
  };

  const handleInvest = async () => {
    if (!isConnected) {
      setTxStatus('Please connect your wallet.');
      return;
    }
    if (!amount || parsedAmount < 300) {
      setInputError('Minimum amount is 300 USDT.');
      return;
    }
    if (!ADMIN_WALLET) {
      setTxStatus('Admin wallet address not set.');
      return;
    }
    
    setTxStatus('Processing transaction...');
    
    try {
      // Store pending transaction data
      setPendingTransaction({ amount: parsedAmount, referral });
      
      // In wagmi v2, writeContract returns void, we need to use the data from the hook
      await writeContract({
        address: USDT_ADDRESS,
        abi: USDT_ABI,
        functionName: 'transfer',
        args: [ADMIN_WALLET, parseUnits(amount, 6)],
      });
      
      setTxStatus('Transaction sent! Waiting for confirmation...');
      
    } catch (err: any) {
      console.error('Transaction failed:', err);
      setTxStatus('Transaction failed: ' + (err?.message || err));
      setPendingTransaction(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-gold-gradient text-gray-dark overflow-x-hidden pb-16 md:pb-0 pt-16">
        <div className="w-full max-w-2xl mx-auto px-2 md:px-0 py-8">
          <section className="mb-10 bg-gold border border-gold-dark rounded-lux shadow-gold-glow backdrop-blur-lux p-8 w-full">
            <h1 className="font-serif text-4xl text-gray-dark mb-4">Invest in Real Estate Fund</h1>
            <p className="text-lg text-gray-dark mb-6">Contribute USDT to our diversified property portfolio and start earning <span className="font-bold text-yellow-400">{(monthlyReturnRate * 100).toFixed(0)}% monthly returns</span>.</p>
            {/* Investment Amount Input */}
            <div className="mb-6 w-full">
              <label className="block text-gray-dark font-semibold mb-2">Investment Amount (USDT)</label>
              <div className="flex gap-2 mb-2 w-full flex-wrap">
                {[300,3000,30000].map(val => (
                  <button
                    key={val}
                    className="flex-1 min-w-[70px] bg-gold-gradient text-gray-dark font-bold px-2 py-2 rounded shadow border border-gold-dark hover:bg-gold-dark hover:text-white transition-all"
                    onClick={() => handleAmountChange(val.toString())}
                    type="button"
                  >
                    <span className="text-yellow-400">${val}</span>
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="300"
                placeholder="Enter amount (min $300)"
                className="w-full h-12 px-4 rounded border border-gold-dark bg-gold-gradient text-gray-dark focus:ring-2 focus:ring-gold-dark"
                value={amount}
                onChange={e => handleAmountChange(e.target.value)}
              />
              {inputError && (
                <div className="text-red-700 text-sm mt-1">{inputError}</div>
              )}
            </div>
            {/* Referral Code Field */}
            {!hasParent && (
              <div className="mb-6 w-full">
                <label className="block text-gray-dark font-semibold mb-2">Referral Code (optional)</label>
                <input
                  type="text"
                  placeholder="Referrer's wallet address"
                  className="w-full h-12 px-4 rounded border border-gold-dark bg-gold-gradient text-gray-dark focus:ring-2 focus:ring-gold-dark"
                  value={referral}
                  onChange={e => setReferral(e.target.value)}
                />
              </div>
            )}
            {/* Investment Summary */}
            <div className="mb-6 bg-gold-dark/80 rounded p-4 border border-gold-dark w-full text-gray-dark">
              <div className="flex justify-between mb-2"><span>Investment:</span><span className="font-bold text-yellow-400">${parsedAmount} USDT</span></div>
              <div className="flex justify-between mb-2"><span>Est. Monthly Returns:</span><span className="font-bold text-yellow-400">${monthlyReturns.toFixed(2)} USDT</span></div>
            </div>
            {/* Invest Button */}
            <button
              className="w-full bg-gold-gradient text-gray-dark font-bold py-3 rounded-lux shadow-gold-glow hover:bg-gold-dark hover:text-white transition-all text-xl mb-4"
              onClick={handleInvest}
              disabled={isPending}
            >
              {isPending ? 'Processing...' : 'Invest Now'}
            </button>
            {/* Transaction Status */}
            {txStatus && <div className="text-center text-gray-dark text-sm mb-2">{txStatus}</div>}
            {isSuccess && data && (
              <div className="text-center text-green-700 text-sm">Transaction sent! <a href={`https://polygonscan.com/tx/${data}`} target="_blank" rel="noopener noreferrer" className="underline">View on Polygonscan</a></div>
            )}
            {error && (
              <div className="text-center text-red-700 text-sm">Error: {error.message}</div>
            )}
          </section>
          {/* Transaction List */}
          <section className="mb-10 bg-gold border border-gold-dark rounded-lux shadow-gold-glow p-6 w-full">
            <h2 className="font-serif text-2xl text-gray-dark mb-4">Your Investment History</h2>
            {loadingTransactions ? (
              <div>Loading transactions...</div>
            ) : transactions.length === 0 ? (
              <div>No investments yet.</div>
            ) : (
              <ul className="space-y-2">
                {transactions.map((tx, index) => (
                  <li key={index} className="flex flex-col md:flex-row md:items-center justify-between bg-gold-dark/20 rounded p-2">
                    <span className="font-mono text-gray-dark break-all">{tx.created_at ? new Date(tx.created_at).toLocaleString() : ''}</span>
                    <span className="ml-2 font-bold text-yellow-400">${tx.amount} USDT</span>
                    {tx.txid && (
                      <a href={`https://polygonscan.com/tx/${tx.txid}`} target="_blank" rel="noopener noreferrer" className="underline text-sm ml-2">View on Polygonscan</a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </ProtectedRoute>
  );
} 