"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiSortDesc } from "react-icons/ri";

import ListingsFilters from "@/components/listings/listings-filters";
import ListingCard from "@/components/listings/listing-card";
import { DEMO_LISTINGS_CARDS } from "@/data/listings";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ListingsPage() {
  const pageRef = useRef<HTMLElement>(null);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortLabel, setSortLabel] = useState("Sort by Price");

  useGSAP(
    () => {
      const page = pageRef.current;
      if (!page) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const crumb = page.querySelector("[data-listings-crumb]");
      const sidebar = page.querySelector("[data-listings-sidebar]");
      const header = page.querySelector("[data-listings-header]");
      const cards = page.querySelectorAll("[data-listing-card]");

      if (reduced) {
        gsap.set([crumb, sidebar, header, cards], { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set([crumb, sidebar, header], { autoAlpha: 0, y: 20 });
      gsap.set(cards, { autoAlpha: 0, y: 24 });

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro.to(crumb, { autoAlpha: 1, y: 0, duration: 0.45 });
      intro.to(sidebar, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.08);
      intro.to(header, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.12);
      intro.to(
        cards,
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 },
        0.2
      );
    },
    { scope: pageRef }
  );

  return (
    <main ref={pageRef} className="bg-neutral-100 pb-16 sm:pb-20 lg:pb-24">
      <div className="container-site pt-8 sm:pt-10">
        <nav
          data-listings-crumb
          aria-label="Breadcrumb"
          className="text-xs font-medium uppercase tracking-[0.08em]"
        >
          <Link href="/" className="text-brand-red hover:underline">
            Home
          </Link>
          <span className="text-brand-red"> / </span>
          <span className="text-black">Truck Listing</span>
        </nav>

        <div className="mt-8 flex flex-col gap-10 lg:mt-10 lg:flex-row lg:gap-12">
          <div data-listings-sidebar>
            <ListingsFilters />
          </div>

          <div className="min-w-0 flex-1">
            <div
              data-listings-header
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <h1 className="text-2xl font-semibold text-black sm:text-[28px]">
                200+ cars available
              </h1>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortOpen((v) => !v)}
                  className="inline-flex items-center gap-3 rounded-md border border-black/10 bg-white px-4 py-2.5 text-sm text-black shadow-sm"
                >
                  {sortLabel}
                  <RiSortDesc className="size-5 text-brand" />
                </button>

                {sortOpen ? (
                  <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-md border border-black/10 bg-white shadow-lg">
                    {["Price: Low to High", "Price: High to Low"].map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSortLabel(option);
                            setSortOpen(false);
                          }}
                          className="block w-full px-4 py-2.5 text-left text-sm text-black hover:bg-neutral-50"
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {DEMO_LISTINGS_CARDS.map((listing) => (
                <div key={listing.id} data-listing-card>
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
