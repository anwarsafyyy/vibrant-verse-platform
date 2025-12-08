import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { getCollection, addDocument, updateDocument, deleteDocument } from '@/lib/firebaseHelpers';

interface Setting {
  id: string;
  key: string;
  value_ar: string;
  value_en: string;
}

export const SiteSettingsManager = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Setting>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getCollection<Setting>('site_settings');
      setSettings(data);
    } catch (error) {
      toast({ title: 'خطأ في جلب البيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({
      key: '',
      value_ar: '',
      value_en: '',
    });
  };

  const handleEdit = (setting: Setting) => {
    setEditingId(setting.id);
    setFormData(setting);
  };

  const handleSave = async () => {
    try {
      if (editingId === 'new') {
        await addDocument('site_settings', formData);
        toast({ title: 'تمت الإضافة بنجاح' });
      } else if (editingId) {
        await updateDocument('site_settings', editingId, formData);
        toast({ title: 'تم التحديث بنجاح' });
      }
      setEditingId(null);
      setFormData({});
      fetchSettings();
    } catch (error) {
      toast({ title: 'حدث خطأ', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteDocument('site_settings', id);
      toast({ title: 'تم الحذف بنجاح' });
      fetchSettings();
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
        <h1 className="text-2xl font-bold">الإعدادات العامة</h1>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة إعداد
        </Button>
      </div>

      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId === 'new' ? 'إضافة إعداد جديد' : 'تعديل الإعداد'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">المفتاح (Key)</label>
              <Input
                value={formData.key || ''}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                placeholder="مثال: site_name, logo_url"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">القيمة (عربي)</label>
                <Input
                  value={formData.value_ar || ''}
                  onChange={(e) => setFormData({ ...formData, value_ar: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">القيمة (إنجليزي)</label>
                <Input
                  value={formData.value_en || ''}
                  onChange={(e) => setFormData({ ...formData, value_en: e.target.value })}
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
        {settings.map((setting) => (
          <Card key={setting.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold font-mono text-primary">{setting.key}</h3>
                <p className="text-sm text-muted-foreground">
                  عربي: {setting.value_ar} | English: {setting.value_en}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(setting)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(setting.id)}>
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
