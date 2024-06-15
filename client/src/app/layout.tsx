import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/core/Navbar";
import { ready } from "@/actions";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import dbConnect from "@/lib/db";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cashflow",
  description: "Organize your finances with Cashflow",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();
  ready();
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(dmsans.className, "w-screen h-screen bg-light-100")}
        >
          <div className="main flex flex-col w-full h-full max-w-[1200px] mx-auto text-dark-default">
            <ClerkLoaded>
              <Navbar />
              {children}
            </ClerkLoaded>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
