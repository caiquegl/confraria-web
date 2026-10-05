export type EventShareDetail = {
  category: string;
  coverImageUrl: string | null;
  date: string;
  description: string | null;
  id: string;
  location: string | null;
  organizer: {
    avatarUrl: string | null;
    id: string;
    name: string;
  };
  title: string;
};

const API_BASE_URL = process.env.CONFRARIA_API_BASE_URL ?? "http://localhost:8080";

export async function fetchEventShareDetail(eventId: string) {
  const apiBaseUrl = API_BASE_URL.replace(/\/$/, "");
  const response = await fetch(`${apiBaseUrl}/public/events/${eventId}/share`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) return null;

  return (await response.json()) as EventShareDetail;
}

const ANDROID_PACKAGE = "com.caiquegl22.appconfraria";

export function getAppEventUrl(eventId: string) {
  return `appconfraria://event/${eventId}`;
}

export function getPublicEventUrl(eventId: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://confraria-web.vercel.app";
  return `${siteUrl.replace(/\/$/, "")}/events/${eventId}`;
}

export function getSharePreviewUrl(eventId: string) {
  return `${getPublicEventUrl(eventId)}/preview.jpg`;
}

/** Abre o app pelo pacote, mesmo sem o domínio verificado no Android. */
export function getAndroidIntentUrl(eventId: string) {
  return `intent://event/${eventId}#Intent;action=android.intent.action.VIEW;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;scheme=appconfraria;package=${ANDROID_PACKAGE};end`;
}

export function getOpenInAppUrl(eventId: string, userAgent: string) {
  if (/Android/i.test(userAgent)) {
    return getAndroidIntentUrl(eventId);
  }
  return getAppEventUrl(eventId);
}
