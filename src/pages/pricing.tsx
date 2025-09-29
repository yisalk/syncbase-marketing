import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth0 } from "@auth0/auth0-react";
import { usePayment } from "@/contexts/PaymentContext";
// @ts-ignore
import { apiRequests } from "@/common/apiRequests";
import { Alert, AlertDescription } from "@/components/ui/alert";

const plans = [
  {
    name: "Free Trial",
    price: "$0",
    period: "10 days",
    description: "Perfect for testing SyncBase with your data",
    features: [
      "Full access to all features",
      "Up to 1 month of data extraction",
      "Email support",
      "Desktop application access"
    ],
    buttonText: "Get Free License",
    buttonVariant: "outline" as const,
    popular: false,
    disabled: false
  },
  {
    name: "Monthly",
    price: "$24.99",
    period: "per month",
    description: "Ideal for growing businesses",
    features: [
      "Everything in Free Trial",
      "Up to 12 months of data extraction",
      "Priority support",
      "Advanced analytics",
      "Up to 3 machines"
    ],
    buttonText: "Choose Monthly",
    buttonVariant: "default" as const,
    popular: true,
    disabled: false
  },
  {
    name: "Yearly",
    price: "$299",
    period: "per year",
    description: "Best value for established businesses",
    features: [
      "Everything in Monthly",
      "Up to 24 months of data extraction",
      "Premium support",
      "Custom integrations",
      "Up to 5 machines",
      "2 months free"
    ],
    buttonText: "Choose Yearly",
    buttonVariant: "default" as const,
    popular: false,
    disabled: false
  }
];

export default function Pricing() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const { selectedPlan, setSelectedPlan, clearSelectedPlan } = usePayment();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handlePlanSelect = async (planName: string) => {
    // Find the selected plan details
    const selectedPlan = plans.find(plan => plan.name === planName);
    if (!selectedPlan) return;

    // If user is not authenticated, save the plan and redirect to login
    if (!isAuthenticated) {
      setSelectedPlan({
        name: selectedPlan.name,
        price: selectedPlan.price,
        period: selectedPlan.period,
        planType: planName.toLowerCase()
      });
      
      // Redirect to Auth0 login with return URL to payment flow
      loginWithRedirect({
        authorizationParams: {
          redirect_uri: window.location.origin + '/payment'
        }
      });
      return;
    }

    // User is authenticated, proceed with payment
    setLoading(planName);
    setError("");

    try {
      const planType = planName.toLowerCase();
      const planData = {
        email: user?.email,
        planType: planType,
        planName: planName,
        planPrice: planName === 'Monthly' ? '$29' : '$299',
        planPeriod: planName === 'Monthly' ? 'per month' : 'per year',
        userInfo: {
          name: user?.name || user?.email,
          email: user?.email,
          sub: user?.sub,
          picture: user?.picture
        }
      };
      
      const response = await apiRequests("payment/create-checkout-session", "post", planData);

      if (response.data.data?.url) {
        // Redirect to Stripe checkout
        window.location.href = response.data.data.url;
      } else {
        setError("Failed to create checkout session. Please try again.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Payment setup failed. Please try again.");
    } finally {
      setLoading(null);
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

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Choose Your <span className="text-orange-500">SyncBase</span> Plan
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Start with a free trial, then choose the plan that fits your business needs
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {selectedPlan && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20">
              <Check className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-700 dark:text-green-300">
                Welcome back! You selected the <strong>{selectedPlan.name}</strong> plan ({selectedPlan.price} {selectedPlan.period}). 
                Click the button below to proceed with payment.
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSelectedPlan}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  Change Plan
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-orange-500 text-white px-4 py-1 text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full ${plan.popular ? 'border-orange-500 shadow-lg scale-105' : 'border-slate-300 dark:border-slate-600'} transition-all duration-300 hover:shadow-xl`}>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-slate-900 dark:text-white">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                    <span className="text-slate-600 dark:text-slate-400 ml-2">{plan.period}</span>
                  </div>
                  <CardDescription className="text-base mt-2">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (index * 0.1) + (featureIndex * 0.05) }}
                      >
                        <Check className="text-green-500 w-5 h-5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handlePlanSelect(plan.name)}
                    disabled={loading === plan.name || plan.disabled}
                    variant={plan.buttonVariant}
                    className={`w-full py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                      plan.popular 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                        : plan.buttonVariant === 'outline' 
                          ? 'border-slate-600 hover:border-blue-500' 
                          : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {loading === plan.name ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : selectedPlan?.name === plan.name && isAuthenticated ? (
                      `Proceed with ${plan.name}`
                    ) : !isAuthenticated && plan.name !== "Free Trial" ? (
                      `Login to ${plan.name}`
                    ) : (
                      plan.buttonText
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
              💬 Questions About Pricing?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              We're here to help you choose the right plan for your business. Contact us for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setLocation("/contact")}
                variant="outline"
                className="border-slate-600 hover:border-blue-500 px-6 py-3 font-semibold transition-all duration-300"
              >
                Contact Sales
              </Button>
              <Button 
                onClick={() => setLocation("/demo")}
                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 font-semibold transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
