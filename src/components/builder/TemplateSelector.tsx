
import { useState } from 'react';
import { Glass } from '@/components/ui/Glass';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

type Template = {
  id: string;
  name: string;
  description: string | null;
  thumbnail_url: string | null;
  category: string | null;
  is_premium: boolean | null;
};

type TemplateSelectorProps = {
  templates: Template[];
  selectedTemplate: string | null;
  onSelectTemplate: (id: string) => void;
};

export const TemplateSelector = ({ 
  templates, 
  selectedTemplate, 
  onSelectTemplate 
}: TemplateSelectorProps) => {
  const [filter, setFilter] = useState<string>('all');
  
  const categories = ['all', ...new Set(templates.map(t => t.category || 'uncategorized'))];
  
  const filteredTemplates = templates.filter(t => 
    filter === 'all' || t.category === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto pb-2 mb-4 -mx-4 px-4">
        <div className="flex space-x-2">
          {categories.map(category => (
            <Button 
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="whitespace-nowrap"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map(template => (
          <Glass
            key={template.id}
            className={`p-0 overflow-hidden cursor-pointer transition-all ${
              selectedTemplate === template.id 
                ? 'ring-2 ring-blue-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            variant="card"
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="relative">
              <img
                src={template.thumbnail_url || 'https://via.placeholder.com/500x300?text=Template+Preview'}
                alt={template.name}
                className="w-full h-48 object-cover"
              />
              {selectedTemplate === template.id && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                  <div className="bg-white rounded-full p-2">
                    <Check className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              )}
              {template.is_premium && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                  <Star className="h-3 w-3 mr-1 text-yellow-400" />
                  PRO
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            </div>
          </Glass>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center p-12 border border-dashed border-gray-300 rounded-md">
          <p className="text-gray-500">No templates found in this category</p>
        </div>
      )}
    </div>
  );
};
