import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/hero";
import Problem from "@/components/sections/problem";
import Solution from "@/components/sections/solution";
import Features from "@/components/sections/features";
import Competitive from "@/components/sections/competitive";
import Pricing from "@/components/sections/pricing";
import Team from "@/components/sections/team";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-navy text-slate-900 dark:text-white overflow-x-hidden">
      <Navigation />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <Competitive />
      <Pricing />
      <Team />
      <Footer />
    </div>
  );
}
