"use client";

import { productCategories } from "@/lib/vendorData";

export function CategoryCards() {
  function quoteCategory(category: string) {
    window.dispatchEvent(new CustomEvent("ugc:setCategory", { detail: category }));
    document.getElementById("submit-pricing")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="product-categories" className="section-shell py-20">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-ugc-green">
          Product Categories
        </p>
        <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-5xl">
          What We Are Interested In
        </h2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {productCategories.map((category) => (
          <article
            key={category.value}
            className="card-border rounded-lg p-6 transition hover:-translate-y-1 hover:border-ugc-green/60"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
              {category.examples}
            </p>
            <h3 className="mt-4 text-2xl font-black uppercase text-white">{category.title}</h3>
            <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-300">{category.description}</p>
            <button
              type="button"
              onClick={() => quoteCategory(category.value)}
              className="mt-6 rounded-md border border-ugc-green/50 px-4 py-2.5 text-sm font-black uppercase tracking-[0.12em] text-ugc-green transition hover:bg-ugc-green hover:text-black"
            >
              Quote This Category
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
