import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight, Building2, Target, Users, Lightbulb, Award, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const AboutCompany: React.FC = () => {
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
              <Building2 className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              {dir === "rtl" ? "عن شركة علو" : "About Olu Company"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {dir === "rtl" 
                ? "رواد التحول الرقمي في المملكة العربية السعودية"
                : "Leading Digital Transformation in Saudi Arabia"
              }
            </p>
          </div>

          <div className="prose max-w-none">
            {dir === "rtl" ? (
              <div className="space-y-8 text-right">
                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <Globe className="h-6 w-6" />
                    من نحن
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    شركة علو لتقنية المعلومات هي شركة سعودية رائدة في مجال التحول الرقمي وتطوير الحلول التقنية المبتكرة. تأسست الشركة بهدف مساعدة الأعمال على النمو والازدهار في العصر الرقمي من خلال تقديم خدمات متطورة في تطوير المواقع الإلكترونية، تحسين محركات البحث، والتسويق الرقمي.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <Target className="h-6 w-6" />
                    رؤيتنا
                  </h2>
                  <div className="p-6 bg-primary/5 rounded-lg">
                    <p className="text-lg font-medium text-primary">
                      أن نكون الشريك التقني الأول للشركات في المملكة العربية السعودية، ونساهم في تحقيق رؤية 2030 من خلال التحول الرقمي المبتكر والفعال.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <Lightbulb className="h-6 w-6" />
                    رسالتنا
                  </h2>
                  <div className="p-6 bg-muted rounded-lg">
                    <p className="text-muted-foreground leading-relaxed">
                      نلتزم بتقديم حلول تقنية مبتكرة وعالية الجودة تساعد عملاءنا على تحقيق أهدافهم التجارية وتعزيز حضورهم الرقمي بطريقة فعالة ومستدامة.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <Award className="h-6 w-6" />
                    قيمنا الأساسية
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">الابتكار</h3>
                      <p className="text-blue-700 text-sm">
                        نسعى دائماً لتطبيق أحدث التقنيات وأفضل الممارسات في مشاريعنا
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">الجودة</h3>
                      <p className="text-green-700 text-sm">
                        نلتزم بتقديم خدمات عالية الجودة تفوق توقعات عملائنا
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <h3 className="font-semibold text-purple-800 mb-2">الشراكة</h3>
                      <p className="text-purple-700 text-sm">
                        نؤمن ببناء شراكات طويلة الأمد مع عملائنا
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                      <h3 className="font-semibold text-orange-800 mb-2">الشفافية</h3>
                      <p className="text-orange-700 text-sm">
                        نتعامل بصدق وشفافية في جميع تعاملاتنا التجارية
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center justify-end gap-2">
                    <Users className="h-6 w-6" />
                    فريق العمل
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    يضم فريقنا نخبة من المطورين والمصممين والمسوقين الرقميين ذوي الخبرة والإبداع. نحن نؤمن بأن النجاح يتحقق من خلال العمل الجماعي والتعلم المستمر.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-3xl font-bold text-primary">15+</div>
                      <div className="text-sm text-muted-foreground">خبير تقني</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-3xl font-bold text-primary">100+</div>
                      <div className="text-sm text-muted-foreground">مشروع مكتمل</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-3xl font-bold text-primary">5</div>
                      <div className="text-sm text-muted-foreground">سنوات خبرة</div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">خدماتنا المتخصصة</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        تطوير المواقع الإلكترونية المتجاوبة
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        تطوير تطبيقات الهاتف المحمول
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        تحسين محركات البحث (SEO)
                      </li>
                    </ul>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        التسويق الرقمي والإعلانات
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        تصميم الهوية البصرية
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        الاستشارات التقنية
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">تواصل معنا</h2>
                  <div className="mt-4 p-6 bg-primary/5 rounded-lg">
                    <p className="text-muted-foreground mb-4">
                      نحن هنا لمساعدتك في تحقيق أهدافك الرقمية. تواصل معنا اليوم لمناقشة مشروعك القادم.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p><strong>العنوان:</strong> جازان، المملكة العربية السعودية</p>
                        <p><strong>الهاتف:</strong> +966535656226</p>
                      </div>
                      <div>
                        <p><strong>البريد الإلكتروني:</strong> info@olu-it.com</p>
                        <p><strong>ساعات العمل:</strong> 9 صباحاً - 5 مساءً</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Globe className="h-6 w-6" />
                    Who We Are
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Olu Information Technology Company is a leading Saudi company in the field of digital transformation and innovative technology solutions development. The company was founded to help businesses grow and thrive in the digital age by providing advanced services in website development, search engine optimization, and digital marketing.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Target className="h-6 w-6" />
                    Our Vision
                  </h2>
                  <div className="p-6 bg-primary/5 rounded-lg">
                    <p className="text-lg font-medium text-primary">
                      To be the first technology partner for companies in Saudi Arabia, and contribute to achieving Vision 2030 through innovative and effective digital transformation.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Lightbulb className="h-6 w-6" />
                    Our Mission
                  </h2>
                  <div className="p-6 bg-muted rounded-lg">
                    <p className="text-muted-foreground leading-relaxed">
                      We are committed to providing innovative and high-quality technology solutions that help our clients achieve their business goals and enhance their digital presence effectively and sustainably.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6" />
                    Our Core Values
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <h3 className="font-semibold text-blue-800 mb-2">Innovation</h3>
                      <p className="text-blue-700 text-sm">
                        We always strive to apply the latest technologies and best practices in our projects
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <h3 className="font-semibold text-green-800 mb-2">Quality</h3>
                      <p className="text-green-700 text-sm">
                        We are committed to delivering high-quality services that exceed our clients' expectations
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <h3 className="font-semibold text-purple-800 mb-2">Partnership</h3>
                      <p className="text-purple-700 text-sm">
                        We believe in building long-term partnerships with our clients
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                      <h3 className="font-semibold text-orange-800 mb-2">Transparency</h3>
                      <p className="text-orange-700 text-sm">
                        We deal with honesty and transparency in all our business dealings
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    Our Team
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our team includes a selection of experienced and creative developers, designers, and digital marketers. We believe that success is achieved through teamwork and continuous learning.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-3xl font-bold text-primary">15+</div>
                      <div className="text-sm text-muted-foreground">Technical Experts</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-3xl font-bold text-primary">100+</div>
                      <div className="text-sm text-muted-foreground">Completed Projects</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-3xl font-bold text-primary">5</div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">Our Specialized Services</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Responsive Website Development
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Mobile Application Development
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Search Engine Optimization (SEO)
                      </li>
                    </ul>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Digital Marketing and Advertising
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Brand Identity Design
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Technical Consulting
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
                  <div className="mt-4 p-6 bg-primary/5 rounded-lg">
                    <p className="text-muted-foreground mb-4">
                      We are here to help you achieve your digital goals. Contact us today to discuss your next project.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p><strong>Address:</strong> Jazan, Saudi Arabia</p>
                        <p><strong>Phone:</strong> +966535656226</p>
                      </div>
                      <div>
                        <p><strong>Email:</strong> info@olu-it.com</p>
                        <p><strong>Business Hours:</strong> 9 AM - 5 PM</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>

          <div className="mt-12 p-6 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              {dir === "rtl" 
                ? "شركة علو لتقنية المعلومات - شريكك في التحول الرقمي منذ 2020"
                : "Olu Information Technology Company - Your Digital Transformation Partner Since 2020"
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutCompany;