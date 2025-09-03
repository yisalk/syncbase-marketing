import { motion } from "framer-motion";
import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Team", href: "#team" }
];

const resources = [
  { label: "Documentation", href: "#" },
  { label: "System Requirements", href: "#" },
  { label: "Technical Support", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" }
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-100 dark:bg-charcoal border-t border-slate-300 dark:border-slate-600">
      {/* Pre-Footer CTA */}
      <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border-b border-slate-300 dark:border-slate-600 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p 
            className="text-lg mb-4 text-slate-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            💬 We Love to Talk About Our Product!
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 font-semibold transition-all duration-300">
              Get Syncbase - $300/Year
            </Button>
            <Button variant="outline" className="border-slate-600 hover:border-blue-500 px-6 py-3 font-semibold transition-all duration-300">
              Schedule a Chat
            </Button>
            <Button variant="ghost" className="text-blue-500 hover:text-blue-400 px-6 py-3 font-semibold transition-all duration-300">
              Ask Us Anything
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Database className="text-blue-500 text-2xl" />
                <span className="text-xl font-bold text-slate-900 dark:text-white">Syncbase</span>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-slate-900 dark:text-white">Your Data, Your AI, Your Rules</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                On-premises AI platform that transforms business data into instant insights without compromising privacy or control.
              </p>
              
              <div className="space-y-4">
                <p className="font-medium text-slate-900 dark:text-white">💬 We Love to Talk About Our Product</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Whether you're curious about the technical architecture, want to see a demo with your own data, or just want to chat about the future of on-premises AI - we're always excited to connect!
                </p>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p><span className="text-blue-500">📧 Let's Chat:</span> hello@syncbase.com</p>
                  <p><span className="text-blue-500">🔧 Technical Questions:</span> support@syncbase.com</p>
                </div>
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Quick Links</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => scrollToSection(link.href)}
                      className="hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">Resources</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a href={resource.href} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                      {resource.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            className="border-t border-slate-300 dark:border-slate-600 mt-12 pt-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              🙏 Thank you for going through our website! We're genuinely excited about what we're building and would love to hear your thoughts.
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              © 2025 Syncbase. All rights reserved. Powered by Endshift (https://endshift.io)
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
