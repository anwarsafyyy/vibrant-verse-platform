import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft, ArrowRight, Calendar, User, Tag, BookOpen, Share2, Clock } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface BlogPostData {
  id: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string;
  excerpt_en: string;
  content_ar?: string;
  content_en?: string;
  author: string;
  date: string;
  category_ar: string;
  category_en: string;
  image: string;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { dir, language } = useLanguage();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const docRef = doc(db, "blog_posts", id!);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() } as BlogPostData);
      } else {
        navigate("/blog");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      navigate("/blog");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: language === "ar" ? post?.title_ar : post?.title_en,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-[400px] w-full rounded-2xl mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const title = language === "ar" ? post.title_ar : post.title_en;
  const excerpt = language === "ar" ? post.excerpt_ar : post.excerpt_en;
  const content = language === "ar" ? (post.content_ar || post.excerpt_ar) : (post.content_en || post.excerpt_en);
  const category = language === "ar" ? post.category_ar : post.category_en;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-8">
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              {dir === "rtl" ? (
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              ) : (
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              )}
              <span className="font-medium">
                {language === "ar" ? "العودة للمدونة" : "Back to Blog"}
              </span>
            </Link>
            
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold border border-primary/20">
                {category}
              </span>
            </div>
            
            {/* Title */}
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight ${dir === "rtl" ? "text-right" : "text-left"}`}>
              {title}
            </h1>
            
            {/* Meta Info */}
            <div className={`flex flex-wrap items-center gap-4 text-muted-foreground mb-8 ${dir === "rtl" ? "justify-start" : "justify-start"}`}>
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl">
                <User className="h-4 w-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-xl">
                <Clock className="h-4 w-4" />
                <span>{language === "ar" ? "5 دقائق للقراءة" : "5 min read"}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                {language === "ar" ? "مشاركة" : "Share"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto px-4 -mt-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={post.image} 
              alt={title}
              className="w-full h-[300px] md:h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <article className={`bg-card rounded-3xl border border-border p-8 md:p-12 shadow-lg ${dir === "rtl" ? "text-right" : "text-left"}`}>
            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed border-b border-border pb-8">
              {excerpt}
            </p>
            
            {/* Main Content */}
            <div 
              className="prose prose-lg max-w-none text-foreground leading-relaxed"
              style={{ 
                lineHeight: '2',
                fontSize: '1.125rem'
              }}
            >
              {content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-6 text-muted-foreground">
                    {paragraph}
                  </p>
                )
              ))}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="h-5 w-5 text-primary" />
                <span className="font-bold text-foreground">
                  {language === "ar" ? "الوسوم:" : "Tags:"}
                </span>
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                  {category}
                </span>
              </div>
            </div>
          </article>

          {/* Back to Blog CTA */}
          <div className="mt-12 text-center">
            <Link to="/blog">
              <Button size="lg" className="font-bold">
                {dir === "rtl" ? (
                  <>
                    {language === "ar" ? "استكشف المزيد من المقالات" : "Explore More Articles"}
                    <ArrowLeft className="h-5 w-5 mr-2" />
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-5 w-5 ml-2" />
                    {language === "ar" ? "استكشف المزيد من المقالات" : "Explore More Articles"}
                  </>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
