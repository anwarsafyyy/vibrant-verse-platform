
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
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 -z-10" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -z-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -z-10" />
      
      <div className="container mx-auto px-4">
        {/* Section Header - 2P Style */}
        <div className={`mb-16 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-16 bg-gradient-to-b from-primary to-accent rounded-full hidden md:block" />
            <div>
              <span className="text-primary font-bold text-sm uppercase tracking-wider block mb-2">
                {language === 'ar' ? 'تواصل' : 'Get in'}
              </span>
              <h2 className="font-bold tracking-tight">
                <span className="olu-text-gradient">{t("contact.title")}</span>
              </h2>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mt-4">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-card rounded-3xl shadow-xl p-8 md:p-10 border border-border/50 card-shine">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-bold">{t("contact.name")}</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t("contact.namePlaceholder")} 
                        {...field} 
                        className="rounded-xl border-border/50 focus:border-primary h-12 bg-background" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-bold">{t("contact.email")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder={t("contact.emailPlaceholder")} 
                        {...field} 
                        className="rounded-xl border-border/50 focus:border-primary h-12 bg-background" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-bold">{t("contact.message")}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t("contact.messagePlaceholder")} 
                        className="min-h-[140px] rounded-xl border-border/50 focus:border-primary bg-background" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    size="lg" 
                    className="flex-1 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 font-bold"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {isSubmitting ? t("contact.sending") : t("contact.sendMessage")}
                  </Button>
                  
                  <Button 
                    type="button" 
                    onClick={() => window.open('https://wa.me/966535656226', '_blank')} 
                    size="lg" 
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
