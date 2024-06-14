import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/core/Navbar";
import { ready } from "@/actions";
import { ClerkProvider } from "@clerk/nextjs";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cashflow",
  description: "Organize your finances with Cashflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ready();
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(dmsans.className, "w-screen h-screen bg-light-100")}
        >
          <div className="main flex flex-col w-full h-full max-w-[1200px] mx-auto text-dark-default">
            <Navbar />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
