import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight, RotateCcw, Clock, CreditCard, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CancellationPolicy: React.FC = () => {
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
              <RotateCcw className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              {dir === "rtl" ? "سياسة الإلغاء والاسترداد" : "Cancellation & Refund Policy"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {dir === "rtl" 
                ? "شروط وأحكام إلغاء الطلبات واسترداد الأموال"
                : "Terms and conditions for order cancellation and refunds"
              }
            </p>
          </div>

          <div className="prose max-w-none">
            {dir === "rtl" ? (
              <div className="space-y-8 text-right">
                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <Clock className="h-6 w-6" />
                    فترات الإلغاء
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="font-semibold text-green-800 mb-2">خدمات التطوير</h3>
                      <ul className="text-green-700 space-y-1 text-sm">
                        <li>• إلغاء مجاني خلال 24 ساعة</li>
                        <li>• إلغاء بخصم 50% خلال 3 أيام</li>
                        <li>• إلغاء بخصم 25% خلال أسبوع</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-800 mb-2">خدمات التسويق</h3>
                      <ul className="text-blue-700 space-y-1 text-sm">
                        <li>• إلغاء مجاني خلال 48 ساعة</li>
                        <li>• إلغاء بخصم 30% خلال 5 أيام</li>
                        <li>• لا يمكن إلغاء الحملات النشطة</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <CreditCard className="h-6 w-6" />
                    سياسة الاسترداد
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold mb-2">الاسترداد الكامل (100%)</h3>
                      <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                        <li>إلغاء الطلب قبل بدء العمل</li>
                        <li>عدم قدرتنا على تنفيذ المشروع</li>
                        <li>خلل تقني من جانبنا</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h3 className="font-semibold mb-2">الاسترداد الجزئي (50%)</h3>
                      <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                        <li>إلغاء المشروع بعد إنجاز 25% من العمل</li>
                        <li>طلب تعديلات جذرية على المشروع</li>
                        <li>تأخير من جانب العميل لأكثر من شهر</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <AlertCircle className="h-6 w-6" />
                    حالات عدم الاسترداد
                  </h2>
                  <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                    <li>المشاريع المكتملة والمسلمة بالكامل</li>
                    <li>الخدمات الاستشارية التي تم تقديمها</li>
                    <li>تراخيص البرمجيات والأدوات الخارجية</li>
                    <li>خدمات الاستضافة والدومين</li>
                    <li>الإلغاء بعد مرور شهر من بدء العمل</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">إجراءات طلب الإلغاء</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h3 className="font-semibold">إرسال طلب الإلغاء</h3>
                        <p className="text-muted-foreground text-sm">أرسل طلب الإلغاء عبر البريد الإلكتروني مع رقم المشروع</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h3 className="font-semibold">مراجعة الطلب</h3>
                        <p className="text-muted-foreground text-sm">سنراجع طلبك ونرد عليك خلال 24 ساعة</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h3 className="font-semibold">معالجة الاسترداد</h3>
                        <p className="text-muted-foreground text-sm">سيتم تحويل المبلغ خلال 5-7 أيام عمل</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">تواصل معنا</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    لطلب الإلغاء أو الاستفسار عن سياسة الاسترداد:
                  </p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p><strong>البريد الإلكتروني:</strong> cancel@olu-it.com</p>
                    <p><strong>الهاتف:</strong> +966535656226</p>
                    <p><strong>ساعات العمل:</strong> 9 صباحاً - 5 مساءً (السبت - الخميس)</p>
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Clock className="h-6 w-6" />
                    Cancellation Periods
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="font-semibold text-green-800 mb-2">Development Services</h3>
                      <ul className="text-green-700 space-y-1 text-sm">
                        <li>• Free cancellation within 24 hours</li>
                        <li>• 50% fee cancellation within 3 days</li>
                        <li>• 25% fee cancellation within 1 week</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h3 className="font-semibold text-blue-800 mb-2">Marketing Services</h3>
                      <ul className="text-blue-700 space-y-1 text-sm">
                        <li>• Free cancellation within 48 hours</li>
                        <li>• 30% fee cancellation within 5 days</li>
                        <li>• Active campaigns cannot be cancelled</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <CreditCard className="h-6 w-6" />
                    Refund Policy
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold mb-2">Full Refund (100%)</h3>
                      <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Order cancelled before work begins</li>
                        <li>Our inability to deliver the project</li>
                        <li>Technical issues on our end</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Partial Refund (50%)</h3>
                      <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Project cancelled after 25% completion</li>
                        <li>Major project scope changes requested</li>
                        <li>Client delay exceeding one month</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <AlertCircle className="h-6 w-6" />
                    Non-Refundable Cases
                  </h2>
                  <ul className="text-muted-foreground leading-relaxed space-y-2 list-disc list-inside">
                    <li>Completed and fully delivered projects</li>
                    <li>Consulting services that have been provided</li>
                    <li>Third-party software licenses and tools</li>
                    <li>Hosting and domain services</li>
                    <li>Cancellations after one month of work commencement</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">Cancellation Process</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                      <div>
                        <h3 className="font-semibold">Submit Cancellation Request</h3>
                        <p className="text-muted-foreground text-sm">Send cancellation request via email with project number</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                      <div>
                        <h3 className="font-semibold">Request Review</h3>
                        <p className="text-muted-foreground text-sm">We will review your request and respond within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                      <div>
                        <h3 className="font-semibold">Process Refund</h3>
                        <p className="text-muted-foreground text-sm">Refund will be processed within 5-7 business days</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To request cancellation or inquire about refund policy:
                  </p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p><strong>Email:</strong> cancel@olu-it.com</p>
                    <p><strong>Phone:</strong> +966535656226</p>
                    <p><strong>Business Hours:</strong> 9 AM - 5 PM (Saturday - Thursday)</p>
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

export default CancellationPolicy;