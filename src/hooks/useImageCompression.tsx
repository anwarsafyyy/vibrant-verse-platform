import { useState, useCallback } from 'react';

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0-1
  outputFormat?: 'image/jpeg' | 'image/webp' | 'image/png';
}

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  width: number;
  height: number;
  previewUrl: string;
}

const DEFAULT_OPTIONS: CompressionOptions = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.8,
  outputFormat: 'image/webp',
};

export const useImageCompression = () => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);

  const compressImage = useCallback(async (
    file: File,
    options: CompressionOptions = {}
  ): Promise<CompressionResult> => {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
    const { maxWidth, maxHeight, quality, outputFormat } = mergedOptions;

    setIsCompressing(true);
    setProgress(10);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setProgress(30);
        const img = new Image();
        
        img.onload = () => {
          setProgress(50);
          
          // Calculate new dimensions while maintaining aspect ratio
          let { width, height } = img;
          
          if (width > maxWidth! || height > maxHeight!) {
            const aspectRatio = width / height;
            
            if (width > height) {
              width = Math.min(width, maxWidth!);
              height = width / aspectRatio;
            } else {
              height = Math.min(height, maxHeight!);
              width = height * aspectRatio;
            }
          }
          
          // Create canvas and draw resized image
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            setIsCompressing(false);
            reject(new Error('Could not get canvas context'));
            return;
          }
          
          // Enable image smoothing for better quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          ctx.drawImage(img, 0, 0, width, height);
          setProgress(70);
          
          // Convert to blob
          canvas.toBlob(
            (blob) => {
              setProgress(90);
              
              if (!blob) {
                setIsCompressing(false);
                reject(new Error('Could not compress image'));
                return;
              }
              
              // Determine file extension based on output format
              const extension = outputFormat === 'image/webp' ? 'webp' : 
                               outputFormat === 'image/jpeg' ? 'jpg' : 'png';
              
              // Create new file with compressed data
              const compressedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, `.${extension}`),
                { type: outputFormat }
              );
              
              const originalSize = file.size;
              const compressedSize = compressedFile.size;
              const compressionRatio = Math.round((1 - compressedSize / originalSize) * 100);
              
              // Create preview URL
              const previewUrl = URL.createObjectURL(compressedFile);
              
              setProgress(100);
              setIsCompressing(false);
              
              resolve({
                file: compressedFile,
                originalSize,
                compressedSize,
                compressionRatio,
                width: Math.round(width),
                height: Math.round(height),
                previewUrl,
              });
            },
            outputFormat,
            quality
          );
        };
        
        img.onerror = () => {
          setIsCompressing(false);
          reject(new Error('Could not load image'));
        };
        
        img.src = e.target?.result as string;
      };
      
      reader.onerror = () => {
        setIsCompressing(false);
        reject(new Error('Could not read file'));
      };
      
      reader.readAsDataURL(file);
    });
  }, []);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  return {
    compressImage,
    isCompressing,
    progress,
    formatFileSize,
  };
};
