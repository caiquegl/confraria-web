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

export function getAppEventUrl(eventId: string) {
  return `appconfraria://event/${eventId}`;
}

export function getPublicEventUrl(eventId: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://confraria-web.vercel.app";
  return `${siteUrl.replace(/\/$/, "")}/events/${eventId}`;
}
