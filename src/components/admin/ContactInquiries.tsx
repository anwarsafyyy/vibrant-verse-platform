import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Mail, Phone, Calendar } from 'lucide-react';
import { getCollection, deleteDocument } from '@/lib/firebaseHelpers';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: any;
  is_read: boolean;
}

export const ContactInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const data = await getCollection<Inquiry>('contact_inquiries', [], 'created_at', 'desc');
      setInquiries(data);
    } catch (error) {
      toast({ title: 'خطأ في جلب البيانات', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteDocument('contact_inquiries', id);
      toast({ title: 'تم الحذف بنجاح' });
      fetchInquiries();
    } catch (error) {
      toast({ title: 'حدث خطأ', variant: 'destructive' });
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className="flex justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">استفسارات التواصل</h1>
        <span className="text-black/70">{inquiries.length} رسالة</span>
      </div>

      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-black/70">
            لا توجد استفسارات حتى الآن
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id} className={!inquiry.is_read ? 'border-primary' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-black">{inquiry.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-black/70">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {inquiry.email}
                      </span>
                      {inquiry.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {inquiry.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(inquiry.created_at)}
                      </span>
                    </div>
                    <p className="text-black mt-2 whitespace-pre-wrap">{inquiry.message}</p>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(inquiry.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
