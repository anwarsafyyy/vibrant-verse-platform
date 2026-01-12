import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { getCollection, addDocument, updateDocument } from '@/lib/firebaseHelpers';
import { ImageUploader } from './ImageUploader';

interface AboutContent {
  id: string;
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  description_ar: string;
  description_en: string;
  image_url: string;
  cta_text_ar: string;
  cta_text_en: string;
  is_active: boolean;
}

export const AboutContentManager = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<AboutContent>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const data = await getCollection<AboutContent>('about_content', [{ field: 'is_active', operator: '==', value: true }], 'created_at', 'desc', 1);
      if (data.length > 0) {
        setContent(data[0]);
        setFormData(data[0]);
      } else {
        setFormData({
          title_ar: '',
          title_en: '',
          subtitle_ar: '',
          subtitle_en: '',
          description_ar: '',
          description_en: '',
          image_url: '',
          cta_text_ar: '',
          cta_text_en: '',
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
        await updateDocument('about_content', content.id, formData);
      } else {
        await addDocument('about_content', { ...formData, is_active: true });
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
        <h1 className="text-2xl font-bold text-black">محتوى من نحن</h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 ml-2" />
          {saving ? 'جاري الحفظ...' : 'حفظ'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-black">تعديل المحتوى</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-black">العنوان (عربي)</label>
              <Input
                value={formData.title_ar || ''}
                onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-black">العنوان (إنجليزي)</label>
              <Input
                value={formData.title_en || ''}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-black">العنوان الفرعي (عربي)</label>
              <Input
                value={formData.subtitle_ar || ''}
                onChange={(e) => setFormData({ ...formData, subtitle_ar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-black">العنوان الفرعي (إنجليزي)</label>
              <Input
                value={formData.subtitle_en || ''}
                onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-black">الوصف (عربي)</label>
              <Textarea
                value={formData.description_ar || ''}
                onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                rows={4}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-black">الوصف (إنجليزي)</label>
              <Textarea
                value={formData.description_en || ''}
                onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-black">نص الزر (عربي)</label>
              <Input
                value={formData.cta_text_ar || ''}
                onChange={(e) => setFormData({ ...formData, cta_text_ar: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-black">نص الزر (إنجليزي)</label>
              <Input
                value={formData.cta_text_en || ''}
                onChange={(e) => setFormData({ ...formData, cta_text_en: e.target.value })}
              />
            </div>
          </div>
          {/* Image Upload Section - With Auto Compression */}
          <div className="border-2 border-dashed border-purple-300 rounded-xl p-6 bg-purple-50/50">
            <label className="text-lg font-bold text-black mb-4 block">صورة قسم من نحن (يتم ضغطها تلقائياً)</label>
            
            <ImageUploader
              currentImageUrl={formData.image_url}
              onUploadComplete={(url) => setFormData({ ...formData, image_url: url })}
              uploadPath="about"
              maxSizeMB={10}
            />

            {/* Manual URL Input - Optional */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <label className="text-sm text-gray-500 mb-1 block">أو أدخل رابط الصورة يدوياً (اختياري)</label>
              <Input
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://..."
                dir="ltr"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
