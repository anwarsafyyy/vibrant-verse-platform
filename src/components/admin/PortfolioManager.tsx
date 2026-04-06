import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { getCollection, addDocument, updateDocument, deleteDocument } from '@/lib/firebaseHelpers';
import { ImageUploader } from './ImageUploader';
import { RichTextEditor } from './RichTextEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PortfolioItem {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image_url: string;
  logo_url: string;
  link: string;
  category: string;
  technologies: string;
  order_index: number;
  is_active: boolean;
}

const CATEGORY_OPTIONS = [
  { value: 'mobile_app', label: 'تطبيقات جوال' },
  { value: 'website', label: 'مواقع ومنصات' },
];

const getCategoryLabel = (val: string) => CATEGORY_OPTIONS.find(o => o.value === val)?.label || val;

export const PortfolioManager = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PortfolioItem>>({});
  const [filterTab, setFilterTab] = useState('all');
  const { toast } = useToast();

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const data = await getCollection<PortfolioItem>('portfolio_items', [], 'order_index', 'asc');
      setItems(data);
    } catch {
      toast({ title: 'خطأ في جلب البيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({
      title_ar: '', title_en: '', description_ar: '', description_en: '',
      image_url: '', logo_url: '', link: '', category: 'mobile_app',
      technologies: '', order_index: items.length, is_active: true,
    });
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      ...item,
      title_ar: item.title_ar || item.title || '',
      title_en: item.title_en || '',
      description_ar: item.description_ar || item.description || '',
      description_en: item.description_en || '',
      logo_url: item.logo_url || '',
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : (item.technologies || ''),
      category: item.category === 'mobile_app' || item.category === 'website' ? item.category : 'mobile_app',
      is_active: item.is_active !== false,
    });
  };

  const handleSave = async () => {
    try {
      const saveData = { ...formData };
      if (editingId === 'new') {
        await addDocument('portfolio_items', saveData);
        toast({ title: 'تمت الإضافة بنجاح' });
      } else if (editingId) {
        await updateDocument('portfolio_items', editingId, saveData);
        toast({ title: 'تم التحديث بنجاح' });
      }
      setEditingId(null);
      setFormData({});
      fetchItems();
    } catch {
      toast({ title: 'حدث خطأ', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteDocument('portfolio_items', id);
      toast({ title: 'تم الحذف بنجاح' });
      fetchItems();
    } catch {
      toast({ title: 'حدث خطأ', variant: 'destructive' });
    }
  };

  const filteredItems = filterTab === 'all' ? items : items.filter(i => i.category === filterTab);

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">إدارة المنتجات</h1>
        <Button onClick={handleAdd}><Plus className="w-4 h-4 ml-2" />إضافة منتج</Button>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filterTab} onValueChange={setFilterTab}>
        <TabsList>
          <TabsTrigger value="all">الكل ({items.length})</TabsTrigger>
          <TabsTrigger value="mobile_app">تطبيقات جوال ({items.filter(i => i.category === 'mobile_app').length})</TabsTrigger>
          <TabsTrigger value="website">مواقع ومنصات ({items.filter(i => i.category === 'website').length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Edit Form */}
      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle className="text-black">{editingId === 'new' ? 'إضافة منتج جديد' : 'تعديل المنتج'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-black">العنوان (عربي)</label>
                <Input value={formData.title_ar || ''} onChange={e => setFormData({ ...formData, title_ar: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-black">العنوان (إنجليزي)</label>
                <Input value={formData.title_en || ''} onChange={e => setFormData({ ...formData, title_en: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-black">الوصف (عربي)</label>
              <RichTextEditor content={formData.description_ar || ''} onChange={val => setFormData({ ...formData, description_ar: val })} />
            </div>
            <div>
              <label className="text-sm font-medium text-black">الوصف (إنجليزي)</label>
              <RichTextEditor content={formData.description_en || ''} onChange={val => setFormData({ ...formData, description_en: val })} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-black">صورة المنتج</label>
                <ImageUploader currentImageUrl={formData.image_url} onUploadComplete={url => setFormData({ ...formData, image_url: url })} uploadPath="portfolio" maxSizeMB={10} />
              </div>
              <div>
                <label className="text-sm font-medium text-black">شعار المنتج</label>
                <ImageUploader currentImageUrl={formData.logo_url} onUploadComplete={url => setFormData({ ...formData, logo_url: url })} uploadPath="portfolio-logos" maxSizeMB={5} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-black">التصنيف</label>
                <Select value={formData.category || 'mobile_app'} onValueChange={val => setFormData({ ...formData, category: val })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map(o => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-black">رابط المنتج</label>
                <Input value={formData.link || ''} onChange={e => setFormData({ ...formData, link: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-black">التقنيات المستخدمة (مفصولة بفواصل)</label>
                <Input value={formData.technologies || ''} onChange={e => setFormData({ ...formData, technologies: e.target.value })} placeholder="React, Flutter, Node.js" />
              </div>
              <div>
                <label className="text-sm font-medium text-black">الترتيب</label>
                <Input type="number" value={formData.order_index || 0} onChange={e => setFormData({ ...formData, order_index: parseInt(e.target.value) })} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={formData.is_active !== false} onCheckedChange={val => setFormData({ ...formData, is_active: val })} />
              <label className="text-sm font-medium text-black">نشط (ظاهر في الموقع)</label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}><Save className="w-4 h-4 ml-2" />حفظ</Button>
              <Button variant="outline" onClick={() => { setEditingId(null); setFormData({}); }}><X className="w-4 h-4 ml-2" />إلغاء</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items List */}
      <div className="grid gap-4">
        {filteredItems.map(item => (
          <Card key={item.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                {item.image_url && <img src={item.image_url} alt={item.title_ar} className="w-16 h-16 object-cover rounded" />}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-black">{item.title_ar || (item as any).title}</h3>
                    <Badge variant={item.category === 'mobile_app' ? 'default' : 'secondary'}>
                      {getCategoryLabel(item.category)}
                    </Badge>
                    {item.is_active === false && <Badge variant="secondary">مخفي</Badge>}
                  </div>
                  <p className="text-sm text-black/70 line-clamp-1">
                    {(item.description_ar || (item as any).description || '').replace(/<[^>]*>/g, '').slice(0, 100)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
