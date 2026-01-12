import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useImageCompression, CompressionOptions, CompressionResult } from '@/hooks/useImageCompression';
import { uploadFile } from '@/lib/firebaseHelpers';
import { Upload, Loader2, CheckCircle, Image, Trash2, Settings2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  currentImageUrl?: string;
  uploadPath: string;
  maxSizeMB?: number;
  className?: string;
}

export const ImageUploader = ({
  onUploadComplete,
  currentImageUrl,
  uploadPath,
  maxSizeMB = 10,
  className = '',
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [compressionResult, setCompressionResult] = useState<CompressionResult | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [options, setOptions] = useState<CompressionOptions>({
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 0.8,
    outputFormat: 'image/webp',
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { compressImage, isCompressing, progress, formatFileSize } = useImageCompression();

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({ title: 'يجب اختيار ملف صورة', variant: 'destructive' });
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({ 
        title: `حجم الصورة كبير جداً`, 
        description: `الحد الأقصى ${maxSizeMB} ميجابايت`,
        variant: 'destructive' 
      });
      return;
    }

    try {
      const result = await compressImage(file, options);
      setCompressionResult(result);
      
      toast({ 
        title: 'تم ضغط الصورة بنجاح',
        description: `تم تقليل الحجم بنسبة ${result.compressionRatio}%`,
      });
    } catch (error) {
      console.error('Compression error:', error);
      toast({ title: 'حدث خطأ في ضغط الصورة', variant: 'destructive' });
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [compressImage, options, maxSizeMB, toast]);

  const handleUpload = useCallback(async () => {
    if (!compressionResult) return;

    setUploading(true);
    try {
      const fileName = `${uploadPath}/${Date.now()}_${compressionResult.file.name}`;
      const url = await uploadFile(fileName, compressionResult.file);
      
      onUploadComplete(url);
      setCompressionResult(null);
      
      toast({ title: 'تم رفع الصورة بنجاح' });
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: 'حدث خطأ في رفع الصورة', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  }, [compressionResult, uploadPath, onUploadComplete, toast]);

  const handleCancel = useCallback(() => {
    if (compressionResult?.previewUrl) {
      URL.revokeObjectURL(compressionResult.previewUrl);
    }
    setCompressionResult(null);
  }, [compressionResult]);

  const handleRemoveCurrentImage = useCallback(() => {
    onUploadComplete('');
  }, [onUploadComplete]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Image Display */}
      {currentImageUrl && !compressionResult && (
        <div className="relative group">
          <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden border-2 border-purple-200 shadow-lg">
            <img 
              src={currentImageUrl} 
              alt="Current" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 ml-1" />
                تغيير
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemoveCurrentImage}
              >
                <Trash2 className="w-4 h-4 ml-1" />
                حذف
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Compression Preview */}
      {compressionResult && (
        <div className="border-2 border-green-300 rounded-xl p-4 bg-green-50/50 space-y-4">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">تم ضغط الصورة بنجاح!</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            {/* Preview Image */}
            <div className="relative w-48 h-36 rounded-lg overflow-hidden border-2 border-green-200 flex-shrink-0">
              <img 
                src={compressionResult.previewUrl} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Stats */}
            <div className="flex-1 space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg p-3 border">
                  <div className="text-gray-500 text-xs">الحجم الأصلي</div>
                  <div className="font-bold text-red-600">{formatFileSize(compressionResult.originalSize)}</div>
                </div>
                <div className="bg-white rounded-lg p-3 border">
                  <div className="text-gray-500 text-xs">الحجم الجديد</div>
                  <div className="font-bold text-green-600">{formatFileSize(compressionResult.compressedSize)}</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-3 border">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs">نسبة الضغط</span>
                  <span className="font-bold text-purple-600">{compressionResult.compressionRatio}%</span>
                </div>
                <Progress value={compressionResult.compressionRatio} className="h-2 mt-2" />
              </div>
              
              <div className="text-gray-500 text-xs">
                الأبعاد: {compressionResult.width} × {compressionResult.height} بكسل
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={handleUpload} 
              disabled={uploading}
              className="bg-green-600 hover:bg-green-700"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                  جاري الرفع...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 ml-2" />
                  رفع الصورة
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={uploading}
            >
              إلغاء
            </Button>
          </div>
        </div>
      )}

      {/* Upload Area (when no image selected) */}
      {!currentImageUrl && !compressionResult && (
        <div 
          className="flex flex-col items-center justify-center py-12 px-6 bg-white rounded-xl border-2 border-dashed border-gray-300 cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all"
          onClick={() => fileInputRef.current?.click()}
        >
          {isCompressing ? (
            <>
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">جاري ضغط الصورة...</p>
              <Progress value={progress} className="w-48 h-2" />
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Image className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-1">اضغط لاختيار صورة</p>
              <p className="text-sm text-gray-500">سيتم ضغط الصورة تلقائياً قبل الرفع</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (حد أقصى {maxSizeMB} ميجابايت)</p>
            </>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      {/* Upload Button (when has current image) */}
      {currentImageUrl && !compressionResult && (
        <Button 
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isCompressing}
          className="w-full"
        >
          {isCompressing ? (
            <>
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              جاري ضغط الصورة...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 ml-2" />
              تغيير الصورة
            </>
          )}
        </Button>
      )}

      {/* Compression Settings */}
      <Collapsible open={showSettings} onOpenChange={setShowSettings}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Settings2 className="w-4 h-4 ml-1" />
            إعدادات الضغط
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="space-y-2">
            <Label className="text-sm">جودة الصورة: {Math.round((options.quality || 0.8) * 100)}%</Label>
            <Slider
              value={[(options.quality || 0.8) * 100]}
              onValueChange={([value]) => setOptions({ ...options, quality: value / 100 })}
              min={10}
              max={100}
              step={5}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm">أقصى عرض: {options.maxWidth} بكسل</Label>
            <Slider
              value={[options.maxWidth || 1200]}
              onValueChange={([value]) => setOptions({ ...options, maxWidth: value })}
              min={400}
              max={2000}
              step={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm">صيغة الإخراج</Label>
            <div className="flex gap-2">
              {(['image/webp', 'image/jpeg', 'image/png'] as const).map((format) => (
                <Button
                  key={format}
                  type="button"
                  variant={options.outputFormat === format ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOptions({ ...options, outputFormat: format })}
                >
                  {format.split('/')[1].toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
