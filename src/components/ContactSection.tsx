
import React, { useState } from "react";
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

const ContactSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    { icon: Phone, label: language === 'ar' ? 'الهاتف' : 'Phone', value: '+966535656226' },
    { icon: Mail, label: language === 'ar' ? 'البريد الإلكتروني' : 'Email', value: 'info@olu-it.com' },
    { icon: MapPin, label: language === 'ar' ? 'الموقع' : 'Location', value: language === 'ar' ? 'جازان، المملكة العربية السعودية' : 'Jazan, Saudi Arabia' },
  ];

  return (
    <section id="contact" className="py-28 lg:py-36 relative overflow-hidden bg-muted/30">
      {/* Decorative elements */}
      <div className="absolute bottom-20 left-20 w-48 h-48 opacity-5 -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute top-20 right-20 w-32 h-32 opacity-5 -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Right Side - Header & Contact Info */}
          <div className="text-right lg:order-2">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm">
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
              <span className="olu-text-gradient">{t("contact.title")}</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-lg mb-10">
              {t("contact.subtitle")}
            </p>
            
            {/* Contact Info Cards */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex-1 text-right">
                    <p className="text-sm text-muted-foreground font-medium">{item.label}</p>
                    <p className="text-foreground font-bold">{item.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* WhatsApp Button */}
            <Button 
              onClick={() => window.open('https://wa.me/966535656226', '_blank')} 
              size="lg" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-6 text-lg rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
            >
              {language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
              <MessageSquare className="h-5 w-5 mr-3" />
            </Button>
          </div>

          {/* Left Side - Form */}
          <div className="bg-card rounded-3xl p-8 lg:p-10 border border-border shadow-xl lg:order-1">
            <h3 className="text-2xl font-bold mb-6 text-right">
              {language === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message'}
            </h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-bold text-right block">
                      {t("contact.name")}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t("contact.namePlaceholder")} 
                        {...field} 
                        className="rounded-xl border-border focus:border-primary h-14 bg-background text-lg text-right"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-bold text-right block">
                      {t("contact.email")}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder={t("contact.emailPlaceholder")} 
                        {...field} 
                        className="rounded-xl border-border focus:border-primary h-14 bg-background text-lg text-right"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-bold text-right block">
                      {t("contact.message")}
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("contact.messagePlaceholder")} 
                        className="min-h-[140px] rounded-xl border-border focus:border-primary bg-background text-lg text-right"
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
                  className="w-full bg-primary hover:bg-primary/90 font-bold h-14 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
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
    </section>
  );
};

export default ContactSection;
