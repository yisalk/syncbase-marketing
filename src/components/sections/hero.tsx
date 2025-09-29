import { Button } from "@/components/ui/button";
import { Check, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function Hero() {
  const [, setLocation] = useLocation();
  
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(207, 90%, 54%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(207, 90%, 54%) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Additional subtle radial pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(207, 90%, 54%) 1px, transparent 0)',
          backgroundSize: '80px 80px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <motion.div 
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-slate-900 dark:text-white">
            Your Data, Your AI,<br />
            <span className="gradient-text">Your Rules</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            The first AI platform designed for businesses that refuse to compromise on data privacy and control
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
            {[
              "Ask any business question in plain English",
              "100% private—your data never leaves your servers",
              "No more vendor lock-in or surprise price hikes",
              "Runs entirely on your own hardware"
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Check className="text-green-500 w-5 h-5" />
                <span className="text-slate-700 dark:text-white">{feature}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              onClick={() => setLocation("/pricing")}
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Get Free License
            </Button>
            <Button 
              onClick={() => setLocation("/pricing")}
              variant="outline" 
              className="border-slate-600 hover:border-blue-500 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-charcoal"
            >
              View Pricing
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Visual Comparison */}
        <motion.div 
          className="mt-20 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white dark:bg-charcoal border border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center shadow-lg">
            <div className="text-red-400 mb-4">
              <XCircle className="text-4xl mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">Before: Frustrated & Scattered</h3>
            <p className="text-slate-600 dark:text-slate-400">Multiple cloud tools, exposed data, waiting days for simple answers</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-blue-500/30 rounded-xl p-6 text-center shadow-lg">
            <div className="text-green-500 mb-4">
              <CheckCircle className="text-4xl mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">After: Instant & Secure</h3>
            <p className="text-slate-600 dark:text-slate-400">One local interface, complete privacy, instant answers</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
