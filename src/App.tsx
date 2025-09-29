import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PaymentProvider } from "@/contexts/PaymentContext";
import PaymentFlow from "@/components/PaymentFlow";
import Navigation from "@/components/ui/navigation";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Pricing from "@/pages/pricing";
import Success from "@/pages/success";
import DownloadPage from "@/pages/download";
import Dashboard from "@/pages/dashboard";
import Contact from "@/pages/contact";
import { Auth0Provider } from '@auth0/auth0-react';

function Router() {
  return (
    <div className="min-h-screen bg-white dark:bg-navy text-slate-900 dark:text-white">
      <Navigation />
      <div className="min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/contact" component={Contact} />
          <Route path="/success" component={Success} />
          <Route path="/download" component={DownloadPage} />
          <Route path="/dashboard">
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/payment">
            <ProtectedRoute>
              <PaymentFlow />
            </ProtectedRoute>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="syncbase-ui-theme">
      <TooltipProvider>
        <Auth0Provider
          domain={import.meta.env.VITE_OKTA_DOMAIN}
          clientId={import.meta.env.VITE_OKTA_CLIENT_ID}
          authorizationParams={{
            redirect_uri: window.location.origin + '/dashboard',
            scope: 'openid profile email'
          }}
          useRefreshTokens={true}
          cacheLocation="localstorage"
        >
          <PaymentProvider>
            <Toaster />
            <Router />
          </PaymentProvider>
        </Auth0Provider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;