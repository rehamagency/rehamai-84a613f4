
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { fetchTemplates } from '@/services/templateService';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { Template } from '@/services/templateService';

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [templates, searchTerm, category]);

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

  const filterTemplates = () => {
    let filtered = templates;
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(template => template.category === category);
    }
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchLower) ||
        (template.description && template.description.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredTemplates(filtered);
  };

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
  };

  const handleUseTemplate = (template: Template) => {
    navigate('/builder/new', { state: { templateId: template.id } });
  };

  const categories = ['all', ...new Set(templates.map(t => t.category || 'uncategorized'))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-2">Web3 Templates</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our collection of professionally designed templates 
              to kickstart your Web3 project
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div className="w-full md:w-auto">
              <Tabs defaultValue={category} onValueChange={setCategory}>
                <TabsList>
                  {categories.map(cat => (
                    <TabsTrigger key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search templates..."
                className="pl-10"
              />
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-t-web3-blue rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTemplates.map(template => (
                    <TemplateCard 
                      key={template.id} 
                      template={template} 
                      onPreview={handlePreview}
                      onSelect={handleUseTemplate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <h3 className="text-xl font-medium mb-2">No templates found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
      
      <Dialog open={!!previewTemplate} onOpenChange={(open) => !open && setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{previewTemplate?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-auto">
            {previewTemplate?.thumbnail_url && (
              <img 
                src={previewTemplate.thumbnail_url} 
                alt={previewTemplate.name}
                className="w-full max-h-[50vh] object-cover mb-6 rounded-md"
              />
            )}
            <p className="mb-6">{previewTemplate?.description}</p>
            
            <Button 
              className="button-gradient text-white" 
              onClick={() => { 
                handleUseTemplate(previewTemplate as Template);
                setPreviewTemplate(null);
              }}
            >
              Use This Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Templates;
