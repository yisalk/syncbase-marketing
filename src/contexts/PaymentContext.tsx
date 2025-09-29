import React, { createContext, useContext, useState, useEffect } from 'react';

interface PaymentPlan {
  name: string;
  price: string;
  period: string;
  planType: string;
}

interface PaymentContextType {
  selectedPlan: PaymentPlan | null;
  setSelectedPlan: (plan: PaymentPlan | null) => void;
  clearSelectedPlan: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

interface PaymentProviderProps {
  children: React.ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);

  // Load selected plan from localStorage on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedPaymentPlan');
    if (savedPlan) {
      try {
        setSelectedPlan(JSON.parse(savedPlan));
      } catch (error) {
        console.error('Error parsing saved payment plan:', error);
        localStorage.removeItem('selectedPaymentPlan');
      }
    }
  }, []);

  // Save selected plan to localStorage whenever it changes
  useEffect(() => {
    if (selectedPlan) {
      localStorage.setItem('selectedPaymentPlan', JSON.stringify(selectedPlan));
    } else {
      localStorage.removeItem('selectedPaymentPlan');
    }
  }, [selectedPlan]);

  const clearSelectedPlan = () => {
    setSelectedPlan(null);
    localStorage.removeItem('selectedPaymentPlan');
  };

  const value: PaymentContextType = {
    selectedPlan,
    setSelectedPlan,
    clearSelectedPlan,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};
