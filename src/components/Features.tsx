
import { useEffect, useRef } from 'react';
import { 
  Wallet, Database, Sparkles, Globe, LayoutTemplate, BarChart, Gift
} from 'lucide-react';
import { Glass } from './ui/Glass';

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target;
            element.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));
    
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      icon: <Wallet className="h-8 w-8 text-web3-blue" />,
      title: "Web3 Authentication",
      description: "Seamless wallet-based authentication with MetaMask, Phantom, and WalletConnect integration.",
      delay: 0
    },
    {
      icon: <Database className="h-8 w-8 text-web3-purple" />,
      title: "Multi-Chain Support",
      description: "Built-in support for Ethereum and Solana blockchains with native USDC payment processing.",
      delay: 100
    },
    {
      icon: <Sparkles className="h-8 w-8 text-web3-pink" />,
      title: "AI-Powered Builder",
      description: "Generate professional crypto websites with AI assistance and premium templates.",
      delay: 200
    },
    {
      icon: <Globe className="h-8 w-8 text-web3-teal" />,
      title: "Domain & Hosting",
      description: "Free subdomains with option for custom domains and ENS integration for PRO users.",
      delay: 0
    },
    {
      icon: <LayoutTemplate className="h-8 w-8 text-web3-green" />,
      title: "Web3 Content Blocks",
      description: "Pre-built components for token analytics, price tickers, and interactive elements.",
      delay: 100
    },
    {
      icon: <BarChart className="h-8 w-8 text-web3-yellow" />,
      title: "Analytics Dashboard",
      description: "Comprehensive dashboard for managing websites, tracking analytics, and monitoring subscriptions.",
      delay: 200
    },
    {
      icon: <Gift className="h-8 w-8 text-web3-orange" />,
      title: "Referral & Rewards",
      description: "Blockchain-based affiliate program with transparent tracking and automated payouts.",
      delay: 300
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for <span className="text-gradient">Web3</span> Projects
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to build, launch, and scale your blockchain project
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`reveal`} 
              style={{transitionDelay: `${feature.delay}ms`}}
            >
              <Glass 
                className="p-6 h-full" 
                variant="card" 
                hover
              >
                <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Glass>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
