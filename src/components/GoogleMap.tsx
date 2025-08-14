import React from 'react';

const GoogleMap: React.FC = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="olu-text-gradient-dark">موقعنا</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            زورونا في مقرنا الرئيسي
          </p>
          <div className="w-20 h-1 bg-gray-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.0892456796834!2d46.6753812!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee2d8c5b89b45%3A0x1f7a8b48c8a1a7a8!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1624529450456!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع شركة علو لتقنية المعلومات"
              className="w-full h-96"
            ></iframe>
          </div>
          
          <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-olu-purple-dark mb-2">العنوان</h3>
              <p className="text-muted-foreground">جازان، المملكة العربية السعودية</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-olu-purple-dark mb-2">الهاتف</h3>
              <p className="text-muted-foreground">+966535656226</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-olu-purple-dark mb-2">البريد الإلكتروني</h3>
              <p className="text-muted-foreground">info@olu-it.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMap;