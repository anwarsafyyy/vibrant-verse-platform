import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, User, Tag, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Blog: React.FC = () => {
  const { dir, language } = useLanguage();

  // Sample blog posts - in a real app, this would come from a database
  const blogPosts = [
    {
      id: 1,
      title_ar: "أهمية تحسين محركات البحث في 2025",
      title_en: "The Importance of SEO in 2025",
      excerpt_ar: "كيف تحسن ترتيب موقعك في محركات البحث وتزيد من حركة الزوار الطبيعية",
      excerpt_en: "How to improve your website ranking in search engines and increase organic traffic",
      author: "فريق علو",
      date: "2025-01-15",
      category_ar: "تحسين محركات البحث",
      category_en: "SEO",
      image: "/public/11.jpeg"
    },
    {
      id: 2,
      title_ar: "اتجاهات تطوير المواقع الحديثة",
      title_en: "Modern Web Development Trends",
      excerpt_ar: "استكشف أحدث التقنيات والأدوات في عالم تطوير المواقع الإلكترونية",
      excerpt_en: "Explore the latest technologies and tools in web development",
      author: "فريق علو",
      date: "2025-01-10",
      category_ar: "تطوير المواقع",
      category_en: "Web Development",
      image: "/public/22.jpeg"
    },
    {
      id: 3,
      title_ar: "استراتيجيات التسويق الرقمي الفعالة",
      title_en: "Effective Digital Marketing Strategies",
      excerpt_ar: "طرق مبتكرة للوصول إلى جمهورك المستهدف وزيادة المبيعات",
      excerpt_en: "Innovative ways to reach your target audience and increase sales",
      author: "فريق علو",
      date: "2025-01-05",
      category_ar: "التسويق الرقمي",
      category_en: "Digital Marketing",
      image: "/public/33.jpeg"
    },
    {
      id: 4,
      title_ar: "أمان المواقع الإلكترونية: دليل شامل",
      title_en: "Website Security: A Complete Guide",
      excerpt_ar: "كيف تحمي موقعك الإلكتروني من التهديدات السيبرانية والهجمات",
      excerpt_en: "How to protect your website from cyber threats and attacks",
      author: "فريق علو",
      date: "2024-12-28",
      category_ar: "الأمان",
      category_en: "Security",
      image: "/public/44.jpeg"
    }
  ];

  const categories = [
    { ar: "جميع المقالات", en: "All Articles" },
    { ar: "تحسين محركات البحث", en: "SEO" },
    { ar: "تطوير المواقع", en: "Web Development" },
    { ar: "التسويق الرقمي", en: "Digital Marketing" },
    { ar: "الأمان", en: "Security" }
  ];

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
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 ${dir === "rtl" ? "text-right" : "text-left"}`}>
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-primary mb-4">
              {dir === "rtl" ? "مدونة علو التقنية" : "Olu Tech Blog"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {dir === "rtl" 
                ? "اكتشف أحدث المقالات والنصائح في عالم التكنولوجيا والتسويق الرقمي"
                : "Discover the latest articles and tips in technology and digital marketing"
              }
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  index === 0 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white text-muted-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {dir === "rtl" ? category.ar : category.en}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          <div className="mb-12">
            <div className="relative bg-gradient-to-r from-primary/10 to-primary/20 rounded-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {dir === "rtl" ? "مقال مميز" : "Featured Article"}
                    </span>
                  </div>
                  <h2 className={`text-3xl font-bold text-primary mb-4 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                    {dir === "rtl" ? blogPosts[0].title_ar : blogPosts[0].title_en}
                  </h2>
                  <p className={`text-muted-foreground mb-6 leading-relaxed ${dir === "rtl" ? "text-right" : "text-left"}`}>
                    {dir === "rtl" ? blogPosts[0].excerpt_ar : blogPosts[0].excerpt_en}
                  </p>
                  <div className={`flex items-center gap-4 text-sm text-muted-foreground mb-6 ${dir === "rtl" ? "justify-end" : "justify-start"}`}>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {blogPosts[0].author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {blogPosts[0].date}
                    </div>
                  </div>
                  <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                    {dir === "rtl" ? "اقرأ المزيد" : "Read More"}
                  </button>
                </div>
                <div className="relative h-64 lg:h-auto">
                  <img 
                    src={blogPosts[0].image} 
                    alt={dir === "rtl" ? blogPosts[0].title_ar : blogPosts[0].title_en}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={post.image} 
                    alt={dir === "rtl" ? post.title_ar : post.title_en}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs">
                      {dir === "rtl" ? post.category_ar : post.category_en}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl font-semibold text-primary mb-3 line-clamp-2 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                    {dir === "rtl" ? post.title_ar : post.title_en}
                  </h3>
                  <p className={`text-muted-foreground mb-4 line-clamp-3 ${dir === "rtl" ? "text-right" : "text-left"}`}>
                    {dir === "rtl" ? post.excerpt_ar : post.excerpt_en}
                  </p>
                  
                  <div className={`flex items-center justify-between text-sm text-muted-foreground mb-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                  </div>
                  
                  <button className="w-full bg-primary/5 text-primary py-2 rounded-lg hover:bg-primary/10 transition-colors">
                    {dir === "rtl" ? "اقرأ المقال" : "Read Article"}
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">
                {dir === "rtl" ? "اشترك في نشرتنا الإخبارية" : "Subscribe to Our Newsletter"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {dir === "rtl" 
                  ? "احصل على أحدث المقالات والنصائح التقنية مباشرة في بريدك الإلكتروني"
                  : "Get the latest articles and tech tips delivered directly to your inbox"
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={dir === "rtl" ? "عنوان بريدك الإلكتروني" : "Your email address"}
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  {dir === "rtl" ? "اشتراك" : "Subscribe"}
                </button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-primary mb-4">
              {dir === "rtl" ? "الكلمات المفتاحية" : "Popular Tags"}
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { ar: "تطوير المواقع", en: "Web Development" },
                { ar: "SEO", en: "SEO" },
                { ar: "التسويق الرقمي", en: "Digital Marketing" },
                { ar: "الذكاء الاصطناعي", en: "AI" },
                { ar: "التجارة الإلكترونية", en: "E-commerce" },
                { ar: "الأمان السيبراني", en: "Cybersecurity" }
              ].map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                >
                  <Tag className="h-3 w-3 inline mr-1" />
                  {dir === "rtl" ? tag.ar : tag.en}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;