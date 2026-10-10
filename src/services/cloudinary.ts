/**
 * Cloudinary Media Provider & Transformation Service
 *
 * Designed for RR Academia & Industry.
 * Supports secure client-side uploads via unsigned presets without exposing API secrets.
 */

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "",
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ""
};

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudinaryConfig.cloudName && cloudinaryConfig.uploadPreset);
}

/** Supported image formats for institutional gallery & media */
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/svg+xml"
];

/** Maximum recommended file size for web uploads (10 MB) */
export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

/**
 * Validates an image file before upload
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: "No file selected." };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported file format (${file.type || "unknown"}). Please upload a JPG, PNG, WebP, GIF, AVIF, or SVG image.`
    };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size exceeds the 10 MB limit (${sizeMb} MB). Please choose an image under 10 MB.`
    };
  }

  return { valid: true };
}

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'thumb';
  gravity?: 'auto' | 'face' | 'center';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
}

/**
 * Builds an optimized Cloudinary delivery URL with automatic format and compression transforms.
 * If the input is already a direct URL (like a local image or external HTTPS), returns it safely.
 */
export function getOptimizedImageUrl(
  imagePathOrPublicId: string,
  options: ImageTransformOptions = {}
): string {
  if (!imagePathOrPublicId) return '/images/students-google-amg-connect.jpg';

  // If it's already a full HTTP(S) URL or local path
  if (imagePathOrPublicId.startsWith('/') || imagePathOrPublicId.startsWith('blob:') || imagePathOrPublicId.startsWith('data:')) {
    return imagePathOrPublicId;
  }

  if (imagePathOrPublicId.startsWith('http://') || imagePathOrPublicId.startsWith('https://')) {
    if (!imagePathOrPublicId.includes('res.cloudinary.com')) {
      return imagePathOrPublicId;
    }
  }

  const cloudName = cloudinaryConfig.cloudName;
  if (!cloudName) {
    return imagePathOrPublicId;
  }

  const transformations: string[] = [];
  const crop = options.crop || 'fill';
  const quality = options.quality || 'auto';
  const format = options.format || 'auto';

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  transformations.push(`c_${crop}`);
  if (options.gravity) transformations.push(`g_${options.gravity}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformString = transformations.join(',');
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${imagePathOrPublicId}`;
}

export interface UploadResult {
  url: string;
  publicId: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  isMock?: boolean;
}

/**
 * Uploads an image file to Cloudinary via unsigned upload preset.
 * Includes format & size validation, upload progress reporting, and detailed Cloudinary diagnostics.
 */
export async function uploadImage(
  file: File,
  folder: string = 'rr-academia',
  onProgress?: (percent: number) => void
): Promise<UploadResult> {
  // Validate file format and size
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || "Invalid image file");
  }

  if (!isCloudinaryConfigured()) {
    console.info(
      "[Cloudinary Provider] Cloudinary credentials not configured in environment. Using local preview."
    );

    // Simulate upload progress
    if (onProgress) {
      for (let p = 10; p <= 100; p += 30) {
        onProgress(p);
        await new Promise((r) => setTimeout(r, 60));
      }
    }

    const dataUrl = await fileToDataUrl(file);
    const mockId = `local_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9]/g, '_')}`;

    return {
      url: dataUrl,
      publicId: mockId,
      format: file.type.split('/')[1] || 'jpg',
      width: 1200,
      height: 800,
      bytes: file.size,
      isMock: true
    };
  }

  // Real Cloudinary Unsigned Upload
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  if (folder) {
    formData.append('folder', folder);
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint);

    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve({
            url: response.secure_url || response.url,
            publicId: response.public_id,
            format: response.format,
            width: response.width,
            height: response.height,
            bytes: response.bytes,
            isMock: false
          });
        } catch {
          reject(new Error("Failed to parse Cloudinary response data"));
        }
      } else {
        let errorMsg = `Cloudinary upload failed (HTTP ${xhr.status}): ${xhr.statusText || "Request rejected"}`;
        try {
          const errData = JSON.parse(xhr.responseText);
          if (errData?.error?.message) {
            const apiMsg = errData.error.message;
            if (apiMsg.toLowerCase().includes("unsigned") || apiMsg.toLowerCase().includes("whitelist")) {
              errorMsg = `Cloudinary Error: The upload preset "${cloudinaryConfig.uploadPreset}" must be set to "Unsigned" in Cloudinary Console (Settings > Upload > Upload presets > Edit preset > Signing Mode: Unsigned).`;
            } else if (apiMsg.toLowerCase().includes("not found") && apiMsg.toLowerCase().includes("preset")) {
              errorMsg = `Cloudinary Error: Upload preset "${cloudinaryConfig.uploadPreset}" was not found in Cloudinary account "${cloudinaryConfig.cloudName}". Verify exact case and spelling in Cloudinary Console.`;
            } else {
              errorMsg = `Cloudinary Error: ${apiMsg}`;
            }
          }
        } catch {}
        reject(new Error(errorMsg));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during Cloudinary upload. Please verify your connection."));
    xhr.send(formData);
  });
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

