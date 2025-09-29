import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Key, 
  Download, 
  Settings,  
  Copy, 
  Check, 
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw,
  Shield,
  Eye,
  EyeOff
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth0 } from "@auth0/auth0-react";
// @ts-ignore
import { apiRequests } from "@/common/apiRequests";

interface User {
  name: string;
  email: string;
  company: string;
  phone: string;
  zip: string;
}

interface LicenseFeatures {
  maxDataMonths: number;
  maxMachines: number;
  supportLevel: string;
  features: string[];
}

interface License {
  id: string;
  type: string;
  status: 'active' | 'expired' | 'suspended';
  validFrom: string;
  validTo: string;
  features: LicenseFeatures;
  createdAt: string;
  licenseKey?: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const STATUS_COLORS = {
  active: 'bg-green-500',
  expired: 'bg-red-500',
  suspended: 'bg-yellow-500',
  default: 'bg-gray-500'
} as const;

const STATUS_TEXT = {
  active: 'Active',
  expired: 'Expired',
  suspended: 'Suspended',
  default: 'Unknown'
} as const;

const EXPIRY_WARNING_DAYS = 7;
const COPY_FEEDBACK_DURATION = 2000;
const SUCCESS_MESSAGE_DURATION = 3000;
const DEBOUNCE_DELAY = 300;

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user: auth0User, isAuthenticated } = useAuth0();
  
  const [user, setUser] = useState<User | null>(null);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [showLicenseKey, setShowLicenseKey] = useState<Record<string, boolean>>({});
  
  const timeoutRefs = useRef<Record<string, number>>({});
  const abortControllerRef = useRef<AbortController | null>(null);

  const cleanup = useCallback(() => {
    Object.values(timeoutRefs.current).forEach(clearTimeout);
    timeoutRefs.current = {};
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      setLocation("/");
    }
  }, [isAuthenticated, loading, setLocation]);

  const createUserFromAuth0 = useCallback((auth0User: any): User => ({
    name: auth0User?.name || "User",
    email: auth0User?.email || "",
    company: auth0User?.company || "Not specified",
    phone: auth0User?.phone_number || "Not specified",
    zip: auth0User?.zip || "Not specified"
  }), []);

  const loadUserData = useCallback(async (isRefresh = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError("");
      setSuccess("");

      if (auth0User) {
        setUser(createUserFromAuth0(auth0User));
      }

      const userEmail = auth0User?.email;
      if (!userEmail) {
        throw new Error("No user email available");
      }

      try {
        const licensesResponse = await apiRequests("license/user-licenses", "get", null, {
          'x-user-email': userEmail
        }, { signal: abortControllerRef.current.signal });

        if (licensesResponse?.data && Array.isArray(licensesResponse.data)) {
          setLicenses(licensesResponse.data);
        } else {
          setLicenses([]);
        }
      } catch (licenseError) {
        console.warn("Failed to fetch licenses:", licenseError);
        setLicenses([]);
      }

      if (isRefresh) {
        setSuccess("Data refreshed successfully!");
        const timeoutId = setTimeout(() => setSuccess(""), SUCCESS_MESSAGE_DURATION);
        timeoutRefs.current.success = timeoutId;
      }

    } catch (err: any) {
      if (err.name === 'AbortError') return;
      
      console.error("Error loading user data:", err);
      const errorMessage = (err as ApiError).response?.data?.message || 
                          (err as ApiError).message || 
                          "Failed to load user data";
      setError(errorMessage);
      
      if (auth0User) {
        setUser(createUserFromAuth0(auth0User));
      }
      setLicenses([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [auth0User, createUserFromAuth0]);

  useEffect(() => {
    if (isAuthenticated && auth0User) {
      loadUserData();
    }
  }, [isAuthenticated, auth0User, loadUserData]);

  const copyToClipboard = useCallback(async (text: string, id: string) => {
    try {
      if (!text || !id) {
        throw new Error("Invalid input for clipboard copy");
      }

      if (!navigator.clipboard) {
        throw new Error("Clipboard API not available");
      }

      await navigator.clipboard.writeText(text);
      setCopied(id);
      
      if (timeoutRefs.current.copy) {
        clearTimeout(timeoutRefs.current.copy);
      }
      
      const timeoutId = setTimeout(() => setCopied(null), COPY_FEEDBACK_DURATION);
      timeoutRefs.current.copy = timeoutId;
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      setError("Failed to copy to clipboard. Please try again.");
    }
  }, []);


  const toggleLicenseKeyVisibility = useCallback((licenseId: string) => {
    setShowLicenseKey(prev => ({
      ...prev,
      [licenseId]: !prev[licenseId]
    }));
  }, []);

  const maskLicenseKey = useCallback((key: string, show: boolean) => {
    if (show || !key) return key;
    return key.length > 8 ? 
      `${key.substring(0, 4)}${'*'.repeat(key.length - 8)}${key.substring(key.length - 4)}` :
      '*'.repeat(key.length);
  }, []);

  const getStatusColor = useCallback((status: string) => {
    return STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.default;
  }, []);

  const getStatusText = useCallback((status: string) => {
    return STATUS_TEXT[status as keyof typeof STATUS_TEXT] || STATUS_TEXT.default;
  }, []);

  const isExpiringSoon = useCallback((validTo: Date | string) => {
    try {
      const validToDate = typeof validTo === 'string' ? new Date(validTo) : validTo;
      
      if (isNaN(validToDate.getTime())) {
        return false;
      }
      
      const daysUntilExpiry = Math.ceil((validToDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= EXPIRY_WARNING_DAYS && daysUntilExpiry > 0;
    } catch (error) {
      console.warn('Error calculating expiry:', error);
      return false;
    }
  }, []);

  const activeLicenses = useMemo(() => 
    licenses.filter(license => license.status === 'active'), 
    [licenses]
  );

  const hasActiveLicense = useMemo(() => 
    activeLicenses.length > 0, 
    [activeLicenses]
  );

  const expiringLicenses = useMemo(() => 
    activeLicenses.filter(license => isExpiringSoon(license.validTo)), 
    [activeLicenses, isExpiringSoon]
  );

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
          <p className="text-xl text-slate-600 dark:text-slate-400">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(207, 90%, 54%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(207, 90%, 54%) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Manage your SyncBase licenses and account
            </p>
            {hasActiveLicense && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-700 dark:text-green-300 font-medium">
                  🎉 Your license is active! You can now download and use the SyncBase desktop application.
                </p>
              </div>
            )}
            {expiringLicenses.length > 0 && (
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-yellow-700 dark:text-yellow-300 font-medium">
                  ⚠️ {expiringLicenses.length} license(s) expiring soon. Consider renewing to avoid service interruption.
                </p>
              </div>
            )}
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button 
              onClick={() => loadUserData(true)}
              disabled={refreshing}
              variant="outline"
              className="border-slate-600 hover:border-green-500 px-6 py-3 font-semibold transition-all duration-300"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button 
              onClick={() => setLocation("/pricing")}
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 font-semibold transition-all duration-300"
            >
              Upgrade License
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
              <span className="text-red-700 dark:text-red-300">{error}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setError("")}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-800"
                  >
                    ×
                  </Button>
                  <Button
                    onClick={() => loadUserData(true)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-800 border-red-300 hover:border-red-400"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Retry
                  </Button>
                </div>
            </div>
          </motion.div>
        )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-green-700 dark:text-green-300">{success}</span>
                </div>
                <Button
                  onClick={() => setSuccess("")}
                  variant="ghost"
                  size="sm"
                  className="text-green-600 hover:text-green-800"
                >
                  ×
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-slate-600 dark:text-slate-400 block mb-1">Name</span>
                  <p className="font-medium text-slate-900 dark:text-white">{user?.name}</p>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400 block mb-1">Email</span>
                  <p className="font-medium text-slate-900 dark:text-white">{user?.email}</p>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400 block mb-1">Company</span>
                  <p className="font-medium text-slate-900 dark:text-white">{user?.company}</p>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400 block mb-1">Phone</span>
                  <p className="font-medium text-slate-900 dark:text-white">{user?.phone}</p>
                </div>
                <Button 
                  onClick={() => setLocation("/settings")}
                  variant="outline"
                  className="w-full border-slate-600 hover:border-blue-500 mt-4"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Your Licenses
                </CardTitle>
                <CardDescription>
                  Manage and monitor your SyncBase licenses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {licenses.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <Key className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      No Licenses Found
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      You don't have any active licenses yet. Get started with a free trial or upgrade to a paid plan.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        onClick={() => setLocation("/pricing")}
                        variant="outline"
                        className="border-slate-600 hover:border-blue-500"
                      >
                        Get Free Trial
                      </Button>
                      <Button 
                        onClick={() => setLocation("/pricing")}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        View Plans
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  licenses.map((license, index) => (
                  <motion.div
                    key={license.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                    className="border border-slate-200 dark:border-slate-700 rounded-lg p-6"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <div className="flex items-center space-x-3 mb-2 md:mb-0">
                        <Badge className={`${getStatusColor(license.status)} text-white`}>
                          {getStatusText(license.status)}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {license.type}
                        </Badge>
                        {isExpiringSoon(license.validTo) && (
                          <Badge className="bg-yellow-500 text-white">
                            <Clock className="w-3 h-3 mr-1" />
                            Expires Soon
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Valid until {new Date(license.validTo).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-charcoal p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-600 dark:text-slate-400 font-medium">License Key</span>
                          <Shield className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLicenseKeyVisibility(license.id)}
                            className="text-slate-500 hover:text-slate-700"
                          >
                            {showLicenseKey[license.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                            onClick={() => copyToClipboard(license.licenseKey || '', license.id)}
                          className="text-blue-500 hover:text-blue-400"
                            disabled={!license.licenseKey}
                        >
                          {copied === license.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copied === license.id ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                      </div>
                      <code className="text-sm font-mono text-slate-900 dark:text-white break-all select-all">
                        {license.licenseKey ? maskLicenseKey(license.licenseKey, showLicenseKey[license.id]) : 'No license key available'}
                      </code>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600 dark:text-slate-400 block mb-1">Max Data Months</span>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {license.features.maxDataMonths} months
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400 block mb-1">Max Machines</span>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {license.features.maxMachines} machines
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400 block mb-1">Support Level</span>
                        <p className="font-medium text-slate-900 dark:text-white capitalize">
                          {license.features.supportLevel}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  ))
                )}

              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 dark:text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => setLocation("/download")}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 border-slate-600 hover:border-blue-500"
                >
                  <Download className="w-6 h-6" />
                  <span>Download App</span>
                </Button>
                {/* <Button 
                  onClick={() => setLocation("/support")}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 border-slate-600 hover:border-blue-500"
                >
                  <Settings className="w-6 h-6" />
                  <span>Get Support</span>
                </Button> */}
                <Button 
                  onClick={() => setLocation("/pricing")}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 border-slate-600 hover:border-blue-500"
                >
                  <Key className="w-6 h-6" />
                  <span>Upgrade License</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
