import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Briefcase, 
  Users, 
  HelpCircle, 
  MessageSquare,
  Settings,
  Image,
  Link
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const quickLinks = [
  { title: 'المحتوى الرئيسي', url: '/admin/hero', icon: Image, color: 'bg-blue-500' },
  { title: 'من نحن', url: '/admin/about', icon: FileText, color: 'bg-green-500' },
  { title: 'الخدمات', url: '/admin/services', icon: Briefcase, color: 'bg-purple-500' },
  { title: 'المنتجات', url: '/admin/portfolio', icon: Briefcase, color: 'bg-orange-500' },
  { title: 'الشركاء', url: '/admin/partners', icon: Users, color: 'bg-pink-500' },
  { title: 'الأسئلة الشائعة', url: '/admin/faqs', icon: HelpCircle, color: 'bg-yellow-500' },
  { title: 'استفسارات التواصل', url: '/admin/inquiries', icon: MessageSquare, color: 'bg-red-500' },
  { title: 'روابط التواصل', url: '/admin/social-links', icon: Link, color: 'bg-cyan-500' },
  { title: 'الفوتر', url: '/admin/footer', icon: FileText, color: 'bg-indigo-500' },
  { title: 'الإعدادات', url: '/admin/settings', icon: Settings, color: 'bg-gray-500' },
];

export const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">مرحباً بك في لوحة التحكم</h1>
        <p className="text-muted-foreground mt-2">اختر قسماً للبدء في إدارة المحتوى</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {quickLinks.map((link) => (
          <Card 
            key={link.url}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(link.url)}
          >
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 rounded-full ${link.color} flex items-center justify-center mx-auto mb-3`}>
                <link.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm">{link.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>معلومات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li>• يمكنك إضافة وتعديل وحذف المحتوى من كل قسم</li>
            <li>• جميع التغييرات ستظهر مباشرة في الموقع</li>
            <li>• تأكد من ملء الحقول العربية والإنجليزية للتوافق مع اللغتين</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
