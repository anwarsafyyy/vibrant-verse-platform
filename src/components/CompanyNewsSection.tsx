
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCollection } from "@/lib/firebaseHelpers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface NewsItem {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image_url: string;
  date: string;
  order_index: number;
  is_active: boolean;
}

// Static fallback news data
const fallbackNews: NewsItem[] = [
  {
    id: "1",
    title_ar: "توقيع مذكرة تعاون إستراتيجية",
    title_en: "Strategic Cooperation Agreement",
    description_ar: "وقعت شركة (علو | Olu) مذكرة تعاون مع شركة (أجنحة الطيران) لتعزيز الإبتكار والعمل المشترك في تنفيذ مشاريع تقنية رائدة تخدم رؤيتنا للمستقبل.",
    description_en: "Olu Company signed a cooperation agreement with Fly Wings Company to enhance innovation and joint work in implementing pioneering technical projects that serve our vision for the future.",
    image_url: "/news/news1.jpeg",
    date: "2024-01-15",
    order_index: 0,
    is_active: true
  },
  {
    id: "2",
    title_ar: "توقيع مذكرة تعاون",
    title_en: "Cooperation Memorandum",
    description_ar: "شركة علو توقّع مذكرة تعاون مع شركة منصب العُمانية للتعاون في تطوير الحلول التقنية وتعزيز الشراكة بين البلدين.",
    description_en: "Olu Company signs a cooperation memorandum with Omani Mansab Company to cooperate in developing technical solutions and strengthening partnership between the two countries.",
    image_url: "/news/news2.jpeg",
    date: "2024-02-20",
    order_index: 1,
    is_active: true
  },
];

const CompanyNewsSection: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(fallbackNews);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  // Fetch news from Firebase
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getCollection<NewsItem>('company_news', [], 'order_index', 'asc');
        if (data && data.length > 0) {
          const activeNews = data.filter(item => item.is_active !== false);
          setNewsItems(activeNews.length > 0 ? activeNews : fallbackNews);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('news');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!api) return;
    
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);


  return (
    <section id="news" className="py-12 lg:py-16 relative overflow-hidden bg-white">
      {/* Decorative Background Circles */}
      <div className="absolute left-[-5%] top-[10%] w-32 h-32 md:w-48 md:h-48 bg-[hsl(250,40%,75%)] rounded-full opacity-40" />
      <div className="absolute right-[-3%] bottom-[15%] w-24 h-24 md:w-36 md:h-36 bg-[hsl(250,40%,75%)] rounded-full opacity-35" />
      <div className="absolute right-[20%] top-[5%] w-16 h-16 md:w-24 md:h-24 bg-[hsl(320,50%,80%)] rounded-full opacity-40" />
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`flex items-center gap-4 mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="relative">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rotate-45 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Newspaper className="w-6 h-6 md:w-7 md:h-7 text-white -rotate-45" />
            </div>
          </div>
          
          <div className="text-right">
            <span className="text-purple-500 font-bold text-base md:text-lg">
              {language === 'ar' ? 'آخر الأخبار' : 'Latest News'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              {language === 'ar' ? 'أخبار الشركة' : 'Company News'}
            </h2>
          </div>
        </div>

        {/* News Carousel */}
        <div className={`relative ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: isMobile ? 1 : 2,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {newsItems.map((news, index) => (
                <CarouselItem key={news.id} className="pl-4 md:basis-1/2">
                  <div className="group relative bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <img 
                        src={news.image_url} 
                        alt={language === 'ar' ? news.title_ar : news.title_en}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(262,45%,25%)] via-transparent to-transparent opacity-90" />
                      
                      {/* Title on Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 text-right leading-relaxed">
                          {language === 'ar' ? news.title_ar : news.title_en}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 bg-gradient-to-b from-white to-purple-50/50">
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed text-right line-clamp-3">
                        {language === 'ar' ? news.description_ar : news.description_en}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation */}
          {newsItems.length > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              {/* Right Arrow (Next) */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => api?.scrollNext()}
                className="w-10 h-10 rounded-full border border-[hsl(262,45%,35%)]/30 text-[hsl(262,45%,35%)] hover:bg-[hsl(262,45%,35%)] hover:text-white transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {newsItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`transition-all duration-300 rounded-full ${
                      current === index 
                        ? 'w-8 h-2 bg-[hsl(262,45%,35%)]' 
                        : 'w-2 h-2 bg-[hsl(262,45%,35%)]/30 hover:bg-[hsl(262,45%,35%)]/50'
                    }`}
                  />
                ))}
              </div>
              
              {/* Left Arrow (Previous) */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => api?.scrollPrev()}
                className="w-10 h-10 rounded-full border border-[hsl(262,45%,35%)]/30 text-[hsl(262,45%,35%)] hover:bg-[hsl(262,45%,35%)] hover:text-white transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanyNewsSection;
