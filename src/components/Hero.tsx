
import { useEffect, useRef } from 'react';
import { ArrowRight, Layers, Sparkles, Zap } from 'lucide-react';
import { Glass } from './ui/Glass';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroElement = heroRef.current;
      const scrollPosition = window.scrollY;
      
      // Parallax effect
      const headingElement = heroElement.querySelector('.hero-heading');
      const descElement = heroElement.querySelector('.hero-description');
      const ctaElement = heroElement.querySelector('.hero-cta');
      const imageElement = heroElement.querySelector('.hero-image');
      
      if (headingElement) {
        (headingElement as HTMLElement).style.transform = `translateY(${scrollPosition * 0.1}px)`;
      }
      if (descElement) {
        (descElement as HTMLElement).style.transform = `translateY(${scrollPosition * 0.05}px)`;
      }
      if (ctaElement) {
        (ctaElement as HTMLElement).style.transform = `translateY(${scrollPosition * 0.02}px)`;
      }
      if (imageElement) {
        (imageElement as HTMLElement).style.transform = `translateY(${-scrollPosition * 0.08}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div className="container px-4 mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Hero Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 mb-6 animate-fade-in">
              <span className="bg-web3-blue text-white text-xs font-semibold px-2 py-1 rounded-full">NEW</span>
              <span className="text-sm font-medium text-gray-700 ml-2 mr-1">Web3 Builder Platform</span>
              <ArrowRight className="h-3.5 w-3.5 text-gray-500" />
            </div>
            
            <h1 className="hero-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-balance animate-slide-up">
              Build Your <span className="text-gradient">Web3</span> Site in Minutes, Not Months
            </h1>
            
            <p className="hero-description text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up animate-delay-100">
              Launch professional-grade blockchain websites with AI-powered tools, secure wallet authentication, and multi-chain support.
            </p>
            
            <div className="hero-cta flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up animate-delay-200">
              <button className="w-full sm:w-auto inline-flex items-center justify-center button-gradient text-white rounded-lg px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              
              <button className="w-full sm:w-auto inline-flex items-center justify-center bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-8 py-3 font-medium transition-all">
                View Demos
              </button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 animate-slide-up animate-delay-300">
              {[
                { icon: <Zap className="h-5 w-5 text-web3-blue" />, text: "Fast Deployment" },
                { icon: <Sparkles className="h-5 w-5 text-web3-purple" />, text: "AI-Powered" },
                { icon: <Layers className="h-5 w-5 text-web3-pink" />, text: "Multi-Chain" }
              ].map((feature, index) => (
                <Glass 
                  key={index}
                  className="p-3 flex flex-col items-center text-center"
                  variant="card"
                  intensity="medium"
                  hover
                >
                  <div className="mb-2">
                    {feature.icon}
                  </div>
                  <div className="text-sm font-medium">{feature.text}</div>
                </Glass>
              ))}
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="w-full lg:w-1/2 hero-image">
            <div className="relative mx-auto max-w-md lg:max-w-full animate-fade-in animate-delay-300">
              <div className="relative z-10">
                <Glass
                  className="rounded-2xl overflow-hidden shadow-2xl"
                  variant="card"
                  blur="lg"
                >
                  <img 
                    src="https://assets-global.website-files.com/60c57068fefebb1ef2c101ec/637d1b0c7af4f92eeefacb26_Website%20builder%20template%20for%20online%20store%20template%201.png" 
                    alt="Web3 Website Builder Interface" 
                    className="w-full h-auto rounded-2xl"
                  />
                </Glass>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-1/4 -left-6 w-24 h-24 bg-web3-blue/10 rounded-full filter blur-2xl animate-pulse-soft"></div>
              <div className="absolute bottom-1/4 -right-6 w-32 h-32 bg-web3-purple/10 rounded-full filter blur-2xl animate-pulse-soft animate-delay-500"></div>
              <div className="absolute -bottom-10 left-1/4 w-40 h-40 bg-web3-pink/10 rounded-full filter blur-2xl animate-pulse-soft animate-delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
