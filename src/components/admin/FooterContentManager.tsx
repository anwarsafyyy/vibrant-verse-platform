import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { getCollection, addDocument, updateDocument } from '@/lib/firebaseHelpers';

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

export const FooterContentManager = () => {
  const [content, setContent] = useState<FooterContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<FooterContent>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const data = await getCollection<FooterContent>('footer_content', [], 'created_at', 'desc', 1);
      if (data.length > 0) {
        setContent(data[0]);
        setFormData(data[0]);
      } else {
        setFormData({
          company_description_ar: '',
          company_description_en: '',
          address_ar: '',
          address_en: '',
          phone: '',
          email: '',
          working_hours_ar: '',
          working_hours_en: '',
          copyright_text_ar: '',
          copyright_text_en: '',
        });
      }
    } catch (error) {
      toast({ title: 'خطأ في جلب البيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (content?.id) {
        await updateDocument('footer_content', content.id, formData);
      } else {
        await addDocument('footer_content', formData);
      }
      toast({ title: 'تم الحفظ بنجاح' });
      fetchContent();
    } catch (error) {
      toast({ title: 'حدث خطأ', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">محتوى الفوتر</h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 ml-2" />
          {saving ? 'جاري الحفظ...' : 'حفظ'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>معلومات الشركة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">وصف الشركة (عربي)</label>
              <Textarea
                value={formData.company_description_ar || ''}
                onChange={(e) => setFormData({ ...formData, company_description_ar: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">وصف الشركة (إنجليزي)</label>
              <Textarea
                value={formData.company_description_en || ''}
                onChange={(e) => setFormData({ ...formData, company_description_en: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">العنوان (عربي)</label>
              <Input
                value={formData.address_ar || ''}
                onChange={(e) => setFormData({ ...formData, address_ar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">العنوان (إنجليزي)</label>
              <Input
                value={formData.address_en || ''}
                onChange={(e) => setFormData({ ...formData, address_en: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">الهاتف</label>
              <Input
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">البريد الإلكتروني</label>
              <Input
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">ساعات العمل (عربي)</label>
              <Input
                value={formData.working_hours_ar || ''}
                onChange={(e) => setFormData({ ...formData, working_hours_ar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">ساعات العمل (إنجليزي)</label>
              <Input
                value={formData.working_hours_en || ''}
                onChange={(e) => setFormData({ ...formData, working_hours_en: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">نص حقوق الملكية (عربي)</label>
              <Input
                value={formData.copyright_text_ar || ''}
                onChange={(e) => setFormData({ ...formData, copyright_text_ar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">نص حقوق الملكية (إنجليزي)</label>
              <Input
                value={formData.copyright_text_en || ''}
                onChange={(e) => setFormData({ ...formData, copyright_text_en: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
