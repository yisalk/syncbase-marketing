import { motion } from "framer-motion";
import { Table, Shield, MessageSquare, DollarSign } from "lucide-react";

const pillars = [
  {
    icon: Table,
    title: "Unified Intelligence",
    subtitle: "One Platform, All Your Data",
    description: "Transform data chaos into unified intelligence. Our smart data syncing connectors pull information from every corner of your business and sync them into any relational database, Excel files, or supported data format you choose.",
    gradient: "from-blue-500/10 to-teal-500/10",
    border: "border-blue-500/30",
    iconColor: "text-blue-500"
  },
  {
    icon: Shield,
    title: "Private by Design",
    subtitle: "Your Infrastructure, Your Rules",
    description: "Built with privacy as the foundation, not an afterthought. Syncbase runs completely offline on your infrastructure—no data ever touches external servers, no third parties access your information.",
    gradient: "from-green-500/10 to-blue-500/10",
    border: "border-green-500/30",
    iconColor: "text-green-500"
  },
  {
    icon: MessageSquare,
    title: "Instant Understanding",
    subtitle: "Ask Anything, Get Everything",
    description: "Speak to your data in plain English. 'How much revenue did Product A generate last quarter?' Get comprehensive answers in seconds, powered by advanced RAG pipelines that understand context and nuance.",
    gradient: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-500/30",
    iconColor: "text-purple-500"
  },
  {
    icon: DollarSign,
    title: "Complete Cost Control",
    subtitle: "Your Hardware, Your Budget, Your Scale",
    description: "Take control of your AI costs with local models and intelligent RAG layers. Start small, scale smart, and never pay for someone else's cloud infrastructure again.",
    gradient: "from-orange-500/10 to-red-500/10",
    border: "border-orange-500/30",
    iconColor: "text-orange-500"
  }
];

export default function Solution() {
  return (
    <section id="solution" className="py-20 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Meet Syncbase: AI That Works <span className="text-blue-500">for You</span>, Not Against You
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
            While others force you to choose between AI capabilities and data privacy, we've built the first platform that delivers both. Syncbase brings enterprise-grade AI directly to your infrastructure—no cloud required.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {pillars.map((pillar, index) => (
            <motion.div 
              key={index}
              className={`bg-gradient-to-br ${pillar.gradient} border ${pillar.border} rounded-xl p-8`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`${pillar.iconColor} mb-4`}>
                <pillar.icon className="text-3xl w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">{pillar.title}</h3>
              <h4 className={`text-lg font-medium ${pillar.iconColor} mb-3`}>{pillar.subtitle}</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-100 dark:bg-charcoal border border-slate-300 dark:border-slate-600 rounded-xl p-8 max-w-4xl mx-auto shadow-sm">
            <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">Our Philosophy</h3>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              It's simple: your business generated the data, your team built the value, your company took the risks. Why should someone else control the AI that makes sense of it all? Syncbase puts the power where it belongs—in your hands.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
