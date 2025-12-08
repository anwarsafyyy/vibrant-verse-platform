import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { getCollection, addDocument, updateDocument } from '@/lib/firebaseHelpers';

interface HeroContent {
  id: string;
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  cta_text_ar: string;
  cta_text_en: string;
  cta_link: string;
  background_image_url: string;
  is_active: boolean;
}

export const HeroContentManager = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<HeroContent>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const data = await getCollection<HeroContent>('hero_content', [{ field: 'is_active', operator: '==', value: true }], 'created_at', 'desc', 1);
      if (data.length > 0) {
        setContent(data[0]);
        setFormData(data[0]);
      } else {
        setFormData({
          title_ar: '',
          title_en: '',
          subtitle_ar: '',
          subtitle_en: '',
          cta_text_ar: '',
          cta_text_en: '',
          cta_link: '',
          background_image_url: '',
          is_active: true,
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
        await updateDocument('hero_content', content.id, formData);
      } else {
        await addDocument('hero_content', { ...formData, is_active: true });
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
        <h1 className="text-2xl font-bold">المحتوى الرئيسي (Hero)</h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 ml-2" />
          {saving ? 'جاري الحفظ...' : 'حفظ'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>تعديل المحتوى</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">العنوان (عربي)</label>
              <Input
                value={formData.title_ar || ''}
                onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">العنوان (إنجليزي)</label>
              <Input
                value={formData.title_en || ''}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">النص الفرعي (عربي)</label>
              <Textarea
                value={formData.subtitle_ar || ''}
                onChange={(e) => setFormData({ ...formData, subtitle_ar: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">النص الفرعي (إنجليزي)</label>
              <Textarea
                value={formData.subtitle_en || ''}
                onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">نص الزر (عربي)</label>
              <Input
                value={formData.cta_text_ar || ''}
                onChange={(e) => setFormData({ ...formData, cta_text_ar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">نص الزر (إنجليزي)</label>
              <Input
                value={formData.cta_text_en || ''}
                onChange={(e) => setFormData({ ...formData, cta_text_en: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">رابط الزر</label>
              <Input
                value={formData.cta_link || ''}
                onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">رابط صورة الخلفية</label>
              <Input
                value={formData.background_image_url || ''}
                onChange={(e) => setFormData({ ...formData, background_image_url: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
