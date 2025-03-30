
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowRight, Tag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Glass } from '@/components/ui/Glass';
import { Badge } from '@/components/ui/badge';
import { fetchTemplates } from '@/services/templateService';
import type { Template } from '@/services/templateService';
import { useToast } from '@/hooks/use-toast';
import DarkModeToggle from '@/components/DarkModeToggle';

type TemplateCategory = 'all' | 'business' | 'portfolio' | 'blog' | 'ecommerce' | 'nft';

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<TemplateCategory>('all');
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    return () => {
      document.body.classList.remove('dark');
    };
  }, [darkMode]);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        const data = await fetchTemplates();
        setTemplates(data);
        setFilteredTemplates(data);
      } catch (error) {
        console.error('Error loading templates:', error);
        toast({
          title: 'Error',
          description: 'Failed to load templates. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, [toast]);

  useEffect(() => {
    if (searchTerm.trim() === '' && category === 'all') {
      setFilteredTemplates(templates);
      return;
    }

    let filtered = templates;

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(template => 
        template.category === category
      );
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(term) || 
        template.description?.toLowerCase().includes(term)
      );
    }

    setFilteredTemplates(filtered);
  }, [templates, searchTerm, category]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectTemplate = (templateId: string) => {
    navigate(`/builder/new?template=${templateId}`);
  };

  const getCategoryBadgeColor = (cat: TemplateCategory) => {
    switch (cat) {
      case 'business': return 'bg-blue-500 text-white';
      case 'portfolio': return 'bg-purple-500 text-white';
      case 'blog': return 'bg-green-500 text-white';
      case 'ecommerce': return 'bg-amber-500 text-white';
      case 'nft': return 'bg-pink-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const categories: { value: TemplateCategory; label: string }[] = [
    { value: 'all', label: 'All Templates' },
    { value: 'business', label: 'Business' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'blog', label: 'Blog' },
    { value: 'ecommerce', label: 'E-Commerce' },
    { value: 'nft', label: 'NFT' },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      
      <div className={`border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Templates</h1>
              <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Choose a template to kickstart your Web3 website
              </p>
            </div>
            <div className="flex items-center">
              <DarkModeToggle 
                variant="button" 
                className="ml-2"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <Input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={`pl-10 w-full ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500' 
                  : 'bg-white border-gray-300'
              }`}
            />
          </div>
          
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={category === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat.value)}
                className={
                  category === cat.value
                    ? "bg-primary text-white"
                    : darkMode
                    ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                    : ""
                }
              >
                {cat.value !== 'all' && <Tag className="h-3 w-3 mr-1" />}
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className={`rounded-lg h-64 animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
              ></div>
            ))}
          </div>
        ) : filteredTemplates.length === 0 ? (
          <Glass 
            className="p-8 text-center my-12"
            variant={darkMode ? 'dark' : 'default'}
          >
            <h3 className="text-xl font-medium mb-3">No Templates Found</h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => { setSearchTerm(''); setCategory('all'); }}>
              Reset Filters
            </Button>
          </Glass>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div 
                key={template.id}
                className={`rounded-lg overflow-hidden border transition-all hover:shadow-lg ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <AspectRatio ratio={16/9}>
                  <img 
                    src={template.thumbnail_url || '/placeholder.svg'} 
                    alt={template.name}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {template.category && (
                      <Badge variant="secondary" className={getCategoryBadgeColor(template.category as TemplateCategory)}>
                        {template.category}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                  <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {template.description || 'A beautiful web3 template for your project'}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                      {template.is_premium ? 'Premium' : 'Free'}
                    </span>
                    <Button 
                      onClick={() => handleSelectTemplate(template.id)}
                      className="button-gradient text-white"
                    >
                      Use Template
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Templates;
