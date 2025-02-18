"use client"

import Head from "@/components/Head"
import { useIsPwaInstallable } from "@/hooks/useIsPwaInstallable"
import { usePopulateVoices } from "@/hooks/usePopulateVoices"
import { shouldCaptureAnalytics } from "@/helpers/shouldCaptureAnalytics"
import { useIsMobileOrTabletOnClient } from "@/hooks/useIsMobileOrTabletOnClient"
import "animate.css"
import 'material-icons/iconfont/filled.css'
import { Figtree } from "next/font/google"
import Script from "next/script"
import { useEffect } from "react"
import "./globals.css"

const figtree = Figtree({ subsets: ["latin"] })

// Extend Window interface for mouseflow analytics property
declare global {
  interface Window {
    _mfq: any,
    dataLayer: any
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  // Determine PWA status. Initialised in RootLayout to avoid missing of window events.
  useIsPwaInstallable()

  // Determines device type for usage across the app
  useIsMobileOrTabletOnClient()

  // Populates voices available on the device and re-populates if list of voices change (mostly never happens). Initialised in RootLayout to avoid missing of window events.
  usePopulateVoices()

  useEffect(() => {
    if (shouldCaptureAnalytics()) {
      // mouseflow analytics
      window._mfq = window._mfq || [];
      (function () {
        var mf = document.createElement("script")
        mf.type = "text/javascript"; mf.defer = true
        mf.src = "//cdn.mouseflow.com/projects/d650c614-2064-44cc-804a-54644c37dd52.js"
        document.getElementsByTagName("head")[0].appendChild(mf)
      })()
    }

    const body = document.querySelector('body')
    if (body && !shouldCaptureAnalytics()) {
      // Create an Intersection Observer to detect when the body is in view
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // The body is now visible in the viewport
            fetch(`https://script.google.com/macros/s/AKfycbzZYWNu-Bb87iIaP82AJkpdkwUWEw-kN-ngdTb9-f64vmTrzYL07gDB1Q9QdGFOImxH/exec?url=${encodeURIComponent(window.location.href)}`)

            // Stop observing after the fetch request is made
            observer.unobserve(body)
          }
        })
      }, {
        threshold: 0.5 // The iframe needs to be at least 50% visible to trigger the callback
      })

      // Start observing the iframe
      observer.observe(body)
    }

  }, [])

  return (
    <html lang="en">
      {/* Head component adds: title tag, meta tags and PWA manifest*/}
      <Head />
      {/* TODO: Add GA the right way with TS */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7ZYB56R4BT"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-7ZYB56R4BT');
        `}
      </Script>

      <body
        className={`${figtree.className} animate__animated animate__fadeIn bg-black bg-[length:172px_172px] text-white/70 selection:bg-primary-800 selection:text-white/60`}
        // inline style due to dependency on environment variable
        style={{
          // A blank env variable is getting evaluated to undefined, hence the check to replace it with empty string
          backgroundImage: `url(${process.env.NEXT_PUBLIC_LINK_PREFIX ? process.env.NEXT_PUBLIC_LINK_PREFIX : ``}/bg-pattern.svg)`
        }}
      >
        {children}
      </body>
    </html>
  )
}
