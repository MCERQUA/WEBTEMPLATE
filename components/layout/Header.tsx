"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { navigation } from "@/config/navigation.config"
import { siteConfig } from "@/config/site.config"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              {siteConfig.name}
            </Link>
          </div>
          
          <div className="hidden lg:ml-10 lg:flex lg:space-x-8">
            {navigation.main.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-700 hover:text-primary-500"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center text-base font-medium text-gray-700 hover:text-primary-500"
            >
              <Phone className="h-5 w-5 mr-2" />
              {siteConfig.phone}
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 z-50" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold">{siteConfig.name}</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.main.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center text-base font-semibold text-gray-900"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {siteConfig.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}