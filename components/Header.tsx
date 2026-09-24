"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import StayWithUsModal from "./StayWithUsModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isStayModalOpen, setIsStayModalOpen] = useState(false);

  // Lock body scroll while the menu overlay is open (Slow Morocco behaviour)
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Primary sections (small, tracked)
  const primary = [
    { href: "/the-riad", label: "The House" },
    { href: "/rooms", label: "Rooms" },
    { href: "/amenities", label: "Amenities" },
    { href: "/philosophy", label: "Philosophy" },
  ];

  // The houses & beyond (same quiet register)
  const feature = [
    { href: "/beyond-the-walls", label: "Beyond the Walls" },
  ];

  // Secondary / practical (smaller, muted)
  const secondary = [
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/house-rules", label: "House Rules" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-sand/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* LEFT — burger + logo */}
            <div className="flex items-center gap-5">
              {/* Burger (Slow Morocco style) — all screen sizes */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative z-[60] w-8 h-8 flex flex-col items-start justify-center gap-[6px] group"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                <span
                  className={`block h-[1.5px] transition-all duration-500 origin-left ${
                    menuOpen
                      ? "w-6 bg-[#1C1917] rotate-[40deg] translate-y-[0.5px]"
                      : "w-7 bg-foreground group-hover:w-6"
                  }`}
                />
                <span
                  className={`block h-[1.5px] transition-all duration-500 origin-left ${
                    menuOpen
                      ? "w-6 bg-[#1C1917] rotate-[-40deg] translate-y-[-0.5px]"
                      : "w-5 bg-foreground group-hover:w-6"
                  }`}
                />
              </button>

              {/* Logo — Stacked (unchanged) */}
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="relative z-[60] flex flex-col items-start leading-tight"
              >
                <span className="text-sm tracking-[0.3em] font-light">RIAD</span>
                <span className="text-sm tracking-[0.3em] font-light">DI SIENA</span>
              </Link>
            </div>

            {/* RIGHT — Book a room (unchanged) */}
            <button
              onClick={() => setIsStayModalOpen(true)}
              className="text-xs tracking-widest border border-foreground px-6 py-2 hover:bg-foreground hover:text-sand transition-colors"
            >
              STAY WITH US
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen menu overlay (Slow Morocco style) ───────────────── */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Sage background, scales down from the top */}
        <div
          className={`absolute inset-0 bg-[#c8c4b8] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
            menuOpen ? "scale-y-100" : "scale-y-0"
          }`}
        />

        {/* Menu content */}
        <div
          className={`relative z-10 h-full flex flex-col justify-between px-6 md:px-10 lg:px-14 pt-24 md:pt-28 pb-8 transition-opacity duration-500 delay-200 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
            <nav className="flex flex-col max-w-7xl mx-auto w-full">
              {/* Sections + the houses, one quiet list */}
              {[...primary, ...feature].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs tracking-[0.18em] uppercase text-[#1C1917] hover:text-[#C2410C] transition-colors py-1.5"
                >
                  {item.label}
                </Link>
              ))}

              {/* Practical, muted */}
              <div className="flex flex-col mt-8">
                {secondary.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xs tracking-[0.18em] uppercase text-[#1C1917]/55 hover:text-[#1C1917]/90 transition-colors py-1.5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Bottom — quiet tagline + a doorway to Slow Morocco */}
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-baseline justify-between gap-3 pt-6">
            <span className="text-[12px] tracking-[0.2em] uppercase text-[#1C1917]/45">
              18th-century riad · Marrakech medina
            </span>
            <a
              href="https://slowmorocco.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="text-[12px] tracking-[0.2em] uppercase text-[#1C1917]/60 hover:text-[#C2410C] transition-colors"
            >
              Slow Morocco — the medina, decoded ↗
            </a>
          </div>
        </div>
      </div>

      <StayWithUsModal
        isOpen={isStayModalOpen}
        onClose={() => setIsStayModalOpen(false)}
      />
    </>
  );
}
