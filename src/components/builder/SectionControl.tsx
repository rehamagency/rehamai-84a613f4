
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PlusCircle, Trash2, GripVertical, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { Glass } from '@/components/ui/Glass';

type Section = {
  id: string;
  type: string;
  name: string;
  content: any;
};

type SectionControlProps = {
  sections: Section[];
  onSectionsChange: (sections: Section[]) => void;
  availableSections: {id: string; type: string; name: string}[];
};

export const SectionControl = ({ 
  sections, 
  onSectionsChange, 
  availableSections 
}: SectionControlProps) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpanded(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onSectionsChange(items);
  };

  const addSection = (type: string) => {
    const section = availableSections.find(s => s.type === type);
    if (!section) return;
    
    const newSection = {
      id: `section-${Date.now()}`,
      type: section.type,
      name: section.name,
      content: { /* Default content for this section type */ },
    };
    
    onSectionsChange([...sections, newSection]);
    // Auto expand the new section
    setExpanded(prev => [...prev, newSection.id]);
  };

  const removeSection = (id: string) => {
    onSectionsChange(sections.filter(section => section.id !== id));
    setExpanded(prev => prev.filter(i => i !== id));
  };

  const duplicateSection = (index: number) => {
    const sectionToDuplicate = sections[index];
    const newSection = {
      ...sectionToDuplicate,
      id: `section-${Date.now()}`,
    };
    
    const newSections = [...sections];
    newSections.splice(index + 1, 0, newSection);
    onSectionsChange(newSections);
    // Auto expand the duplicated section
    setExpanded(prev => [...prev, newSection.id]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Website Sections</h3>
        <div className="flex gap-2">
          <select 
            className="text-sm border border-gray-300 rounded-md px-2 py-1"
            onChange={(e) => e.target.value && addSection(e.target.value)}
            value=""
          >
            <option value="" disabled>Add Section</option>
            {availableSections.map(section => (
              <option key={section.id} value={section.type}>
                {section.name}
              </option>
            ))}
          </select>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addSection(availableSections[0]?.type || 'header')}
          >
            <PlusCircle className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {sections.map((section, index) => (
                <Draggable key={section.id} draggableId={section.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-white rounded-md border border-gray-200 overflow-hidden"
                    >
                      <Collapsible 
                        open={expanded.includes(section.id)} 
                        onOpenChange={() => toggleExpand(section.id)}
                      >
                        <div className="flex items-center justify-between p-3 bg-gray-50">
                          <div className="flex items-center">
                            <div 
                              {...provided.dragHandleProps} 
                              className="mr-2 cursor-grab text-gray-500 hover:text-gray-700"
                            >
                              <GripVertical className="h-4 w-4" />
                            </div>
                            <span className="font-medium">{section.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => duplicateSection(index)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeSection(section.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="sm">
                                {expanded.includes(section.id) ? 
                                  <ChevronUp className="h-4 w-4" /> : 
                                  <ChevronDown className="h-4 w-4" />
                                }
                              </Button>
                            </CollapsibleTrigger>
                          </div>
                        </div>
                        <CollapsibleContent>
                          <div className="p-4 border-t border-gray-200">
                            <div className="text-sm text-gray-500 mb-2">
                              Section Editor ({section.type})
                            </div>
                            <div className="bg-gray-100 p-4 rounded-md text-center text-gray-500 text-sm">
                              Section editor for {section.name} will be displayed here
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {sections.length === 0 && (
        <Glass variant="card" className="p-6 text-center">
          <p className="text-gray-500 mb-4">No sections added yet</p>
          <Button 
            onClick={() => addSection(availableSections[0]?.type || 'header')}
            className="button-gradient text-white"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Your First Section
          </Button>
        </Glass>
      )}
    </div>
  );
};
