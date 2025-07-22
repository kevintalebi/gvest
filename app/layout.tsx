import "./globals.css";
import Providers from "../components/Providers";
import ProgressBar from "../components/ProgressBar";

export const metadata = {
  title: "Goodmanvest - Real Estate Investment",
  description: "Goodmanvest - Real Estate Investment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProgressBar />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
