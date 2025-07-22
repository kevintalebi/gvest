"use client";
import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig, createConfig, http } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
});

export default function WalletProvider({ children }: { children: ReactNode }) {
  // Detect mobile device
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(/Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent));
    }
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#FFD700',
            accentColorForeground: 'black',
          })}
        >
          {/* Mobile wallet connection instructions */}
          {isMobile && (
            <div className="w-full text-center bg-yellow-100 text-yellow-900 font-semibold py-2 px-4 rounded mb-4">
              On mobile, use <b>WalletConnect</b> to connect your wallet.<br />
              If you are in the MetaMask or Trust Wallet app, open this site in the app’s built-in browser for the best experience.
            </div>
          )}
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
} 