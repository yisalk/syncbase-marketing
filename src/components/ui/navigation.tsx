import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Database, Menu, X, User, LogOut, UserCircle } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "wouter";

export default function Navigation() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();
  const [location, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (location === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setLocation(`/#${sectionId}`);
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-navy/90 backdrop-blur-md border-b border-slate-200/20 dark:border-slate-600/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Database className="text-blue-500 text-2xl" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">Syncbase</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('problem')} 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Problem
            </button>
            <button 
              onClick={() => scrollToSection('solution')} 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Solution
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('team')} 
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Team
            </button>
            <ThemeToggle />
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user?.picture ? (
                    <img 
                      src={user.picture} 
                      alt={user.name || user.email} 
                      className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600"
                    />
                  ) : (
                    <UserCircle className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                  )}
                  <span className="text-sm text-slate-600 dark:text-slate-400 max-w-32 truncate">
                    {user?.name || user?.email}
                  </span>
                </div>
                <Button 
                  onClick={() => setLocation("/dashboard")}
                  variant="outline"
                  className="border-slate-600 hover:border-blue-500 px-4 py-2 text-sm font-semibold transition-all duration-300"
                >
                  Dashboard
                </Button>
                <Button 
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                  variant="outline"
                  className="border-slate-600 hover:border-red-500 px-4 py-2 text-sm font-semibold transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {/* <Button 
                  onClick={() => loginWithRedirect()}
                  variant="outline"
                  className="border-slate-600 hover:border-blue-500 px-4 py-2 text-sm font-semibold transition-all duration-300"
                >
                  Get Syncbase
                </Button> */}
                <Button 
                  onClick={() => loginWithRedirect()}
                  className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Login
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button 
              className="text-slate-900 dark:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button 
              onClick={() => scrollToSection('problem')} 
              className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Problem
            </button>
            <button 
              onClick={() => scrollToSection('solution')} 
              className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Solution
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('team')} 
              className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Team
            </button>
            {isLoading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
              </div>
            ) : isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  {user?.picture ? (
                    <img 
                      src={user.picture} 
                      alt={user.name || user.email} 
                      className="w-8 h-8 rounded-full border-2 border-slate-300 dark:border-slate-600"
                    />
                  ) : (
                    <UserCircle className="w-8 h-8 text-slate-600 dark:text-slate-400" />
                  )}
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {user?.name || user?.email}
                  </span>
                </div>
                <Button 
                  onClick={() => {
                    setLocation("/dashboard");
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-slate-600 hover:border-blue-500 px-6 py-2 text-sm font-semibold transition-all duration-300"
                >
                  Dashboard
                </Button>
                <Button 
                  onClick={() => {
                    logout({ logoutParams: { returnTo: window.location.origin } });
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-slate-600 hover:border-red-500 px-6 py-2 text-sm font-semibold transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {/* <Button 
                  onClick={() => {
                    loginWithRedirect();
                    setIsOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-slate-600 hover:border-blue-500 px-6 py-2 text-sm font-semibold transition-all duration-300"
                >
                  Get Syncbase
                </Button> */}
                <Button 
                  onClick={() => {
                    loginWithRedirect();
                    setIsOpen(false);
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
