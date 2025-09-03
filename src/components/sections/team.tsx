import { motion } from "framer-motion";
import { Shield, Lightbulb, Brain } from "lucide-react";

const teamMembers = [
  {
    name: "Muhammad Osama",
    role: "Chief Technology Officer",
    subtitle: "Former R&D Head at Netwrix",
    description: "Architecting the security-first foundation that makes true on-premises AI possible. Every system design decision is built with enterprise security principles and zero-trust architecture.",
    icon: Shield,
    gradient: "from-blue-500 to-teal-500",
    hoverColor: "hover:border-blue-500/50",
    iconColor: "text-blue-500"
  },
  {
    name: "Atif Shahid",
    role: "Chief Executive Officer",
    subtitle: "9+ Years Entrepreneurship Experience",
    description: "Driving the vision of AI democratization while maintaining uncompromising standards for product craftsmanship. Every feature reflects a commitment to engineering excellence.",
    icon: Lightbulb,
    gradient: "from-orange-500 to-red-500",
    hoverColor: "hover:border-orange-500/50",
    iconColor: "text-orange-500"
  },
  {
    name: "Yisal Khan",
    role: "VP of Engineering",
    subtitle: "AI Systems Expert",
    description: "Leading the development of our RAG pipeline, local LLM optimization, and the intelligent systems that turn business questions into actionable insights.",
    icon: Brain,
    gradient: "from-teal-500 to-green-500",
    hoverColor: "hover:border-teal-500/50",
    iconColor: "text-teal-500"
  }
];

export default function Team() {
  return (
    <section id="team" className="py-20 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Built by Engineers Who Understand <br /><span className="text-teal-500">AI, Data and Security</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
            We envisioned a product that would create a new future—one where businesses own their AI and control their data completely. This wasn't just a business opportunity; it was a technical challenge that demanded real engineering excellence.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className={`bg-slate-100 dark:bg-charcoal border border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center ${member.hoverColor} transition-all duration-300 shadow-sm`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`w-24 h-24 bg-gradient-to-br ${member.gradient} rounded-full mx-auto mb-6 flex items-center justify-center`}>
                <member.icon className="text-2xl text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{member.name}</h3>
              <p className={`${member.iconColor} font-medium mb-3`}>{member.role}</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{member.subtitle}</p>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">We are engineers, and we want to be engineers for life.</h3>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-4xl mx-auto">
            This isn't just about building another software company; it's about solving one of the most important technical challenges of our generation. We didn't leave successful careers to build just another software product. We're here to prove that small teams of passionate engineers can build enterprise-grade AI systems that put businesses back in control of their own data.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
