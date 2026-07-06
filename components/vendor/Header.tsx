import Image from "next/image";

const navItems = [
  ["Product Categories", "#product-categories"],
  ["Design Concepts", "#design-concepts"],
  ["Submit Pricing", "#submit-pricing"],
  ["Send Samples", "#send-samples"],
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/82 backdrop-blur-xl">
      <div className="section-shell flex min-h-20 flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" className="flex items-center gap-4">
          <span className="relative h-12 w-28 sm:w-36">
            <Image
              src="/ugc-logo.png"
              alt="Upstate Grappling Club logo"
              fill
              priority
              sizes="144px"
              className="object-contain"
            />
          </span>
          <span className="border-l border-white/15 pl-4 text-sm font-black uppercase tracking-[0.2em] text-white">
            Vendor Submissions
          </span>
        </a>
        <nav className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-end sm:pb-0">
          {navItems.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="whitespace-nowrap rounded-md border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-300 transition hover:border-ugc-green hover:bg-ugc-green/10 hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
