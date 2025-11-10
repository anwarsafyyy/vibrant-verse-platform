import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LayoutDashboard, LogOut, Database, Users, FolderOpen } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
      navigate("/admin");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "خطأ",
        description: "فشل تسجيل الخروج",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex border-b border-border">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <h1 className="text-xl font-semibold">لوحة التحكم - Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-card p-8 rounded-lg border" dir="rtl">
            <h2 className="text-2xl font-bold mb-4">مرحباً بك في لوحة التحكم</h2>
            <p className="text-muted-foreground mb-6">
              تم الانتقال بنجاح إلى Firebase. يمكنك الآن إدارة المحتوى من Firebase Console:
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <a 
                href="https://console.firebase.google.com/project/oluwe-95bb0/firestore" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-blue-50 hover:bg-blue-100 rounded-lg border-2 border-blue-200 transition-colors"
              >
                <Database className="h-12 w-12 text-blue-600 mb-3" />
                <h3 className="font-semibold text-center mb-2">Firestore Database</h3>
                <p className="text-sm text-center text-muted-foreground">إدارة قاعدة البيانات</p>
              </a>
              
              <a 
                href="https://console.firebase.google.com/project/oluwe-95bb0/authentication/users" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-green-50 hover:bg-green-100 rounded-lg border-2 border-green-200 transition-colors"
              >
                <Users className="h-12 w-12 text-green-600 mb-3" />
                <h3 className="font-semibold text-center mb-2">Authentication</h3>
                <p className="text-sm text-center text-muted-foreground">إدارة المستخدمين</p>
              </a>
              
              <a 
                href="https://console.firebase.google.com/project/oluwe-95bb0/storage" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-purple-50 hover:bg-purple-100 rounded-lg border-2 border-purple-200 transition-colors"
              >
                <FolderOpen className="h-12 w-12 text-purple-600 mb-3" />
                <h3 className="font-semibold text-center mb-2">Storage</h3>
                <p className="text-sm text-center text-muted-foreground">إدارة الملفات</p>
              </a>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6" dir="rtl">
            <h3 className="font-semibold text-yellow-900 mb-3">💡 ملاحظة مهمة:</h3>
            <ul className="space-y-2 text-sm text-yellow-800">
              <li>• يمكنك إضافة البيانات مباشرة من Firebase Console</li>
              <li>• راجع ملف FIREBASE_MIGRATION_README.md لمعرفة بنية البيانات المطلوبة</li>
              <li>• يمكنك تطوير مكونات الإدارة لاحقاً إذا أردت واجهة إدارة مخصصة</li>
            </ul>
          </div>

          <div className="bg-card p-6 rounded-lg border" dir="rtl">
            <h3 className="font-semibold mb-3">📚 المجموعات المطلوبة في Firestore:</h3>
            <div className="grid gap-2 text-sm">
              <div className="p-3 bg-muted rounded">services - الخدمات</div>
              <div className="p-3 bg-muted rounded">portfolio - الأعمال</div>
              <div className="p-3 bg-muted rounded">partners - الشركاء</div>
              <div className="p-3 bg-muted rounded">social_links - روابط التواصل</div>
              <div className="p-3 bg-muted rounded">faqs - الأسئلة الشائعة</div>
              <div className="p-3 bg-muted rounded">hero_content - المحتوى الرئيسي</div>
              <div className="p-3 bg-muted rounded">about_content - محتوى من نحن</div>
              <div className="p-3 bg-muted rounded">footer_content - محتوى الفوتر</div>
              <div className="p-3 bg-muted rounded">site_settings - الإعدادات العامة</div>
              <div className="p-3 bg-muted rounded">contact_inquiries - استفسارات التواصل</div>
              <div className="p-3 bg-muted rounded">analytics - التحليلات</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
