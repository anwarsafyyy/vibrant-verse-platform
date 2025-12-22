import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Users, 
  HelpCircle, 
  MessageSquare,
  Settings,
  Image,
  Link,
  LogOut,
  BookOpen
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  { title: 'لوحة التحكم', url: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'المحتوى الرئيسي', url: '/admin/hero', icon: Image },
  { title: 'من نحن', url: '/admin/about', icon: FileText },
  { title: 'الخدمات', url: '/admin/services', icon: Briefcase },
  { title: 'المنتجات', url: '/admin/portfolio', icon: Briefcase },
  { title: 'المدونة', url: '/admin/blog', icon: BookOpen },
  { title: 'الشركاء', url: '/admin/partners', icon: Users },
  { title: 'الأسئلة الشائعة', url: '/admin/faqs', icon: HelpCircle },
  { title: 'استفسارات التواصل', url: '/admin/inquiries', icon: MessageSquare },
  { title: 'روابط التواصل', url: '/admin/social-links', icon: Link },
  { title: 'الفوتر', url: '/admin/footer', icon: FileText },
  { title: 'الإعدادات', url: '/admin/settings', icon: Settings },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: 'تم تسجيل الخروج بنجاح' });
      navigate('/admin');
    } catch (error) {
      toast({ title: 'حدث خطأ', variant: 'destructive' });
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-card border-l border-border">
      <div className="p-4 border-b border-border">
        <h2 className="font-bold text-lg text-foreground">لوحة التحكم</h2>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.url}>
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 pt-4 border-t border-border">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};
