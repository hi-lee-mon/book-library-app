'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: 'ホーム' },
    { href: '/book', label: '本の登録' },
    { href: '/search', label: '本を検索' },
  ]

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b px-4 backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="size-5" />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>メニュー</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-6">
              {links.map((link) => (
                <Button
                  key={link.href}
                  variant={pathname === link.href ? 'secondary' : 'ghost'}
                  className="justify-start"
                  asChild
                >
                  <Link href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

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
