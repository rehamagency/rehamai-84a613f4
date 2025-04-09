
import { supabase } from '@/integrations/supabase/client';

export type Template = {
  id: string;
  name: string;
  description: string | null;
  content: any;
  thumbnail_url: string | null;
  category: string | null;
  is_premium: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

export type ContentBlock = {
  id: string;
  name: string;
  type: string;
  description: string | null;
  config: any | null;
  is_premium: boolean | null;
};

export const fetchTemplates = async (): Promise<Template[]> => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
};

export const fetchContentBlocks = async (): Promise<ContentBlock[]> => {
  try {
    const { data, error } = await supabase
      .from('content_blocks')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching content blocks:', error);
    throw error;
  }
};

export const fetchTemplate = async (id: string): Promise<Template | null> => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching template:', error);
    return null;
  }
};

export const checkSubdomainAvailability = async (subdomain: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('id')
      .eq('subdomain', subdomain)
      .limit(1);

    if (error) throw error;
    return (data || []).length === 0;
  } catch (error) {
    console.error('Error checking subdomain availability:', error);
    throw error;
  }
};

export const saveWebsite = async (
  websiteData: any, 
  userId: string, 
  isNew: boolean = true
): Promise<any> => {
  try {
    const website = {
      ...websiteData,
      user_id: userId,
      published: websiteData.published || false,
    };

    let response;
    if (isNew) {
      response = await supabase
        .from('websites')
        .insert(website)
        .select()
        .single();
    } else {
      const { id, ...updateData } = website;
      response = await supabase
        .from('websites')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
    }

    if (response.error) throw response.error;
    return response.data;
  } catch (error) {
    console.error('Error saving website:', error);
    throw error;
  }
};

export const fetchWebsite = async (id: string): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('websites')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching website:', error);
    throw error;
  }
};

export const fetchWebsiteContent = async (websiteId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('website_content')
      .select('*')
      .eq('website_id', websiteId)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching website content:', error);
    throw error;
  }
};

export const saveWebsiteContent = async (
  websiteId: string, 
  content: any[]
): Promise<void> => {
  try {
    // First delete existing content
    const { error: deleteError } = await supabase
      .from('website_content')
      .delete()
      .eq('website_id', websiteId);

    if (deleteError) throw deleteError;

    // Then insert new content
    if (content.length > 0) {
      const contentToInsert = content.map((item, index) => ({
        website_id: websiteId,
        content_type: item.type,
        order_index: index,
        content: item.content,
      }));

      const { error: insertError } = await supabase
        .from('website_content')
        .insert(contentToInsert);

      if (insertError) throw insertError;
    }
  } catch (error) {
    console.error('Error saving website content:', error);
    throw error;
  }
};

// New functions

export const publishWebsite = async (websiteId: string, isPublishing: boolean): Promise<void> => {
  try {
    const { error } = await supabase
      .from('websites')
      .update({ published: isPublishing })
      .eq('id', websiteId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating publish status:', error);
    throw error;
  }
};

export const deleteWebsite = async (websiteId: string): Promise<void> => {
  try {
    // First delete all website content
    const { error: contentDeleteError } = await supabase
      .from('website_content')
      .delete()
      .eq('website_id', websiteId);

    if (contentDeleteError) throw contentDeleteError;

    // Then delete the website
    const { error: websiteDeleteError } = await supabase
      .from('websites')
      .delete()
      .eq('id', websiteId);

    if (websiteDeleteError) throw websiteDeleteError;
  } catch (error) {
    console.error('Error deleting website:', error);
    throw error;
  }
};

export const duplicateWebsite = async (websiteId: string, userId: string): Promise<any> => {
  try {
    // Fetch original website
    const website = await fetchWebsite(websiteId);
    if (!website) throw new Error('Website not found');
    
    // Fetch website content
    const content = await fetchWebsiteContent(websiteId);
    
    // Create new website
    const newWebsiteName = `${website.name} (Copy)`;
    const newSubdomain = `${website.subdomain}-copy`;
    
    const newWebsite = {
      ...website,
      id: undefined, // Remove id to create a new record
      user_id: userId,
      name: newWebsiteName,
      subdomain: newSubdomain,
      published: false,
      created_at: undefined,
      updated_at: undefined
    };
    
    const savedWebsite = await saveWebsite(newWebsite, userId, true);
    
    if (content.length > 0) {
      const newContent = content.map(item => ({
        type: item.content_type,
        content: item.content,
        id: `section-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      }));
      
      await saveWebsiteContent(savedWebsite.id, newContent);
    }
    
    return savedWebsite;
  } catch (error) {
    console.error('Error duplicating website:', error);
    throw error;
  }
};
