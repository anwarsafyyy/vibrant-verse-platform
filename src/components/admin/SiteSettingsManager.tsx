import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X, AlertTriangle } from 'lucide-react';
import { getCollection, addDocument, updateDocument, deleteDocument } from '@/lib/firebaseHelpers';
import { useLanguage } from '@/hooks/useLanguage';

interface Setting {
  id: string;
  key: string;
  value_ar: string;
  value_en: string;
}

const translations = {
  ar: {
    title: 'الإعدادات العامة',
    addSetting: 'إضافة إعداد',
    addNew: 'إضافة إعداد جديد',
    editSetting: 'تعديل الإعداد',
    key: 'المفتاح (Key)',
    keyPlaceholder: 'مثال: site_name, logo_url',
    valueAr: 'القيمة (عربي)',
    valueEn: 'القيمة (إنجليزي)',
    save: 'حفظ',
    cancel: 'إلغاء',
    confirmDelete: 'هل أنت متأكد من الحذف؟',
    added: 'تمت الإضافة بنجاح',
    updated: 'تم التحديث بنجاح',
    deleted: 'تم الحذف بنجاح',
    error: 'حدث خطأ',
    fetchError: 'خطأ في جلب البيانات',
    duplicate: 'مكرر! يوجد إعداد آخر بنفس المفتاح',
    deletedDuplicate: 'تم حذف الإعداد المكرر',
    noSettings: 'لا توجد إعدادات',
  },
  en: {
    title: 'General Settings',
    addSetting: 'Add Setting',
    addNew: 'Add New Setting',
    editSetting: 'Edit Setting',
    key: 'Key',
    keyPlaceholder: 'e.g. site_name, logo_url',
    valueAr: 'Value (Arabic)',
    valueEn: 'Value (English)',
    save: 'Save',
    cancel: 'Cancel',
    confirmDelete: 'Are you sure you want to delete?',
    added: 'Added successfully',
    updated: 'Updated successfully',
    deleted: 'Deleted successfully',
    error: 'An error occurred',
    fetchError: 'Error fetching data',
    duplicate: 'Duplicate! Another setting with same key exists',
    deletedDuplicate: 'Duplicate setting deleted',
    noSettings: 'No settings found',
  },
};

export const SiteSettingsManager = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Setting>>({});
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language] || translations.ar;

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getCollection<Setting>('site_settings');
      setSettings(data);
    } catch (error) {
      toast({ title: t.fetchError, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // Find duplicate keys
  const getDuplicateKeys = () => {
    const keyCounts: Record<string, string[]> = {};
    settings.forEach((s) => {
      if (!keyCounts[s.key]) keyCounts[s.key] = [];
      keyCounts[s.key].push(s.id);
    });
    return keyCounts;
  };

  const duplicateMap = getDuplicateKeys();

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
        toast({ title: t.added });
      } else if (editingId) {
        await updateDocument('site_settings', editingId, formData);
        toast({ title: t.updated });
      }
      setEditingId(null);
      setFormData({});
      fetchSettings();
    } catch (error) {
      toast({ title: t.error, variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    try {
      await deleteDocument('site_settings', id);
      toast({ title: t.deleted });
      fetchSettings();
    } catch (error) {
      toast({ title: t.error, variant: 'destructive' });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  // Group settings by key for cleaner display
  const groupedKeys = Object.keys(duplicateMap).sort();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 ml-2" />
          {t.addSetting}
        </Button>
      </div>

      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">{editingId === 'new' ? t.addNew : t.editSetting}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">{t.key}</label>
              <Input
                value={formData.key || ''}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                placeholder={t.keyPlaceholder}
                className="bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">{t.valueAr}</label>
                <Input
                  value={formData.value_ar || ''}
                  onChange={(e) => setFormData({ ...formData, value_ar: e.target.value })}
                  className="bg-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">{t.valueEn}</label>
                <Input
                  value={formData.value_en || ''}
                  onChange={(e) => setFormData({ ...formData, value_en: e.target.value })}
                  className="bg-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 ml-2" />
                {t.save}
              </Button>
              <Button variant="outline" onClick={() => { setEditingId(null); setFormData({}); }}>
                <X className="w-4 h-4 ml-2" />
                {t.cancel}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {settings.map((setting) => {
          const isDuplicate = duplicateMap[setting.key]?.length > 1;
          return (
            <Card key={setting.id} className={isDuplicate ? 'border-destructive/50' : ''}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold font-mono text-primary">{setting.key}</h3>
                    {isDuplicate && (
                      <span className="inline-flex items-center gap-1 text-xs text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        {t.duplicate}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                    <p className="truncate"><span className="font-medium">عربي:</span> {setting.value_ar || '—'}</p>
                    <p className="truncate"><span className="font-medium">English:</span> {setting.value_en || '—'}</p>
                  </div>
                </div>
                <div className="flex gap-2 mr-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(setting)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(setting.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
