import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight, Shield, Eye, Lock, Database, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  const { dir, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              {dir === "rtl" ? (
                <ArrowRight className="h-5 w-5" />
              ) : (
                <ArrowLeft className="h-5 w-5" />
              )}
              {dir === "rtl" ? "العودة للرئيسية" : "Back to Home"}
            </Link>
            
            <div className="flex items-center gap-4">
              <img 
                src="/public/alo.png" 
                alt="علو Logo" 
                className="h-8 w-auto" 
              />
              <span className="text-xl font-bold text-primary">علو</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 ${dir === "rtl" ? "text-right" : "text-left"}`}>
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              {dir === "rtl" ? "سياسة الخصوصية" : "Privacy Policy"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {dir === "rtl" 
                ? "نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية"
                : "We are committed to protecting your privacy and personal data"
              }
            </p>
          </div>

          <div className="prose max-w-none">
            {dir === "rtl" ? (
              <div className="space-y-8 text-right">
                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <Eye className="h-6 w-6" />
                    المعلومات التي نجمعها
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    نقوم بجمع المعلومات التي تقدمها لنا طواعية عند استخدام موقعنا الإلكتروني أو خدماتنا، مثل الاسم وعنوان البريد الإلكتروني ورقم الهاتف. كما نقوم بجمع معلومات تقنية تلقائياً مثل عنوان IP ونوع المتصفح وبيانات الاستخدام.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <Database className="h-6 w-6" />
                    كيف نستخدم معلوماتك
                  </h2>
                  <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                    <li>تقديم وتحسين خدماتنا</li>
                    <li>التواصل معك حول خدماتنا</li>
                    <li>إرسال التحديثات والعروض (بموافقتك)</li>
                    <li>تحليل استخدام الموقع لتحسين الأداء</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <Lock className="h-6 w-6" />
                    حماية البيانات
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    نستخدم تدابير أمنية متقدمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الاستخدام أو الكشف. جميع البيانات الحساسة مشفرة أثناء النقل والتخزين.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <UserCheck className="h-6 w-6" />
                    حقوقك
                  </h2>
                  <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                    <li>الحق في الوصول إلى بياناتك الشخصية</li>
                    <li>الحق في تصحيح البيانات غير الصحيحة</li>
                    <li>الحق في حذف بياناتك</li>
                    <li>الحق في الاعتراض على معالجة بياناتك</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">تواصل معنا</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا على:
                  </p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p><strong>البريد الإلكتروني:</strong> privacy@olu-it.com</p>
                    <p><strong>الهاتف:</strong> +966535656226</p>
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Eye className="h-6 w-6" />
                    Information We Collect
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We collect information you provide voluntarily when using our website or services, such as your name, email address, and phone number. We also automatically collect technical information like IP address, browser type, and usage data.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Database className="h-6 w-6" />
                    How We Use Your Information
                  </h2>
                  <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                    <li>Provide and improve our services</li>
                    <li>Communicate with you about our services</li>
                    <li>Send updates and offers (with your consent)</li>
                    <li>Analyze website usage to improve performance</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Lock className="h-6 w-6" />
                    Data Protection
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use advanced security measures to protect your personal information from unauthorized access, use, or disclosure. All sensitive data is encrypted during transmission and storage.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <UserCheck className="h-6 w-6" />
                    Your Rights
                  </h2>
                  <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                    <li>Right to access your personal data</li>
                    <li>Right to correct inaccurate data</li>
                    <li>Right to delete your data</li>
                    <li>Right to object to processing of your data</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p><strong>Email:</strong> privacy@olu-it.com</p>
                    <p><strong>Phone:</strong> +966535656226</p>
                  </div>
                </section>
              </div>
            )}
          </div>

          <div className="mt-12 p-6 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              {dir === "rtl" 
                ? "تم آخر تحديث لهذه السياسة في يناير 2025"
                : "This policy was last updated in January 2025"
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;