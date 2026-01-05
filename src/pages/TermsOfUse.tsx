import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight, FileText, CheckCircle, XCircle, AlertTriangle, Globe, Scale, Edit, Copyright } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfUse: React.FC = () => {
  const { dir, language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <header className="relative overflow-hidden" style={{ background: 'hsl(250, 50%, 85%)' }}>
        {/* Decorative Circles */}
        <div className="absolute left-[-5%] top-[20%] w-32 h-32 md:w-48 md:h-48 bg-[hsl(250,40%,75%)] rounded-full opacity-50" />
        <div className="absolute right-[-3%] bottom-[10%] w-24 h-24 md:w-36 md:h-36 bg-[hsl(320,50%,82%)] rounded-full opacity-45" />
        <div className="absolute right-[20%] top-[10%] w-16 h-16 md:w-24 md:h-24 bg-[hsl(170,45%,78%)] rounded-full opacity-40" />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-[hsl(262,45%,35%)] hover:text-[hsl(262,45%,45%)] transition-colors font-bold"
            >
              {dir === "rtl" ? (
                <ArrowRight className="h-5 w-5" />
              ) : (
                <ArrowLeft className="h-5 w-5" />
              )}
              {dir === "rtl" ? "العودة للرئيسية" : "Back to Home"}
            </Link>
            
            <img 
              src="/olu-logo.png" 
              alt="علو Logo" 
              className="h-12 w-auto" 
            />
          </div>
          
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[hsl(262,45%,35%)] rounded-2xl rotate-45 mb-6">
              <FileText className="h-10 w-10 text-white -rotate-45" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[hsl(262,45%,25%)] mb-4">
              {dir === "rtl" ? "شروط الاستخدام" : "Terms of Use"}
            </h1>
            <p className="text-xl text-gray-700 font-bold">
              {dir === "rtl" ? "شركة علو لتقنية المعلومات" : "OLU IT Company"}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {dir === "rtl" ? (
            <div className="space-y-10 text-right">
              {/* Introduction */}
              <section className="bg-[hsl(250,50%,97%)] rounded-2xl p-8 border border-purple-100">
                <p className="text-gray-700 leading-loose text-lg">
                  مرحبًا بك في موقع وخدمات <strong className="text-[hsl(262,45%,35%)]">شركة علو لتقنية المعلومات</strong>. باستخدامك لهذا الموقع أو أي من الخدمات التابعة له، فإنك تقرّ بموافقتك الكاملة على شروط الاستخدام الموضحة أدناه.
                </p>
                <p className="text-gray-600 leading-loose mt-4">
                  في حال عدم موافقتك على هذه الشروط، يرجى التوقف عن استخدام الموقع والخدمات.
                </p>
              </section>

              {/* Section: نطاق التطبيق */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">1. نطاق التطبيق</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    تنطبق شروط الاستخدام هذه على جميع زوار ومستخدمي موقع شركة علو لتقنية المعلومات، وكذلك على أي خدمات رقمية أو تطبيقات أو منصات إلكترونية تملكها أو تديرها الشركة.
                  </p>
                </div>
              </section>

              {/* Section: استخدام الموقع والخدمات */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">2. استخدام الموقع والخدمات</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose mb-4">
                    يُسمح لك باستخدام الموقع والخدمات لأغراض مشروعة فقط، وبما لا يخالف الأنظمة المعمول بها في المملكة العربية السعودية.
                  </p>
                  <p className="text-gray-700 leading-loose mb-4 font-bold">ويُحظر عليك ما يلي:</p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>استخدام الموقع لأي غرض غير قانوني أو احتيالي</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>محاولة اختراق أو تعطيل أنظمة الموقع أو الخوادم</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>نسخ أو إعادة نشر أو استغلال أي محتوى دون إذن خطي مسبق</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>استخدام الموقع بما يسبب ضررًا للشركة أو للمستخدمين الآخرين</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section: حقوق الملكية الفكرية */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Copyright className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">3. حقوق الملكية الفكرية</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    جميع المحتويات والتصاميم والعلامات التجارية على موقعنا محمية بحقوق الملكية الفكرية. لا يجوز استخدامها دون إذن كتابي مسبق منا.
                  </p>
                </div>
              </section>

              {/* Section: المسؤولية والضمانات */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">4. المسؤولية والضمانات</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    نسعى لتقديم أفضل الخدمات، لكننا لا نضمن أن خدماتنا ستكون خالية من الأخطاء أو متاحة في جميع الأوقات. مسؤوليتنا محدودة بقيمة الخدمات المقدمة.
                  </p>
                </div>
              </section>

              {/* Section: تعديل الشروط */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Edit className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">5. تعديل الشروط</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات مهمة عبر البريد الإلكتروني أو إشعار على الموقع.
                  </p>
                </div>
              </section>

              {/* Section: القانون الحاكم */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Scale className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">6. القانون الحاكم</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    تخضع هذه الشروط لقوانين المملكة العربية السعودية، وتختص المحاكم السعودية بالنظر في أي نزاعات.
                  </p>
                </div>
              </section>

              {/* Last Updated */}
              <div className="bg-[hsl(250,50%,97%)] rounded-2xl p-6 text-center border border-purple-100">
                <p className="text-gray-600">
                  تم آخر تحديث لهذه الشروط في يناير 2025
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Introduction */}
              <section className="bg-[hsl(250,50%,97%)] rounded-2xl p-8 border border-purple-100">
                <p className="text-gray-700 leading-loose text-lg">
                  Welcome to the website and services of <strong className="text-[hsl(262,45%,35%)]">OLU Information Technology Company</strong>. By using this website or any of its services, you acknowledge your full agreement to the terms of use outlined below.
                </p>
                <p className="text-gray-600 leading-loose mt-4">
                  If you do not agree to these terms, please stop using the website and services.
                </p>
              </section>

              {/* Section: Scope of Application */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">1. Scope of Application</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    These terms of use apply to all visitors and users of OLU Information Technology Company website, as well as any digital services, applications, or electronic platforms owned or managed by the company.
                  </p>
                </div>
              </section>

              {/* Section: Use of Website and Services */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">2. Use of Website and Services</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose mb-4">
                    You are permitted to use the website and services for legitimate purposes only, in compliance with the regulations in force in the Kingdom of Saudi Arabia.
                  </p>
                  <p className="text-gray-700 leading-loose mb-4 font-bold">You are prohibited from:</p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Using the website for any illegal or fraudulent purpose</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Attempting to hack or disrupt the website systems or servers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Copying, republishing, or exploiting any content without prior written permission</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Using the website in a way that causes harm to the company or other users</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section: Intellectual Property Rights */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Copyright className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">3. Intellectual Property Rights</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    All content, designs, and trademarks on our website are protected by intellectual property rights. They may not be used without prior written permission from us.
                  </p>
                </div>
              </section>

              {/* Section: Liability and Warranties */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">4. Liability and Warranties</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    We strive to provide the best services, but we do not guarantee that our services will be error-free or available at all times. Our liability is limited to the value of services provided.
                  </p>
                </div>
              </section>

              {/* Section: Modification of Terms */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Edit className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">5. Modification of Terms</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    We reserve the right to modify these terms at any time. You will be notified of any significant changes via email or notice on the website.
                  </p>
                </div>
              </section>

              {/* Section: Governing Law */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Scale className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">6. Governing Law</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    These terms are governed by the laws of the Kingdom of Saudi Arabia, and Saudi courts have jurisdiction over any disputes.
                  </p>
                </div>
              </section>

              {/* Last Updated */}
              <div className="bg-[hsl(250,50%,97%)] rounded-2xl p-6 text-center border border-purple-100">
                <p className="text-gray-600">
                  These terms were last updated in January 2025
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TermsOfUse;
