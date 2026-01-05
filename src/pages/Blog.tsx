import React, { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, User, Tag, TrendingUp, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string;
  excerpt_en: string;
  author: string;
  date: string;
  category_ar: string;
  category_en: string;
  image: string;
  is_featured?: boolean;
}

const Blog: React.FC = () => {
  const { dir, language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "blog_posts"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { ar: "جميع المقالات", en: "All Articles", value: null },
    { ar: "تحسين محركات البحث", en: "SEO", value: "SEO" },
    { ar: "تطوير المواقع", en: "Web Development", value: "Web Development" },
    { ar: "التسويق الرقمي", en: "Digital Marketing", value: "Digital Marketing" },
    { ar: "الأمان", en: "Security", value: "Security" }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = !selectedCategory || 
      post.category_en === selectedCategory || 
      post.category_ar === selectedCategory;
    
    const matchesSearch = !searchQuery || 
      post.title_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt_en.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find(p => p.is_featured) || filteredPosts[0];
  const otherPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }} />
        
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold text-primary">
                {language === "ar" ? "مدونة علو التقنية" : "Olu Tech Blog"}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {language === "ar" 
                ? "اكتشف عالم التقنية معنا" 
                : "Discover the Tech World with Us"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {language === "ar" 
                ? "مقالات ونصائح حصرية في التسويق الرقمي، تطوير المواقع، وأحدث التقنيات"
                : "Exclusive articles and tips on digital marketing, web development, and latest technologies"}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={language === "ar" ? "ابحث عن مقال..." : "Search for an article..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-6 py-4 rounded-2xl border border-border bg-card/80 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25" 
                    : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary hover:bg-primary/5"
                }`}
              >
                {language === "ar" ? category.ar : category.en}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-8">
              <Skeleton className="h-[400px] w-full rounded-3xl" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-[350px] rounded-2xl" />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredPost && (
                <div className="mb-16">
                  <div className="relative bg-card rounded-3xl overflow-hidden border border-border shadow-xl group hover:shadow-2xl transition-all duration-500">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp className="h-5 w-5 text-accent" />
                          <span className="text-sm font-bold text-accent">
                            {language === "ar" ? "مقال مميز" : "Featured Article"}
                          </span>
                        </div>
                        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight ${dir === "rtl" ? "text-right" : "text-left"}`}>
                          {language === "ar" ? featuredPost.title_ar : featuredPost.title_en}
                        </h2>
                        <p className={`text-muted-foreground mb-6 leading-relaxed text-lg ${dir === "rtl" ? "text-right" : "text-left"}`}>
                          {language === "ar" ? featuredPost.excerpt_ar : featuredPost.excerpt_en}
                        </p>
                        <div className={`flex items-center gap-4 text-sm text-muted-foreground mb-6 ${dir === "rtl" ? "justify-start" : "justify-start"}`}>
                          <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-lg">
                            <User className="h-4 w-4" />
                            {featuredPost.author}
                          </div>
                          <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-lg">
                            <Calendar className="h-4 w-4" />
                            {featuredPost.date}
                          </div>
                        </div>
                        <Link 
                          to={`/blog/${featuredPost.id}`}
                          className="self-start bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 inline-block"
                        >
                          {language === "ar" ? "اقرأ المزيد" : "Read More"}
                        </Link>
                      </div>
                      <div className="relative h-64 lg:h-auto min-h-[300px] order-1 lg:order-2 overflow-hidden">
                        <img 
                          src={featuredPost.image} 
                          alt={language === "ar" ? featuredPost.title_ar : featuredPost.title_en}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent lg:bg-gradient-to-r" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                            {language === "ar" ? featuredPost.category_ar : featuredPost.category_en}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blog Posts Grid */}
              {otherPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post, index) => (
                    <article 
                      key={post.id} 
                      className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={language === "ar" ? post.title_ar : post.title_en}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                            {language === "ar" ? post.category_ar : post.category_en}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className={`text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors ${dir === "rtl" ? "text-right" : "text-left"}`}>
                          {language === "ar" ? post.title_ar : post.title_en}
                        </h3>
                        <p className={`text-muted-foreground mb-4 line-clamp-2 leading-relaxed ${dir === "rtl" ? "text-right" : "text-left"}`}>
                          {language === "ar" ? post.excerpt_ar : post.excerpt_en}
                        </p>
                        
                        <div className={`flex items-center justify-between text-xs text-muted-foreground mb-4`}>
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {post.date}
                          </div>
                        </div>
                        
                        <Link 
                          to={`/blog/${post.id}`}
                          className="w-full bg-primary/10 text-primary py-2.5 rounded-xl font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 block text-center"
                        >
                          {language === "ar" ? "اقرأ المقال" : "Read Article"}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {language === "ar" ? "لا توجد مقالات" : "No articles found"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "ar" ? "جرب البحث بكلمات مختلفة" : "Try searching with different keywords"}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Newsletter Signup */}
          <div className="mt-20">
            <div className="relative bg-card rounded-3xl p-8 md:p-12 border border-border overflow-hidden">
              
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {language === "ar" ? "اشترك في نشرتنا الإخبارية" : "Subscribe to Our Newsletter"}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {language === "ar" 
                    ? "احصل على أحدث المقالات والنصائح التقنية مباشرة في بريدك الإلكتروني"
                    : "Get the latest articles and tech tips delivered directly to your inbox"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder={language === "ar" ? "عنوان بريدك الإلكتروني" : "Your email address"}
                    className="flex-1 px-5 py-3 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 whitespace-nowrap">
                    {language === "ar" ? "اشتراك" : "Subscribe"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-16 text-center">
            <h3 className="text-lg font-bold text-foreground mb-6">
              {language === "ar" ? "الكلمات المفتاحية الشائعة" : "Popular Tags"}
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground text-sm rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20"
                >
                  <Tag className="h-3.5 w-3.5" />
                  {language === "ar" ? tag.ar : tag.en}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
