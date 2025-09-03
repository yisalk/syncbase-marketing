import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Unlimited data sources",
  "Unlimited queries",
  "Complete AI stack",
  "Full privacy protection",
  "Cross-platform deployment",
  "Regular updates",
  "Email support",
  "30-day money-back guarantee"
];

const secondaryOptions = [
  "See Live Demo",
  "Technical Questions?",
  "Download Requirements"
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-slate-100 dark:bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Ready to Take Control of <span className="text-orange-500">Your Data?</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Own your AI infrastructure for less than you're probably paying for cloud subscriptions
          </p>
        </motion.div>
        
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="bg-gradient-to-br from-orange-500/20 to-blue-500/20 border border-orange-500/50 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Syncbase Complete</h3>
              <div className="text-5xl font-bold text-orange-500 mb-2">
                $300<span className="text-2xl text-slate-600 dark:text-slate-400">/Year</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">Everything You Need, Nothing You Don't</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Check className="text-green-500 w-5 h-5" />
                  <span className="text-slate-800 dark:text-white">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="bg-white dark:bg-navy border border-slate-300 dark:border-slate-600 rounded-xl p-6 mb-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">Risk-Free Guarantee</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                If Syncbase doesn't transform how you understand your business data within 30 days, we'll refund every penny. Your data stays private, your time was well-spent learning about your business, and you risk nothing.
              </p>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button className="w-full bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
                Get Syncbase - $300/Year
              </Button>
              <div className="flex justify-center space-x-6 text-sm">
                {secondaryOptions.map((option, index) => (
                  <button 
                    key={index}
                    className="text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
            
            <motion.p 
              className="mt-8 text-slate-600 dark:text-slate-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              For less than $1 per day, own a complete AI-powered business intelligence platform that works entirely on your terms.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
