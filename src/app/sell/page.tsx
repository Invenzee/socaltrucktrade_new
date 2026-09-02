"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { RiArrowDownSLine, RiUploadCloud2Line } from "react-icons/ri";

gsap.registerPlugin(useGSAP);

type EntryMode = "plate" | "make-model" | "vin";

const MODE_TABS: Array<{ id: EntryMode; label: string }> = [
  { id: "plate", label: "License Plate" },
  { id: "make-model", label: "Make and Model" },
  { id: "vin", label: "VIN" },
];

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
] as const;

const FEATURES = [
  "4WD / AWD",
  "Backup Camera",
  "Bluetooth",
  "Leather Seats",
  "Navigation",
  "Towing Package",
] as const;

const CONDITIONS = ["Excellent", "Good", "Fair", "Poor"] as const;

function FieldShell({
  children,
  active = false,
  className = "",
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg bg-white px-4 py-3.5 transition-[box-shadow,border-color] duration-200 ${
        active
          ? "border border-brand shadow-[0_0_0_1px_rgba(1,75,173,0.2)]"
          : "border border-transparent"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function TextInput({
  placeholder,
  value,
  onChange,
  type = "text",
  active = false,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  active?: boolean;
}) {
  return (
    <FieldShell active={active}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-black outline-none placeholder:text-black/35 sm:text-[15px]"
      />
    </FieldShell>
  );
}

function SelectInput({
  placeholder,
  value,
  onChange,
  options,
  active = false,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  active?: boolean;
}) {
  return (
    <FieldShell active={active} className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none bg-transparent pr-8 text-sm outline-none sm:text-[15px] ${
          value ? "text-black" : "text-black/35"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
      <RiArrowDownSLine className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-black/35" />
    </FieldShell>
  );
}

export default function SellPage() {
  const pageRef = useRef<HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<EntryMode>("plate");
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    licensePlate: "",
    state: "",
    mileage: "",
    vin: "",
    truckName: "",
    make: "",
    model: "",
    features: "",
    condition: "",
    color: "",
    description: "",
  });

  const setField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useGSAP(
    () => {
      const page = pageRef.current;
      if (!page) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const tabs = page.querySelector("[data-sell-tabs]");
      const heading = page.querySelector("[data-sell-heading]");
      const fields = page.querySelector("[data-sell-fields]");
      const extras = page.querySelector("[data-sell-extras]");

      if (reduced) {
        gsap.set([tabs, heading, fields, extras], { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set([tabs, heading], { autoAlpha: 0, y: 18 });
      gsap.set(fields, { autoAlpha: 0, y: 24 });
      gsap.set(extras, { autoAlpha: 0, y: 28 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.to(tabs, { autoAlpha: 1, y: 0, duration: 0.45 });
      intro.to(heading, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.08);
      intro.to(fields, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.15);
      intro.to(extras, { autoAlpha: 1, y: 0, duration: 0.55 }, 0.25);
    },
    { scope: pageRef }
  );

  const onFiles = (list: FileList | null) => {
    if (!list?.length) return;
    const next = Array.from(list).filter((file) =>
      ["image/jpeg", "image/png"].includes(file.type)
    );
    setFiles((prev) => [...prev, ...next].slice(0, 8));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <main ref={pageRef} className="bg-neutral-100 pb-16 sm:pb-20 lg:pb-24">
      <div className="container-site pt-10 sm:pt-12 lg:pt-14">
        <form onSubmit={onSubmit}>
          <div
            data-sell-tabs
            className="flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            {MODE_TABS.map((tab) => {
              const active = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium text-white transition-[filter,transform] duration-200 sm:px-5 ${
                    active
                      ? "bg-brand-red"
                      : "bg-brand hover:brightness-110"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <h1
            data-sell-heading
            className="mt-8 font-heading uppercase leading-[1.1] tracking-[0.04em] text-black text-[clamp(1.5rem,5vw,42px)] sm:mt-10"
          >
            Tell Us About Your Vehicle
          </h1>

          <div
            data-sell-fields
            className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          >
            <TextInput
              placeholder="Name"
              value={form.name}
              onChange={(v) => setField("name", v)}
            />
            <TextInput
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(v) => setField("email", v)}
            />
            <TextInput
              placeholder="Phone Number"
              type="tel"
              value={form.phone}
              onChange={(v) => setField("phone", v)}
            />

            {mode === "vin" ? (
              <TextInput
                placeholder="VIN#"
                value={form.vin}
                onChange={(v) => setField("vin", v)}
                active
              />
            ) : (
              <TextInput
                placeholder="License Plate#"
                value={form.licensePlate}
                onChange={(v) => setField("licensePlate", v)}
                active={mode === "plate"}
              />
            )}

            <SelectInput
              placeholder="State"
              value={form.state}
              onChange={(v) => setField("state", v)}
              options={US_STATES}
            />
            <TextInput
              placeholder="Mileage"
              value={form.mileage}
              onChange={(v) => setField("mileage", v)}
            />

            <TextInput
              placeholder="Truck Name"
              value={form.truckName}
              onChange={(v) => setField("truckName", v)}
            />
            <TextInput
              placeholder="Make"
              value={form.make}
              onChange={(v) => setField("make", v)}
              active={mode === "make-model"}
            />
            <TextInput
              placeholder="Model"
              value={form.model}
              onChange={(v) => setField("model", v)}
              active={mode === "make-model"}
            />

            <SelectInput
              placeholder="Features"
              value={form.features}
              onChange={(v) => setField("features", v)}
              options={FEATURES}
            />
            <SelectInput
              placeholder="Condition"
              value={form.condition}
              onChange={(v) => setField("condition", v)}
              options={CONDITIONS}
            />
            <TextInput
              placeholder="Color"
              value={form.color}
              onChange={(v) => setField("color", v)}
            />
          </div>

          <div data-sell-extras className="mt-8 sm:mt-10">
            <label className="text-sm font-medium text-black/80">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Description"
              rows={5}
              className="mt-2 w-full resize-y rounded-lg border border-black/8 bg-white px-4 py-3.5 text-sm text-black outline-none placeholder:text-black/35 focus:border-brand sm:text-[15px]"
            />

            <div
              onDragEnter={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                onFiles(e.dataTransfer.files);
              }}
              className={`mt-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-white px-6 py-10 text-center transition-colors duration-200 sm:py-12 ${
                dragging ? "border-brand bg-brand/5" : "border-black/15"
              }`}
            >
              <RiUploadCloud2Line className="size-10 text-black/45" />
              <p className="mt-3 text-sm font-semibold text-black/75 sm:text-base">
                Choose a file or drag & drop it here
              </p>
              <p className="mt-1 text-xs text-black/45 sm:text-sm">
                JPEG and PNG formats, up to 50MB
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 rounded-lg border border-black/15 bg-white px-5 py-2.5 text-sm font-medium text-black/70 transition-colors hover:bg-neutral-50"
              >
                Browse File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                multiple
                className="hidden"
                onChange={(e) => {
                  onFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              {files.length > 0 ? (
                <ul className="mt-4 w-full max-w-md space-y-1 text-left text-xs text-black/60">
                  {files.map((file) => (
                    <li key={`${file.name}-${file.size}`}>{file.name}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="mt-8 flex justify-center sm:mt-10">
              <button
                type="submit"
                className="inline-flex min-w-[180px] items-center justify-center rounded-lg bg-brand-red px-8 py-3.5 text-sm font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-110 sm:text-base"
              >
                Get My Offer
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
