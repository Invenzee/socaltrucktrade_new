"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiPhoneFill, RiMailSendFill } from "react-icons/ri";

import type { ListingDetail } from "@/data/listings";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ListingDetailViewProps = {
  listing: ListingDetail;
};

export default function ListingDetailView({ listing }: ListingDetailViewProps) {
  const pageRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const page = pageRef.current;
      if (!page) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const gallery = page.querySelector("[data-detail-gallery]");
      const content = page.querySelector("[data-detail-content]");
      const aside = page.querySelector("[data-detail-aside]");

      if (reduced) {
        gsap.set([gallery, content, aside], { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(gallery, { autoAlpha: 0, y: 24 });
      gsap.set(content, { autoAlpha: 0, y: 28 });
      gsap.set(aside, { autoAlpha: 0, y: 28 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.to(gallery, { autoAlpha: 1, y: 0, duration: 0.7 });
      intro.to(content, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.15);
      intro.to(aside, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.22);
    },
    { scope: pageRef }
  );

  const phoneHref = `tel:+1${listing.phone.replace(/\D/g, "")}`;

  return (
    <main ref={pageRef} className="bg-neutral-100 pb-16 sm:pb-20 lg:pb-24">
      <div className="container-site pt-8 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-xs font-medium uppercase tracking-[0.08em] sm:mb-8"
        >
          <Link href="/" className="text-brand-red hover:underline">
            Home
          </Link>
          <span className="text-brand-red"> / </span>
          <Link href="/listings" className="text-brand-red hover:underline">
            Truck Listing
          </Link>
          <span className="text-black"> / </span>
          <span className="text-black">{listing.title}</span>
        </nav>

        <div
          data-detail-gallery
          className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
        >
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-200 sm:aspect-[16/9] lg:aspect-auto lg:min-h-[420px]">
            <Image
              src={listing.images.main}
              alt={`${listing.title} main view`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-200 lg:aspect-auto lg:min-h-[200px]">
              <Image
                src={listing.images.side}
                alt={`${listing.title} side view`}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-200 lg:aspect-auto lg:min-h-[200px]">
              <Image
                src={listing.images.dash}
                alt={`${listing.title} interior`}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-8 xl:gap-10">
          <div data-detail-content className="min-w-0">
            <h1 className="inline-block text-[clamp(1.75rem,4vw,2.35rem)] font-bold leading-tight text-black">
              {listing.title}
              <span className="mt-1 block h-[3px] w-full rounded-full bg-brand" />
            </h1>
            <p className="mt-2 text-sm text-black/50 sm:text-base">
              {listing.year} {listing.bodyType} {listing.fuel}
            </p>
            <p className="mt-3 text-[clamp(1.5rem,3vw,2rem)] font-bold text-brand">
              {listing.price}
            </p>

            <h2 className="mt-8 text-lg font-semibold text-black sm:mt-10 sm:text-xl">
              Description
            </h2>
            <div className="mt-3 space-y-4 text-sm leading-relaxed text-black/70 sm:text-[15px]">
              {listing.description.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-8 text-lg font-semibold text-black sm:mt-10 sm:text-xl">
              Features
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {listing.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-lg bg-white px-4 py-3 text-center text-sm text-black/70 shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <aside data-detail-aside className="flex flex-col gap-3 lg:pt-1">
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand px-5 py-3.5 text-sm font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-110 sm:text-base"
            >
              <RiPhoneFill className="size-5" />
              {listing.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand px-5 py-3.5 text-sm font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-110 sm:text-base"
            >
              <RiMailSendFill className="size-5" />
              Send a Message
            </Link>

            <div className="mt-2 rounded-xl bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] sm:p-6">
              <dl className="space-y-2.5 text-sm text-black/75 sm:text-[15px]">
                {listing.specs.map((spec) => (
                  <div key={spec.label} className="flex flex-wrap gap-x-1">
                    <dt className="font-medium text-black/80">
                      {spec.label}&nbsp;:
                    </dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
