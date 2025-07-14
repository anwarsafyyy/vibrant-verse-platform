import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

interface FAQ {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  is_active: boolean;
  order_index: number;
}

interface NewFAQ {
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  is_active: boolean;
}

const FAQManager: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [newFAQ, setNewFAQ] = useState<NewFAQ>({
    question_ar: "",
    question_en: "",
    answer_ar: "",
    answer_en: "",
    is_active: true,
  });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الأسئلة الشائعة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNew = async () => {
    try {
      const { error } = await supabase.from("faqs").insert([
        {
          ...newFAQ,
          order_index: faqs.length,
        },
      ]);

      if (error) throw error;

      toast({
        title: "تم الحفظ",
        description: "تم إضافة السؤال بنجاح",
      });

      setNewFAQ({
        question_ar: "",
        question_en: "",
        answer_ar: "",
        answer_en: "",
        is_active: true,
      });
      setIsAddingNew(false);
      fetchFAQs();
    } catch (error) {
      console.error("Error saving FAQ:", error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ السؤال",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = async (faq: FAQ) => {
    try {
      const { error } = await supabase
        .from("faqs")
        .update({
          question_ar: faq.question_ar,
          question_en: faq.question_en,
          answer_ar: faq.answer_ar,
          answer_en: faq.answer_en,
          is_active: faq.is_active,
        })
        .eq("id", faq.id);

      if (error) throw error;

      toast({
        title: "تم التحديث",
        description: "تم تحديث السؤال بنجاح",
      });

      setEditingFAQ(null);
      fetchFAQs();
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث السؤال",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("faqs").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف السؤال بنجاح",
      });

      fetchFAQs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      toast({
        title: "خطأ",
        description: "فشل في حذف السؤال",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الأسئلة الشائعة</h2>
        <Button onClick={() => setIsAddingNew(true)} disabled={isAddingNew}>
          <Plus className="w-4 h-4 mr-2" />
          إضافة سؤال جديد
        </Button>
      </div>

      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle>إضافة سؤال جديد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">السؤال (عربي)</label>
              <Input
                value={newFAQ.question_ar}
                onChange={(e) => setNewFAQ({ ...newFAQ, question_ar: e.target.value })}
                placeholder="اكتب السؤال بالعربية"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">السؤال (انجليزي)</label>
              <Input
                value={newFAQ.question_en}
                onChange={(e) => setNewFAQ({ ...newFAQ, question_en: e.target.value })}
                placeholder="Write question in English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الإجابة (عربي)</label>
              <Textarea
                value={newFAQ.answer_ar}
                onChange={(e) => setNewFAQ({ ...newFAQ, answer_ar: e.target.value })}
                placeholder="اكتب الإجابة بالعربية"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الإجابة (انجليزي)</label>
              <Textarea
                value={newFAQ.answer_en}
                onChange={(e) => setNewFAQ({ ...newFAQ, answer_en: e.target.value })}
                placeholder="Write answer in English"
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={newFAQ.is_active}
                onCheckedChange={(checked) => setNewFAQ({ ...newFAQ, is_active: checked })}
              />
              <label>فعال</label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveNew}>
                <Save className="w-4 h-4 mr-2" />
                حفظ
              </Button>
              <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                <X className="w-4 h-4 mr-2" />
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardContent className="p-6">
              {editingFAQ?.id === faq.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">السؤال (عربي)</label>
                    <Input
                      value={editingFAQ.question_ar}
                      onChange={(e) => setEditingFAQ({ ...editingFAQ, question_ar: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">السؤال (انجليزي)</label>
                    <Input
                      value={editingFAQ.question_en}
                      onChange={(e) => setEditingFAQ({ ...editingFAQ, question_en: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">الإجابة (عربي)</label>
                    <Textarea
                      value={editingFAQ.answer_ar}
                      onChange={(e) => setEditingFAQ({ ...editingFAQ, answer_ar: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">الإجابة (انجليزي)</label>
                    <Textarea
                      value={editingFAQ.answer_en}
                      onChange={(e) => setEditingFAQ({ ...editingFAQ, answer_en: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={editingFAQ.is_active}
                      onCheckedChange={(checked) => setEditingFAQ({ ...editingFAQ, is_active: checked })}
                    />
                    <label>فعال</label>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleUpdate(editingFAQ)}>
                      <Save className="w-4 h-4 mr-2" />
                      حفظ
                    </Button>
                    <Button variant="outline" onClick={() => setEditingFAQ(null)}>
                      <X className="w-4 h-4 mr-2" />
                      إلغاء
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{faq.question_ar}</h3>
                      <p className="text-sm text-gray-600 mb-2">{faq.question_en}</p>
                      <p className="text-sm mb-2">{faq.answer_ar}</p>
                      <p className="text-sm text-gray-600">{faq.answer_en}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Badge variant={faq.is_active ? "default" : "secondary"}>
                        {faq.is_active ? "فعال" : "غير فعال"}
                      </Badge>
                      <Button size="sm" variant="outline" onClick={() => setEditingFAQ(faq)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(faq.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQManager;