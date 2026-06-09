import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  fetchEventShareDetail,
  getAppEventUrl,
  getPublicEventUrl,
} from "@/lib/events";

type EventPageProps = {
  params: Promise<{
    eventId: string;
  }>;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=1200&auto=format&fit=crop";

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { eventId } = await params;
  const event = await fetchEventShareDetail(eventId);

  if (!event) {
    return {
      title: "Evento não encontrado | Confraria",
    };
  }

  const description =
    event.description ||
    [event.category, event.location].filter(Boolean).join(" · ") ||
    "Veja este evento no Confraria.";
  const publicUrl = getPublicEventUrl(event.id);
  const imageUrl = event.coverImageUrl || fallbackImage;

  return {
    alternates: {
      canonical: publicUrl,
    },
    description,
    openGraph: {
      description,
      images: [
        {
          alt: event.title,
          height: 630,
          url: imageUrl,
          width: 1200,
        },
      ],
      siteName: "Confraria",
      title: event.title,
      type: "article",
      url: publicUrl,
    },
    title: `${event.title} | Confraria`,
    twitter: {
      card: "summary_large_image",
      description,
      images: [imageUrl],
      title: event.title,
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { eventId } = await params;
  const event = await fetchEventShareDetail(eventId);

  if (!event) notFound();

  const appUrl = getAppEventUrl(event.id);
  const imageUrl = event.coverImageUrl || fallbackImage;

  return (
    <main className="min-h-screen bg-[#F5F7F5] px-5 py-8 text-[#1C2126]">
      <section className="mx-auto max-w-md overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="aspect-video overflow-hidden rounded-3xl bg-zinc-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={event.title}
            className="h-full w-full object-cover"
            src={imageUrl}
          />
        </div>

        <div className="mt-5">
          <p className="text-sm font-bold text-[#576D1E]">{event.category}</p>
          <h1 className="mt-1 text-3xl font-black leading-tight">{event.title}</h1>
          {event.location ? (
            <p className="mt-3 text-sm font-semibold text-zinc-500">{event.location}</p>
          ) : null}
          {event.description ? (
            <p className="mt-4 line-clamp-4 text-sm leading-6 text-zinc-600">
              {event.description}
            </p>
          ) : null}
        </div>

        <a
          className="mt-6 flex h-12 items-center justify-center rounded-2xl bg-[#C8F763] px-5 text-sm font-black text-[#1C2126]"
          href={appUrl}
        >
          Abrir no app
        </a>

        <p className="mt-4 text-center text-xs font-semibold text-zinc-400">
          Se o app estiver instalado, o link abre direto no Confraria.
        </p>
      </section>
    </main>
  );
}
