"use client"

import Button from "@/components/Button"
import HomePageBranding from "@/components/HomePageBranding"
import Phone from "@/components/Phone"
import { GITHUB_REPO_LINK, PORTFOLIO_LINK } from "@/constants/appConstants"
import { useIsMobile } from "@/helpers/useIsMobile"
import { useIsTablet } from "@/helpers/useIsTablet"
import Link from "next/link"

export default function Home() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  return (
    <div className="min-h-dvh flex items-center">
      <div className="max-w-[1280px] mx-auto px-12 py-12 lg:py-0 flex-grow flex flex-col lg:flex-row items-center justify-between gap-24">

        {/* READING CONTENT */}
        <div className={`order-2 lg:order-1 animate__animated ${(isMobile || isTablet) ? `animate__fadeInUp` : `animate__fadeInLeft`}`}>
          {/* Setting height and width of the container, for the phone to fill */}
          <div className="h-[320px] w-[172px] lg:h-[360px] lg:w-[200px] mx-auto mb-8">
            <Phone content="reading" />
          </div>
          <div className="text-center">
            <p className="text-3xl text-white/90 font-bold">READ</p>
            <p className="text-2xl text-red-500">High screen time 😫</p>
          </div>
        </div>

        {/* HERO CONTENT */}
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
          {/* ELEMENT FOR DESKTOP */}

          <div className="hidden lg:block ">
            <HomePageBranding />
          </div>
        </div>

        {/* LISTENING CONTENT */}
        <div className={`order-3 lg:order-3 animate__animated ${(isMobile || isTablet) ? `animate__fadeInUp` : `animate__fadeInRight`}`}>
          {/* Setting height and width of the container, for the phone to fill */}
          <div className="h-[320px] w-[172px] lg:h-[360px] lg:w-[200px] mx-auto mb-8">
            <Phone content="listening" />
          </div>
          <div className="text-center">
            <p className="text-3xl text-white/90 font-bold">LISTEN</p>
            <p className="text-2xl text-green-500">Low screen time 😍</p>
          </div>
        </div>



        {/* ELEMENT FOR PAGE BOTTOM POSITIONING ON MOBILE AND TABLET*/}
        <div className="block lg:hidden order-4">
          <HomePageBranding />
        </div>
      </div>
    </div>
  )
}