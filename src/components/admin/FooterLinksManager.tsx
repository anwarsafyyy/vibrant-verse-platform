import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Plus, Save, Trash2, Link as LinkIcon, MoveUp, MoveDown } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface FooterLink {
  id?: string;
  name_ar: string;
  name_en: string;
  link: string;
  category: string;
  is_active: boolean;
  order_index: number;
  icon?: string;
  target?: string;
}

const FooterLinksManager = () => {
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newLink, setNewLink] = useState<FooterLink>({
    name_ar: '',
    name_en: '',
    link: '',
    category: 'Privacy Policy',
    is_active: true,
    order_index: 0,
    icon: '',
    target: '_self',
  });
  
  const createDefaultLinks = async () => {
    const defaultLinks: Omit<FooterLink, 'id'>[] = [
      { name_ar: 'سياسة الخصوصية', name_en: 'Privacy Policy', link: '/privacy', category: 'legal', is_active: true, order_index: 1 },
      { name_ar: 'شروط الاستخدام', name_en: 'Terms of Use', link: '/terms', category: 'legal', is_active: true, order_index: 2 },
      { name_ar: 'سياسة الإلغاء', name_en: 'Cancellation Policy', link: '/cancellation', category: 'legal', is_active: true, order_index: 3 },
      { name_ar: 'عن الشركة', name_en: 'About Company', link: '/about', category: 'company', is_active: true, order_index: 4 },
      { name_ar: 'المدونة', name_en: 'Blog', link: '/blog', category: 'content', is_active: true, order_index: 5 },
      { name_ar: 'تواصل معنا', name_en: 'Contact Us', link: '/contact', category: 'general', is_active: true, order_index: 6 },
    ];

    try {
      setSaving(true);
      const { error } = await supabase
        .from('footer_links')
        .insert(defaultLinks);

      if (error) throw error;

      toast({
        title: 'تم إنشاء الروابط',
        description: 'تم إنشاء روابط الفوتر الافتراضية بنجاح',
      });

      fetchFooterLinks();
    } catch (error: any) {
      console.error('Error creating default links:', error);
      toast({
        title: 'خطأ في الإنشاء',
        description: error.message || 'حدث خطأ أثناء إنشاء الروابط الافتراضية',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFooterLinks();
  }, []);

  const fetchFooterLinks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('footer_links')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching footer links:', error);
        return;
      }

      setFooterLinks(data || []);
    } catch (error) {
      console.error('Failed to fetch footer links:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveLink = async (link: FooterLink) => {
    setSaving(true);
    try {
      if (link.id) {
        // Update existing
        const { error } = await supabase
          .from('footer_links')
          .update({
            name_ar: link.name_ar,
            name_en: link.name_en,
            link: link.link,
            category: link.category,
            is_active: link.is_active,
            order_index: link.order_index,
            icon: link.icon,
            target: link.target,
          })
          .eq('id', link.id);

        if (error) throw error;
      } else {
        // Insert new
        const maxOrder = Math.max(...footerLinks.map(l => l.order_index), 0);
        const { error } = await supabase
          .from('footer_links')
          .insert([{ ...link, order_index: maxOrder + 1 }]);

        if (error) throw error;
      }

      toast({
        title: 'تم حفظ الرابط',
        description: 'تم حفظ رابط الفوتر بنجاح',
      });

      fetchFooterLinks();
      if (!link.id) {
        setNewLink({
          name_ar: '',
          name_en: '',
          link: '',
          category: 'Privacy Policy',
          is_active: true,
          order_index: 0,
          icon: '',
          target: '_self',
        });
        setIsAdding(false);
      }
    } catch (error: any) {
      console.error('Error saving footer link:', error);
      toast({
        title: 'خطأ في الحفظ',
        description: error.message || 'حدث خطأ أثناء حفظ الرابط',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('footer_links')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'تم حذف الرابط',
        description: 'تم حذف رابط الفوتر بنجاح',
      });

      fetchFooterLinks();
    } catch (error: any) {
      console.error('Error deleting footer link:', error);
      toast({
        title: 'خطأ في الحذف',
        description: error.message || 'حدث خطأ أثناء حذف الرابط',
        variant: 'destructive',
      });
    }
  };

  const updateLinkOrder = async (id: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('footer_links')
        .update({ order_index: newOrder })
        .eq('id', id);

      if (error) throw error;

      fetchFooterLinks();
    } catch (error: any) {
      console.error('Error updating link order:', error);
      toast({
        title: 'خطأ في التحديث',
        description: error.message || 'حدث خطأ أثناء تحديث ترتيب الرابط',
        variant: 'destructive',
      });
    }
  };

  const moveLink = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      updateLinkOrder(footerLinks[index].id!, footerLinks[index - 1].order_index);
      updateLinkOrder(footerLinks[index - 1].id!, footerLinks[index].order_index);
    } else if (direction === 'down' && index < footerLinks.length - 1) {
      updateLinkOrder(footerLinks[index].id!, footerLinks[index + 1].order_index);
      updateLinkOrder(footerLinks[index + 1].id!, footerLinks[index].order_index);
    }
  };

  const updateLink = (index: number, field: keyof FooterLink, value: any) => {
    const updatedLinks = [...footerLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setFooterLinks(updatedLinks);
  };

  const categories = [
    { value: 'Privacy Policy', label: 'سياسة الخصوصية', label_en: 'Privacy Policy' },
    { value: 'Terms of Use', label: 'شروط الاستخدام', label_en: 'Terms of Use' },
    { value: 'Cancellation Policy', label: 'سياسة الإلغاء', label_en: 'Cancellation Policy' },
    { value: 'About the Company', label: 'عن الشركة', label_en: 'About the Company' },
    { value: 'Blog', label: 'المدونة', label_en: 'Blog' }
  ];

  const iconOptions = [
    'shield', 'file-text', 'x-circle', 'building', 'book-open', 'link', 
    'external-link', 'user', 'settings', 'info', 'help-circle'
  ];

  const targetOptions = [
    { value: '_self', label: 'نفس النافذة' },
    { value: '_blank', label: 'نافذة جديدة' }
  ];

  // Group links by category
  const groupedLinks = categories.reduce((acc, category) => {
    acc[category.value] = footerLinks.filter(link => link.category === category.value);
    return acc;
  }, {} as Record<string, FooterLink[]>);

  const createBackup = async () => {
    try {
      const { data, error } = await supabase
        .from('footer_links')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      
      localStorage.setItem('footer_links_backup', JSON.stringify({
        timestamp: new Date().toISOString(),
        data: data
      }));
      
      toast({
        title: 'تم إنشاء النسخة الاحتياطية',
        description: 'تم حفظ النسخة الاحتياطية بنجاح',
      });
    } catch (error: any) {
      console.error('Error creating backup:', error);
      toast({
        title: 'خطأ في النسخ الاحتياطي',
        description: error.message || 'حدث خطأ أثناء إنشاء النسخة الاحتياطية',
        variant: 'destructive',
      });
    }
  };

  const restoreBackup = async () => {
    try {
      const backupStr = localStorage.getItem('footer_links_backup');
      if (!backupStr) {
        toast({
          title: 'لا توجد نسخة احتياطية',
          description: 'لم يتم العثور على نسخة احتياطية للاستعادة',
          variant: 'destructive',
        });
        return;
      }

      const backup = JSON.parse(backupStr);
      setSaving(true);

      // Delete current links
      await supabase.from('footer_links').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Restore backup data
      const { error } = await supabase
        .from('footer_links')
        .insert(backup.data.map((link: any) => ({
          ...link,
          id: undefined // Let Supabase generate new IDs
        })));

      if (error) throw error;

      toast({
        title: 'تمت الاستعادة',
        description: `تمت استعادة النسخة الاحتياطية من ${new Date(backup.timestamp).toLocaleString('ar')}`,
      });

      fetchFooterLinks();
    } catch (error: any) {
      console.error('Error restoring backup:', error);
      toast({
        title: 'خطأ في الاستعادة',
        description: error.message || 'حدث خطأ أثناء استعادة النسخة الاحتياطية',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="mr-2">جاري تحميل روابط الفوتر...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            روابط الفوتر
          </CardTitle>
          <CardDescription>
            إدارة الروابط التي تظهر في أسفل الموقع
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <Button onClick={createBackup} variant="outline" size="sm">
                إنشاء نسخة احتياطية
              </Button>
              <Button onClick={restoreBackup} variant="outline" size="sm" disabled={saving}>
                استعادة النسخة الاحتياطية
              </Button>
            </div>
          </div>

          {footerLinks.length === 0 && (
            <div className="text-center p-8">
              <p className="text-muted-foreground mb-4">لا توجد روابط في الفوتر</p>
              <Button onClick={createDefaultLinks} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري الإنشاء...
                  </>
                ) : (
                  'إنشاء روابط افتراضية'
                )}
              </Button>
            </div>
          )}

          {/* Display links grouped by category */}
          {categories.map((category) => (
            <div key={category.value} className="space-y-4">
              <h3 className="text-lg font-semibold text-primary border-b pb-2">
                {category.label} ({category.label_en})
              </h3>
              
              {groupedLinks[category.value]?.map((link, index) => (
            <Card key={link.id} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{categories.find(c => c.value === link.category)?.label}</Badge>
                    <Switch
                      checked={link.is_active}
                      onCheckedChange={(checked) => updateLink(index, 'is_active', checked)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {link.is_active ? 'مفعل' : 'غير مفعل'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveLink(index, 'up')}
                      disabled={index === 0}
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => moveLink(index, 'down')}
                      disabled={index === footerLinks.length - 1}
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => saveLink(link)}
                      disabled={saving}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>حذف الرابط</AlertDialogTitle>
                          <AlertDialogDescription>
                            هل أنت متأكد من حذف هذا الرابط؟ هذا الإجراء لا يمكن التراجع عنه.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteLink(link.id!)}>
                            حذف
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`name_ar_${category.value}_${index}`}>الاسم (عربي)</Label>
                    <Input
                      id={`name_ar_${category.value}_${index}`}
                      value={link.name_ar}
                      onChange={(e) => {
                        const globalIndex = footerLinks.findIndex(l => l.id === link.id);
                        updateLink(globalIndex, 'name_ar', e.target.value);
                      }}
                      placeholder="سياسة الخصوصية"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`name_en_${category.value}_${index}`}>الاسم (إنجليزي)</Label>
                    <Input
                      id={`name_en_${category.value}_${index}`}
                      value={link.name_en}
                      onChange={(e) => {
                        const globalIndex = footerLinks.findIndex(l => l.id === link.id);
                        updateLink(globalIndex, 'name_en', e.target.value);
                      }}
                      placeholder="Privacy Policy"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`link_${category.value}_${index}`}>الرابط</Label>
                    <Input
                      id={`link_${category.value}_${index}`}
                      value={link.link}
                      onChange={(e) => {
                        const globalIndex = footerLinks.findIndex(l => l.id === link.id);
                        updateLink(globalIndex, 'link', e.target.value);
                      }}
                      placeholder="/privacy-policy"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`target_${category.value}_${index}`}>الهدف</Label>
                    <select
                      id={`target_${category.value}_${index}`}
                      value={link.target || '_self'}
                      onChange={(e) => {
                        const globalIndex = footerLinks.findIndex(l => l.id === link.id);
                        updateLink(globalIndex, 'target', e.target.value);
                      }}
                      className="w-full p-2 border border-border rounded-md"
                    >
                      {targetOptions.map((target) => (
                        <option key={target.value} value={target.value}>
                          {target.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`icon_${category.value}_${index}`}>الأيقونة</Label>
                    <select
                      id={`icon_${category.value}_${index}`}
                      value={link.icon || ''}
                      onChange={(e) => {
                        const globalIndex = footerLinks.findIndex(l => l.id === link.id);
                        updateLink(globalIndex, 'icon', e.target.value);
                      }}
                      className="w-full p-2 border border-border rounded-md"
                    >
                      <option value="">بدون أيقونة</option>
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor={`category_${category.value}_${index}`}>نقل إلى فئة</Label>
                    <select
                      id={`category_${category.value}_${index}`}
                      value={link.category}
                      onChange={(e) => {
                        const globalIndex = footerLinks.findIndex(l => l.id === link.id);
                        updateLink(globalIndex, 'category', e.target.value);
                      }}
                      className="w-full p-2 border border-border rounded-md"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </Card>
              )) || (
                <p className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-md">
                  لا توجد روابط في هذه الفئة. استخدم "إضافة رابط جديد" لإضافة روابط.
                </p>
              )}
            </div>
          ))}

          {isAdding && (
            <Card className="p-4 border-dashed border-primary/30">
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">إضافة رابط جديد</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="new_name_ar">الاسم (عربي)</Label>
                    <Input
                      id="new_name_ar"
                      value={newLink.name_ar}
                      onChange={(e) => setNewLink({ ...newLink, name_ar: e.target.value })}
                      placeholder="رابط جديد"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new_name_en">الاسم (إنجليزي)</Label>
                    <Input
                      id="new_name_en"
                      value={newLink.name_en}
                      onChange={(e) => setNewLink({ ...newLink, name_en: e.target.value })}
                      placeholder="New Link"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new_link">الرابط</Label>
                    <Input
                      id="new_link"
                      value={newLink.link}
                      onChange={(e) => setNewLink({ ...newLink, link: e.target.value })}
                      placeholder="/new-page"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new_target">الهدف</Label>
                    <select
                      id="new_target"
                      value={newLink.target || '_self'}
                      onChange={(e) => setNewLink({ ...newLink, target: e.target.value })}
                      className="w-full p-2 border border-border rounded-md"
                    >
                      {targetOptions.map((target) => (
                        <option key={target.value} value={target.value}>
                          {target.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new_category">الفئة</Label>
                    <select
                      id="new_category"
                      value={newLink.category}
                      onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
                      className="w-full p-2 border border-border rounded-md"
                    >
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="new_icon">الأيقونة</Label>
                    <select
                      id="new_icon"
                      value={newLink.icon || ''}
                      onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                      className="w-full p-2 border border-border rounded-md"
                    >
                      <option value="">بدون أيقونة</option>
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={newLink.is_active}
                    onCheckedChange={(checked) => setNewLink({ ...newLink, is_active: checked })}
                  />
                  <span className="text-sm text-muted-foreground">تفعيل الرابط</span>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => saveLink(newLink)} disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        حفظ الرابط
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    إلغاء
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {!isAdding && (
            <Button
              onClick={() => setIsAdding(true)}
              className="w-full"
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" />
              إضافة رابط جديد
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FooterLinksManager;