import { useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const useAnalytics = () => {
  const trackPageView = async (pagePath: string) => {
    try {
      const userAgent = navigator.userAgent;
      await addDoc(collection(db, 'site_analytics'), {
        event_type: 'page_view',
        page_path: pagePath,
        user_agent: userAgent,
        meta_data: {
          timestamp: new Date().toISOString(),
          referrer: document.referrer
        },
        created_at: serverTimestamp()
      });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const trackButtonClick = async (buttonName: string, buttonLocation: string) => {
    try {
      await addDoc(collection(db, 'site_analytics'), {
        event_type: 'button_click',
        page_path: window.location.pathname,
        meta_data: {
          button_name: buttonName,
          button_location: buttonLocation,
          timestamp: new Date().toISOString()
        },
        created_at: serverTimestamp()
      });
    } catch (error) {
      console.error('Error tracking button click:', error);
    }
  };

  const trackContactFormSubmit = async (formData: { name: string; email: string }) => {
    try {
      await addDoc(collection(db, 'site_analytics'), {
        event_type: 'contact_form_submit',
        page_path: window.location.pathname,
        meta_data: {
          form_type: 'contact',
          user_name: formData.name,
          user_email: formData.email,
          timestamp: new Date().toISOString()
        },
        created_at: serverTimestamp()
      });
    } catch (error) {
      console.error('Error tracking form submission:', error);
    }
  };

  const usePageTracking = () => {
    useEffect(() => {
      trackPageView(window.location.pathname);
    }, []);
  };

  return {
    trackPageView,
    trackButtonClick,
    trackContactFormSubmit,
    usePageTracking
  };
};