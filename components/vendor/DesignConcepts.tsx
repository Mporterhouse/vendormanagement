"use client";

import { useState } from "react";
import { designConcepts } from "@/lib/vendorData";
import type { DesignConcept } from "@/types/vendor";

const mockupClasses = [
  "rounded-t-[3rem] rounded-b-lg",
  "rounded-[2rem]",
  "rounded-[4rem_4rem_2rem_2rem]",
  "rounded-t-[2.5rem] rounded-b-lg",
  "rounded-t-[2rem] rounded-b-lg",
  "rounded-md",
];

export function DesignConcepts() {
  const [selected, setSelected] = useState<DesignConcept | null>(null);

  return (
    <section id="design-concepts" className="border-y border-white/10 bg-black/35 py-20">
      <div className="section-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-ugc-green">
              Design Concepts
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-5xl">
              Quote Against Clear Concepts
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-zinc-400">
            Use these concept cards as starting points for pricing, minimums,
            production method, and sample options.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {designConcepts.map((concept, index) => (
            <article key={concept.id} className="card-border rounded-lg p-5">
              <div className="grid h-56 place-items-center rounded-md border border-white/10 bg-[radial-gradient(circle_at_center,rgba(0,168,90,0.18),rgba(255,255,255,0.03)_45%,rgba(0,0,0,0.25))] p-5">
                <div
                  className={`relative grid h-36 w-32 place-items-center border border-ugc-green/45 bg-zinc-950 shadow-glow ${mockupClasses[index]}`}
                >
                  <span className="absolute inset-x-5 top-6 h-1 bg-ugc-green" />
                  <span className="text-2xl font-black text-white">UGC</span>
                  <span className="absolute bottom-5 text-[0.65rem] font-black uppercase tracking-[0.18em] text-zinc-400">
                    {concept.productType.split(" ")[0]}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-ugc-green">
                  {concept.productType}
                </p>
                <h3 className="mt-2 text-xl font-black uppercase text-white">{concept.name}</h3>
                <button
                  type="button"
                  onClick={() => setSelected(concept)}
                  className="mt-5 rounded-md bg-white px-4 py-2.5 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-ugc-green"
                >
                  View Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur"
          role="dialog"
          aria-modal="true"
          aria-labelledby="concept-title"
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-white/15 bg-zinc-950 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-ugc-green">
                  Concept Details
                </p>
                <h3 id="concept-title" className="mt-2 text-2xl font-black uppercase text-white">
                  {selected.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-md border border-white/15 px-3 py-2 text-sm font-black text-white transition hover:border-ugc-green"
                aria-label="Close design concept details"
              >
                Close
              </button>
            </div>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Product type", selected.productType],
                ["Preferred colors", selected.preferredColors],
                ["Production method", selected.method],
                ["Logo placement", selected.logoPlacement],
                ["Estimated quantity", selected.quantityRange],
                ["What to quote", selected.quoteNeeds],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                  <dt className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-6 text-white">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 rounded-md border border-ugc-green/30 bg-ugc-green/10 p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-ugc-green">Notes</p>
              <p className="mt-2 text-sm leading-6 text-zinc-200">{selected.notes}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
