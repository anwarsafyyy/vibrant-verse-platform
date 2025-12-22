import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X, Upload, Loader2 } from 'lucide-react';
import { getCollection, addDocument, updateDocument, deleteDocument, uploadFile } from '@/lib/firebaseHelpers';

interface Partner {
  id: string;
  name_ar: string;
  name_en: string;
  logo_url: string;
  website_url: string;
  order_index: number;
  is_active: boolean;
}

export const PartnersManager = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Partner>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const data = await getCollection<Partner>('partners', [], 'order_index', 'asc');
      setPartners(data);
    } catch (error) {
      toast({ title: 'خطأ في جلب البيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const path = `partners/${Date.now()}_${file.name}`;
      const url = await uploadFile(path, file);
      setFormData({ ...formData, logo_url: url });
      toast({ title: 'تم رفع الصورة بنجاح' });
    } catch (error) {
      toast({ title: 'خطأ في رفع الصورة', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({
      name_ar: '',
      name_en: '',
      logo_url: '',
      website_url: '',
      order_index: partners.length,
      is_active: true,
    });
  };

  const handleEdit = (partner: Partner) => {
    setEditingId(partner.id);
    setFormData(partner);
  };

  const handleSave = async () => {
    try {
      if (editingId === 'new') {
        await addDocument('partners', formData);
        toast({ title: 'تمت الإضافة بنجاح' });
      } else if (editingId) {
        await updateDocument('partners', editingId, formData);
        toast({ title: 'تم التحديث بنجاح' });
      }
      setEditingId(null);
      setFormData({});
      fetchPartners();
    } catch (error) {
      toast({ title: 'حدث خطأ', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteDocument('partners', id);
      toast({ title: 'تم الحذف بنجاح' });
      fetchPartners();
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
        <h1 className="text-2xl font-bold">إدارة الشركاء</h1>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة شريك
        </Button>
      </div>

      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId === 'new' ? 'إضافة شريك جديد' : 'تعديل الشريك'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">الاسم (عربي)</label>
                <Input
                  value={formData.name_ar || ''}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">الاسم (إنجليزي)</label>
                <Input
                  value={formData.name_en || ''}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">شعار الشريك</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex items-center gap-2 mt-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full"
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
                </div>
                {formData.logo_url && (
                  <div className="mt-2">
                    <img src={formData.logo_url} alt="معاينة" className="w-16 h-16 object-contain border rounded" />
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium">رابط الموقع</label>
                <Input
                  value={formData.website_url || ''}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">الترتيب</label>
              <Input
                type="number"
                value={formData.order_index || 0}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
              />
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {partners.map((partner) => (
          <Card key={partner.id}>
            <CardContent className="p-4 text-center">
              {partner.logo_url && (
                <img src={partner.logo_url} alt={partner.name_ar} className="w-20 h-20 object-contain mx-auto mb-2" />
              )}
              <h3 className="font-semibold text-sm">{partner.name_ar}</h3>
              <div className="flex justify-center gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(partner)}>
                  <Pencil className="w-3 h-3" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(partner.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
