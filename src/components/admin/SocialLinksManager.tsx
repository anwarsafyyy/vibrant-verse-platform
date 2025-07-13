import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save, Trash2, Loader2, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_active: boolean;
  order_index: number;
}

const SocialLinksManager: React.FC = () => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const availablePlatforms = [
    { value: 'twitter', label: 'تويتر', icon: 'twitter' },
    { value: 'instagram', label: 'إنستغرام', icon: 'instagram' },
    { value: 'linkedin', label: 'لينكدإن', icon: 'linkedin' },
    { value: 'facebook', label: 'فيسبوك', icon: 'facebook' },
    { value: 'whatsapp', label: 'واتساب', icon: 'phone' },
    { value: 'telegram', label: 'تلغرام', icon: 'send' },
    { value: 'youtube', label: 'يوتيوب', icon: 'play' },
    { value: 'tiktok', label: 'تيك توك', icon: 'music' }
  ];

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching social links:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل روابط التواصل الاجتماعي",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addNewLink = () => {
    const newLink: SocialLink = {
      id: '',
      platform: '',
      url: '',
      icon: '',
      is_active: true,
      order_index: links.length
    };
    setLinks([...links, newLink]);
  };

  const updateLink = (index: number, field: keyof SocialLink, value: any) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    
    // Auto-update icon when platform changes
    if (field === 'platform') {
      const platform = availablePlatforms.find(p => p.value === value);
      if (platform) {
        updatedLinks[index].icon = platform.icon;
      }
    }
    
    setLinks(updatedLinks);
  };

  const removeLink = async (index: number) => {
    const link = links[index];
    
    if (link.id) {
      try {
        const { error } = await supabase
          .from('social_links')
          .delete()
          .eq('id', link.id);
        
        if (error) throw error;
        
        toast({
          title: "تم الحذف",
          description: "تم حذف الرابط بنجاح",
        });
      } catch (error) {
        console.error('Error deleting link:', error);
        toast({
          title: "خطأ",
          description: "فشل في حذف الرابط",
          variant: "destructive",
        });
        return;
      }
    }
    
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const saveSocialLinks = async () => {
    try {
      setSaving(true);
      
      // Separate new links from existing ones
      const existingLinks = links.filter(link => link.id);
      const newLinks = links.filter(link => !link.id);
      
      // Update existing links
      for (const link of existingLinks) {
        const { error } = await supabase
          .from('social_links')
          .update({
            platform: link.platform,
            url: link.url,
            icon: link.icon,
            is_active: link.is_active,
            order_index: link.order_index
          })
          .eq('id', link.id);
        
        if (error) throw error;
      }
      
      // Insert new links
      if (newLinks.length > 0) {
        const { error } = await supabase
          .from('social_links')
          .insert(newLinks.map(link => ({
            platform: link.platform,
            url: link.url,
            icon: link.icon,
            is_active: link.is_active,
            order_index: link.order_index
          })));
        
        if (error) throw error;
      }
      
      toast({
        title: "تم الحفظ",
        description: "تم حفظ روابط التواصل الاجتماعي بنجاح",
      });
      
      fetchSocialLinks();
    } catch (error) {
      console.error('Error saving social links:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ الروابط",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة روابط التواصل الاجتماعي</h2>
        <div className="flex gap-2">
          <Button onClick={addNewLink} variant="outline">
            <Plus className="h-4 w-4 ml-2" />
            إضافة رابط جديد
          </Button>
          <Button onClick={saveSocialLinks} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <Save className="h-4 w-4 ml-2" />}
            حفظ التغييرات
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {links.map((link, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">
                  {link.platform ? availablePlatforms.find(p => p.value === link.platform)?.label || link.platform : `رابط ${index + 1}`}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                  <Switch
                    checked={link.is_active}
                    onCheckedChange={(checked) => updateLink(index, 'is_active', checked)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeLink(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>المنصة</Label>
                  <Select
                    value={link.platform}
                    onValueChange={(value) => updateLink(index, 'platform', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المنصة" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePlatforms.map((platform) => (
                        <SelectItem key={platform.value} value={platform.value}>
                          {platform.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>الرابط</Label>
                  <Input
                    value={link.url}
                    onChange={(e) => updateLink(index, 'url', e.target.value)}
                    placeholder="https://..."
                    type="url"
                  />
                </div>

                <div className="space-y-2">
                  <Label>الأيقونة</Label>
                  <Input
                    value={link.icon}
                    onChange={(e) => updateLink(index, 'icon', e.target.value)}
                    placeholder="اسم الأيقونة"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {links.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">لا توجد روابط تواصل اجتماعي</p>
              <Button onClick={addNewLink} variant="outline">
                <Plus className="h-4 w-4 ml-2" />
                إضافة أول رابط
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SocialLinksManager;