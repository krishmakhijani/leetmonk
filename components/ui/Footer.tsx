export function Footer() {
    return (
      <footer className="bg-interactive-purple-dark border-t border-border-purple-dark py-3 sm:py-4 mt-auto">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center space-x-1 sm:space-x-2">
            <span className="text-xs sm:text-sm text-text-purple-light">Made with</span>
            <span className="text-sm sm:text-base">❤️</span>
            <span className="text-xs sm:text-sm text-text-purple-light">by</span>
            <a
              href="https://twitter.com/krishmakhijani"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-xs sm:text-sm text-solid-purple-light hover:underline hover:text-solid-purple-dark transition-colors"
            >
              Krish Makhijani
            </a>
          </div>
        </div>
      </footer>
    )
  }
