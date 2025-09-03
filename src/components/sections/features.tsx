import { motion } from "framer-motion";
import { Database, Shield, Unlock, Zap, Server, Brain } from "lucide-react";

const coreFeatures = [
  {
    icon: Database,
    title: "Smart Data Syncing & Integration",
    problem: "Data Scattered & Siloed",
    description: "Modular connectors automatically sync data from multiple sources into any data target with real-time updates and conflict resolution.",
    hoverColor: "hover:border-blue-500/50",
    iconColor: "text-blue-500"
  },
  {
    icon: Shield,
    title: "Air-Gapped Security",
    problem: "Cloud Data Exposure",
    description: "Military-grade AES-256 encryption with zero external dependencies. Complete offline AI processing with RBAC and audit logging.",
    hoverColor: "hover:border-green-500/50",
    iconColor: "text-green-500"
  },
  {
    icon: Unlock,
    title: "Open Source Independence",
    problem: "Vendor Lock-in",
    description: "Built on open-source LLMs with Docker deployment across any platform. Standard data exports and API-first design.",
    hoverColor: "hover:border-orange-500/50",
    iconColor: "text-orange-500"
  },
  {
    icon: Zap,
    title: "Sub-Second Intelligence",
    problem: "Slow, Expensive Insights",
    description: "Advanced RAG pipeline with vector embeddings delivers complex business answers in under 1 second, not days.",
    hoverColor: "hover:border-yellow-500/50",
    iconColor: "text-yellow-500"
  },
  {
    icon: Server,
    title: "Scalable Local AI",
    problem: "AI Monopolization",
    description: "Ollama-powered model deployment with dynamic scaling from laptops to enterprise servers.",
    hoverColor: "hover:border-purple-500/50",
    iconColor: "text-purple-500"
  },
  {
    icon: Brain,
    title: "Intelligent RAG",
    problem: "Local LLM Limitations",
    description: "Domain-specific embeddings with hierarchical retrieval make local models context-aware and business-intelligent.",
    hoverColor: "hover:border-teal-500/50",
    iconColor: "text-teal-500"
  }
];

const detailedFeatures = [
  {
    title: "Smart Data Integration & Unified Storage",
    problem: "Your Data Is Scattered and Siloed",
    problemColor: "text-blue-400",
    gradient: "from-blue-500/10 to-transparent",
    border: "border-blue-500/30",
    technical: [
      "Modular connector architecture for QuickBooks, Excel, CRM systems",
      "ETL pipeline with schema mapping and conflict resolution",
      "Multi-database support (SQLite, PostgreSQL, MySQL)",
      "Real-time sync with change data capture"
    ],
    benefits: [
      "Unified view of all business data",
      "Automated data validation and quality checks",
      "No more manual data exports or imports",
      "Complete audit trail and versioning"
    ]
  },
  {
    title: "Air-Gapped Architecture & Military-Grade Security",
    problem: "Cloud AI Means Surrendering Your Most Sensitive Information",
    problemColor: "text-green-400",
    gradient: "from-green-500/10 to-transparent",
    border: "border-green-500/30",
    technical: [
      "Zero external dependencies - complete offline operation",
      "AES-256 encryption with user-controlled keys",
      "TLS 1.3 transport security for internal communications",
      "Role-based access control with audit logging"
    ],
    benefits: [
      "Data never leaves your infrastructure",
      "No cloud dependencies or third-party access",
      "Secure enclaves for processing isolation",
      "Complete control over access and permissions"
    ]
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-slate-100 dark:bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Built for Real Business, Powered by <span className="text-teal-500">Real AI</span>
          </h2>
        </motion.div>
        
        {/* Core Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              className={`bg-white dark:bg-navy border border-slate-300 dark:border-slate-600 rounded-xl p-6 ${feature.hoverColor} transition-all duration-300 hover:-translate-y-2 shadow-sm`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`${feature.iconColor} mb-4`}>
                <feature.icon className="text-3xl w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">Solves: {feature.problem}</p>
              <p className="text-slate-700 dark:text-slate-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Detailed Feature Breakdown */}
        <div className="space-y-16">
          {detailedFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              className={`bg-gradient-to-r ${feature.gradient} border ${feature.border} rounded-xl p-8`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className={`${feature.problemColor} mb-4`}>Solves Problem: "{feature.problem}"</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-slate-800 dark:text-white">Technical Implementation:</h4>
                  <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                    {feature.technical.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-slate-800 dark:text-white">Business Benefits:</h4>
                  <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                    {feature.benefits.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
