import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillSnap — Decentralized Skill Directory",
  description:
    "Show your skill. Make your mark. A simple Web3 skill directory on Botchain Testnet.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-charcoal-950 text-gray-100`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

