"use client"

import Button from "@/components/Button/Button"
import Phone from "@/components/Phone"
import { GITHUB_REPO_LINK, PORTFOLIO_LINK } from "@/constant"
import { useIsMobile } from "@/helpers/useIsMobile"
import Link from "next/link"

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <div className="bg-black background-with-pattern min-h-dvh flex items-center">
      <div className="max-w-[1280px] mx-auto px-12 py-12 lg:py-0 flex-grow flex flex-col lg:flex-row items-center justify-between gap-24">

        {/* Reading */}
        <div className={`order-2 lg:order-1 animate__animated ${isMobile ? `animate__fadeInUp` : `animate__fadeInLeft`}`}>
          <div className="h-[320px] w-[172px] lg:h-[360px] lg:w-[200px] mx-auto">
            <Phone content="reading" />
          </div>
          <div className="mt-8 text-center">
            <p className="text-3xl text-white/90 font-bold">READ</p>
            <p className="text-2xl text-red-500">High screen time 😫</p>
          </div>
        </div>

        {/* Hero */}
        <div className="flex flex-col text-center items-center order-1 lg:order-2 animate__animated animate__fadeIn">
          <h2 className="text-primary-800 text-2xl md:text-4xl mb-4">Stop long form reading</h2>
          <h2 className="font-bold text-primary-800 text-4xl md:text-6xl mb-6 lg:mb-12">Start listening!</h2>
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-4 -mb-12 lg:mb-12">
            <Link href="/app">
              <Button
                type="primary"
                className="text-lg font-bold px-6 py-2 mb-3"
              >
                Listen now
              </Button>
            </Link>
            <a href={GITHUB_REPO_LINK} target="_blank" referrerPolicy="same-origin" >
              <Button
                type="secondary"
                className="text-lg font-bold px-6 py-2 mb-3"
              >
                Use on your blog
              </Button>
            </a>
          </div>
          <p className="hidden lg:block text-center text-primary-800">Another project by <a href={PORTFOLIO_LINK} target="_blank" className="underline underline-offset-4">Vivek</a></p>
        </div>

        {/* Listening */}
        <div className={`order-3 lg:order-3 animate__animated ${isMobile ? `animate__fadeInUp` : `animate__fadeInRight`}`}>
          <div className="h-[320px] w-[172px] lg:h-[360px] lg:w-[200px] mx-auto">
            <Phone content="listening" />
          </div>
          <div className="mt-8 text-center">
            <p className="text-3xl text-white/90 font-bold">LISTEN</p>
            <p className="text-2xl text-green-500">Low screen time 😍</p>
          </div>
        </div>

        <p className="block lg:hidden text-center text-primary-800 order-4">Another project by <a href={PORTFOLIO_LINK} target="_blank" className="underline underline-offset-4">Vivek</a></p>
      </div>
    </div>
  )
}