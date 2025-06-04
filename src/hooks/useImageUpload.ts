"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null;

    if (isUploading) {
      setUploadProgress(0);
      progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const nextProgress = prev + Math.random() * 10;
          return nextProgress < 90 ? nextProgress : 90;
        });
      }, 300);
    } else if (uploadProgress > 0 && uploadProgress < 100) {
      setUploadProgress(100);
      const timeout = setTimeout(() => {
        setUploadProgress(0);
      }, 1000);

      return () => clearTimeout(timeout);
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isUploading, uploadProgress]);

  const uploadImage = async (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setError("Formato de imagen no válido. Utiliza JPG, PNG o WebP.");
      toast.error("Formato de imagen no válido. Utiliza JPG, PNG o WebP.");
      return null;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("La imagen es demasiado grande. El tamaño máximo es de 5MB.");
      toast.error("La imagen es demasiado grande. El tamaño máximo es de 5MB.");
      return null;
    }

    try {
      setIsUploading(true);
      setError(null);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al subir la imagen");
      }

      setImageUrl(data.url);
      toast.success("Imagen subida correctamente");
      return data.url;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al subir la imagen";
      setError(errorMessage);
      setPreviewUrl(null);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setImageUrl(null);
    setPreviewUrl(null);
    setError(null);
    setUploadProgress(0);
  };

  return {
    isUploading,
    uploadProgress,
    imageUrl,
    previewUrl,
    error,
    uploadImage,
    reset,
  };
};
