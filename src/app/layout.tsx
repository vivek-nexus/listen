"use client"

import { Figtree } from "next/font/google"
import "animate.css";
import "./globals.css"
import Head from "@/components/Head"
import { useIsPwaInstallable } from "@/helpers/handlePwaLifeCycle/useIsPwaInstallable";

const figtree = Figtree({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  useIsPwaInstallable()

  return (
    <html lang="en">
      {/* Head component adds: title tag, meta tags and PWA manifest*/}
      <Head />

      <body className={`${figtree.className} animate__animated animate__fadeIn bg-black text-white/70 selection:bg-primary-800 selection:text-white/60`}>
        {children}
      </body>
    </html>
  )
}
