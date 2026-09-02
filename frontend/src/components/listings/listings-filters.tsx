"use client";

import { useState } from "react";
import { RiCheckLine } from "react-icons/ri";

type CheckboxOption = {
  id: string;
  label: string;
};

const CONDITIONS: CheckboxOption[] = [
  { id: "new", label: "New" },
  { id: "used", label: "Used" },
];

const MAKES: CheckboxOption[] = [
  { id: "artega", label: "Artega" },
  { id: "audi", label: "Audi" },
  { id: "bmw", label: "BMW" },
  { id: "chevrolet", label: "Chevrolet" },
  { id: "ford", label: "Ford" },
  { id: "mercedes", label: "Mercedes-Benz" },
  { id: "toyota", label: "Toyota" },
  { id: "nissan", label: "Nissan" },
  { id: "ram", label: "Ram" },
  { id: "gmc", label: "GMC" },
];

const COLORS: CheckboxOption[] = [
  { id: "black", label: "Black" },
  { id: "gray", label: "Gray" },
  { id: "white", label: "White" },
];

const CATEGORIES: CheckboxOption[] = [
  { id: "coupe", label: "Coupe" },
  { id: "luxury", label: "Luxury Car" },
  { id: "sedan", label: "Sedan" },
  { id: "sports", label: "Sports Car" },
  { id: "wagon", label: "Wagon" },
];

const INITIAL_SELECTED = new Set([
  "new",
  "artega",
  "chevrolet",
  "ford",
  "coupe",
  "sedan",
]);

function FilterCheckbox({
  option,
  checked,
  onChange,
}: {
  option: CheckboxOption;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={option.label}
        onClick={onChange}
        className={
          checked
            ? "flex size-[15px] shrink-0 items-center justify-center rounded-[2px] bg-brand-red"
            : "size-[15px] shrink-0 rounded-[2px] border border-black/25 bg-white"
        }
      >
        {checked ? <RiCheckLine className="size-3 text-white" /> : null}
      </button>
      <span
        className={
          checked
            ? "text-sm font-medium text-brand-red"
            : "text-sm text-black"
        }
      >
        {option.label}
      </span>
    </label>
  );
}

function FilterSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-black/10 py-5 first:pt-0 last:border-b-0">
      <h3 className="text-xs font-semibold uppercase tracking-[0.06em] text-black">
        {title}
      </h3>
      {subtitle ? (
        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.08em] text-black/55">
          {subtitle}
        </p>
      ) : null}
      <div className="mt-3 flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function RangeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-black/8 bg-white px-3 py-2.5 last:border-b-0">
      <span className="text-sm text-black/35">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-[50%] bg-transparent text-right text-sm text-black/40 outline-none"
      />
    </div>
  );
}

export default function ListingsFilters() {
  const [selected, setSelected] = useState(() => new Set(INITIAL_SELECTED));
  const [showAllMakes, setShowAllMakes] = useState(false);
  const [priceMin, setPriceMin] = useState("0.00");
  const [priceMax, setPriceMax] = useState("75000.00");
  const [yearMin, setYearMin] = useState("2016");
  const [yearMax, setYearMax] = useState("2026");
  const [kmMin, setKmMin] = useState("16");
  const [kmMax, setKmMax] = useState("65000");

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleMakes = showAllMakes ? MAKES : MAKES.slice(0, 6);

  return (
    <aside className="w-full lg:w-[240px] lg:shrink-0">
      <h2 className="text-xl font-semibold text-black">Filter by</h2>

      <div className="mt-5">
        <FilterSection title="Condition" subtitle="On Special Right Now">
          {CONDITIONS.map((option) => (
            <FilterCheckbox
              key={option.id}
              option={option}
              checked={selected.has(option.id)}
              onChange={() => toggle(option.id)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Make">
          {visibleMakes.map((option) => (
            <FilterCheckbox
              key={option.id}
              option={option}
              checked={selected.has(option.id)}
              onChange={() => toggle(option.id)}
            />
          ))}
          {MAKES.length > 6 ? (
            <button
              type="button"
              onClick={() => setShowAllMakes((v) => !v)}
              className="mt-1 text-left text-sm font-medium text-brand-red"
            >
              {showAllMakes ? "Show less" : "Show more"}
            </button>
          ) : null}
        </FilterSection>

        <FilterSection title="Exterior Color">
          {COLORS.map((option) => (
            <FilterCheckbox
              key={option.id}
              option={option}
              checked={selected.has(option.id)}
              onChange={() => toggle(option.id)}
            />
          ))}
        </FilterSection>

        <FilterSection title="Category">
          {CATEGORIES.map((option) => (
            <FilterCheckbox
              key={option.id}
              option={option}
              checked={selected.has(option.id)}
              onChange={() => toggle(option.id)}
            />
          ))}
        </FilterSection>
      </div>

      <div className="mt-6 overflow-hidden rounded-md border border-black/10 bg-neutral-100">
        <div className="px-3 py-2">
          <p className="text-sm font-medium text-black">Price</p>
        </div>
        <RangeField label="min" value={priceMin} onChange={setPriceMin} />
        <RangeField label="max" value={priceMax} onChange={setPriceMax} />

        <div className="mt-2 px-3 py-2">
          <p className="text-sm font-medium text-black">Year Min/Max</p>
        </div>
        <div className="flex border-y border-black/8 bg-white">
          <div className="flex flex-1 items-center justify-between gap-2 px-3 py-2.5">
            <span className="text-sm text-black/35">min</span>
            <input
              type="text"
              value={yearMin}
              onChange={(e) => setYearMin(e.target.value)}
              className="w-14 bg-transparent text-right text-sm text-black/40 outline-none"
            />
          </div>
          <div className="flex flex-1 items-center justify-between gap-2 border-l border-black/8 px-3 py-2.5">
            <span className="text-sm text-black/35">min</span>
            <input
              type="text"
              value={yearMax}
              onChange={(e) => setYearMax(e.target.value)}
              className="w-14 bg-transparent text-right text-sm text-black/40 outline-none"
            />
          </div>
        </div>

        <div className="mt-2 px-3 py-2">
          <p className="text-sm font-medium text-black">Kilometers</p>
        </div>
        <RangeField label="min" value={kmMin} onChange={setKmMin} />
        <RangeField label="max" value={kmMax} onChange={setKmMax} />

        <div className="p-3">
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md bg-brand-red px-4 py-3 text-sm font-semibold text-white transition-[filter] duration-200 hover:brightness-110"
          >
            Continue
          </button>
        </div>
      </div>
    </aside>
  );
}
