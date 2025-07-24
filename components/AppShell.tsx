"use client";
import React from "react";
import { usePathname } from "next/navigation";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNavbars = pathname !== "/" && pathname !== "/privacy-policy";
  return (
    <>
      {showNavbars && <TopNav />}
      {children}
      {showNavbars && <BottomNav />}
    </>
  );
} 