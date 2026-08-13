import { API_BASE } from "../config";

export function getImageUrl(image) {
  if (!image) return "";

  // Cloudinary or any other complete URL
  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  // Existing backend-relative uploads
  if (image.startsWith("/")) {
    return `${API_BASE}${image}`;
  }

  // Fallback for relative paths
  return `${API_BASE}/${image}`;
}
