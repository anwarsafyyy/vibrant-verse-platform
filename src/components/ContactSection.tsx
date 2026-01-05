
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquare, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const getContactFormSchema = (language: string) => z.object({
  name: z.string().min(2, {
    message: language === 'ar' ? "الاسم يجب أن يكون حرفين على الأقل" : "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: language === 'ar' ? "الرجاء إدخال بريد إلكتروني صحيح" : "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: language === 'ar' ? "الرسالة يجب أن تكون 10 أحرف على الأقل" : "Message must be at least 10 characters.",
  }),
});

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

const ContactSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    const section = document.getElementById('contact');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  type ContactFormValues = z.infer<ReturnType<typeof getContactFormSchema>>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(getContactFormSchema(language)),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contact_inquiries'), {
        ...values,
        is_read: false,
        created_at: serverTimestamp()
      });
      toast({ title: t("contact.successTitle"), description: t("contact.successMessage") });
      form.reset();
    } catch (error: any) {
      toast({ title: t("contact.errorTitle"), description: error.message || t("contact.errorMessage"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: language === 'ar' ? 'الهاتف' : 'Phone', value: '+966535656226', gradient: 'from-violet-600 via-purple-500 to-fuchsia-500' },
    { icon: Mail, label: language === 'ar' ? 'البريد الإلكتروني' : 'Email', value: 'info@olu-it.com', gradient: 'from-purple-600 via-fuchsia-500 to-pink-500' },
    { icon: MapPin, label: language === 'ar' ? 'الموقع' : 'Location', value: language === 'ar' ? 'جازان، المملكة العربية السعودية' : 'Jazan, Saudi Arabia', gradient: 'from-fuchsia-600 via-pink-500 to-rose-400' },
  ];

  return (
    <section id="contact" className="py-12 lg:py-16 relative overflow-hidden bg-white">
      {/* Decorative diamond shapes with parallax */}
      <div 
        ref={decorRef1}
        className="absolute top-20 right-1/4 w-8 h-8 border-2 border-purple-400/30 rotate-45 hidden lg:block transition-transform duration-100"
        style={{ transform: `rotate(45deg) translateY(${decorOffset1 * 0.5}px)` }}
      />
      <div 
        className="absolute top-32 left-16 w-6 h-6 border-2 border-purple-400/20 rotate-45 hidden lg:block transition-transform duration-100"
        style={{ transform: `rotate(45deg) translateY(${-decorOffset1 * 0.4}px)` }}
      />
      <div 
        ref={decorRef2}
        className="absolute bottom-24 right-16 w-7 h-7 border-2 border-purple-400/25 rotate-45 hidden lg:block transition-transform duration-100"
        style={{ transform: `rotate(45deg) translateY(${decorOffset2 * 0.35}px)` }}
      />
      <div 
        className="absolute top-1/2 left-1/3 w-10 h-10 border-2 border-purple-400/20 rotate-45 hidden lg:block transition-transform duration-100"
        style={{ transform: `rotate(45deg) translateY(${-decorOffset2 * 0.6}px)` }}
      />
      <div 
        className="absolute bottom-40 left-20 w-5 h-5 border-2 border-purple-400/15 rotate-45 hidden lg:block transition-transform duration-100"
        style={{ transform: `rotate(45deg) translateY(${decorOffset1 * 0.45}px)` }}
      />
      <div 
        className="absolute top-40 right-1/3 w-9 h-9 border-2 border-purple-400/25 rotate-45 hidden lg:block transition-transform duration-100"
        style={{ transform: `rotate(45deg) translateY(${decorOffset2 * 0.3}px)` }}
      />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Right Side - Header & Contact Info */}
          <div className={`text-right lg:order-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* Section label with gradient */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <span className="text-purple-500 font-bold tracking-wider uppercase text-sm">
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-gray-800">
              {t("contact.title")}
            </h2>
            
            <p className="text-lg text-gray-600 max-w-lg mb-10 leading-relaxed">
              {t("contact.subtitle")}
            </p>
            
            {/* Contact Info Cards with gradient hover */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((item, index) => (
                <div 
                  key={index}
                  className={`group relative flex items-center gap-4 p-5 rounded-2xl bg-[hsl(262,45%,35%)] border border-purple-400/20 overflow-hidden transition-all duration-500 hover:border-purple-300/50 hover:shadow-xl cursor-pointer ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  {/* Content */}
                  <div className="relative z-20 flex-1 text-right">
                    <p className="text-sm text-white/50 font-medium">{item.label}</p>
                    <p className={`text-white font-bold group-hover:text-blue-400 transition-all duration-300 ${item.icon === Phone ? 'dir-ltr' : ''}`} dir={item.icon === Phone ? 'ltr' : undefined}>
                      {item.value}
                    </p>
                  </div>
                  <div className={`relative z-20 w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* WhatsApp Button with enhanced style */}
            <Button 
              onClick={() => window.open('https://wa.me/966535656226', '_blank')} 
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-1 hover:scale-105 w-full sm:w-auto"
            >
              {language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
              <MessageSquare className="h-5 w-5 mr-3" />
            </Button>
          </div>

          {/* Left Side - Form with enhanced styling */}
          <div className={`relative group lg:order-1 ${isVisible ? 'animate-fade-in stagger-2' : 'opacity-0'}`}>
            
            {/* Form container */}
            <div className="relative bg-[hsl(262,45%,35%)] rounded-3xl p-8 lg:p-10 border border-purple-400/20 shadow-2xl overflow-hidden">
              
              <h3 className="text-2xl font-bold mb-6 text-right relative z-10 text-white">
                {language === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-bold text-right block">
                        {t("contact.name")}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t("contact.namePlaceholder")} 
                          {...field} 
                          className="rounded-xl border-white/10 bg-white/5 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 h-14 text-white text-lg text-right transition-all duration-300 placeholder:text-white/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-bold text-right block">
                        {t("contact.email")}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder={t("contact.emailPlaceholder")} 
                          {...field} 
                          className="rounded-xl border-white/10 bg-white/5 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 h-14 text-white text-lg text-right transition-all duration-300 placeholder:text-white/30"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-bold text-right block">
                        {t("contact.message")}
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={t("contact.messagePlaceholder")} 
                          className="min-h-[140px] rounded-xl border-white/10 bg-white/5 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 text-white text-lg text-right transition-all duration-300 placeholder:text-white/30"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    size="lg" 
                    className="w-full bg-purple-500 hover:bg-purple-400 font-bold h-14 text-lg rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                    ) : (
                      <Send className="h-5 w-5 mr-3" />
                    )}
                    {isSubmitting ? t("contact.sending") : t("contact.sendMessage")}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
