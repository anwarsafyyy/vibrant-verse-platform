import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X, Upload, Image, Calendar } from 'lucide-react';
import { getCollection, addDocument, updateDocument, deleteDocument, uploadFile } from '@/lib/firebaseHelpers';

interface NewsItem {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image_url: string;
  date: string;
  order_index: number;
  is_active: boolean;
}

export const NewsManager = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<NewsItem>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'يرجى اختيار ملف صورة', variant: 'destructive' });
      return;
    }

    setUploading(true);
    try {
      const path = `news/${Date.now()}_${file.name}`;
      const url = await uploadFile(path, file);
      setFormData({ ...formData, image_url: url });
      toast({ title: 'تم رفع الصورة بنجاح' });
    } catch (error) {
      toast({ title: 'خطأ في رفع الصورة', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getCollection<NewsItem>('company_news', [], 'order_index', 'asc');
      setItems(data);
    } catch (error) {
      toast({ title: 'خطأ في جلب البيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({
      title_ar: '',
      title_en: '',
      description_ar: '',
      description_en: '',
      image_url: '',
      date: new Date().toISOString().split('T')[0],
      order_index: items.length,
      is_active: true,
    });
  };

  const handleEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setFormData({ ...item });
  };

  const handleSave = async () => {
    if (!formData.title_ar || !formData.description_ar) {
      toast({ title: 'يرجى ملء الحقول المطلوبة', variant: 'destructive' });
      return;
    }

    try {
      if (editingId === 'new') {
        await addDocument('company_news', formData);
        toast({ title: 'تمت الإضافة بنجاح' });
      } else if (editingId) {
        await updateDocument('company_news', editingId, formData);
        toast({ title: 'تم التحديث بنجاح' });
      }
      setEditingId(null);
      setFormData({});
      fetchItems();
    } catch (error) {
      toast({ title: 'حدث خطأ', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteDocument('company_news', id);
      toast({ title: 'تم الحذف بنجاح' });
      fetchItems();
    } catch (error) {
      toast({ title: 'حدث خطأ', variant: 'destructive' });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">إدارة أخبار الشركة</h1>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة خبر
        </Button>
      </div>

      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle className="text-black">{editingId === 'new' ? 'إضافة خبر جديد' : 'تعديل الخبر'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-black">العنوان (عربي) *</label>
                <Input
                  value={formData.title_ar || ''}
                  onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                  placeholder="عنوان الخبر بالعربية"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-black">العنوان (إنجليزي)</label>
                <Input
                  value={formData.title_en || ''}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  placeholder="News title in English"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-black">الوصف (عربي) *</label>
                <Textarea
                  value={formData.description_ar || ''}
                  onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  placeholder="وصف الخبر بالعربية"
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-black">الوصف (إنجليزي)</label>
                <Textarea
                  value={formData.description_en || ''}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  placeholder="News description in English"
                  rows={4}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-black">صورة الخبر</label>
                <div className="space-y-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex-1"
                    >
                      {uploading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary ml-2" />
                      ) : (
                        <Upload className="w-4 h-4 ml-2" />
                      )}
                      {uploading ? 'جاري الرفع...' : 'رفع صورة'}
                    </Button>
                  </div>
                  {formData.image_url && (
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <Image className="w-4 h-4" />
                      <img src={formData.image_url} alt="Preview" className="w-16 h-16 object-cover rounded" />
                      <span className="text-xs text-black/70 truncate flex-1">تم رفع الصورة</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-black">تاريخ الخبر</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-black">الترتيب</label>
                <Input
                  type="number"
                  value={formData.order_index || 0}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active ?? true}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-black">نشط</label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 ml-2" />
                حفظ
              </Button>
              <Button variant="outline" onClick={() => { setEditingId(null); setFormData({}); }}>
                <X className="w-4 h-4 ml-2" />
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {items.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              لا توجد أخبار حالياً. اضغط على "إضافة خبر" لإضافة خبر جديد.
            </CardContent>
          </Card>
        ) : (
          items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.title_ar} className="w-20 h-20 object-cover rounded-lg" />
                  )}
                  <div>
                    <h3 className="font-semibold text-black text-lg">{item.title_ar}</h3>
                    <p className="text-sm text-black/70 line-clamp-2 max-w-md">{item.description_ar}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(item.date)}</span>
                      {!item.is_active && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full">غير نشط</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
