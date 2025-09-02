import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/lib/player-context";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import MusicPlayer from "@/components/layout/MusicPlayer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "A modern Spotify UI clone built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlayerProvider>
          <div className="h-screen bg-black overflow-hidden flex">
            {/* Sidebar */}
            <div className="flex-shrink-0">
              <Sidebar />
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
              {/* Top Bar */}
              <TopBar />
              
              {/* Main Content */}
              <main className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
                {children}
              </main>
              
              {/* Music Player */}
              <MusicPlayer />
            </div>
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}