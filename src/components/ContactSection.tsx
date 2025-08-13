
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
    <section id="contact" className="min-h-screen relative flex items-center py-20 bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/50 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="olu-text-gradient-dark">{t("contact.title")}</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-6">{t("contact.subtitle")}</p>
          <div className="w-24 h-1 olu-gradient-light mx-auto rounded-full"></div>
        </div>

        <div className="flex justify-center">
          {/* Contact Info */}
          <div className="animate-fade-in max-w-md" style={{ animationDelay: "0.4s" }}>
            <div className="bg-gradient-to-br from-olu-purple-dark to-olu-purple-dark/90 rounded-2xl shadow-lg p-8 text-white">
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
              
              <div className="flex gap-3 mt-6">
                <Button 
                  onClick={() => {
                    const mapSection = document.querySelector('section:has(iframe)');
                    mapSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 bg-white text-olu-purple-dark hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t("contact.contactUs") || (language === 'ar' ? 'تواصل معنا' : 'Contact Us')}
                </Button>
                
                <Button 
                  onClick={handleWhatsAppClick} 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {language === 'ar' ? 'واتساب' : 'WhatsApp'}
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
