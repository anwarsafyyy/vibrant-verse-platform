import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { getCollection, addDocument, updateDocument, deleteDocument } from '@/lib/firebaseHelpers';

interface FAQ {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  order_index: number;
  is_active: boolean;
}

export const FAQManager = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FAQ>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const data = await getCollection<FAQ>('faqs', [], 'order_index', 'asc');
      setFaqs(data);
    } catch (error) {
      toast({ title: 'خطأ في جلب البيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId('new');
    setFormData({
      question_ar: '',
      question_en: '',
      answer_ar: '',
      answer_en: '',
      order_index: faqs.length,
      is_active: true,
    });
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setFormData(faq);
  };

  const handleSave = async () => {
    try {
      if (editingId === 'new') {
        await addDocument('faqs', formData);
        toast({ title: 'تمت الإضافة بنجاح' });
      } else if (editingId) {
        await updateDocument('faqs', editingId, formData);
        toast({ title: 'تم التحديث بنجاح' });
      }
      setEditingId(null);
      setFormData({});
      fetchFaqs();
    } catch (error) {
      toast({ title: 'حدث خطأ', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteDocument('faqs', id);
      toast({ title: 'تم الحذف بنجاح' });
      fetchFaqs();
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
        <h1 className="text-2xl font-bold">إدارة الأسئلة الشائعة</h1>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 ml-2" />
          إضافة سؤال
        </Button>
      </div>

      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId === 'new' ? 'إضافة سؤال جديد' : 'تعديل السؤال'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">السؤال (عربي)</label>
                <Input
                  value={formData.question_ar || ''}
                  onChange={(e) => setFormData({ ...formData, question_ar: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">السؤال (إنجليزي)</label>
                <Input
                  value={formData.question_en || ''}
                  onChange={(e) => setFormData({ ...formData, question_en: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">الإجابة (عربي)</label>
                <Textarea
                  value={formData.answer_ar || ''}
                  onChange={(e) => setFormData({ ...formData, answer_ar: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <label className="text-sm font-medium">الإجابة (إنجليزي)</label>
                <Textarea
                  value={formData.answer_en || ''}
                  onChange={(e) => setFormData({ ...formData, answer_en: e.target.value })}
                  rows={4}
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

      <div className="grid gap-4">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">{faq.question_ar}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer_ar?.slice(0, 100)}...</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(faq)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(faq.id)}>
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
