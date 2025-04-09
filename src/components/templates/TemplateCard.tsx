
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Glass } from '@/components/ui/Glass';
import type { Template } from '@/services/templateService';

interface TemplateCardProps {
  template: Template;
  onPreview?: (template: Template) => void;
  onSelect?: (template: Template) => void;
}

export const TemplateCard = ({ 
  template,
  onPreview,
  onSelect
}: TemplateCardProps) => {
  const navigate = useNavigate();

  const handleCreateWebsite = () => {
    navigate('/builder/new', { state: { templateId: template.id } });
  };

  return (
    <Glass className="overflow-hidden transition-all hover:shadow-md" variant="card">
      <div className="relative">
        <img
          src={template.thumbnail_url || 'https://via.placeholder.com/500x300?text=Template+Preview'}
          alt={template.name}
          className="w-full h-48 object-cover"
        />
        {template.is_premium && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Star className="h-3 w-3 mr-1 text-yellow-400" />
            PRO
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-lg">{template.name}</h3>
        <p className="text-sm text-gray-600 mt-1 mb-4">{template.description}</p>
        
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onPreview && onPreview(template)}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview
          </Button>
          
          <Button 
            className="button-gradient text-white" 
            size="sm"
            onClick={onSelect ? () => onSelect(template) : handleCreateWebsite}
          >
            Use Template
          </Button>
        </div>
      </div>
    </Glass>
  );
};
