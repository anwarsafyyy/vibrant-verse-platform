import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { Plus, Trash2, Save, GripVertical } from 'lucide-react';

interface Stat {
  id: string;
  value: number;
  prefix: string;
  label_ar: string;
  label_en: string;
  icon: string;
  order_index: number;
}

const iconOptions = [
  { value: 'UserCheck', label: 'عملاء' },
  { value: 'Briefcase', label: 'مشاريع' },
  { value: 'Calendar', label: 'سنوات' },
  { value: 'Cpu', label: 'تقنيات' },
  { value: 'Award', label: 'جوائز' },
  { value: 'Users', label: 'فريق' },
];

const StatsManager: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const q = query(collection(db, 'stats'), orderBy('order_index', 'asc'));
      const snapshot = await getDocs(q);
      const statsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Stat[];
      
      // If no stats exist, create defaults
      if (statsData.length === 0) {
        const defaultStats: Omit<Stat, 'id'>[] = [
          { value: 200, prefix: '+', label_ar: 'عملاء راضون', label_en: 'Happy Clients', icon: 'UserCheck', order_index: 0 },
          { value: 100, prefix: '+', label_ar: 'مشاريع مكتملة', label_en: 'Completed Projects', icon: 'Briefcase', order_index: 1 },
          { value: 8, prefix: '+', label_ar: 'سنوات خبرة', label_en: 'Years Experience', icon: 'Calendar', order_index: 2 },
          { value: 50, prefix: '+', label_ar: 'تقنيات مستخدمة', label_en: 'Technologies Used', icon: 'Cpu', order_index: 3 },
        ];
        
        for (const stat of defaultStats) {
          const docRef = doc(collection(db, 'stats'));
          await setDoc(docRef, stat);
        }
        
        fetchStats();
        return;
      }
      
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({ title: 'خطأ في جلب البيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (id: string, field: keyof Stat, value: string | number) => {
    setStats(prev => prev.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const stat of stats) {
        const { id, ...data } = stat;
        await setDoc(doc(db, 'stats', id), data);
      }
      toast({ title: 'تم الحفظ بنجاح' });
    } catch (error) {
      console.error('Error saving stats:', error);
      toast({ title: 'خطأ في الحفظ', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    try {
      const newStat: Omit<Stat, 'id'> = {
        value: 0,
        prefix: '+',
        label_ar: 'إحصائية جديدة',
        label_en: 'New Stat',
        icon: 'Award',
        order_index: stats.length,
      };
      
      const docRef = doc(collection(db, 'stats'));
      await setDoc(docRef, newStat);
      
      setStats(prev => [...prev, { id: docRef.id, ...newStat }]);
      toast({ title: 'تمت الإضافة بنجاح' });
    } catch (error) {
      console.error('Error adding stat:', error);
      toast({ title: 'خطأ في الإضافة', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'stats', id));
      setStats(prev => prev.filter(stat => stat.id !== id));
      toast({ title: 'تم الحذف بنجاح' });
    } catch (error) {
      console.error('Error deleting stat:', error);
      toast({ title: 'خطأ في الحذف', variant: 'destructive' });
    }
  };

  if (loading) {
    return <div className="p-8 text-center">جاري التحميل...</div>;
  }

  return (
    <div className="p-6" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">إدارة الإحصائيات</h1>
        <div className="flex gap-2">
          <Button onClick={handleAdd} variant="outline">
            <Plus className="w-4 h-4 ml-2" />
            إضافة إحصائية
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 ml-2" />
            {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {stats.map((stat, index) => (
          <Card key={stat.id} className="border border-border">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                  إحصائية {index + 1}
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDelete(stat.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>القيمة</Label>
                  <Input
                    type="number"
                    value={stat.value}
                    onChange={(e) => handleChange(stat.id, 'value', parseInt(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>البادئة (مثل +)</Label>
                  <Input
                    value={stat.prefix}
                    onChange={(e) => handleChange(stat.id, 'prefix', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>الأيقونة</Label>
                  <select
                    value={stat.icon}
                    onChange={(e) => handleChange(stat.id, 'icon', e.target.value)}
                    className="w-full mt-1 p-2 border border-border rounded-md bg-background"
                  >
                    {iconOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>العنوان (عربي)</Label>
                  <Input
                    value={stat.label_ar}
                    onChange={(e) => handleChange(stat.id, 'label_ar', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>العنوان (إنجليزي)</Label>
                  <Input
                    value={stat.label_en}
                    onChange={(e) => handleChange(stat.id, 'label_en', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>الترتيب</Label>
                  <Input
                    type="number"
                    value={stat.order_index}
                    onChange={(e) => handleChange(stat.id, 'order_index', parseInt(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsManager;
