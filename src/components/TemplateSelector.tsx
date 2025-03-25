
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Monitor } from 'lucide-react';
import { Glass } from './ui/Glass';

const templates = [
  {
    id: 'template1',
    name: 'Crypto Launch',
    category: 'Token Launch',
    image: 'https://assets.website-files.com/63904f663019b0d8edf8d57c/639156ce5b51d847e829b488_Frame%2048095463.jpg',
    description: 'Perfect for new token launches with presale features.'
  },
  {
    id: 'template2',
    name: 'NFT Showcase',
    category: 'NFT',
    image: 'https://images.unsplash.com/photo-1638913971873-bcef634bdcd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    description: 'Showcase your NFT collection with integrated marketplace.'
  },
  {
    id: 'template3',
    name: 'DeFi Dashboard',
    category: 'DeFi',
    image: 'https://assets.website-files.com/63904f663019b0d8edf8d57c/639abe37f55393f5d84a4812_Untitled%20design%20(12).png',
    description: 'Interactive dashboard for DeFi protocols and services.'
  },
  {
    id: 'template4',
    name: 'DAO Community',
    category: 'DAO',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80',
    description: 'Community hub for DAOs with governance tools.'
  },
  {
    id: 'template5',
    name: 'Meme Coin',
    category: 'Meme',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    description: 'Fun and engaging design for meme coin projects.'
  }
];

const TemplateSelector = () => {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextTemplate = () => {
    setActiveTemplate((prev) => (prev + 1) % templates.length);
  };

  const prevTemplate = () => {
    setActiveTemplate((prev) => (prev - 1 + templates.length) % templates.length);
  };

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
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section id="templates" className="py-16 md:py-24">
      <div ref={containerRef} className="container mx-auto px-4 reveal">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Premium <span className="text-gradient">Web3</span> Templates
          </h2>
          <p className="text-lg text-gray-600">
            Professionally designed templates optimized for blockchain projects
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-10">
            <button 
              onClick={prevTemplate}
              className="p-2 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm mr-4"
              aria-label="Previous template"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <div className="text-center mx-4">
              <span className="font-medium">
                {activeTemplate + 1} / {templates.length}
              </span>
            </div>
            
            <button 
              onClick={nextTemplate}
              className="p-2 rounded-full bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm ml-4"
              aria-label="Next template"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          
          <div 
            ref={sliderRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-all duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeTemplate * 100}%)` }}
            >
              {templates.map((template, index) => (
                <div key={template.id} className="w-full flex-shrink-0 px-4">
                  <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="w-full lg:w-2/3">
                      <Glass
                        className="rounded-2xl overflow-hidden shadow-lg"
                        variant="card"
                      >
                        <div className="relative">
                          <div className="absolute top-0 left-0 right-0 h-10 bg-gray-100 flex items-center px-4 border-b">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-400"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                              <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                          </div>
                          <img 
                            src={template.image} 
                            alt={template.name} 
                            className="w-full h-auto object-cover"
                            style={{ marginTop: '40px' }}
                          />
                        </div>
                      </Glass>
                    </div>
                    
                    <div className="w-full lg:w-1/3 text-center lg:text-left">
                      <span className="inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm font-medium mb-4">
                        {template.category}
                      </span>
                      <h3 className="text-2xl font-bold mb-3">{template.name}</h3>
                      <p className="text-gray-600 mb-6">{template.description}</p>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="button-gradient text-white rounded-lg px-6 py-3 font-medium flex items-center justify-center">
                          <Monitor className="mr-2 h-4 w-4" />
                          Preview
                        </button>
                        <button className="bg-white border border-gray-200 hover:border-gray-300 rounded-lg px-6 py-3 font-medium">
                          Use Template
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplateSelector;
