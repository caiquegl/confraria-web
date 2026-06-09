export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F7F5] px-6 text-[#1C2126]">
      <section className="max-w-lg rounded-[2rem] border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#576D1E]">
          Confraria
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight">
          Eventos e rotas para motociclistas
        </h1>
        <p className="mt-4 text-sm font-semibold leading-6 text-zinc-500">
          Abra links compartilhados de eventos e acompanhe tudo diretamente pelo app.
        </p>
      </section>
    </main>
  );
}
