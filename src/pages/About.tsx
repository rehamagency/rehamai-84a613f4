
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Glass } from '@/components/ui/Glass';
import { Link } from 'react-router-dom';
import { Globe, Cpu, Shield, Zap, Users, Code } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About reham.org</h1>
            <p className="text-xl text-gray-600 mb-8">
              Transforming Web3 website creation with AI-powered technology
            </p>
          </div>
          
          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At reham.org, we're on a mission to democratize Web3 website creation, making it accessible, affordable, and instantaneous for everyone. We believe that every crypto project deserves a professional web presence without technical barriers.
              </p>
              <p className="text-gray-600 mb-6">
                Our AI-driven platform combines the power of decentralized technology with intuitive design tools to revolutionize how crypto projects establish their online identity.
              </p>
              <Link to="/auth">
                <Button className="button-gradient text-white">
                  Start Building Now
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Glass className="p-6 max-w-md">
                <img 
                  src="/placeholder.svg" 
                  alt="About reham.org" 
                  className="rounded-lg w-full"
                />
              </Glass>
            </div>
          </div>
          
          {/* Core Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Glass className="p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                  <Shield className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Decentralization</h3>
                <p className="text-gray-600">
                  We embrace the principles of Web3, building tools that support the decentralized internet and empower individual ownership.
                </p>
              </Glass>
              
              <Glass className="p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mb-4">
                  <Cpu className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We leverage cutting-edge AI technology to create solutions that continuously evolve to meet the needs of the crypto community.
                </p>
              </Glass>
              
              <Glass className="p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center mb-4">
                  <Users className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-gray-600">
                  We believe in making Web3 technology accessible to everyone, regardless of technical expertise or resources.
                </p>
              </Glass>
            </div>
          </div>
          
          {/* Team (Placeholder) */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Team</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              We're a passionate group of developers, designers, and blockchain enthusiasts working to bridge the gap between Web3 technology and everyday users.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Glass key={i} className="p-5 text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
                  <h3 className="font-semibold">Team Member {i}</h3>
                  <p className="text-sm text-gray-500">Position</p>
                </Glass>
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Build Your Web3 Website?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of crypto projects already using reham.org to create stunning, functional websites in minutes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth">
                <Button className="button-gradient text-white">
                  Get Started
                </Button>
              </Link>
              <Link to="/#templates">
                <Button variant="outline">
                  Explore Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
