import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight, Building2, Target, Users, Lightbulb, Award, Globe, Briefcase, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const AboutCompany: React.FC = () => {
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
              <Building2 className="h-10 w-10 text-white -rotate-45" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[hsl(262,45%,25%)] mb-4">
              {dir === "rtl" ? "عن شركة علو" : "About OLU Company"}
            </h1>
            <p className="text-xl text-gray-700 font-bold">
              {dir === "rtl" ? "رواد التحول الرقمي في المملكة العربية السعودية" : "Leading Digital Transformation in Saudi Arabia"}
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
                  <strong className="text-[hsl(262,45%,35%)]">شركة علو لتقنية المعلومات</strong> هي شركة سعودية رائدة في مجال التحول الرقمي وتطوير الحلول التقنية المبتكرة. تأسست الشركة بهدف مساعدة الأعمال على النمو والازدهار في العصر الرقمي من خلال تقديم خدمات متطورة في تطوير المواقع الإلكترونية، تحسين محركات البحث، والتسويق الرقمي.
                </p>
              </section>

              {/* Vision */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Target className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">رؤيتنا</h2>
                </div>
                <div className="bg-[hsl(262,45%,35%)] rounded-2xl p-6 border border-purple-400/20">
                  <p className="text-lg text-white leading-relaxed">
                    أن نكون الشريك التقني الأول للشركات في المملكة العربية السعودية، ونساهم في تحقيق رؤية 2030 من خلال التحول الرقمي المبتكر والفعال.
                  </p>
                </div>
              </section>

              {/* Mission */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">رسالتنا</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    نلتزم بتقديم حلول تقنية مبتكرة وعالية الجودة تساعد عملاءنا على تحقيق أهدافهم التجارية وتعزيز حضورهم الرقمي بطريقة فعالة ومستدامة.
                  </p>
                </div>
              </section>

              {/* Core Values */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Award className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">قيمنا الأساسية</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[hsl(250,50%,97%)] rounded-xl p-5 border border-purple-100">
                    <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2 text-lg">الابتكار</h4>
                    <p className="text-gray-600">نسعى دائماً لتطبيق أحدث التقنيات وأفضل الممارسات في مشاريعنا</p>
                  </div>
                  <div className="bg-[hsl(250,50%,97%)] rounded-xl p-5 border border-purple-100">
                    <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2 text-lg">الجودة</h4>
                    <p className="text-gray-600">نلتزم بتقديم خدمات عالية الجودة تفوق توقعات عملائنا</p>
                  </div>
                  <div className="bg-[hsl(250,50%,97%)] rounded-xl p-5 border border-purple-100">
                    <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2 text-lg">الشراكة</h4>
                    <p className="text-gray-600">نؤمن ببناء شراكات طويلة الأمد مع عملائنا</p>
                  </div>
                  <div className="bg-[hsl(250,50%,97%)] rounded-xl p-5 border border-purple-100">
                    <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2 text-lg">الشفافية</h4>
                    <p className="text-gray-600">نتعامل بصدق وشفافية في جميع تعاملاتنا التجارية</p>
                  </div>
                </div>
              </section>

              {/* Team Stats */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Users className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">فريق العمل</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
                  <p className="text-gray-700 leading-loose">
                    يضم فريقنا نخبة من المطورين والمصممين والمسوقين الرقميين ذوي الخبرة والإبداع. نحن نؤمن بأن النجاح يتحقق من خلال العمل الجماعي والتعلم المستمر.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[hsl(262,45%,35%)] rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-white mb-1">+15</div>
                    <div className="text-white/70 text-sm">خبير تقني</div>
                  </div>
                  <div className="bg-[hsl(262,45%,35%)] rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-white mb-1">+100</div>
                    <div className="text-white/70 text-sm">مشروع مكتمل</div>
                  </div>
                  <div className="bg-[hsl(262,45%,35%)] rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-white mb-1">+8</div>
                    <div className="text-white/70 text-sm">سنوات خبرة</div>
                  </div>
                </div>
              </section>

              {/* Services */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">خدماتنا المتخصصة</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                        <span>تطوير المواقع الإلكترونية المتجاوبة</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                        <span>تطوير تطبيقات الهاتف المحمول</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                        <span>تحسين محركات البحث (SEO)</span>
                      </li>
                    </ul>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                        <span>التسويق الرقمي والإعلانات</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                        <span>تصميم الهوية البصرية</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                        <span>الاستشارات التقنية</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">تواصل معنا</h2>
                </div>
                <div className="bg-[hsl(250,50%,97%)] rounded-2xl p-6 border border-purple-100">
                  <p className="text-gray-700 leading-loose mb-6">
                    نحن هنا لمساعدتك في تحقيق أهدافك الرقمية. تواصل معنا اليوم لمناقشة مشروعك القادم.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white rounded-xl p-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(262,45%,35%)]/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-[hsl(262,45%,35%)]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">العنوان</div>
                        <div className="font-medium text-gray-800">جازان، المملكة العربية السعودية</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-xl p-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(262,45%,35%)]/10 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-[hsl(262,45%,35%)]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">الهاتف</div>
                        <div className="font-medium text-gray-800" dir="ltr">+966535656226</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-xl p-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(262,45%,35%)]/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-[hsl(262,45%,35%)]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">البريد الإلكتروني</div>
                        <div className="font-medium text-gray-800">info@olu-it.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-xl p-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(262,45%,35%)]/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-[hsl(262,45%,35%)]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">ساعات العمل</div>
                        <div className="font-medium text-gray-800">9 صباحاً - 5 مساءً</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Introduction */}
              <section className="bg-[hsl(250,50%,97%)] rounded-2xl p-8 border border-purple-100">
                <p className="text-gray-700 leading-loose text-lg">
                  <strong className="text-[hsl(262,45%,35%)]">OLU Information Technology Company</strong> is a leading Saudi company in the field of digital transformation and innovative technology solutions development. The company was founded to help businesses grow and thrive in the digital age by providing advanced services in website development, search engine optimization, and digital marketing.
                </p>
              </section>

              {/* Vision */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Target className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">Our Vision</h2>
                </div>
                <div className="bg-[hsl(262,45%,35%)] rounded-2xl p-6 border border-purple-400/20">
                  <p className="text-lg text-white leading-relaxed">
                    To be the first technology partner for companies in Saudi Arabia, and contribute to achieving Vision 2030 through innovative and effective digital transformation.
                  </p>
                </div>
              </section>

              {/* Mission */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">Our Mission</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-loose">
                    We are committed to providing innovative and high-quality technology solutions that help our clients achieve their business goals and enhance their digital presence effectively and sustainably.
                  </p>
                </div>
              </section>

              {/* Core Values */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Award className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">Our Core Values</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[hsl(250,50%,97%)] rounded-xl p-5 border border-purple-100">
                    <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2 text-lg">Innovation</h4>
                    <p className="text-gray-600">We always strive to apply the latest technologies and best practices in our projects</p>
                  </div>
                  <div className="bg-[hsl(250,50%,97%)] rounded-xl p-5 border border-purple-100">
                    <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2 text-lg">Quality</h4>
                    <p className="text-gray-600">We are committed to delivering high-quality services that exceed our clients' expectations</p>
                  </div>
                  <div className="bg-[hsl(250,50%,97%)] rounded-xl p-5 border border-purple-100">
                    <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2 text-lg">Partnership</h4>
                    <p className="text-gray-600">We believe in building long-term partnerships with our clients</p>
                  </div>
                  <div className="bg-[hsl(250,50%,97%)] rounded-xl p-5 border border-purple-100">
                    <h4 className="font-bold text-[hsl(262,45%,35%)] mb-2 text-lg">Transparency</h4>
                    <p className="text-gray-600">We deal with honesty and transparency in all our business dealings</p>
                  </div>
                </div>
              </section>

              {/* Team Stats */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Users className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">Our Team</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-4">
                  <p className="text-gray-700 leading-loose">
                    Our team includes a selection of experienced and creative developers, designers, and digital marketers. We believe that success is achieved through teamwork and continuous learning.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[hsl(262,45%,35%)] rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-white mb-1">15+</div>
                    <div className="text-white/70 text-sm">Technical Experts</div>
                  </div>
                  <div className="bg-[hsl(262,45%,35%)] rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-white mb-1">100+</div>
                    <div className="text-white/70 text-sm">Completed Projects</div>
                  </div>
                  <div className="bg-[hsl(262,45%,35%)] rounded-xl p-5 text-center">
                    <div className="text-3xl font-bold text-white mb-1">8+</div>
                    <div className="text-white/70 text-sm">Years Experience</div>
                  </div>
                </div>
              </section>

              {/* Services */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">Our Specialized Services</h2>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                        <span>Responsive Website Development</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                        <span>Mobile Application Development</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                        <span>Search Engine Optimization (SEO)</span>
                      </li>
                    </ul>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                        <span>Digital Marketing and Advertising</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                        <span>Brand Identity Design</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-[hsl(262,45%,35%)] rounded-full mt-2 flex-shrink-0"></span>
                        <span>Technical Consulting</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(262,45%,35%)] rounded-xl rotate-45 flex items-center justify-center flex-shrink-0">
                    <Globe className="h-7 w-7 text-white -rotate-45" />
                  </div>
                  <h2 className="text-2xl font-bold text-[hsl(262,45%,25%)]">Contact Us</h2>
                </div>
                <div className="bg-[hsl(250,50%,97%)] rounded-2xl p-6 border border-purple-100">
                  <p className="text-gray-700 leading-loose mb-6">
                    We are here to help you achieve your digital goals. Contact us today to discuss your next project.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white rounded-xl p-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(262,45%,35%)]/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-[hsl(262,45%,35%)]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Address</div>
                        <div className="font-medium text-gray-800">Jazan, Saudi Arabia</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-xl p-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(262,45%,35%)]/10 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-[hsl(262,45%,35%)]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Phone</div>
                        <div className="font-medium text-gray-800" dir="ltr">+966535656226</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-xl p-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(262,45%,35%)]/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-[hsl(262,45%,35%)]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="font-medium text-gray-800">info@olu-it.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-xl p-4">
                      <div className="w-10 h-10 rounded-lg bg-[hsl(262,45%,35%)]/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-[hsl(262,45%,35%)]" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Working Hours</div>
                        <div className="font-medium text-gray-800">9 AM - 5 PM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AboutCompany;
