
import { Link } from 'react-router-dom';
import { Mail, Twitter, Discord, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-xl font-bold text-gradient mb-4 block">
              reham.org
            </Link>
            <p className="text-gray-600 mb-4">
              Build professional Web3 websites in minutes with our AI-powered platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-web3-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-web3-blue transition-colors">
                <Discord className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-web3-blue transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-web3-blue transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/#features" className="text-gray-600 hover:text-web3-blue transition-colors">Features</Link></li>
              <li><Link to="/#templates" className="text-gray-600 hover:text-web3-blue transition-colors">Templates</Link></li>
              <li><Link to="/#pricing" className="text-gray-600 hover:text-web3-blue transition-colors">Pricing</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-web3-blue transition-colors">Referral Program</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-web3-blue transition-colors">Documentation</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-web3-blue transition-colors">API Reference</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-web3-blue transition-colors">Blog</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-web3-blue transition-colors">Tutorials</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-web3-blue transition-colors">About</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-web3-blue transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-web3-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-web3-blue transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} reham.org. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-gray-500 hover:text-web3-blue transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-web3-blue transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-web3-blue transition-colors">
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
