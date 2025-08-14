import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FooterContent {
  id: string;
  company_description_ar: string;
  company_description_en: string;
  address_ar: string;
  address_en: string;
  phone: string;
  email: string;
  working_hours_ar: string;
  working_hours_en: string;
  copyright_text_ar: string;
  copyright_text_en: string;
}

const FooterContentManager: React.FC = () => {
  const [content, setContent] = useState<FooterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFooterContent();
  }, []);

  const fetchFooterContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('footer_content')
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
      console.error('Error fetching footer content:', error);
      toast({
        title: "خطأ",
        description: error.message || "فشل في تحميل محتوى التذييل",
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
        const { error } = await supabase
          .from('footer_content')
          .update({
            company_description_ar: content.company_description_ar,
            company_description_en: content.company_description_en,
            address_ar: content.address_ar,
            address_en: content.address_en,
            phone: content.phone,
            email: content.email,
            working_hours_ar: content.working_hours_ar,
            working_hours_en: content.working_hours_en,
            copyright_text_ar: content.copyright_text_ar,
            copyright_text_en: content.copyright_text_en,
            updated_at: new Date().toISOString()
          })
          .eq('id', content.id);
        
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('footer_content')
          .insert([{
            company_description_ar: content.company_description_ar,
            company_description_en: content.company_description_en,
            address_ar: content.address_ar,
            address_en: content.address_en,
            phone: content.phone,
            email: content.email,
            working_hours_ar: content.working_hours_ar,
            working_hours_en: content.working_hours_en,
            copyright_text_ar: content.copyright_text_ar,
            copyright_text_en: content.copyright_text_en
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
        description: "تم حفظ محتوى التذييل بنجاح",
      });
      
      // Refresh data
      fetchFooterContent();
    } catch (error: any) {
      console.error('Error saving footer content:', error);
      toast({
        title: "خطأ",
        description: error.message || "فشل في حفظ المحتوى",
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

  if (!content) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground mb-4">لا يوجد محتوى للتذييل</p>
        <Button onClick={() => setContent({
          id: '',
          company_description_ar: 'نبني مستقبلاً رقمياً أفضل من خلال حلول تقنية مبتكرة',
          company_description_en: 'Building a better digital future through innovative technology solutions',
          address_ar: 'المملكة العربية السعودية، جازان',
          address_en: 'Saudi Arabia, Jazan',
          phone: '+966535656226',
          email: 'info@olu-it.com',
          working_hours_ar: '09 صباحاً - 05 مساءً من السبت إلى الخميس',
          working_hours_en: '09 AM - 05 PM Saturday to Thursday',
          copyright_text_ar: 'جميع الحقوق محفوظة © 2025 شركة علو لتقنية المعلومات. تطوير بواسطة فريق علو',
          copyright_text_en: 'All Rights Reserved © 2025 Olu Information Technology Company. Developed by Olu Team'
        })}>
          إنشاء محتوى جديد
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">إدارة محتوى التذييل</h2>
        <Button onClick={saveContent} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <Save className="h-4 w-4 ml-2" />}
          حفظ التغييرات
        </Button>
      </div>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">وصف الشركة</TabsTrigger>
          <TabsTrigger value="contact">معلومات التواصل</TabsTrigger>
          <TabsTrigger value="copyright">حقوق الطبع</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>وصف الشركة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company_desc_ar">الوصف (عربي)</Label>
                <Textarea
                  id="company_desc_ar"
                  value={content.company_description_ar}
                  onChange={(e) => setContent({ ...content, company_description_ar: e.target.value })}
                  placeholder="وصف مختصر عن الشركة بالعربية"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_desc_en">الوصف (إنجليزي)</Label>
                <Textarea
                  id="company_desc_en"
                  value={content.company_description_en}
                  onChange={(e) => setContent({ ...content, company_description_en: e.target.value })}
                  placeholder="Brief company description in English"
                  rows={3}
                />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address_ar">العنوان (عربي)</Label>
                  <Input
                    id="address_ar"
                    value={content.address_ar}
                    onChange={(e) => setContent({ ...content, address_ar: e.target.value })}
                    placeholder="العنوان بالعربية"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address_en">العنوان (إنجليزي)</Label>
                  <Input
                    id="address_en"
                    value={content.address_en}
                    onChange={(e) => setContent({ ...content, address_en: e.target.value })}
                    placeholder="Address in English"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={content.phone}
                    onChange={(e) => setContent({ ...content, phone: e.target.value })}
                    placeholder="+966 50 869 4899"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={content.email}
                    onChange={(e) => setContent({ ...content, email: e.target.value })}
                    placeholder="info@olu-it.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="working_hours_ar">ساعات العمل (عربي)</Label>
                  <Input
                    id="working_hours_ar"
                    value={content.working_hours_ar}
                    onChange={(e) => setContent({ ...content, working_hours_ar: e.target.value })}
                    placeholder="09 صباحاً - 05 مساءً"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="working_hours_en">ساعات العمل (إنجليزي)</Label>
                  <Input
                    id="working_hours_en"
                    value={content.working_hours_en}
                    onChange={(e) => setContent({ ...content, working_hours_en: e.target.value })}
                    placeholder="09am - 05pm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="copyright" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>نص حقوق الطبع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="copyright_ar">نص الحقوق (عربي)</Label>
                <Input
                  id="copyright_ar"
                  value={content.copyright_text_ar}
                  onChange={(e) => setContent({ ...content, copyright_text_ar: e.target.value })}
                  placeholder="جميع الحقوق محفوظة"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="copyright_en">نص الحقوق (إنجليزي)</Label>
                <Input
                  id="copyright_en"
                  value={content.copyright_text_en}
                  onChange={(e) => setContent({ ...content, copyright_text_en: e.target.value })}
                  placeholder="All rights reserved"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FooterContentManager;