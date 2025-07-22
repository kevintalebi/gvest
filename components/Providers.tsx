"use client";
import WalletProvider from "./WalletProvider";
import AppShell from "./AppShell";
import { useAccount } from 'wagmi';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import React from 'react';

function RoleRedirectOnConnect() {
  const { isConnected, address } = useAccount();
  const pathname = usePathname();
  const router = useRouter();
  React.useEffect(() => {
    console.log('RoleRedirectOnConnect useEffect running', { isConnected, address, pathname });
    if (pathname !== '/') return;
    if (!isConnected || !address) return;
    const addressLower = address.toLowerCase();
    console.log('Querying Supabase for address:', addressLower);
    (async () => {
      // Check if user exists
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('address', addressLower)
        .maybeSingle();

      if (!user && !userError) {
        // Insert new user with default role 'normal'
        const { error: insertError } = await supabase
          .from('users')
          .insert({ address: addressLower, role: 'normal' });
        if (insertError) {
          console.log('Error inserting new user:', insertError);
        } else {
          console.log('Inserted new user:', addressLower);
        }
      }

      // Now check role and redirect
      const response = await supabase
        .from('users')
        .select('role')
        .eq('address', addressLower)
        .maybeSingle();
      console.log('Raw Supabase response:', response);
      const { data, error } = response;
      if (data === undefined) console.log('Supabase data is undefined');
      if (data === null) console.log('Supabase data is null');
      console.log('RoleRedirectOnConnect Supabase query:', { error, data });
      if (error || !data) return;
      console.log('User role:', data.role);
      if (data.role === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/dashboard');
      }
    })();
  }, [isConnected, address, pathname, router]);
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <RoleRedirectOnConnect />
      <AppShell>
        {children}
      </AppShell>
    </WalletProvider>
  );
} 