
import { Check, X, Zap } from 'lucide-react';
import { Glass } from './ui/Glass';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      description: 'Get started with basic Web3 website features',
      price: '0',
      currency: 'USDC',
      features: [
        { included: true, text: 'Basic Web3 Templates' },
        { included: true, text: 'Subdomain (app.reham.org/your-site)' },
        { included: true, text: 'Wallet Authentication' },
        { included: true, text: 'Token Info Display' },
        { included: false, text: 'Custom Domain Support' },
        { included: false, text: 'Advanced Analytics' },
        { included: false, text: 'Referral System' },
        { included: false, text: 'Priority Support' },
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      description: 'Everything you need for a professional Web3 site',
      price: '100',
      currency: 'USDC',
      period: 'one-time payment',
      features: [
        { included: true, text: 'Premium Web3 Templates' },
        { included: true, text: 'Custom Domain Support' },
        { included: true, text: 'Wallet Authentication' },
        { included: true, text: 'Token Analytics & Charts' },
        { included: true, text: 'Trading Widgets' },
        { included: true, text: 'Advanced Analytics' },
        { included: true, text: 'Referral System' },
        { included: true, text: 'Priority Support' },
      ],
      cta: 'Upgrade to Pro',
      popular: true
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that fits your project's needs with on-chain payments
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
              <Glass 
                className={`p-8 h-full flex flex-col ${plan.popular ? 'border-web3-blue/30' : ''}`}
                variant="card"
                hover
              >
                {plan.popular && (
                  <div className="flex justify-center -mt-12 mb-6">
                    <span className="bg-web3-blue text-white text-sm font-semibold px-4 py-1 rounded-full inline-flex items-center">
                      <Zap className="h-4 w-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="ml-2 text-xl font-medium">{plan.currency}</span>
                  </div>
                  {plan.period && (
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  )}
                </div>
                
                <ul className="mb-8 space-y-4 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-300 mt-0.5 mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 px-4 rounded-lg font-medium ${
                    plan.popular 
                      ? 'button-gradient text-white' 
                      : 'bg-white border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {plan.cta}
                </button>
              </Glass>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
