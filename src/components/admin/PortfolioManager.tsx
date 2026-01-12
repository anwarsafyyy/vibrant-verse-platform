import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { getCollection, addDocument, updateDocument, deleteDocument } from '@/lib/firebaseHelpers';
import { ImageUploader } from './ImageUploader';

interface PortfolioItem {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image_url: string;
  link: string;
  category: string;
  order_index: number;
  is_active: boolean;
}

export const PortfolioManager = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getCollection<PortfolioItem>('portfolio_items', [], 'order_index', 'asc');
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
      link: '',
      category: '',
      order_index: items.length,
      is_active: true,
    });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    // Handle old data format and new format
    setFormData({
      ...item,
      title_ar: item.title_ar || item.title || '',
      title_en: item.title_en || '',
      description_ar: item.description_ar || item.description || '',
      description_en: item.description_en || '',
    });
  };

  const handleSave = async () => {
    try {
      if (editingId === 'new') {
        await addDocument('portfolio_items', formData);
        toast({ title: 'تمت الإضافة بنجاح' });
      } else if (editingId) {
        await updateDocument('portfolio_items', editingId, formData);
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
      await deleteDocument('portfolio_items', id);
      toast({ title: 'تم الحذف بنجاح' });
      fetchItems();
    } catch (error) {
      toast({ title: 'حدث خطأ', variant: 'destructive' });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">إدارة المنتجات</h1>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة منتج
        </Button>
      </div>

      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle className="text-black">{editingId === 'new' ? 'إضافة منتج جديد' : 'تعديل المنتج'}</CardTitle>
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
                <label className="text-sm font-medium text-black">الوصف (عربي)</label>
                <Textarea
                  value={formData.description_ar || ''}
                  onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-black">الوصف (إنجليزي)</label>
                <Textarea
                  value={formData.description_en || ''}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-black">صورة المنتج (يتم ضغطها تلقائياً)</label>
                <ImageUploader
                  currentImageUrl={formData.image_url}
                  onUploadComplete={(url) => setFormData({ ...formData, image_url: url })}
                  uploadPath="portfolio"
                  maxSizeMB={10}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-black">رابط المنتج</label>
                <Input
                  value={formData.link || ''}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-black">التصنيف</label>
                <Input
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-black">الترتيب</label>
                <Input
                  type="number"
                  value={formData.order_index || 0}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                />
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
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                {item.image_url && (
                  <img src={item.image_url} alt={item.title_ar} className="w-16 h-16 object-cover rounded" />
                )}
                <div>
                  <h3 className="font-semibold text-black">{item.title_ar || (item as any).title}</h3>
                  <p className="text-sm text-black/70">{(item.description_ar || (item as any).description)?.slice(0, 100)}...</p>
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
        ))}
      </div>
    </div>
  );
};
