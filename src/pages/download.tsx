import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Monitor, Shield, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";

const systemRequirements = [
  {
    category: "Operating System",
    requirements: [
      "Windows 10 or later (64-bit)",
      "macOS 10.15 or later",
      "Linux Ubuntu 18.04 or later"
    ]
  },
  {
    category: "Hardware",
    requirements: [
      "4GB RAM minimum (8GB recommended)",
      "2GB free disk space",
      "Intel/AMD 64-bit processor"
    ]
  },
  {
    category: "Network",
    requirements: [
      "Internet connection for license validation",
      "Port 443 (HTTPS) access"
    ]
  }
];

const features = [
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data never leaves your machine. Complete air-gapped security."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant insights from your business data in seconds."
  },
  {
    icon: Monitor,
    title: "Easy to Use",
    description: "Intuitive interface designed for business users, not tech experts."
  }
];

export default function DownloadPage() {
  const [, setLocation] = useLocation();
  const [downloading, setDownloading] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      setDownloadStarted(true);

      const MSI_URL = "https://testaccountsyncbase1.blob.core.windows.net/syncbaseinstaller/SyncBaseMSI.msi";

      const anchor = document.createElement("a");
      anchor.href = MSI_URL;
      anchor.target = "_blank";
      anchor.rel = "noopener";
      anchor.download = "";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

    } finally {
      setTimeout(() => {
        setDownloading(false);
        setDownloadStarted(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(207, 90%, 54%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(207, 90%, 54%) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Download <span className="text-orange-500">SyncBase</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Get the desktop application and start transforming your business data into actionable insights
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Download Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-blue-500/10">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 dark:text-white flex items-center">
                  <Download className="w-6 h-6 text-orange-500 mr-2" />
                  Desktop Application
                </CardTitle>
                <CardDescription>
                  Version 1.0.0 • Last updated: {new Date().toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-12 h-12 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                    SyncBase Desktop
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Complete AI-powered business intelligence platform
                  </p>
                  <Badge className="bg-green-500 text-white mb-4">
                    Ready to Download
                  </Badge>
                </div>

                {downloadStarted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                      Download Started!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Your download should begin shortly. Check your downloads folder.
                    </p>
                  </div>
                ) : (
                  <Button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="w-full bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
                  >
                    {downloading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Preparing Download...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Download Syncbase
                      </>
                    )}
                  </Button>
                )}

                <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                  <p>File size: ~280 MB</p>
                  <p>Download time: ~2-5 minutes (depending on connection)</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features & Requirements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white">What You Get</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                    >
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white">System Requirements</CardTitle>
                <CardDescription>
                  Make sure your system meets these requirements before downloading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {systemRequirements.map((category, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                    >
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{category.category}</h4>
                      <ul className="space-y-1">
                        {category.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Installation Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900 dark:text-white">Installation Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Download</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Click the download button above to get the SyncBase installer
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Install</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Run the installer and follow the setup wizard
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Activate</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Enter your license key when prompted to activate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-orange-500/10 border border-blue-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
              Need Help Getting Started?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Our support team is here to help you get up and running quickly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setLocation("/support")}
                variant="outline"
                className="border-slate-600 hover:border-blue-500 px-6 py-3 font-semibold transition-all duration-300"
              >
                Get Support
              </Button>
              <Button 
                onClick={() => setLocation("/docs")}
                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 font-semibold transition-all duration-300"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
