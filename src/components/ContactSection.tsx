
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting form with values:", values);
      
      await addDoc(collection(db, 'contact_inquiries'), {
        name: values.name,
        email: values.email,
        message: values.message,
        is_read: false,
        created_at: serverTimestamp()
      });
      
      toast({
        title: t("contact.successTitle"),
        description: t("contact.successMessage"),
      });
      
      form.reset();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: t("contact.errorTitle"),
        description: error.message || t("contact.errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/966535656226`, '_blank');
  };

  return (
    <section id="contact" className="py-32 relative bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="font-bold mb-6 tracking-tight">
            <span className="olu-text-gradient">{t("contact.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">{t("contact.subtitle")}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="bg-card rounded-3xl shadow-xl p-10 border border-border/50">
              <h3 className="text-2xl font-bold mb-8 olu-text-gradient">تواصل معنا</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.name")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contact.namePlaceholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.email")}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t("contact.emailPlaceholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.message")}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t("contact.messagePlaceholder")} 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-1"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          {t("contact.sending")}
                        </div>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {t("contact.sendMessage")}
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      type="button"
                      onClick={handleWhatsAppClick} 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      <MessageSquare className="h-4 w-4" />
                      {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                    </Button>
                  </div>
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
