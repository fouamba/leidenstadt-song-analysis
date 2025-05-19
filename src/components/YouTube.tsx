
import { useEffect, useRef } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export function YouTubeEmbed({ videoId, title = "YouTube video player" }: YouTubeEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Ajuster la taille en fonction des dimensions de l'écran
    const handleResize = () => {
      if (iframeRef.current) {
        const width = iframeRef.current.parentElement?.clientWidth || 560;
        const height = Math.min(width * 0.5625, 315); // Respecter le ratio 16:9
        iframeRef.current.width = width.toString();
        iframeRef.current.height = height.toString();
      }
    };

    handleResize(); // Appliquer au chargement
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full aspect-video max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <iframe
        ref={iframeRef}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
}
