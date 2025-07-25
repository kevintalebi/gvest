"use client";
import React from "react";
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAccount } from 'wagmi';
import { supabase } from '../../lib/supabaseClient';

type UserNode = {
  address: string;
  parent_address: string | null;
  total_invest: number;
};

type ReferralTreeProps = {
  parent: string;
  tree: Record<string, UserNode[]>;
  level?: number;
};

function ReferralTree({ parent, tree, level = 0 }: ReferralTreeProps) {
  if (!tree[parent]) return null;
  return (
    <ul className={`ml-${level * 4}`}> {/* Indent for each level */}
      {tree[parent].map((child: UserNode) => (
        <li key={child.address} className="mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-accent">{child.address}</span>
            <span className="text-sm">Invested: <span className="font-bold text-accent">${child.total_invest}</span></span>
          </div>
          <ReferralTree parent={child.address} tree={tree} level={level + 1} />
        </li>
      ))}
    </ul>
  );
}

function sumInvestRecursive(tree: Record<string, UserNode[]>, parent: string): number {
  if (!tree[parent]) return 0;
  let sum = 0;
  for (const child of tree[parent]) {
    sum += Number(child.total_invest) || 0;
    sum += sumInvestRecursive(tree, child.address);
  }
  return sum;
}

export default function ReferralsPage() {
  const { address } = useAccount();
  const [tree, setTree] = React.useState<Record<string, UserNode[]>>({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [claimStatus, setClaimStatus] = React.useState<string | null>(null);
  const [claimedRewards, setClaimedRewards] = React.useState<{300?: boolean, 3000?: boolean, 30000?: boolean}>({});
  const [claimRefresh, setClaimRefresh] = React.useState(0);
  const normalizedAddress = address ? address.toLowerCase() : '';

  async function handleClaim(amount: number) {
    if (!normalizedAddress) return;
    setClaimStatus('Processing...');
    const { error } = await supabase.from('withdrawal').insert({
      address: normalizedAddress,
      amount,
      type: 'reward',
      status: 'no',
    });
    if (error) {
      setClaimStatus('Error: ' + error.message);
    } else {
      setClaimStatus('Reward claim submitted!');
      setClaimRefresh(r => r + 1);
    }
  }

  React.useEffect(() => {
    if (!address) return;
    setLoading(true);
    setError(null);
    // Fetch all users where parent_address is not null
    supabase
      .from('users')
      .select('address,parent_address,total_invest')
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }
        // Build tree: parent_address -> [children], all lowercase
        const tree: Record<string, UserNode[]> = {};
        for (const user of data as UserNode[]) {
          if (!user.parent_address) continue;
          const parent = user.parent_address.toLowerCase();
          const child = { ...user, address: user.address.toLowerCase(), parent_address: parent };
          if (!tree[parent]) tree[parent] = [];
          tree[parent].push(child);
        }
        setTree(tree);
        setLoading(false);
      });
  }, [address]);

  React.useEffect(() => {
    if (!normalizedAddress) return;
    // Check for previous claims
    supabase
      .from('withdrawal')
      .select('amount, address, type')
      .ilike('address', normalizedAddress)
      .eq('type', 'reward')
      .then(({ data, error }) => {
        console.log('Withdrawals for address', normalizedAddress, data);
        if (error) return;
        const claimed: {300?: boolean, 3000?: boolean, 30000?: boolean} = {};
        for (const row of data || []) {
          let amt = row.amount;
          let addr = row.address;
          console.log('Comparing row:', {addr, amt, type: row.type});
          if (typeof amt === 'string') {
            amt = amt.trim();
            if (/^\d+(\.\d+)?$/.test(amt)) {
              amt = parseFloat(amt);
            } else {
              continue;
            }
          }
          if (typeof amt === 'number' && addr && typeof addr === 'string') {
            const addrMatch = addr.toLowerCase() === normalizedAddress;
            if (addrMatch && Math.abs(amt - 300) < 0.01) claimed[300] = true;
            if (addrMatch && Math.abs(amt - 3000) < 0.01) claimed[3000] = true;
            if (addrMatch && Math.abs(amt - 30000) < 0.01) claimed[30000] = true;
          }
        }
        setClaimedRewards(claimed);
      });
  }, [normalizedAddress, claimRefresh]);

  let totalVolume = 0;
  if (normalizedAddress && tree[normalizedAddress]) {
    totalVolume = sumInvestRecursive(tree, normalizedAddress);
  }

  let directChildren: UserNode[] = [];
  if (normalizedAddress && tree[normalizedAddress]) {
    directChildren = tree[normalizedAddress];
  }

  function getSubtreeInvest(addr: string): number {
    return (tree[addr]?.reduce((sum, child) => sum + Number(child.total_invest || 0) + getSubtreeInvest(child.address), 0) || 0);
  }

  function countDescendants(addr: string): number {
    if (!tree[addr]) return 0;
    let count = tree[addr].length;
    for (const child of tree[addr]) {
      count += countDescendants(child.address);
    }
    return count;
  }

  // Helper to collect all descendants recursively with their level
  function getAllDescendantsWithLevel(addr: string, level = 1): Array<UserNode & { level: number }> {
    let result: Array<UserNode & { level: number }> = [];
    if (!tree[addr]) return result;
    for (const child of tree[addr]) {
      result.push({ ...child, level });
      result = result.concat(getAllDescendantsWithLevel(child.address, level + 1));
    }
    return result;
  }

  const allDescendants = normalizedAddress ? getAllDescendantsWithLevel(normalizedAddress).filter(ref => ref.level <= 3) : [];

  const totalReferrals = normalizedAddress ? countDescendants(normalizedAddress) : 0;

  // Calculate number of direct referrals with volume strictly above thresholds
  const directReferralVolumes = directChildren.map(child => Number(child.total_invest) + getSubtreeInvest(child.address));
  const qualifying300 = directReferralVolumes.filter(vol => vol > 3000).length;
  const qualifying3000 = directReferralVolumes.filter(vol => vol > 30000).length;
  const qualifying30000 = directReferralVolumes.filter(vol => vol > 300000).length;
  const showClaim300 = qualifying300 >= 3;
  const showClaim3000 = qualifying3000 >= 3;
  const showClaim30000 = qualifying30000 >= 3;

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-gold-gradient text-lux-gray overflow-x-hidden pb-16 md:pb-0 pt-16">
        <div className="w-full max-w-2xl mx-auto px-4 md:px-0 py-8">
          {/* Personal Referral Code */}
          <section className="mb-10 bg-glass border border-accent rounded-lux shadow-gold-glow backdrop-blur-lux p-4 md:p-8 w-full flex flex-col items-center justify-center">
            <div className="text-4xl font-serif font-bold text-accent mb-4 text-center">Total Referrals</div>
            <div className="text-6xl font-extrabold text-yellow-400 mb-2 drop-shadow-lg text-center">{totalReferrals}</div>
            <div className="text-lg text-lux-gray text-center">across your entire network</div>
          </section>
          {/* Referral Tree */}
          <section className="mb-10 w-full">
            <div className="bg-glass border border-accent rounded-lux shadow-gold-glow p-4 md:p-8 w-full">
              <h2 className="font-serif text-2xl text-accent mb-4">Your Referral Network</h2>
              {loading && <div>Loading referral network...</div>}
              {error && <div className="text-red-500">Error: {error}</div>}
              {!loading && !error && (
                <>
                  <div className="mb-2 break-all">Address: <span className="font-mono text-accent break-all">{normalizedAddress}</span></div>
                  <div className="mb-2 font-semibold">Referral Volumes:</div>
                  <ul className="ml-2 md:ml-4">
                    {directChildren.length === 0 && <li>No direct referrals.</li>}
                    {directChildren.map(child => (
                      <li key={child.address} className="mb-2 break-all">
                        <span className="font-mono text-accent break-all">{child.address}</span>: 
                        <span className="ml-2 text-yellow-400">${Number(child.total_invest) + getSubtreeInvest(child.address)}</span>
                      </li>
                    ))}
                  </ul>
                  {showClaim300 && !claimedRewards[300] && (
                    <button onClick={() => handleClaim(300)} className="mt-6 w-full bg-gold-gradient text-primary font-bold py-3 rounded-lux shadow-gold-glow hover:scale-105 transition-all text-xl">Claim Reward <span className="text-yellow-400">$300</span></button>
                  )}
                  {showClaim3000 && !claimedRewards[3000] && (
                    <button onClick={() => handleClaim(3000)} className="mt-4 w-full bg-gold-gradient text-primary font-bold py-3 rounded-lux shadow-gold-glow hover:scale-105 transition-all text-xl">Claim Reward <span className="text-yellow-400">$3,000</span></button>
                  )}
                  {showClaim30000 && !claimedRewards[30000] && (
                    <button onClick={() => handleClaim(30000)} className="mt-4 w-full bg-gold-gradient text-primary font-bold py-3 rounded-lux shadow-gold-glow hover:scale-105 transition-all text-xl">Claim Reward <span className="text-yellow-400">$30,000</span></button>
                  )}
                  {claimStatus && <div className="mt-4 text-center text-accent font-semibold">{claimStatus}</div>}
                </>
              )}
            </div>
          </section>
          {/* Referral Investment History */}
          <section className="mb-10 w-full">
            <h2 className="font-serif text-2xl text-accent mb-4">Referral List</h2>
            <div className="bg-glass border border-accent rounded-lux shadow-gold-glow p-4 w-full">
              {allDescendants.length === 0 ? (
                <div>No referrals yet.</div>
              ) : (
                <ul className="space-y-2">
                  {allDescendants.map(ref => (
                    <li key={ref.address} className="flex flex-col sm:flex-row sm:items-center justify-between break-all">
                      <span className="font-mono text-accent break-all">{ref.address}</span>
                      <span className="ml-2">Level: {ref.level}</span>
                      <span className="ml-2">${ref.total_invest}</span>
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