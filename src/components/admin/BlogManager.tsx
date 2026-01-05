import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Save, Edit2, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface BlogPost {
  id: string;
  title_ar: string;
  title_en: string;
  excerpt_ar: string;
  excerpt_en: string;
  content_ar: string;
  content_en: string;
  author: string;
  date: string;
  category_ar: string;
  category_en: string;
  image: string;
  is_featured: boolean;
  order_index: number;
}

export const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title_ar: '',
    title_en: '',
    excerpt_ar: '',
    excerpt_en: '',
    content_ar: '',
    content_en: '',
    author: 'فريق علو',
    date: new Date().toISOString().split('T')[0],
    category_ar: '',
    category_en: '',
    image: '',
    is_featured: false,
    order_index: 0,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, 'blog_posts'), orderBy('order_index', 'asc'));
      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({ title: 'خطأ في جلب المقالات', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `blog/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData(prev => ({ ...prev, image: downloadURL }));
      toast({ title: 'تم رفع الصورة بنجاح' });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({ title: 'خطأ في رفع الصورة', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingPost) {
        await updateDoc(doc(db, 'blog_posts', editingPost.id), formData);
        toast({ title: 'تم تحديث المقال بنجاح' });
      } else {
        await addDoc(collection(db, 'blog_posts'), {
          ...formData,
          order_index: posts.length,
        });
        toast({ title: 'تم إضافة المقال بنجاح' });
      }
      
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      toast({ title: 'خطأ في حفظ المقال', variant: 'destructive' });
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title_ar: post.title_ar,
      title_en: post.title_en,
      excerpt_ar: post.excerpt_ar,
      excerpt_en: post.excerpt_en,
      content_ar: post.content_ar || '',
      content_en: post.content_en || '',
      author: post.author,
      date: post.date,
      category_ar: post.category_ar,
      category_en: post.category_en,
      image: post.image,
      is_featured: post.is_featured || false,
      order_index: post.order_index,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return;
    
    try {
      await deleteDoc(doc(db, 'blog_posts', id));
      toast({ title: 'تم حذف المقال بنجاح' });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({ title: 'خطأ في حذف المقال', variant: 'destructive' });
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('هل أنت متأكد من حذف جميع المقالات؟ هذا الإجراء لا يمكن التراجع عنه!')) return;
    
    try {
      const promises = posts.map(post => deleteDoc(doc(db, 'blog_posts', post.id)));
      await Promise.all(promises);
      toast({ title: 'تم حذف جميع المقالات بنجاح' });
      fetchPosts();
    } catch (error) {
      console.error('Error deleting all posts:', error);
      toast({ title: 'خطأ في حذف المقالات', variant: 'destructive' });
    }
  };

  const resetForm = () => {
    setEditingPost(null);
    setFormData({
      title_ar: '',
      title_en: '',
      excerpt_ar: '',
      excerpt_en: '',
      content_ar: '',
      content_en: '',
      author: 'فريق علو',
      date: new Date().toISOString().split('T')[0],
      category_ar: '',
      category_en: '',
      image: '',
      is_featured: false,
      order_index: 0,
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">إدارة المدونة</h1>
        {posts.length > 0 && (
          <Button variant="destructive" onClick={handleDeleteAll}>
            <Trash2 className="h-4 w-4 ml-2" />
            حذف جميع المقالات
          </Button>
        )}
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">{editingPost ? 'تعديل المقال' : 'إضافة مقال جديد'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-black">العنوان (عربي)</Label>
                <Input
                  value={formData.title_ar}
                  onChange={(e) => setFormData(prev => ({ ...prev, title_ar: e.target.value }))}
                  placeholder="عنوان المقال بالعربية"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black">العنوان (إنجليزي)</Label>
                <Input
                  value={formData.title_en}
                  onChange={(e) => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
                  placeholder="Article title in English"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-black">الملخص (عربي)</Label>
                <Textarea
                  value={formData.excerpt_ar}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt_ar: e.target.value }))}
                  placeholder="ملخص قصير للمقال"
                  rows={2}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black">الملخص (إنجليزي)</Label>
                <Textarea
                  value={formData.excerpt_en}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt_en: e.target.value }))}
                  placeholder="Short excerpt in English"
                  rows={2}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-black">المحتوى الكامل (عربي)</Label>
                <Textarea
                  value={formData.content_ar}
                  onChange={(e) => setFormData(prev => ({ ...prev, content_ar: e.target.value }))}
                  placeholder="المحتوى الكامل للمقال..."
                  rows={6}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black">المحتوى الكامل (إنجليزي)</Label>
                <Textarea
                  value={formData.content_en}
                  onChange={(e) => setFormData(prev => ({ ...prev, content_en: e.target.value }))}
                  placeholder="Full article content..."
                  rows={6}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-black">التصنيف (عربي)</Label>
                <Input
                  value={formData.category_ar}
                  onChange={(e) => setFormData(prev => ({ ...prev, category_ar: e.target.value }))}
                  placeholder="تحسين محركات البحث"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black">التصنيف (إنجليزي)</Label>
                <Input
                  value={formData.category_en}
                  onChange={(e) => setFormData(prev => ({ ...prev, category_en: e.target.value }))}
                  placeholder="SEO"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black">الكاتب</Label>
                <Input
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="اسم الكاتب"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-black">التاريخ</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-black">الصورة</Label>
                <div className="space-y-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full h-24 border-dashed border-2 flex flex-col items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                        <span className="text-sm">جاري الرفع...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-6 w-6" />
                        <span className="text-sm">اضغط لرفع صورة</span>
                      </>
                    )}
                  </Button>
                  {formData.image && (
                    <div className="relative">
                      <img src={formData.image} alt="Preview" className="h-32 w-full object-cover rounded" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 left-2"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                className="h-4 w-4"
              />
              <Label htmlFor="is_featured" className="text-black">مقال مميز</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Save className="h-4 w-4 ml-2" />
                {editingPost ? 'حفظ التعديلات' : 'إضافة المقال'}
              </Button>
              {editingPost && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  إلغاء
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Posts List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">المقالات ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <p className="text-black/70 text-center py-8">لا توجد مقالات بعد</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title_ar}
                      className="w-20 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-14 bg-muted rounded flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-black">{post.title_ar}</h3>
                    <p className="text-sm text-black/70">{post.excerpt_ar?.slice(0, 60)}...</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {post.category_ar}
                      </span>
                      <span className="text-xs text-black/70">{post.date}</span>
                      {post.is_featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                          مميز
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
