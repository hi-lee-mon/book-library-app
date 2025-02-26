import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'

export function Header() {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b px-4 backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Book Library</span>
        </Link>
        <span className="flex-1"></span>
        <nav className="flex items-center">
          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}
