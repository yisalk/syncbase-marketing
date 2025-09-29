import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Mail, Copy, Check } from "lucide-react";
import { useLocation } from "wouter";
import { apiRequests } from "@/common/apiRequests";

export default function Success() {
  const [, setLocation] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [licenseData, setLicenseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  useEffect(() => {
    // Get session ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get('session_id');
    
    if (sessionIdParam) {
      setSessionId(sessionIdParam);
      fetchLicenseData(sessionIdParam);
    } else {
      setError("No payment session found. Please try again.");
      setLoading(false);
    }
  }, []);

  const fetchLicenseData = async (sessionId: string) => {
    try {
      // Verify payment session and get license data
      const response = await apiRequests(`payment/verify-session/${sessionId}`, 'get');
      
      if (response.data.data && response.data.data.license) {
        setLicenseData(response.data.data.license);
        setLoading(false);
        
        // Start countdown for auto-redirect
        const countdownInterval = setInterval(() => {
          setRedirectCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              setLocation('/dashboard');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError("Failed to verify payment session. Please contact support.");
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Error fetching license data:', err);
      setError(err.response?.data?.data?.message || "Failed to fetch license data. Please contact support.");
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen overflow-x-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600 dark:text-slate-400">Processing your payment...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen overflow-x-hidden flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Payment Error</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">{error}</p>
          <Button 
            onClick={() => setLocation("/pricing")}
            className="bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

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

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Payment <span className="text-green-500">Successful!</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Your SyncBase license has been activated and sent to your email
          </p>
          {redirectCountdown > 0 && (
            <p className="text-lg text-blue-600 dark:text-blue-400 mt-4">
              Redirecting to dashboard in {redirectCountdown} seconds...
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* License Details Card */}
          <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-transparent">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900 dark:text-white flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                Your License Details
              </CardTitle>
              <CardDescription>
                Keep this information safe - you'll need it to activate your desktop app
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-50 dark:bg-charcoal p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">License Key</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => licenseData?.licenseKey && copyToClipboard(licenseData.licenseKey)}
                    disabled={!licenseData?.licenseKey}
                    className="text-blue-500 hover:text-blue-400 disabled:opacity-50"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : licenseData?.licenseKey ? "Copy" : "No Key Yet"}
                  </Button>
                </div>
                <div className="p-3 bg-white dark:bg-navy border border-slate-300 dark:border-slate-600 rounded-lg">
                  <code className="text-lg font-mono text-slate-900 dark:text-white break-all">
                    {licenseData?.licenseKey || 'Your license key will be emailed shortly.'}
                  </code>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <label className="text-slate-600 dark:text-slate-400">License Type</label>
                  <div className="mt-1">
                    <Badge className="bg-orange-500 text-white capitalize">
                      {licenseData?.type || '-'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-slate-600 dark:text-slate-400">Valid From</label>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {licenseData?.validFrom ? new Date(licenseData.validFrom).toLocaleDateString() : '-'}
                  </p>
                </div>
                <div>
                  <label className="text-slate-600 dark:text-slate-400">Valid Until</label>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {licenseData?.validTo ? new Date(licenseData.validTo).toLocaleDateString() : '-'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-white">What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Up to {licenseData?.features?.maxDataMonths ?? '-'} months of data extraction
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700 dark:text-slate-300">
                      Up to {licenseData?.features?.maxMachines ?? '-'} machines
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700 dark:text-slate-300">
                      {(licenseData?.features?.supportLevel || '-')} support
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700 dark:text-slate-300">Advanced analytics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700 dark:text-slate-300">Desktop application access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700 dark:text-slate-300">Regular updates</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              onClick={() => setLocation("/download")}
              className="w-full bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Desktop App
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setLocation("/dashboard")}
                variant="outline"
                className="flex-1 border-slate-600 hover:border-blue-500 px-6 py-3 font-semibold transition-all duration-300"
              >
                View Dashboard
              </Button>
              <Button 
                onClick={() => setLocation("/support")}
                variant="outline"
                className="flex-1 border-slate-600 hover:border-blue-500 px-6 py-3 font-semibold transition-all duration-300"
              >
                Get Support
              </Button>
            </div>
          </div>

          {/* Email Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center"
          >
            <Mail className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              Check Your Email
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              We've sent your license key and download link to your email address. 
              If you don't see it, please check your spam folder.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
