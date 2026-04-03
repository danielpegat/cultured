"use client";
import { useEffect, useState } from "react";
import { getTodaysTopic } from "@/lib/topics";

interface Video {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    thumbnails: { medium: { url: string } };
  };
}

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-xl animate-pulse">Cargando tu conocimiento del día...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight mb-2">Cultured</h1>
          <p className="text-gray-400 text-lg">
            Hoy aprendes sobre:{" "}
            <span className="text-white font-semibold capitalize">{topic}</span>
          </p>
        </div>

        {/* Video principal */}
        {mainVideo && (
          <div className="mb-12">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
                src={`https://www.youtube.com/embed/${mainVideo.id.videoId}`}
                title={mainVideo.snippet.title}
                allowFullScreen
              />
            </div>
            <h2 className="text-2xl font-semibold mt-4">{mainVideo.snippet.title}</h2>
            <p className="text-gray-400 mt-1">{mainVideo.snippet.channelTitle}</p>
            <p className="text-gray-500 mt-2 text-sm line-clamp-2">
              {mainVideo.snippet.description}
            </p>
          </div>
        )}

        {/* Más videos */}
        {moreVideos.length > 0 && (
          <>
            <h3 className="text-2xl font-bold mb-6">Sigue aprendiendo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {moreVideos.map((v) => (
                <div
                  key={v.id.videoId}
                  className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800"
                >
                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${v.id.videoId}`}
                      title={v.snippet.title}
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm line-clamp-2">{v.snippet.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{v.snippet.channelTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}