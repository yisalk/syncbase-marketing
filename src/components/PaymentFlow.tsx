import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { usePayment } from '@/contexts/PaymentContext';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CreditCard, Loader2 } from 'lucide-react';
// @ts-ignore
import { apiRequests } from '@/common/apiRequests';

const PaymentFlow: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const { selectedPlan, clearSelectedPlan } = usePayment();
  const [, setLocation] = useLocation();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    if (!selectedPlan || !user?.email) return;

    setProcessing(true);
    setError('');

    try {
      if (selectedPlan.planType === 'free trial') {
        const freeLicenseData = {
          userInfo: {
            name: user.name,
            email: user.email,
            sub: user.sub,
            picture: user.picture
          }
        };

        const response = await apiRequests("license/create-free-license", "post", freeLicenseData);

        if (response.data.success) {
          clearSelectedPlan();
          setLocation('/dashboard');
        } else {
          setError("Failed to create free license. Please try again.");
        }
      } else {
        const paymentData = {
          email: user.email,
          planType: selectedPlan.planType,
          planName: selectedPlan.name,
          planPrice: selectedPlan.price,
          planPeriod: selectedPlan.period,
          userInfo: {
            name: user.name,
            email: user.email,
            sub: user.sub,
            picture: user.picture
          }
        };

        const response = await apiRequests("payment/create-checkout-session", "post", paymentData);

        if (response.data.data?.url) {
          clearSelectedPlan();
          window.location.href = response.data.data.url;
        } else {
          setError("Failed to create checkout session. Please try again.");
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Setup failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleChangePlan = () => {
    clearSelectedPlan();
    setLocation('/pricing');
  };

  if (!selectedPlan) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-slate-900 dark:text-white overflow-x-hidden flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto px-6"
      >
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-blue-500/10">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-slate-900 dark:text-white">
              Selected Pricing Model
            </CardTitle>
            <CardDescription>
              {selectedPlan.planType === 'free trial' 
                ? 'Confirm your plan selection and get started'
                : 'Confirm your plan selection and proceed to payment'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {selectedPlan.price}
                <span className="text-lg text-slate-600 dark:text-slate-400 ml-1">
                  {selectedPlan.period}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                {selectedPlan.planType === 'free trial' 
                  ? 'Ready to get started with your free trial?'
                  : 'Ready to proceed with payment?'
                }
              </p>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-orange-500 hover:bg-orange-600 px-6 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {selectedPlan.planType === 'free trial' ? 'Creating License...' : 'Processing...'}
                  </>
                ) : (
                  <>
                    {selectedPlan.planType === 'free trial' ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Go To Dashboard
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Proceed to Payment
                      </>
                    )}
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleChangePlan}
                variant="outline"
                className="w-full border-slate-600 hover:border-blue-500"
              >
                Choose Different Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentFlow;
