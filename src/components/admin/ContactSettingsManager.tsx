import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Save, Phone, Mail, MapPin, Globe } from 'lucide-react';

interface ContactSettings {
  id?: string;
  address_ar: string;
  address_en: string;
  phone: string;
  email: string;
  map_embed_url?: string;
  is_active: boolean;
}

const ContactSettingsManager = () => {
  const [contactSettings, setContactSettings] = useState<ContactSettings>({
    address_ar: '',
    address_en: '',
    phone: '',
    email: '',
    map_embed_url: '',
    is_active: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContactSettings();
  }, []);

  const fetchContactSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_settings')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching contact settings:', error);
        return;
      }

      if (data) {
        setContactSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch contact settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      // First, deactivate any existing active settings
      if (contactSettings.is_active) {
        await supabase
          .from('contact_settings')
          .update({ is_active: false })
          .neq('id', contactSettings.id || '');
      }

      if (contactSettings.id) {
        // Update existing
        const { error } = await supabase
          .from('contact_settings')
          .update({
            address_ar: contactSettings.address_ar,
            address_en: contactSettings.address_en,
            phone: contactSettings.phone,
            email: contactSettings.email,
            map_embed_url: contactSettings.map_embed_url,
            is_active: contactSettings.is_active,
          })
          .eq('id', contactSettings.id);

        if (error) throw error;
      } else {
        // Insert new
        const { data, error } = await supabase
          .from('contact_settings')
          .insert([contactSettings])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setContactSettings({ ...contactSettings, id: data.id });
        }
      }

      toast({
        title: 'تم حفظ الإعدادات',
        description: 'تم حفظ إعدادات التواصل بنجاح',
      });
    } catch (error: any) {
      console.error('Error saving contact settings:', error);
      toast({
        title: 'خطأ في الحفظ',
        description: error.message || 'حدث خطأ أثناء حفظ الإعدادات',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="mr-2">جاري تحميل الإعدادات...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            إعدادات التواصل
          </CardTitle>
          <CardDescription>
            إدارة معلومات التواصل التي تظهر في الموقع
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address_ar" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                العنوان (عربي)
              </Label>
              <Input
                id="address_ar"
                value={contactSettings.address_ar}
                onChange={(e) => setContactSettings({ ...contactSettings, address_ar: e.target.value })}
                placeholder="المملكة العربية السعودية، جازان"
              />
            </div>
            <div>
              <Label htmlFor="address_en" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                العنوان (إنجليزي)
              </Label>
              <Input
                id="address_en"
                value={contactSettings.address_en}
                onChange={(e) => setContactSettings({ ...contactSettings, address_en: e.target.value })}
                placeholder="Jazan, Saudi Arabia"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                رقم الجوال
              </Label>
              <Input
                id="phone"
                value={contactSettings.phone}
                onChange={(e) => setContactSettings({ ...contactSettings, phone: e.target.value })}
                placeholder="+966 50 869 4899"
              />
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                type="email"
                value={contactSettings.email}
                onChange={(e) => setContactSettings({ ...contactSettings, email: e.target.value })}
                placeholder="info@olu-it.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="map_embed_url" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              رابط الخريطة (Google Map Embed URL)
            </Label>
            <Input
              id="map_embed_url"
              value={contactSettings.map_embed_url || ''}
              onChange={(e) => setContactSettings({ ...contactSettings, map_embed_url: e.target.value })}
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={contactSettings.is_active}
              onCheckedChange={(checked) => setContactSettings({ ...contactSettings, is_active: checked })}
            />
            <Label htmlFor="is_active">تفعيل الإعدادات</Label>
          </div>

          <div className="pt-4">
            <Button onClick={saveSettings} disabled={saving} className="w-full">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  حفظ الإعدادات
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSettingsManager;