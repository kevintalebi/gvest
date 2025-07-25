"use client";
import React from "react";
import { usePathname } from "next/navigation";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import PublicNav from "./PublicNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const publicRoutes = ["/", "/privacy-policy", "/investor-center", "/about-us", "/news"];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  return (
    <>
      {isPublicRoute ? (
        <>
          <PublicNav />
          {children}
        </>
      ) : (
        <>
          <TopNav />
          {children}
          <BottomNav />
        </>
      )}
    </>
  );
} 