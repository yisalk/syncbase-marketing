import { motion } from "framer-motion";
import { Puzzle, CloudUpload, Lock, Clock, Building, Server } from "lucide-react";

const problems = [
  {
    icon: Puzzle,
    title: "Your Data Is Scattered and Siloed",
    description: "Businesses use multiple tools for managing finances, customers, leads, employees and operations. Getting a complete picture requires manually exporting, combining, and analyzing data from dozens of sources.",
    color: "text-red-400"
  },
  {
    icon: CloudUpload,
    title: "Cloud AI Means Surrendering Your Most Sensitive Information",
    description: "Every cloud AI tool requires uploading your financial data, customer information, and business secrets to third-party servers. You have no control over who accesses it, how it's used, or where it's stored.",
    color: "text-red-400"
  },
  {
    icon: Lock,
    title: "You're Trapped in an Expensive Subscription Web",
    description: "Cloud vendors have you locked in with proprietary formats, increasing prices, and platform dependencies. Switch providers? Lose your data. Miss a payment? Lose access to your own insights.",
    color: "text-red-400"
  },
  {
    icon: Clock,
    title: "Getting Answers Shouldn't Take Days or Cost Thousands",
    description: "Simple business questions require complex integrations, expensive consultants, or hours of manual work. 'How much did Product A make last quarter?' becomes a multi-day project.",
    color: "text-red-400"
  },
  {
    icon: Building,
    title: "AI Innovation Shouldn't Be Reserved for Tech Giants",
    description: "Today's AI landscape is dominated by a few cloud providers who control access, pricing, and capabilities. Small businesses are forced to choose between expensive commercial AI or no AI at all.",
    color: "text-red-400"
  },
  {
    icon: Server,
    title: "Local LLMs Are Capable Enough—And They're the Future",
    description: "When combined with intelligent RAG implementations and your own data, local LLMs deliver exactly what your business needs. Local AI isn't just good enough; it's the smart choice.",
    color: "text-green-500"
  }
];

const testimonials = [
  {
    quote: "We had no idea how much we were spending on cloud tools until we added it up—over $15,000 a year for scattered insights",
    author: "Small Business Owner"
  },
  {
    quote: "Getting a simple sales report required three different systems and two hours of work",
    author: "Accounts Manager"
  }
];

export default function Problem() {
  return (
    <section id="problem" className="py-20 bg-slate-100 dark:bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            AI Is for Everyone, But Your Data Is <span className="text-red-400">NOT</span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-navy border border-slate-300 dark:border-slate-600 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`${problem.color} mb-4`}>
                <problem.icon className="text-3xl w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">{problem.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Customer Reality Quotes */}
        <motion.div 
          className="mt-16 grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-slate-800/50 border border-slate-300 dark:border-slate-600 rounded-xl p-6 shadow-sm">
              <blockquote className="text-slate-700 dark:text-slate-300 italic mb-4">
                "{testimonial.quote}"
              </blockquote>
              <cite className="text-blue-500">— {testimonial.author}</cite>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
