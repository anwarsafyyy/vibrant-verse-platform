import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { MapPin, Phone, Mail, Building2 } from 'lucide-react';

// Parallax hook
const useParallax = (speed: number = 0.5) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        if (scrolled > 0) {
          setOffset(scrolled * speed * 0.1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { offset, elementRef };
};

const GoogleMap: React.FC = () => {
  const { language, dir } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const { offset: decorOffset1, elementRef: decorRef1 } = useParallax(0.3);
  const { offset: decorOffset2, elementRef: decorRef2 } = useParallax(0.5);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const section = document.getElementById('location');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const contactDetails = [
    { 
      icon: MapPin, 
      label: language === 'ar' ? 'العنوان' : 'Address',
      value: language === 'ar' ? 'جازان، المملكة العربية السعودية' : 'Jazan, Saudi Arabia'
    },
    { 
      icon: Phone, 
      label: language === 'ar' ? 'الهاتف' : 'Phone',
      value: '+966535656226',
      isPhone: true
    },
    { 
      icon: Mail, 
      label: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
      value: 'info@olu-it.com'
    }
  ];
  
  return (
    <section id="location" className="py-12 lg:py-16 relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute left-[-8%] top-[10%] w-40 h-40 md:w-56 md:h-56 bg-[hsl(250,40%,75%)] rounded-full opacity-35" />
      <div className="absolute right-[-5%] bottom-[15%] w-32 h-32 md:w-44 md:h-44 bg-[hsl(250,40%,75%)] rounded-full opacity-40" />
      <div className="absolute right-[30%] top-[5%] w-20 h-20 md:w-28 md:h-28 bg-[hsl(320,50%,80%)] rounded-full opacity-35" />
      <div className="absolute left-[15%] bottom-[5%] w-18 h-18 md:w-26 md:h-26 bg-[hsl(170,45%,75%)] rounded-full opacity-40" />
      
      {/* Parallax Diamond Decorations */}
      <div 
        ref={decorRef1}
        className="absolute right-[10%] top-[20%] w-8 h-8 md:w-12 md:h-12 rotate-45 border-2 border-[hsl(262,45%,35%)]/20 hidden lg:block"
        style={{ transform: `rotate(45deg) translateY(${decorOffset1}px)` }}
      />
      <div 
        ref={decorRef2}
        className="absolute left-[8%] bottom-[25%] w-6 h-6 md:w-10 md:h-10 rotate-45 bg-[hsl(262,45%,35%)]/10 hidden lg:block"
        style={{ transform: `rotate(45deg) translateY(${decorOffset2}px)` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative w-14 h-14 rounded-xl rotate-45 bg-[hsl(262,45%,35%)] flex items-center justify-center shadow-lg">
              <Building2 className="w-7 h-7 text-white -rotate-45" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[hsl(262,45%,25%)]">
            {language === 'ar' ? 'موقعنا' : 'Our Location'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' ? 'زورونا في مقرنا الرئيسي' : 'Visit us at our headquarters'}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Map Container */}
          <div className={`relative rounded-3xl overflow-hidden shadow-2xl border border-purple-100 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '150ms' }}>
            {/* Decorative corner elements */}
            <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-[hsl(262,45%,35%)]/30 rounded-tr-2xl z-10" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-[hsl(262,45%,35%)]/30 rounded-bl-2xl z-10" />
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.7236193827087!2d42.5507656!3d16.8892434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x160f8b5f5d5a5a5a%3A0x5a5a5a5a5a5a5a5a!2sJazan%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1624529450456!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={language === 'ar' ? 'موقع شركة علو لتقنية المعلومات' : 'OLU IT Company Location'}
              className="w-full h-80 md:h-96"
            ></iframe>
          </div>
          
          {/* Contact Details Cards */}
          <div className="mt-8 grid md:grid-cols-3 gap-4 md:gap-6">
            {contactDetails.map((item, index) => (
              <div 
                key={index}
                className={`group relative bg-[hsl(262,45%,35%)] p-6 rounded-2xl shadow-lg border border-purple-400/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${(index + 2) * 150}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm text-white/60 font-medium mb-1">{item.label}</p>
                    <p 
                      className={`text-white font-bold ${item.isPhone ? 'dir-ltr' : ''}`} 
                      dir={item.isPhone ? 'ltr' : undefined}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMap;
