import { motion, transform } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const comparisonData = [
  {
    capability: "On-Premises AI",
    syncbase: true,
    synchub: false,
    qxl: false,
    abInitio: true,
    powerPlatform: false,
  },
  {
    capability: "Multi-Platform Sync",
    syncbase: true,
    synchub: true,
    qxl: false,
    abInitio: true,
    powerPlatform: true,
  },
  {
    capability: "Natural Language",
    syncbase: true,
    synchub: false,
    qxl: false,
    abInitio: false,
    powerPlatform: "Limited",
  },
  {
    capability: "SMB Pricing",
    syncbase: true,
    synchub: true,
    qxl: true,
    abInitio: false,
    powerPlatform: false,
  },
  {
    capability: "Complete Privacy",
    syncbase: true,
    synchub: false,
    qxl: true,
    abInitio: true,
    powerPlatform: false,
  },
  {
    capability: "Instant Setup",
    syncbase: true,
    synchub: false,
    qxl: true,
    abInitio: false,
    powerPlatform: false,
  },
];

function StatusIcon({ status }: { status: boolean | string }) {
  if (status === true) {
    return <Check className="text-green-500 w-5 h-5" />;
  } else if (status === false) {
    return <X className="text-red-500 w-5 h-5" />;
  } else {
    return <span className="text-yellow-500 text-sm">{status}</span>;
  }
}

export default function Competitive() {
  return (
    <section id="competitive" className="py-20 bg-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            We Respect Our{" "}
            <span className="underline" style={{ color: "#ff6600" }}>
              Competition
            </span>
            , <br />
            Because This Domain Requires{" "}
            <span className="underline" style={{ color: "#ff6600" }}>
              Courage
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto">
            We have tremendous respect for the companies working in this space.
            They're either solving part of the puzzle affordably, or solving
            more of it with enterprise price tags that exclude small and medium
            businesses.
          </p>
        </motion.div>

        {/* Comparison Matrix */}
        <motion.div
          className="bg-white dark:bg-charcoal border border-slate-300 dark:border-slate-600 rounded-xl overflow-hidden mb-12 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-200 dark:bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">
                    Capability
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-orange-500">
                    Syncbase
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900 dark:text-white">
                    Synchub
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900 dark:text-white">
                    QXL.com
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900 dark:text-white">
                    Ab Initio
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900 dark:text-white">
                    Power Platform
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {row.capability}
                    </td>
                    <td
                      className="px-6 py-4 text-center"
                      style={{ transform: "translate(33%, 0%)" }}
                    >
                      <StatusIcon status={row.syncbase} />
                    </td>
                    <td
                      className="px-6 py-4 text-center"
                      style={{ transform: "translate(33%, 0%)" }}
                    >
                      <StatusIcon status={row.synchub} />
                    </td>
                    <td
                      className="px-6 py-4 text-center"
                      style={{ transform: "translate(33%, 0%)" }}
                    >
                      <StatusIcon status={row.qxl} />
                    </td>
                    <td
                      className="px-6 py-4 text-center"
                      style={{ transform: "translate(33%, 0%)" }}
                    >
                      <StatusIcon status={row.abInitio} />
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{ transform: "translate(30%, 0%)" }}
                    >
                      <StatusIcon status={row.powerPlatform} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Complete business intelligence AI that grows with you - from laptop
            to enterprise cluster - without forcing you to choose between
            capabilities and affordability.
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
            Ready to see what complete business intelligence AI looks like?
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
