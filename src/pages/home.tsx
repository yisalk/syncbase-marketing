import { useEffect } from "react";
import Hero from "@/components/sections/hero";
import Problem from "@/components/sections/problem";
import Solution from "@/components/sections/solution";
import Features from "@/components/sections/features";
import Competitive from "@/components/sections/competitive";
import Pricing from "@/components/sections/pricing";
import Team from "@/components/sections/team";
import Footer from "@/components/sections/footer";

export default function Home() {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    // Handle initial hash
    handleHashScroll();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
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
