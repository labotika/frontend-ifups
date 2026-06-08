import { PLACEHOLDERS } from "../constants/placeholders";

export function resolveImageUrl(url, fallback = PLACEHOLDERS.NO_IMAGE) {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  // Path lokal (public/...) bukan URL valid sejak migrasi ke UploadThing
  return fallback;
}

export function handleImageError(event, fallbackUrl = PLACEHOLDERS.NO_IMAGE) {
  const target = event.target;
  target.onerror = null;
  target.src = fallbackUrl;
}
