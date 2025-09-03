import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Database, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-navy/90 backdrop-blur-md border-b border-slate-200/20 dark:border-slate-600/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Database className="text-blue-500 text-2xl" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">Syncbase</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('problem')} 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Problem
            </button>
            <button 
              onClick={() => scrollToSection('solution')} 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Solution
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('team')} 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Team
            </button>
            <ThemeToggle />
            <Button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Get Syncbase
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button 
              className="text-slate-900 dark:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button 
              onClick={() => scrollToSection('problem')} 
              className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Problem
            </button>
            <button 
              onClick={() => scrollToSection('solution')} 
              className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Solution
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('team')} 
              className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Team
            </button>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition-all duration-300">
              Get Syncbase
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
