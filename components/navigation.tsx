"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'
import Link from "next/link"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-900/95 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm rounded-full p-4 border border-white/30 shadow-xl">
              <img
                src="/images/coati-logo.svg"
                alt="Coati Solutions Logo"
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" onClick={() => window.scrollTo(0, 0)} className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/#services" className="text-gray-300 hover:text-white transition-colors">
              Leistungen
            </Link>
            <Link href="/#about" className="text-gray-300 hover:text-white transition-colors">
              Über Uns
            </Link>
            <Link href="/#features" className="text-gray-300 hover:text-white transition-colors">
              Technologien
            </Link>
            <Link href="/#contact" className="text-gray-300 hover:text-white transition-colors">
              Kontakt
            </Link>
            <Link href="/#contact" passHref legacyBehavior>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                Projekt Starten
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                onClick={() => { window.scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/#services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Leistungen
              </Link>
              <Link
                href="/#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Über Uns
              </Link>
              <Link
                href="/#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Technologien
              </Link>
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Kontakt
              </Link>
              <div className="px-3 py-2">
                <Link href="/#contact" passHref legacyBehavior>
                  <Button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    Projekt Starten
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
