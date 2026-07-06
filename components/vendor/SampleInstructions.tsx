export function SampleInstructions() {
  return (
    <section id="send-samples" className="border-y border-white/10 bg-black/35 py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-ugc-green">
            Send Samples
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-5xl">
            Free Product Samples
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-300">
            Vendors may send free product samples for quality review. Samples
            are reviewed based on material quality, fit, finish, durability,
            pricing, turnaround time, and overall brand fit with Upstate
            Grappling Club. Sending a sample does not guarantee a partnership,
            purchase order, social media post, or future promotion. Samples will
            not be returned unless return shipping is prepaid.
          </p>
        </div>
        <aside className="card-border rounded-lg p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
            Ship To
          </p>
          <address className="mt-4 not-italic text-lg font-black uppercase leading-8 text-white">
            Upstate Grappling Club
            <br />
            Attn: Vendor Samples
            17 Fruitwood Drie
            <br />
            Halfmoon, NY
            <br />
            12065
          </address>
          <div className="mt-6 rounded-md border border-amber-300/40 bg-amber-300/10 p-4 text-sm font-bold leading-6 text-amber-100">
            Replace this address before publishing if needed.
          </div>
        </aside>
      </div>
    </section>
  );
}
