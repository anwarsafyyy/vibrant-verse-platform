
import React, { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
      
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([
          { 
            name: values.name,
            email: values.email,
            message: values.message
          }
        ]);
      
      if (error) {
        console.error("Error submitting form:", error);
        throw error;
      }
      
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
    window.open(`https://wa.me/966508694899`, '_blank');
  };

  return (
    <section id="contact" className="min-h-screen relative flex items-center py-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="olu-gold-text-gradient">{t("contact.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-6">{t("contact.subtitle")}</p>
          <div className="w-24 h-1 olu-gold-gradient mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl shadow-lg p-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("contact.name")} {...field} />
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
                        <Input placeholder={t("contact.email")} {...field} />
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
                          placeholder={t("contact.message")} 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full olu-gold-gradient text-white"
                  disabled={isSubmitting}
                >
                  {language === "ar" ? "تواصل معنا" : "Contact Us"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="bg-gradient-to-br from-olu-gold to-olu-gold/80 rounded-2xl shadow-lg p-8 text-white h-full">
              <h3 className="text-2xl font-bold mb-6">{t("contact.getInTouch")}</h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t("contact.email")}</h4>
                    <p className="opacity-90">info@olu-it.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t("contact.phone")}</h4>
                    <p className="opacity-90">+966 50 869 4899</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t("contact.address")}</h4>
                    <p className="opacity-90">Jazan, Saudi Arabia</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={handleWhatsAppClick} 
                  className="w-full bg-white text-olu-gold hover:bg-white/90"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {t("contact.whatsapp")}
                </Button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
