
import React, { useState, useEffect, useRef } from "react";

interface YouTubePlayerProps {
  videoId: string;
  autoplay?: boolean;
  onTimeUpdate?: (currentTime: number) => void;
  className?: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  autoplay = false,
  onTimeUpdate,
  className = "",
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const timeUpdateIntervalRef = useRef<number | null>(null);

  // Charger l'API YouTube
  useEffect(() => {
    // Ne charger l'API YouTube qu'une seule fois
    if (!window.YT) {
      // Créer l'élément de script pour l'API YouTube
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Définir la fonction de rappel pour l'API YouTube
      window.onYouTubeIframeAPIReady = () => {
        setIsReady(true);
      };
    } else {
      setIsReady(true);
    }

    return () => {
      // Nettoyer l'intervalle lors du démontage
      if (timeUpdateIntervalRef.current) {
        window.clearInterval(timeUpdateIntervalRef.current);
      }
    };
  }, []);

  // Initialiser le lecteur YouTube une fois l'API chargée
  useEffect(() => {
    if (isReady && playerRef.current) {
      ytPlayerRef.current = new window.YT.Player(playerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            // Une fois le lecteur prêt, commencer à suivre le temps
            if (onTimeUpdate) {
              timeUpdateIntervalRef.current = window.setInterval(() => {
                if (ytPlayerRef.current && ytPlayerRef.current.getCurrentTime) {
                  onTimeUpdate(ytPlayerRef.current.getCurrentTime());
                }
              }, 100); // Mettre à jour toutes les 100 ms
            }
          },
        },
      });
    }

    return () => {
      // Nettoyer l'intervalle lors du changement de vidéo ou du démontage
      if (timeUpdateIntervalRef.current) {
        window.clearInterval(timeUpdateIntervalRef.current);
      }
    };
  }, [isReady, videoId, autoplay, onTimeUpdate]);

  return (
    <div className={`aspect-video bg-slate-100 rounded-lg overflow-hidden ${className}`}>
      <div ref={playerRef} className="w-full h-full" />
    </div>
  );
};
