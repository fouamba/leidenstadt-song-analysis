import { useEffect, useRef } from "react";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  onEnd?: () => void; // Ajout de la prop onEnd
}

export function YouTubeEmbed({ videoId, title = "YouTube video player", onEnd }: YouTubeEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

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

  // Gestion de la fin de vidéo via l'API YouTube IFrame
  useEffect(() => {
    if (!onEnd) return;
    let player: any;
    function onPlayerStateChange(event: any) {
      // 0 = ended
      if (event.data === 0 && onEnd) {
        onEnd();
      }
    }
    function loadYouTubeAPI() {
      if ((window as any).YT && (window as any).YT.Player) {
        player = new (window as any).YT.Player(iframeRef.current, {
          events: { 'onStateChange': onPlayerStateChange }
        });
        playerRef.current = player;
      } else {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        (window as any).onYouTubeIframeAPIReady = () => {
          player = new (window as any).YT.Player(iframeRef.current, {
            events: { 'onStateChange': onPlayerStateChange }
          });
          playerRef.current = player;
        };
      }
    }
    loadYouTubeAPI();
    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, onEnd]);

  return (
    <div className="relative w-full aspect-video max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <iframe
        ref={iframeRef}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
}
