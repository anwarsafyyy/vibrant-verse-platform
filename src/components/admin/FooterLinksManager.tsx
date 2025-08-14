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
}

const FooterLinksManager = () => {
  const [footerLinks, setFooterLinks] = useState<FooterLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newLink, setNewLink] = useState<FooterLink>({
    name_ar: '',
    name_en: '',
    link: '',
    category: 'general',
    is_active: true,
    order_index: 0,
  });
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
          category: 'general',
          is_active: true,
          order_index: 0,
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
    { value: 'legal', label: 'قانوني' },
    { value: 'company', label: 'الشركة' },
    { value: 'content', label: 'المحتوى' },
    { value: 'general', label: 'عام' }
  ];

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
        <CardContent className="space-y-4">
          {footerLinks.map((link, index) => (
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`name_ar_${index}`}>الاسم (عربي)</Label>
                    <Input
                      id={`name_ar_${index}`}
                      value={link.name_ar}
                      onChange={(e) => updateLink(index, 'name_ar', e.target.value)}
                      placeholder="سياسة الخصوصية"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`name_en_${index}`}>الاسم (إنجليزي)</Label>
                    <Input
                      id={`name_en_${index}`}
                      value={link.name_en}
                      onChange={(e) => updateLink(index, 'name_en', e.target.value)}
                      placeholder="Privacy Policy"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`link_${index}`}>الرابط</Label>
                    <Input
                      id={`link_${index}`}
                      value={link.link}
                      onChange={(e) => updateLink(index, 'link', e.target.value)}
                      placeholder="#privacy"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor={`category_${index}`}>الفئة</Label>
                  <select
                    id={`category_${index}`}
                    value={link.category}
                    onChange={(e) => updateLink(index, 'category', e.target.value)}
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
            </Card>
          ))}

          {isAdding && (
            <Card className="p-4 border-dashed">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      placeholder="#new-page"
                    />
                  </div>
                </div>

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