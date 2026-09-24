"use client";

import { useState } from "react";

interface Testimonial {
  Quote: string;
  Guest_Name?: string;
}

/**
 * One guest quote at a time — no autoplay, no motion of its own.
 * Stylish thin arrows to step through by hand (Slow Morocco: arrow nav, no scrollbars).
 */
export default function QuoteCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  if (total === 0) return null;

  const current = testimonials[index];
  const go = (dir: number) => setIndex((i) => (i + dir + total) % total);

  return (
    <figure className="max-w-3xl mx-auto text-center">
      <blockquote className="font-display italic text-[clamp(1.1rem,2vw,1.5rem)] font-normal leading-[1.5] text-foreground/85 transition-opacity duration-300">
        {current.Quote}
      </blockquote>

      {current.Guest_Name && (
        <figcaption className="mt-8 text-[12px] tracking-[0.2em] uppercase text-foreground/45">
          {current.Guest_Name}
        </figcaption>
      )}

      {total > 1 && (
        <div className="mt-10 flex items-center justify-center gap-7">
          <button
            onClick={() => go(-1)}
            aria-label="Previous review"
            className="group text-foreground/40 hover:text-[#C2410C] transition-colors"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-0.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <span className="text-[12px] tracking-[0.25em] text-foreground/40 tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          <button
            onClick={() => go(1)}
            aria-label="Next review"
            className="group text-foreground/40 hover:text-[#C2410C] transition-colors"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </figure>
  );
}
