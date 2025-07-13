import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Upload, Save, Loader2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface HeroContent {
  id: string;
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  cta_text_ar: string;
  cta_text_en: string;
  cta_link: string;
  background_image_url?: string;
  is_active: boolean;
}

const HeroContentManager: React.FC = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      setContent(data);
    } catch (error) {
      console.error('Error fetching hero content:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل محتوى القسم الرئيسي",
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
      
      if (content.id) {
        const { error } = await supabase
          .from('hero_content')
          .update({
            title_ar: content.title_ar,
            title_en: content.title_en,
            subtitle_ar: content.subtitle_ar,
            subtitle_en: content.subtitle_en,
            cta_text_ar: content.cta_text_ar,
            cta_text_en: content.cta_text_en,
            cta_link: content.cta_link,
            background_image_url: content.background_image_url,
            is_active: content.is_active,
          })
          .eq('id', content.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('hero_content')
          .insert([content]);
        
        if (error) throw error;
      }
      
      toast({
        title: "تم الحفظ",
        description: "تم حفظ محتوى القسم الرئيسي بنجاح",
      });
      
      fetchHeroContent();
    } catch (error) {
      console.error('Error saving hero content:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ المحتوى",
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
      const fileName = `hero-bg-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('admin-uploads')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('admin-uploads')
        .getPublicUrl(fileName);
      
      setContent({ ...content, background_image_url: publicUrl });
      
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
        <p className="text-muted-foreground mb-4">لا يوجد محتوى للقسم الرئيسي</p>
        <Button onClick={() => setContent({
          id: '',
          title_ar: '',
          title_en: '',
          subtitle_ar: '',
          subtitle_en: '',
          cta_text_ar: '',
          cta_text_en: '',
          cta_link: '',
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
        <h2 className="text-2xl font-bold">إدارة القسم الرئيسي</h2>
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
                placeholder="أدخل العنوان الرئيسي"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle_ar">العنوان الفرعي</Label>
              <Textarea
                id="subtitle_ar"
                value={content.subtitle_ar}
                onChange={(e) => setContent({ ...content, subtitle_ar: e.target.value })}
                placeholder="أدخل العنوان الفرعي"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_text_ar">نص الزر</Label>
              <Input
                id="cta_text_ar"
                value={content.cta_text_ar}
                onChange={(e) => setContent({ ...content, cta_text_ar: e.target.value })}
                placeholder="أدخل نص الزر"
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
                placeholder="Enter main title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle_en">Subtitle</Label>
              <Textarea
                id="subtitle_en"
                value={content.subtitle_en}
                onChange={(e) => setContent({ ...content, subtitle_en: e.target.value })}
                placeholder="Enter subtitle"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_text_en">Button Text</Label>
              <Input
                id="cta_text_en"
                value={content.cta_text_en}
                onChange={(e) => setContent({ ...content, cta_text_en: e.target.value })}
                placeholder="Enter button text"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الإعدادات العامة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cta_link">رابط الزر</Label>
            <Input
              id="cta_link"
              value={content.cta_link}
              onChange={(e) => setContent({ ...content, cta_link: e.target.value })}
              placeholder="أدخل رابط الزر (مثال: #contact)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bg_image">صورة الخلفية (اختيارية)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="bg_image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              <Button disabled={uploading} variant="outline">
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                رفع
              </Button>
            </div>
            {content.background_image_url && (
              <div className="mt-2">
                <img
                  src={content.background_image_url}
                  alt="صورة الخلفية"
                  className="max-w-32 h-20 object-cover rounded border"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroContentManager;