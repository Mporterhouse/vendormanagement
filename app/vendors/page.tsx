import { CategoryCards } from "@/components/vendor/CategoryCards";
import { DesignConcepts } from "@/components/vendor/DesignConcepts";
import { Header } from "@/components/vendor/Header";
import { Hero } from "@/components/vendor/Hero";
import { SampleInstructions } from "@/components/vendor/SampleInstructions";
import { VendorForm } from "@/components/vendor/VendorForm";
import { VendorScorecard } from "@/components/vendor/VendorScorecard";

export default function VendorsPage() {
  return (
    <main>
      <Header />
      <Hero />
      <CategoryCards />
      <DesignConcepts />
      <VendorScorecard />
      <SampleInstructions />
      <VendorForm />
      <footer className="border-t border-white/10 py-8">
        <div className="section-shell flex flex-col gap-2 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold uppercase tracking-[0.16em]">Upstate Grappling Club</p>
          <p>Vendor submissions are reviewed periodically.</p>
        </div>
      </footer>
    </main>
  );
}
