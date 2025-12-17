import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const GoogleMap: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    title: language === 'ar' ? 'موقعنا' : 'Our Location',
    subtitle: language === 'ar' ? 'زورونا في مقرنا الرئيسي' : 'Visit us at our headquarters',
    address: language === 'ar' ? 'العنوان' : 'Address',
    addressValue: language === 'ar' ? 'جازان، المملكة العربية السعودية' : 'Jazan, Saudi Arabia',
    phone: language === 'ar' ? 'الهاتف' : 'Phone',
    email: language === 'ar' ? 'البريد الإلكتروني' : 'Email',
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="olu-text-gradient-dark">{content.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            {content.subtitle}
          </p>
          <div className="w-20 h-1 bg-gray-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3790.7236193827087!2d42.5507656!3d16.8892434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x160f8b5f5d5a5a5a%3A0x5a5a5a5a5a5a5a5a!2sJazan%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1624529450456!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={language === 'ar' ? 'موقع شركة علو لتقنية المعلومات' : 'OLU IT Company Location'}
              className="w-full h-96"
            ></iframe>
          </div>
          
          <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-olu-purple-dark mb-2">{content.address}</h3>
              <p className="text-muted-foreground">{content.addressValue}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-olu-purple-dark mb-2">{content.phone}</h3>
              <p className="text-muted-foreground">+966535656226</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-olu-purple-dark mb-2">{content.email}</h3>
              <p className="text-muted-foreground">info@olu-it.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMap;
