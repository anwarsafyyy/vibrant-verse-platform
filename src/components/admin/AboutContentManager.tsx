import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Upload, Save, Loader2, Eye, EyeOff, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AboutContent {
  id: string;
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  description_ar: string;
  description_en: string;
  innovation_text_ar: string;
  innovation_text_en: string;
  quality_text_ar: string;
  quality_text_en: string;
  partnership_text_ar: string;
  partnership_text_en: string;
  image_url?: string;
  cta_text_ar: string;
  cta_text_en: string;
  is_active: boolean;
}

const AboutContentManager: React.FC = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setContent(data[0]);
      } else {
        setContent(null);
      }
    } catch (error: any) {
      console.error('Error fetching about content:', error);
      toast({
        title: "خطأ",
        description: error.message || "فشل في تحميل محتوى قسم من نحن",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    if (!content) return;

    try {
      setSaving(true);
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Authentication required');
      }
      
      if (content.id) {
        // Deactivate all other about content
        await supabase
          .from('about_content')
          .update({ is_active: false })
          .neq('id', content.id);
          
        const { error } = await supabase
          .from('about_content')
          .update({
            title_ar: content.title_ar,
            title_en: content.title_en,
            subtitle_ar: content.subtitle_ar,
            subtitle_en: content.subtitle_en,
            description_ar: content.description_ar,
            description_en: content.description_en,
            innovation_text_ar: content.innovation_text_ar,
            innovation_text_en: content.innovation_text_en,
            quality_text_ar: content.quality_text_ar,
            quality_text_en: content.quality_text_en,
            partnership_text_ar: content.partnership_text_ar,
            partnership_text_en: content.partnership_text_en,
            image_url: content.image_url,
            cta_text_ar: content.cta_text_ar,
            cta_text_en: content.cta_text_en,
            is_active: content.is_active,
            updated_at: new Date().toISOString()
          })
          .eq('id', content.id);
        
        if (error) throw error;
      } else {
        // Deactivate all other about content when creating new one
        if (content.is_active) {
          await supabase
            .from('about_content')
            .update({ is_active: false });
        }
        
        const { data, error } = await supabase
          .from('about_content')
          .insert([{
            title_ar: content.title_ar,
            title_en: content.title_en,
            subtitle_ar: content.subtitle_ar,
            subtitle_en: content.subtitle_en,
            description_ar: content.description_ar,
            description_en: content.description_en,
            innovation_text_ar: content.innovation_text_ar,
            innovation_text_en: content.innovation_text_en,
            quality_text_ar: content.quality_text_ar,
            quality_text_en: content.quality_text_en,
            partnership_text_ar: content.partnership_text_ar,
            partnership_text_en: content.partnership_text_en,
            image_url: content.image_url,
            cta_text_ar: content.cta_text_ar,
            cta_text_en: content.cta_text_en,
            is_active: content.is_active
          }])
          .select()
          .single();
        
        if (error) throw error;
        if (data) {
          setContent(data);
        }
      }
      
      toast({
        title: "تم الحفظ",
        description: "تم حفظ محتوى قسم من نحن بنجاح",
      });
      
      // Refresh data
      fetchAboutContent();
    } catch (error: any) {
      console.error('Error saving about content:', error);
      toast({
        title: "خطأ",
        description: error.message || "فشل في حفظ المحتوى",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !content) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `about-img-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('admin-uploads')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('admin-uploads')
        .getPublicUrl(fileName);
      
      setContent({ ...content, image_url: publicUrl });
      
      toast({
        title: "تم الرفع",
        description: "تم رفع الصورة بنجاح",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "خطأ",
        description: "فشل في رفع الصورة",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!content?.image_url) return;
    
    try {
      // Extract filename from URL for deletion
      const fileName = content.image_url.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('admin-uploads')
          .remove([fileName]);
      }
      
      setContent({ ...content, image_url: '' });
      
      toast({
        title: "تم الحذف",
        description: "تم حذف الصورة بنجاح",
      });
    } catch (error) {
      console.error('Error removing image:', error);
      toast({
        title: "خطأ",
        description: "فشل في حذف الصورة",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground mb-4">لا يوجد محتوى لقسم من نحن</p>
        <Button onClick={() => setContent({
          id: '',
          title_ar: '',
          title_en: '',
          subtitle_ar: '',
          subtitle_en: '',
          description_ar: '',
          description_en: '',
          innovation_text_ar: '',
          innovation_text_en: '',
          quality_text_ar: '',
          quality_text_en: '',
          partnership_text_ar: '',
          partnership_text_en: '',
          cta_text_ar: '',
          cta_text_en: '',
          is_active: true
        })}>
          إنشاء محتوى جديد
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة قسم من نحن</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={content.is_active}
              onCheckedChange={(checked) => setContent({ ...content, is_active: checked })}
            />
            <Label>{content.is_active ? 'مفعل' : 'معطل'}</Label>
            {content.is_active ? (
              <Eye className="h-4 w-4 text-green-500" />
            ) : (
              <EyeOff className="h-4 w-4 text-gray-400" />
            )}
          </div>
          <Button onClick={saveContent} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <Save className="h-4 w-4 ml-2" />}
            حفظ التغييرات
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>المحتوى العربي</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title_ar">العنوان الرئيسي</Label>
              <Input
                id="title_ar"
                value={content.title_ar}
                onChange={(e) => setContent({ ...content, title_ar: e.target.value })}
                placeholder="من نحن"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle_ar">العنوان الفرعي</Label>
              <Input
                id="subtitle_ar"
                value={content.subtitle_ar}
                onChange={(e) => setContent({ ...content, subtitle_ar: e.target.value })}
                placeholder="نحن فريق من المطورين المحترفين"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_ar">الوصف</Label>
              <Textarea
                id="description_ar"
                value={content.description_ar}
                onChange={(e) => setContent({ ...content, description_ar: e.target.value })}
                placeholder="وصف الشركة والخدمات"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="innovation_text_ar">نص الابتكار</Label>
              <Input
                id="innovation_text_ar"
                value={content.innovation_text_ar}
                onChange={(e) => setContent({ ...content, innovation_text_ar: e.target.value })}
                placeholder="الابتكار والإبداع في كل مشروع"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality_text_ar">نص الجودة</Label>
              <Input
                id="quality_text_ar"
                value={content.quality_text_ar}
                onChange={(e) => setContent({ ...content, quality_text_ar: e.target.value })}
                placeholder="جودة عالية في التصميم والتطوير"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="partnership_text_ar">نص الشراكة</Label>
              <Input
                id="partnership_text_ar"
                value={content.partnership_text_ar}
                onChange={(e) => setContent({ ...content, partnership_text_ar: e.target.value })}
                placeholder="شراكة حقيقية مع عملائنا"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_text_ar">نص الزر</Label>
              <Input
                id="cta_text_ar"
                value={content.cta_text_ar}
                onChange={(e) => setContent({ ...content, cta_text_ar: e.target.value })}
                placeholder="اسأل سؤال"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>المحتوى الإنجليزي</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title_en">Main Title</Label>
              <Input
                id="title_en"
                value={content.title_en}
                onChange={(e) => setContent({ ...content, title_en: e.target.value })}
                placeholder="About Us"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle_en">Subtitle</Label>
              <Input
                id="subtitle_en"
                value={content.subtitle_en}
                onChange={(e) => setContent({ ...content, subtitle_en: e.target.value })}
                placeholder="We are a team of professional developers"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_en">Description</Label>
              <Textarea
                id="description_en"
                value={content.description_en}
                onChange={(e) => setContent({ ...content, description_en: e.target.value })}
                placeholder="Company and services description"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="innovation_text_en">Innovation Text</Label>
              <Input
                id="innovation_text_en"
                value={content.innovation_text_en}
                onChange={(e) => setContent({ ...content, innovation_text_en: e.target.value })}
                placeholder="Innovation and creativity in every project"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality_text_en">Quality Text</Label>
              <Input
                id="quality_text_en"
                value={content.quality_text_en}
                onChange={(e) => setContent({ ...content, quality_text_en: e.target.value })}
                placeholder="High quality in design and development"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="partnership_text_en">Partnership Text</Label>
              <Input
                id="partnership_text_en"
                value={content.partnership_text_en}
                onChange={(e) => setContent({ ...content, partnership_text_en: e.target.value })}
                placeholder="Real partnership with our clients"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_text_en">Button Text</Label>
              <Input
                id="cta_text_en"
                value={content.cta_text_en}
                onChange={(e) => setContent({ ...content, cta_text_en: e.target.value })}
                placeholder="Ask Question"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>صورة القسم</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Image Preview */}
          {content.image_url && (
            <div className="space-y-2">
              <Label>الصورة الحالية</Label>
              <div className="relative inline-block">
                <img 
                  src={content.image_url} 
                  alt="About section image" 
                  className="max-w-xs h-auto rounded-lg border"
                />
                <Button 
                  onClick={handleRemoveImage}
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Direct URL Input */}
          <div className="space-y-2">
            <Label htmlFor="image_url">رابط الصورة المباشر</Label>
            <Input
              id="image_url"
              type="url"
              value={content.image_url || ''}
              onChange={(e) => setContent({ ...content, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full"
            />
          </div>
          
          {/* File Upload */}
          <div className="space-y-4">
            <Label htmlFor="section_image">أو رفع صورة جديدة من جهازك</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                id="section_image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
              <label htmlFor="section_image" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  {uploading ? (
                    <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
                  ) : (
                    <Upload className="h-12 w-12 text-gray-400" />
                  )}
                  <p className="text-sm text-gray-600">
                    {uploading ? 'جاري الرفع...' : 'انقر لاختيار صورة أو اسحب وأفلت هنا'}
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF حتى 10MB</p>
                </div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutContentManager;