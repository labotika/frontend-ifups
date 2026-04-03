import { PLACEHOLDERS } from "../constants/placeholders";

export function resolveImageUrl(url, fallback = PLACEHOLDERS.NO_IMAGE) {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;

  const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ?? "";
  return `${baseUrl}/${url}`;
}

export function handleImageError(event, fallbackUrl = PLACEHOLDERS.NO_IMAGE) {
  const target = event.target;
  target.onerror = null;
  target.src = fallbackUrl;
}
