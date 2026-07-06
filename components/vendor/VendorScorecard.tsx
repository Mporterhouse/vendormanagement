import { scorecardRows } from "@/lib/vendorData";

export function VendorScorecard() {
  return (
    <section className="section-shell py-20">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-ugc-green">
            Vendor Review
          </p>
          <h2 className="mt-3 text-3xl font-black uppercase text-white sm:text-5xl">
            How We Review Vendors
          </h2>
          <p className="mt-5 text-base leading-7 text-zinc-300">
            We do not choose vendors based only on the cheapest price. We care
            about quality, reliability, communication, and whether the product
            fits the UGC brand.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-white/10 bg-zinc-950/70">
          <table className="w-full border-collapse text-left">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.16em] text-zinc-400">
              <tr>
                <th className="px-4 py-4 font-black">Criteria</th>
                <th className="px-4 py-4 text-right font-black">Weight</th>
              </tr>
            </thead>
            <tbody>
              {scorecardRows.map(([criteria, weight]) => (
                <tr key={criteria} className="border-t border-white/10">
                  <td className="px-4 py-4 font-semibold text-white">{criteria}</td>
                  <td className="px-4 py-4 text-right font-black text-ugc-green">{weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
