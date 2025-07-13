import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, MousePointer, Mail, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsData {
  totalPageViews: number;
  totalButtonClicks: number;
  totalContactSubmissions: number;
  todayPageViews: number;
  recentEvents: Array<{
    id: string;
    event_type: string;
    page_path: string;
    created_at: string;
    meta_data: any;
  }>;
  popularPages: Array<{
    page_path: string;
    count: number;
  }>;
}

const AnalyticsManager: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalPageViews: 0,
    totalButtonClicks: 0,
    totalContactSubmissions: 0,
    todayPageViews: 0,
    recentEvents: [],
    popularPages: []
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Get total page views
      const { count: totalPageViews } = await supabase
        .from('site_analytics')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'page_view');

      // Get total button clicks
      const { count: totalButtonClicks } = await supabase
        .from('site_analytics')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'button_click');

      // Get total contact form submissions
      const { count: totalContactSubmissions } = await supabase
        .from('site_analytics')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'contact_form_submit');

      // Get today's page views
      const today = new Date().toISOString().split('T')[0];
      const { count: todayPageViews } = await supabase
        .from('site_analytics')
        .select('*', { count: 'exact', head: true })
        .eq('event_type', 'page_view')
        .gte('created_at', today + 'T00:00:00.000Z');

      // Get recent events
      const { data: recentEvents } = await supabase
        .from('site_analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      // Get popular pages
      const { data: popularPagesData } = await supabase
        .from('site_analytics')
        .select('page_path')
        .eq('event_type', 'page_view')
        .not('page_path', 'is', null);

      // Process popular pages data
      const pageCount: { [key: string]: number } = {};
      popularPagesData?.forEach(event => {
        if (event.page_path) {
          pageCount[event.page_path] = (pageCount[event.page_path] || 0) + 1;
        }
      });

      const popularPages = Object.entries(pageCount)
        .map(([page_path, count]) => ({ page_path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setAnalytics({
        totalPageViews: totalPageViews || 0,
        totalButtonClicks: totalButtonClicks || 0,
        totalContactSubmissions: totalContactSubmissions || 0,
        todayPageViews: todayPageViews || 0,
        recentEvents: recentEvents || [],
        popularPages
      });

    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات التحليلات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshAnalytics = async () => {
    setRefreshing(true);
    await fetchAnalytics();
    setRefreshing(false);
    toast({
      title: "تم التحديث",
      description: "تم تحديث بيانات التحليلات",
    });
  };

  const formatEventType = (eventType: string) => {
    switch (eventType) {
      case 'page_view':
        return 'زيارة صفحة';
      case 'button_click':
        return 'نقر على زر';
      case 'contact_form_submit':
        return 'إرسال نموذج تواصل';
      default:
        return eventType;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">تحليلات الموقع</h2>
        <Button onClick={refreshAnalytics} disabled={refreshing} variant="outline">
          {refreshing ? (
            <Loader2 className="h-4 w-4 animate-spin ml-2" />
          ) : (
            <RefreshCw className="h-4 w-4 ml-2" />
          )}
          تحديث البيانات
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">مجموع الزيارات</p>
                <p className="text-2xl font-bold">{analytics.totalPageViews.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-olu-gold" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">زيارات اليوم</p>
                <p className="text-2xl font-bold">{analytics.todayPageViews.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-olu-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">نقرات الأزرار</p>
                <p className="text-2xl font-bold">{analytics.totalButtonClicks.toLocaleString()}</p>
              </div>
              <MousePointer className="h-8 w-8 text-olu-cyan" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">رسائل التواصل</p>
                <p className="text-2xl font-bold">{analytics.totalContactSubmissions.toLocaleString()}</p>
              </div>
              <Mail className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recent">الأحداث الأخيرة</TabsTrigger>
          <TabsTrigger value="popular">الصفحات الأكثر زيارة</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>آخر 10 أحداث</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{formatEventType(event.event_type)}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.page_path || 'غير محدد'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(event.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
                {analytics.recentEvents.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    لا توجد أحداث مسجلة
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الصفحات الأكثر زيارة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.popularPages.map((page, index) => (
                  <div key={page.page_path} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="bg-olu-gold text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <p className="font-medium">{page.page_path}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-olu-gold">
                        {page.count.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">زيارة</p>
                    </div>
                  </div>
                ))}
                {analytics.popularPages.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    لا توجد بيانات زيارات متاحة
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsManager;