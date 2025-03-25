
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ConnectButton } from './ConnectButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass-card' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-gradient"
            >
              reham.org
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/#features" 
              className="font-medium text-gray-700 hover:text-web3-blue transition-colors"
            >
              Features
            </Link>
            <Link 
              to="/#templates" 
              className="font-medium text-gray-700 hover:text-web3-blue transition-colors"
            >
              Templates
            </Link>
            <Link 
              to="/#pricing" 
              className="font-medium text-gray-700 hover:text-web3-blue transition-colors"
            >
              Pricing
            </Link>
            <ConnectButton />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg animate-slide-down">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/#features" 
              className="font-medium text-gray-700 hover:text-web3-blue py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/#templates" 
              className="font-medium text-gray-700 hover:text-web3-blue py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Templates
            </Link>
            <Link 
              to="/#pricing" 
              className="font-medium text-gray-700 hover:text-web3-blue py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="py-2">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
