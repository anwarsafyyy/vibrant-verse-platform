import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload, Image, Loader2 } from 'lucide-react';
import { getCollection, addDocument, updateDocument, uploadFile } from '@/lib/firebaseHelpers';

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
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<AboutContent>>({});
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({ title: 'يجب اختيار ملف صورة', variant: 'destructive' });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'حجم الصورة يجب أن لا يتجاوز 5 ميجابايت', variant: 'destructive' });
      return;
    }

    setUploading(true);
    try {
      const fileName = `about/${Date.now()}_${file.name}`;
      const url = await uploadFile(fileName, file);
      setFormData({ ...formData, image_url: url });
      toast({ title: 'تم رفع الصورة بنجاح' });
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: 'حدث خطأ في رفع الصورة', variant: 'destructive' });
    } finally {
      setUploading(false);
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
          <div>
            <label className="text-sm font-medium text-black mb-2 block">صورة القسم</label>
            <div className="space-y-4">
              {/* Image Preview */}
              {formData.image_url && (
                <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={formData.image_url} 
                    alt="About section" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Upload Button */}
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      جاري الرفع...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 ml-2" />
                      رفع صورة
                    </>
                  )}
                </Button>
                
                {!formData.image_url && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Image className="w-5 h-5" />
                    <span className="text-sm">لم يتم اختيار صورة</span>
                  </div>
                )}
              </div>

              {/* Manual URL Input */}
              <div>
                <label className="text-sm text-gray-500 mb-1 block">أو أدخل رابط الصورة يدوياً</label>
                <Input
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
