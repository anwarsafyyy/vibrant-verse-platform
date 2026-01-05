import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight, Shield, Eye, Lock, Database, UserCheck, Globe, Cookie, Clock, Mail, AlertTriangle, FileText, RefreshCw, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
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
              <Shield className="h-10 w-10 text-white -rotate-45" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[hsl(262,45%,25%)] mb-4">
              {dir === "rtl" ? "إشعار الخصوصية" : "Privacy Notice"}
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
                  تحرص <strong className="text-[hsl(262,45%,35%)]">شركة علو لتقنية المعلومات</strong> على احترام خصوصية عملائها وحماية بياناتهم الشخصية، وتلتزم بتقديم خدماتها وفق أعلى معايير الجودة والشفافية.
                </p>
                <p className="text-gray-700 leading-loose text-lg mt-4">
                  تم إعداد إشعار الخصوصية هذا بما يتوافق مع <strong className="text-[hsl(262,45%,35%)]">نظام حماية البيانات الشخصية في المملكة العربية السعودية</strong>، لشرح كيفية جمع بياناتك الشخصية واستخدامها وحمايتها.
                </p>
                <p className="text-gray-600 leading-loose mt-4">
                  يسري هذا الإشعار على جميع قطاعات ووحدات شركة علو لتقنية المعلومات، ويلتزم بتطبيقه جميع الموظفين والمقاولين ومقدمي الخدمات والمتعاقدين، سواء بشكل دائم أو مؤقت.
                </p>
              </section>

              {/* Section: أسباب جمع البيانات */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">أسباب جمع البيانات الشخصية</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose mb-6">
                    نقوم بجمع ومعالجة بياناتك الشخصية بهدف تقديم خدمات ومنتجات تلبي احتياجاتك بكفاءة. وتعتمد معالجة البيانات على أحد الأسس النظامية التالية:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">تنفيذ عقد</h4>
                      <p className="text-gray-600 text-sm">للوفاء بالتزاماتنا التعاقدية تجاهك.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">المصلحة المشروعة</h4>
                      <p className="text-gray-600 text-sm">مثل تحسين الخدمات، تعزيز أمن المعلومات، ومنع الاحتيال.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">الموافقة</h4>
                      <p className="text-gray-600 text-sm">عند استخدامها لأغراض التسويق، العروض، أو التواصل غير الإلزامي.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">الالتزام النظامي</h4>
                      <p className="text-gray-600 text-sm">للامتثال للأنظمة والتعليمات الحكومية، بما في ذلك متطلبات الأمن والصحة العامة.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: أغراض استخدام البيانات */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Database className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">أغراض استخدام البيانات</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose mb-4">تشمل أغراض جمع واستخدام البيانات الشخصية – على سبيل المثال لا الحصر – ما يلي:</p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>تطوير وتحسين وتسويق وتقديم منتجات وخدمات شركة علو لتقنية المعلومات.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>تشغيل الأنظمة الداخلية وضمان استمرارية وجودة الخدمات، وإصدار فواتير دقيقة ومعالجة المدفوعات.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>تحليل احتياجات العملاء وتفضيلاتهم واقتراح خدمات أو منتجات مناسبة لهم.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>إشعار العملاء بالخدمات أو المنتجات الجديدة أو التحديثات المهمة.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>التعامل مع الاستفسارات والشكاوى وتقديم تجربة عملاء مخصصة عبر مختلف القنوات.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section: ملفات تعريف الارتباط */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Cookie className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">ملفات تعريف الارتباط (Cookies)</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose mb-4">
                    تستخدم شركة علو لتقنية المعلومات ملفات تعريف الارتباط والتقنيات المشابهة لتحسين تجربة المستخدم على الموقع الإلكتروني والتطبيقات، وتشمل هذه الاستخدامات:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>الحفاظ على جلسة تسجيل الدخول.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>ضمان التشغيل السليم للموقع.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>تحليل كيفية استخدام الزوار للموقع والتطبيقات بهدف تحسين الأداء والخدمات.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section: أنواع البيانات */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Eye className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">أنواع البيانات التي يتم جمعها</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose mb-4">قد نقوم بجمع الأنواع التالية من البيانات الشخصية:</p>
                  <div className="space-y-4">
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">بيانات التسجيل</h4>
                      <p className="text-gray-600 text-sm">الاسم، البريد الإلكتروني، رقم الهاتف، العنوان، تاريخ الميلاد، الجنسية، الجنس.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">بيانات الاستخدام التقنية</h4>
                      <p className="text-gray-600 text-sm">ملفات تعريف الارتباط، بيانات التصفح، ونشاط المستخدم.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">بيانات التواصل</h4>
                      <p className="text-gray-600 text-sm">استفسارات دعم العملاء، الملاحظات، أو الشكاوى.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: طرق جمع البيانات */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">طرق جمع البيانات الشخصية</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose mb-4">يتم جمع البيانات الشخصية عبر عدة وسائل، من بينها:</p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>المنتجات والخدمات:</strong> عند التسجيل أو استخدام أو التعاقد على أحد خدماتنا.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>التواصل المباشر:</strong> عبر النماذج الإلكترونية، البريد الإلكتروني، الهاتف، أو مركز خدمة العملاء.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>منصات التواصل الاجتماعي:</strong> من خلال التفاعل المباشر معنا عبر حساباتنا الرسمية.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>التصفح الإلكتروني:</strong> مثل بيانات الزيارة، نوع المتصفح، وطرق الوصول إلى الموقع.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span><strong>الاستبيانات الإلكترونية:</strong> لجمع الآراء والملاحظات بهدف تحسين جودة الخدمات (ويكون تقديم البيانات الشخصية فيها اختياريًا).</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section: مدة الاحتفاظ */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">مدة الاحتفاظ بالبيانات</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    تحتفظ شركة علو لتقنية المعلومات بالبيانات الشخصية فقط للفترة اللازمة لتحقيق الأغراض التي جُمعت من أجلها، أو للامتثال للمتطلبات النظامية والتنظيمية.
                  </p>
                  <p className="text-gray-700 leading-loose mt-4">
                    ويتم حذف أو إتلاف البيانات بشكل آمن بعد انتهاء الحاجة إليها.
                  </p>
                </div>
              </section>

              {/* Section: حماية البيانات */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Lock className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">حماية البيانات ومشاركتها</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose mb-4">
                    تلتزم شركة علو لتقنية المعلومات بتطبيق تدابير تنظيمية وتقنية مناسبة لحماية البيانات الشخصية، بما يشمل:
                  </p>
                  <ul className="space-y-3 text-gray-600 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>أنظمة أمن معلومات متقدمة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>مراجعات وتدقيقات داخلية وخارجية</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>تدريب الموظفين على سياسات الخصوصية</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>الامتثال لتعليمات الجهات التنظيمية المختصة</span>
                    </li>
                  </ul>
                  <p className="text-gray-600 leading-loose mb-4">
                    ولا يتم الإفصاح عن البيانات الشخصية أو مشاركتها إلا في الحالات النظامية أو بموافقة صاحب البيانات، وبما يتوافق مع الأغراض الموضحة في هذا الإشعار.
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 font-bold flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      لا تقوم شركة علو لتقنية المعلومات ببيع أو تأجير أو تبادل البيانات الشخصية مع أي طرف خارجي.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section: نقل البيانات */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">نقل البيانات خارج المملكة</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose mb-4">
                    لا يتم نقل البيانات الشخصية خارج المملكة العربية السعودية إلا في الحالات التي يجيزها النظام، مثل:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>تنفيذ التزامات نظامية أو اتفاقيات دولية تكون المملكة طرفًا فيها</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>حماية المصالح الحيوية أو الصحة العامة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>الجهات الحكومية المختصة ووفق الضوابط النظامية</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section: حقوقك */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <UserCheck className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">حقوقك كصاحب بيانات</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose mb-4">يحق لك – وفقًا للأنظمة المعمول بها – ما يلي:</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">الحق في العلم</h4>
                      <p className="text-gray-600 text-sm">معرفة نوع وأغراض البيانات التي يتم جمعها.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">الحق في الوصول</h4>
                      <p className="text-gray-600 text-sm">الاطلاع على بياناتك الشخصية أو الحصول على نسخة منها.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">الحق في التصحيح</h4>
                      <p className="text-gray-600 text-sm">طلب تعديل أو تحديث بياناتك غير الدقيقة.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">الحق في سحب الموافقة</h4>
                      <p className="text-gray-600 text-sm">إلغاء الموافقة على المعالجة غير الإلزامية أو إيقاف الرسائل التسويقية.</p>
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-amber-800 text-sm">
                      يرجى ملاحظة أن عدم تزويدنا بالبيانات المطلوبة قد يؤثر على قدرتنا على تقديم بعض الخدمات أو الاستمرار فيها.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section: تحديثات الإشعار */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">تحديثات إشعار الخصوصية</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    تحتفظ شركة علو لتقنية المعلومات بحقها في تعديل أو تحديث إشعار الخصوصية هذا عند الحاجة، بما يتوافق مع المتطلبات النظامية أو تحسين الخدمات.
                  </p>
                  <p className="text-gray-700 leading-loose mt-4">
                    سيتم نشر أي تحديث على هذه الصفحة، ونوصي بمراجعتها بشكل دوري.
                  </p>
                </div>
              </section>

              {/* Section: التواصل */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">التواصل معنا</h2>
                </div>
                <div className="bg-[hsl(262,45%,35%)] rounded-2xl p-8 text-white">
                  <p className="leading-loose mb-6">
                    للاستفسارات أو الملاحظات أو الشكاوى المتعلقة بالخصوصية، يمكنكم التواصل معنا عبر البريد الإلكتروني أو مركز خدمة العملاء.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-white/70 text-sm">البريد الإلكتروني</p>
                        <p className="font-bold">info@olu-it.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-white/70 text-sm">الهاتف</p>
                        <p className="font-bold" dir="ltr">+966535656226</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            // English Version
            <div className="space-y-10">
              {/* Introduction */}
              <section className="bg-[hsl(250,50%,97%)] rounded-2xl p-8 border border-purple-100">
                <p className="text-gray-700 leading-loose text-lg">
                  <strong className="text-[hsl(262,45%,35%)]">OLU IT Company</strong> is committed to respecting the privacy of its customers and protecting their personal data, and is committed to providing its services according to the highest standards of quality and transparency.
                </p>
                <p className="text-gray-700 leading-loose text-lg mt-4">
                  This privacy notice has been prepared in accordance with the <strong className="text-[hsl(262,45%,35%)]">Personal Data Protection Law in the Kingdom of Saudi Arabia</strong>, to explain how your personal data is collected, used and protected.
                </p>
              </section>

              {/* Section: Reasons for Collecting Data */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">Reasons for Collecting Personal Data</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose mb-6">
                    We collect and process your personal data in order to provide services and products that meet your needs efficiently. Data processing is based on one of the following legal bases:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">Contract Execution</h4>
                      <p className="text-gray-600 text-sm">To fulfill our contractual obligations to you.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">Legitimate Interest</h4>
                      <p className="text-gray-600 text-sm">Such as improving services, enhancing information security, and preventing fraud.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">Consent</h4>
                      <p className="text-gray-600 text-sm">When used for marketing, offers, or non-mandatory communication purposes.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">Legal Compliance</h4>
                      <p className="text-gray-600 text-sm">To comply with government regulations and instructions, including security and public health requirements.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: Data Protection */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Lock className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">Data Protection and Sharing</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose mb-4">
                    OLU IT Company is committed to implementing appropriate organizational and technical measures to protect personal data, including:
                  </p>
                  <ul className="space-y-3 text-gray-600 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Advanced information security systems</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Internal and external reviews and audits</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Employee training on privacy policies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                      <span>Compliance with instructions from relevant regulatory authorities</span>
                    </li>
                  </ul>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-700 font-bold flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      OLU IT Company does not sell, rent, or exchange personal data with any third party.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section: Your Rights */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <UserCheck className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">Your Rights as a Data Subject</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">Right to Know</h4>
                      <p className="text-gray-600 text-sm">Know the type and purposes of data being collected.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">Right to Access</h4>
                      <p className="text-gray-600 text-sm">View your personal data or obtain a copy of it.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">Right to Correction</h4>
                      <p className="text-gray-600 text-sm">Request modification or update of your inaccurate data.</p>
                    </div>
                    <div className="bg-[hsl(250,50%,97%)] rounded-xl p-4">
                      <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2">Right to Withdraw Consent</h4>
                      <p className="text-gray-600 text-sm">Cancel consent for non-mandatory processing or stop marketing messages.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: Contact */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">Contact Us</h2>
                </div>
                <div className="bg-[hsl(262,45%,35%)] rounded-2xl p-8 text-white">
                  <p className="leading-loose mb-6">
                    For inquiries, comments, or complaints related to privacy, you can contact us via email or customer service center.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-white/70 text-sm">Email</p>
                        <p className="font-bold">info@olu-it.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-white/70 text-sm">Phone</p>
                        <p className="font-bold">+966535656226</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Last Updated */}
          <div className="mt-12 p-6 bg-[hsl(250,50%,97%)] rounded-2xl text-center border border-purple-100">
            <p className="text-gray-600">
              {dir === "rtl" 
                ? "تم آخر تحديث لهذا الإشعار في يناير 2025"
                : "This notice was last updated in January 2025"
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
