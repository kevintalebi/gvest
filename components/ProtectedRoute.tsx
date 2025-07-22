"use client";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);

  if (!isConnected) return null;
  return <>{children}</>;
}

export function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null);
  React.useEffect(() => {
    if (!isConnected) {
      router.replace("/");
      return;
    }
    if (address) {
      (async () => {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('address', address.toLowerCase())
          .maybeSingle();
        console.log('AdminProtectedRoute Supabase query:', { error, data });
        if (error || !data || data.role !== 'admin') {
          setIsAdmin(false);
          router.replace("/dashboard");
        } else {
          setIsAdmin(true);
        }
      })();
    }
  }, [isConnected, address, router]);
  if (!isConnected || isAdmin === false) return null;
  if (isAdmin === null) return <div>Checking admin access...</div>;
  return <>{children}</>;
} 