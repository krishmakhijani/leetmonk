import { Footer } from '@/components/ui/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-bg-light-purple to-bg-black">
      {/* Navigation */}
      <nav className="absolute top-0 right-0 p-4 md:p-6 z-50">
        <div className="flex gap-2 md:gap-4">
          <Link
            href="/login"
            className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-md bg-interactive-purple-medium hover:bg-interactive-purple-light text-text-purple-light transition-colors inline-block"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-md bg-solid-purple-light hover:bg-solid-purple-dark text-text-purple-light transition-colors inline-block"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
        <div className="relative">
          {/* Monk Image */}
          <div className="
            absolute
            -left-20
            -top-32
            xs:-left-24
            xs:-top-36
            sm:-left-24
            sm:-top-36
            [@media(min-width:640px)_and_(max-width:767px)]:-left-52
            [@media(min-width:640px)_and_(max-width:767px)]:-top-48
            md:-left-44
            md:-top-52
            lg:-left-44
            lg:-top-52
            w-[200px]
            h-[200px]
            sm:w-[300px]
            sm:h-[300px]
            md:w-[300px]
            md:h-[300px]
            lg:w-[300px]
            lg:h-[300px]
            lg:ml-3
            animate-floating
            opacity-40
            transition-all
            duration-300
          ">
            <Image
              src="/images/monk.png"
              alt="Monk"
              width={300}
              height={300}
              priority
              className="object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="text-center relative z-10">
            {/* Title */}
            <h1 className="
              text-5xl
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              font-bold
              mb-6
              md:mb-8
              bg-gradient-to-r
              from-solid-purple-light
              via-text-purple-dark
              to-solid-purple-dark
              text-transparent
              bg-clip-text
              animate-pulse
              drop-shadow-[0_0_25px_rgba(132,60,221,0.3)]
              transition-all
              duration-300
            ">
              LEETMONK
            </h1>

            {/* Subtitle */}
            <p className="
              relative
              text-2xl
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              font-semibold
              text-text-purple-light
              max-w-[300px]
              sm:max-w-md
              md:max-w-lg
              lg:max-w-2xl
              mx-auto
              bg-gradient-to-r
              from-text-purple-dark
              to-text-purple-light
              text-transparent
              bg-clip-text
              after:content-['']
              after:absolute
              after:bottom-0
              after:left-0
              after:w-full
              after:h-[2px]
              after:bg-gradient-to-r
              after:from-solid-purple-light
              after:to-transparent
              pb-2
              animate-pulse
              transition-all
              duration-300
            ">
              Nuke the DSA in Monk Style
            </p>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-0 w-full">
        <Footer />
      </footer>
    </main>
  );
}
