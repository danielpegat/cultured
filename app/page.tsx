"use client";
import { useEffect, useState } from "react";
import { getTodaysTopic } from "@/lib/topics";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    thumbnails: { medium: { url: string } };
  };
}

/* ─── Loading Skeleton ─── */
function LoadingSkeleton() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-8">
        <section className="mb-24">
          <div className="aspect-video skeleton" />
          <div className="mt-12 max-w-2xl">
            <div className="h-10 md:h-14 skeleton mb-4 w-3/4" />
            <div className="h-3 skeleton w-1/3" />
          </div>
        </section>
        <div className="hairline-t mb-12" />
        <div className="h-3 skeleton w-40 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={i % 2 === 1 ? "md:mt-24" : ""}>
              <div className="aspect-video skeleton mb-8" />
              <div className="h-6 skeleton mb-3 w-2/3" />
              <div className="h-3 skeleton w-1/4" />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ─── Error State ─── */
function ErrorState({ message }: { message: string }) {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="font-headline italic text-2xl md:text-3xl text-ink mb-4">
            Something went wrong
          </p>
          <p className="text-[10px] font-bold tracking-[0.2em] text-stone uppercase">
            {message}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [topic, setTopic] = useState("");
  const [mainVideo, setMainVideo] = useState<Video | null>(null);
  const [moreVideos, setMoreVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = getTodaysTopic();
    setTopic(t);
    fetchVideos(t);
  }, []);

  async function fetchVideos(t: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/video?topic=${encodeURIComponent(t)}`);
      const data = await res.json();
      if (!data.items || data.items.length === 0) {
        setError("No se encontraron videos. Intenta más tarde.");
        return;
      }
      setMainVideo(data.items[0]);
      setMoreVideos(data.items.slice(1));
    } catch {
      setError("Hubo un error al cargar los videos.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} />;

  return (
    <>
      <Navbar />

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-8">
        {/* ═══ Hero Section ═══ */}
        {mainVideo && (
          <section className="mb-24 animate-fade-in-up">
            <div className="relative w-full aspect-video bg-dim overflow-hidden border-[0.5px] border-line shadow-[0_20px_40px_var(--c-border)]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${mainVideo.id.videoId}?rel=0`}
                title={mainVideo.snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Hero Meta */}
            <div className="mt-12 grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-start-2 md:col-span-8">
                <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl text-ink tracking-tight leading-none mb-4">
                  {mainVideo.snippet.title}
                </h1>
                <div className="flex items-center gap-6 flex-wrap">
                  <span className="text-[10px] font-bold tracking-[0.15em] text-stone uppercase">
                    {topic}
                  </span>
                  <span className="text-[10px] tracking-[0.15em] text-faded uppercase">
                    {mainVideo.snippet.channelTitle}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══ Section Divider ═══ */}
        {moreVideos.length > 0 && (
          <>
            <div className="w-full hairline-t mb-12" />

            <header className="mb-12">
              <h2 className="text-[10px] font-bold tracking-[0.25em] text-ink uppercase">
                SIGUE APRENDIENDO
              </h2>
            </header>

            {/* ═══ Editorial 2-Column Grid ═══ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
              {moreVideos.map((v, i) => (
                <article
                  key={v.id.videoId}
                  className={`group animate-fade-in-up ${i % 2 === 1 ? "md:mt-24" : ""}`}
                  style={{ animationDelay: `${(i + 1) * 150}ms`, opacity: 0 }}
                >
                  <div className="aspect-video bg-dim mb-6 overflow-hidden relative border-[0.5px] border-line">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${v.id.videoId}?rel=0`}
                      title={v.snippet.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <h3 className="font-headline text-xl md:text-2xl text-ink mb-3">
                    {v.snippet.title}
                  </h3>
                  <p className="text-[10px] font-bold tracking-[0.15em] text-stone uppercase">
                    {v.snippet.channelTitle}
                  </p>
                </article>
              ))}
            </div>
          </>
        )}

        {/* ═══ Quote Callout ═══ */}
        <section className="mt-40 mb-40 grid grid-cols-12">
          <div className="col-start-1 col-span-12 md:col-start-4 md:col-span-6 text-center">
            <p className="font-headline italic text-2xl md:text-4xl text-ink leading-relaxed">
              &ldquo;The mind is not a vessel to be filled, but a fire to be
              kindled.&rdquo;
            </p>
            <p className="mt-8 text-[10px] font-bold tracking-[0.3em] text-faded uppercase">
              PLUTARCH — HOY: {topic.toUpperCase()}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}