import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Save, Loader2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SiteSetting {
  id: string;
  key: string;
  value_ar: string | null;
  value_en: string | null;
}

const SiteSettingsManager: React.FC = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key');
      
      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الإعدادات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, valueAr: string, valueEn: string) => {
    try {
      setSaving(true);
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Authentication required');
      }
      
      // First check if setting exists
      const { data: existingSetting } = await supabase
        .from('site_settings')
        .select('id')
        .eq('key', key)
        .single();
      
      if (existingSetting) {
        // Update existing setting
        const { error } = await supabase
          .from('site_settings')
          .update({ 
            value_ar: valueAr, 
            value_en: valueEn,
            updated_at: new Date().toISOString()
          })
          .eq('key', key);
        
        if (error) throw error;
      } else {
        // Create new setting
        const { error } = await supabase
          .from('site_settings')
          .insert({
            key,
            value_ar: valueAr,
            value_en: valueEn
          });
        
        if (error) throw error;
      }
      
      toast({
        title: "تم الحفظ",
        description: "تم تحديث الإعدادات بنجاح",
      });
      
      fetchSettings();
    } catch (error: any) {
      console.error('Error updating setting:', error);
      toast({
        title: "خطأ",
        description: error.message || "فشل في حفظ الإعدادات",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('admin-uploads')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('admin-uploads')
        .getPublicUrl(fileName);
      
      await updateSetting('logo_url', publicUrl, publicUrl);
      
      toast({
        title: "تم الرفع",
        description: "تم رفع الشعار بنجاح",
      });
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast({
        title: "خطأ",
        description: "فشل في رفع الشعار",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getSetting = (key: string) => {
    return settings.find(s => s.key === key);
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
        <h2 className="text-2xl font-bold">إعدادات الموقع</h2>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="logo">الشعار</TabsTrigger>
          <TabsTrigger value="contact">التواصل</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>العنوان والوصف</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site_title_ar">عنوان الموقع (عربي)</Label>
                <Input
                  id="site_title_ar"
                  value={getSetting('site_title')?.value_ar || ''}
                  onChange={(e) => {
                    const setting = getSetting('site_title');
                    if (setting) {
                      updateSetting('site_title', e.target.value, setting.value_en || '');
                    }
                  }}
                  placeholder="أدخل عنوان الموقع بالعربية"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site_title_en">عنوان الموقع (إنجليزي)</Label>
                <Input
                  id="site_title_en"
                  value={getSetting('site_title')?.value_en || ''}
                  onChange={(e) => {
                    const setting = getSetting('site_title');
                    if (setting) {
                      updateSetting('site_title', setting.value_ar || '', e.target.value);
                    }
                  }}
                  placeholder="Enter site title in English"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_description_ar">وصف الموقع (عربي)</Label>
                <Textarea
                  id="site_description_ar"
                  value={getSetting('site_description')?.value_ar || ''}
                  onChange={(e) => {
                    const setting = getSetting('site_description');
                    if (setting) {
                      updateSetting('site_description', e.target.value, setting.value_en || '');
                    }
                  }}
                  placeholder="أدخل وصف الموقع بالعربية"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_description_en">وصف الموقع (إنجليزي)</Label>
                <Textarea
                  id="site_description_en"
                  value={getSetting('site_description')?.value_en || ''}
                  onChange={(e) => {
                    const setting = getSetting('site_description');
                    if (setting) {
                      updateSetting('site_description', setting.value_ar || '', e.target.value);
                    }
                  }}
                  placeholder="Enter site description in English"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إدارة الشعار</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                  {getSetting('logo_url')?.value_ar ? (
                    <img
                      src={getSetting('logo_url')?.value_ar || ''}
                      alt="شعار الموقع"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo_upload">رفع شعار جديد</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="logo_upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
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
                  <p className="text-sm text-muted-foreground">
                    يُفضل أن يكون الشعار بصيغة PNG أو SVG بخلفية شفافة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>معلومات التواصل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">البريد الإلكتروني</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={getSetting('contact_email')?.value_ar || ''}
                  onChange={(e) => {
                    updateSetting('contact_email', e.target.value, e.target.value);
                  }}
                  placeholder="أدخل البريد الإلكتروني"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_phone">رقم الهاتف</Label>
                <Input
                  id="contact_phone"
                  value={getSetting('contact_phone')?.value_ar || ''}
                  onChange={(e) => {
                    updateSetting('contact_phone', e.target.value, e.target.value);
                  }}
                  placeholder="أدخل رقم الهاتف"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettingsManager;