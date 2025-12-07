
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquare } from "lucide-react";
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

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden bg-muted/30">
      {/* Decorative elements */}
      <div className="absolute bottom-20 left-20 w-32 h-32 opacity-10 -z-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side - Header */}
          <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
            {/* Section label */}
            <div className={`flex items-center gap-3 mb-4 ${dir === 'rtl' ? 'justify-end flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <span className="text-primary font-bold text-sm tracking-wider">
                {language === 'ar' ? 'تواصل' : 'Get in'}
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="olu-text-gradient">{t("contact.title")}</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-lg mb-8">
              {t("contact.subtitle")}
            </p>
            
            {/* WhatsApp Button */}
            <Button 
              onClick={() => window.open('https://wa.me/966535656226', '_blank')} 
              size="lg" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              {language === 'ar' ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
            </Button>
          </div>

          {/* Right Side - Form */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`text-foreground font-bold ${dir === 'rtl' ? 'text-right block' : ''}`}>
                      {t("contact.name")}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t("contact.namePlaceholder")} 
                        {...field} 
                        className={`rounded-lg border-border focus:border-primary h-12 bg-background ${dir === 'rtl' ? 'text-right' : ''}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`text-foreground font-bold ${dir === 'rtl' ? 'text-right block' : ''}`}>
                      {t("contact.email")}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder={t("contact.emailPlaceholder")} 
                        {...field} 
                        className={`rounded-lg border-border focus:border-primary h-12 bg-background ${dir === 'rtl' ? 'text-right' : ''}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`text-foreground font-bold ${dir === 'rtl' ? 'text-right block' : ''}`}>
                      {t("contact.message")}
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("contact.messagePlaceholder")} 
                        className={`min-h-[120px] rounded-lg border-border focus:border-primary bg-background ${dir === 'rtl' ? 'text-right' : ''}`}
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
                  className="w-full bg-primary hover:bg-primary/90 font-bold"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
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
