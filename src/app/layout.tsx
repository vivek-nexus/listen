"use client"

import { Figtree } from "next/font/google"
import "animate.css";
import "./globals.css"
import 'material-icons/iconfont/filled.css'
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

      <body
        className={`${figtree.className} animate__animated animate__fadeIn bg-black bg-[length:172px_172px] text-white/70 selection:bg-primary-800 selection:text-white/60`}
        // inline style due to dependency on environment variable
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_LINK_PREFIX}/bg-pattern.svg)`
        }}
      >
        {children}
      </body>
    </html>
  )
}
