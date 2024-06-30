"use client"

import { Figtree } from "next/font/google";
import "./globals.css";
import Head from "@/components/Head";

const figtree = Figtree({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Head component adds these tags: title tag, meta tags and PWA manifest*/}
      <Head />

      <body className={`${figtree.className} animate__animated animate__fadeIn text-white/70 selection:bg-primary-800 selection:text-white/60`}>
        {children}
      </body>
    </html>
  );
}
