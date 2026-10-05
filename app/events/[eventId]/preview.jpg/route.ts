import { fetchEventShareDetail } from "@/lib/events";
import { renderSharePreview } from "@/lib/share-preview-image";

const fallbackImage =
  "https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=1200&auto=format&fit=crop";

type PreviewRouteProps = {
  params: Promise<{
    eventId: string;
  }>;
};

export async function GET(_request: Request, { params }: PreviewRouteProps) {
  const { eventId } = await params;
  const event = await fetchEventShareDetail(eventId);
  const sourceUrl = event?.coverImageUrl || (event ? fallbackImage : null);

  if (!sourceUrl) {
    return new Response("Evento não encontrado", { status: 404 });
  }

  const source = await fetch(sourceUrl);
  if (!source.ok) {
    return new Response("Não foi possível ler a capa", { status: 502 });
  }

  const preview = await renderSharePreview(Buffer.from(await source.arrayBuffer()));

  return new Response(new Uint8Array(preview), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Length": String(preview.length),
      "Content-Type": "image/jpeg",
    },
  });
}
