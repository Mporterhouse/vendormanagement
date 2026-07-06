import Image from "next/image";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.92),rgba(0,0,0,0.72)_48%,rgba(0,168,90,0.14))]" />
      <div className="section-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-sm border border-ugc-green/50 bg-ugc-green/10 px-3 py-1 text-xs font-black uppercase tracking-[0.28em] text-ugc-green">
            Upstate Grappling Club
          </p>
          <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-normal text-white sm:text-7xl lg:text-8xl">
            Vendor Submissions
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            We review all vendor pitches through this page. If your product
            quality, pricing, turnaround time, and brand fit make sense for
            Upstate Grappling Club, we will reach out.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#submit-pricing"
              className="rounded-md bg-ugc-green px-6 py-3 text-center text-sm font-black uppercase tracking-[0.15em] text-black transition hover:bg-white"
            >
              Submit Pricing
            </a>
            <a
              href="#design-concepts"
              className="rounded-md border border-white/20 px-6 py-3 text-center text-sm font-black uppercase tracking-[0.15em] text-white transition hover:border-ugc-green hover:bg-ugc-green/10"
            >
              View Design Concepts
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-ugc-green/10 blur-3xl" />
          <div className="card-border relative rounded-lg p-6 sm:p-10">
            <Image
              src="/ugc-logo.png"
              alt="Upstate Grappling Club logo"
              width={1200}
              height={500}
              priority
              className="h-auto w-full object-contain"
            />
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {["Quality", "Pricing", "Fit"].map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400">
                    Review
                  </p>
                  <p className="mt-1 text-sm font-black uppercase text-white">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
