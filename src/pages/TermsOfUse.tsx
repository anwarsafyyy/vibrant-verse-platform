import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight, FileText, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfUse: React.FC = () => {
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
              <FileText className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              {dir === "rtl" ? "شروط الاستخدام" : "Terms of Use"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {dir === "rtl" 
                ? "الشروط والأحكام التي تحكم استخدام خدماتنا"
                : "Terms and conditions governing the use of our services"
              }
            </p>
          </div>

          <div className="prose max-w-none">
            {dir === "rtl" ? (
              <div className="space-y-8 text-right">
                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <CheckCircle className="h-6 w-6" />
                    قبول الشروط
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    باستخدامك لموقعنا الإلكتروني أو خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا لم توافق على هذه الشروط، يرجى عدم استخدام خدماتنا.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <FileText className="h-6 w-6" />
                    الخدمات المقدمة
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    تقدم شركة علو لتقنية المعلومات الخدمات التالية:
                  </p>
                  <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                    <li>تطوير المواقع الإلكترونية والتطبيقات</li>
                    <li>تحسين محركات البحث (SEO)</li>
                    <li>التسويق الرقمي والإعلانات</li>
                    <li>الاستشارات التقنية</li>
                    <li>الدعم الفني والصيانة</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <XCircle className="h-6 w-6" />
                    الاستخدام المحظور
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    يُحظر عليك استخدام خدماتنا في أي من الحالات التالية:
                  </p>
                  <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                    <li>انتهاك القوانين أو اللوائح المعمول بها</li>
                    <li>نشر محتوى مضلل أو ضار</li>
                    <li>محاولة الوصول غير المصرح به لأنظمتنا</li>
                    <li>إنتهاك حقوق الملكية الفكرية</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    المسؤولية والضمانات
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    نسعى لتقديم أفضل الخدمات، لكننا لا نضمن أن خدماتنا ستكون خالية من الأخطاء أو متاحة في جميع الأوقات. مسؤوليتنا محدودة بقيمة الخدمات المقدمة.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">حقوق الملكية الفكرية</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    جميع المحتويات والتصاميم والعلامات التجارية على موقعنا محمية بحقوق الملكية الفكرية. لا يجوز استخدامها دون إذن كتابي مسبق منا.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">تعديل الشروط</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات مهمة عبر البريد الإلكتروني أو إشعار على الموقع.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">القانون الحاكم</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    تخضع هذه الشروط لقوانين المملكة العربية السعودية، وتختص المحاكم السعودية بالنظر في أي نزاعات.
                  </p>
                </section>
              </div>
            ) : (
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <CheckCircle className="h-6 w-6" />
                    Acceptance of Terms
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By using our website or services, you agree to comply with these terms and conditions. If you do not agree with these terms, please do not use our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Services Provided
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Olu Information Technology Company provides the following services:
                  </p>
                  <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                    <li>Website and application development</li>
                    <li>Search Engine Optimization (SEO)</li>
                    <li>Digital marketing and advertising</li>
                    <li>Technical consulting</li>
                    <li>Technical support and maintenance</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <XCircle className="h-6 w-6" />
                    Prohibited Use
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You are prohibited from using our services for any of the following:
                  </p>
                  <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                    <li>Violating applicable laws or regulations</li>
                    <li>Publishing misleading or harmful content</li>
                    <li>Attempting unauthorized access to our systems</li>
                    <li>Infringing intellectual property rights</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    Liability and Warranties
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We strive to provide the best services, but we do not guarantee that our services will be error-free or available at all times. Our liability is limited to the value of services provided.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">Intellectual Property Rights</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    All content, designs, and trademarks on our website are protected by intellectual property rights. They may not be used without prior written permission from us.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">Modification of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time. You will be notified of any significant changes via email or notice on the website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">Governing Law</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    These terms are governed by the laws of the Kingdom of Saudi Arabia, and Saudi courts have jurisdiction over any disputes.
                  </p>
                </section>
              </div>
            )}
          </div>

          <div className="mt-12 p-6 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              {dir === "rtl" 
                ? "تم آخر تحديث لهذه الشروط في يناير 2025"
                : "These terms were last updated in January 2025"
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfUse;