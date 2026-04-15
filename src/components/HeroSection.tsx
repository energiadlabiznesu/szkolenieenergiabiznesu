import { useState, useRef, useEffect } from "react";

const VIDEO_ID = "pmFZB5Xie-g";

interface HeroSectionProps {
  onOpenRegistration: () => void;
}

export const HeroSection = ({ onOpenRegistration }: HeroSectionProps) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const initPlayer = () => {
      if (!iframeRef.current) return;
      playerRef.current = new (window as any).YT.Player(iframeRef.current, {
        events: {
          onStateChange: (event: any) => {
            if (event.data === 0) {
              setTimeout(() => onOpenRegistration(), 800);
            }
          },
        },
      });
    };

    if (!(window as any).YT || !(window as any).YT.Player) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      playerRef.current?.destroy?.();
    };
  }, []);

  const handlePlayClick = () => {
    setVideoPlaying(true);
    if (playerRef.current?.playVideo) {
      playerRef.current.playVideo();
    } else {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*"
      );
    }
  };

  return (
    <section className="px-4 pt-12 pb-16 md:pt-24 md:pb-24">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black leading-[1.1] text-foreground tracking-tight">
            Twoja firma nie potrzebuje agencji.
          </h1>
          <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight mb-6 text-primary">
            Potrzebuje AI.
          </h2>
        </div>

        {/* Scroll nudge */}
        <div className="flex flex-col items-center mb-6" style={{ gap: '6px' }}>
          <span style={{ fontSize: '13px', color: '#888', textAlign: 'center' }}>
            Obejrzyj bezpłatne szkolenie i zdecyduj się na zapis
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-primary"
            style={{ width: '24px', height: '24px', animation: 'bounce-arrow 1.2s ease-in-out infinite' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Video */}
        <div className="mb-6">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-black">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${VIDEO_ID}?enablejsapi=1&rel=0&modestbranding=1&vq=hd1080`}
              title="Bezpłatne szkolenie AI"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
            {!videoPlaying && (
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 w-full h-full group z-10"
                aria-label="Odtwórz wideo"
              >
                <img
                  src="/images/og-cover.jpg"
                  alt="Bezpłatne szkolenie AI"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Benefits block */}
          <div className="mt-4 rounded-xl p-4" style={{ borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div className="grid grid-cols-2 gap-3">
              {[
                "2 dni szkolenia online na żywo",
                "Dofinansowanie nawet do 100%",
                "Dla firm, JDG, NGO i pracowników",
                "Praca na realnych przykładach biznesowych",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm">
                  <span className="font-bold shrink-0 text-primary">✓</span>
                  <span className="text-gray-800 font-medium leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onOpenRegistration}
            className="w-full font-bold text-primary-foreground bg-primary hover:opacity-90 transition-opacity mt-4"
            style={{ fontSize: '18px', padding: '16px', borderRadius: '10px' }}
          >
            Sprawdź dofinansowanie na szkolenie online
          </button>
        </div>

        {/* Course CTA */}
        <div className="border border-border rounded-lg p-6 md:p-8 mb-6">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Pełny kurs</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            To, co zobaczyłeś, to <span className="text-accent">ułamek</span> tego, czego uczę na kursie
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Na 20-godzinnym kursie online na żywo pracujemy razem — budujesz strony, tworzysz wideo, uruchamiasz kampanie, automatyzujesz procesy i budujesz <span className="text-accent">agentów AI</span>.
          </p>
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-muted-foreground line-through text-lg">5 000 zł</span>
            <span className="text-3xl font-black text-primary tracking-tight">dofinansowanie nawet do 100%</span>
          </div>
          <p className="text-muted-foreground text-sm mb-8">Dofinansowanie od państwa pokrywa nawet do 100% kosztów kursu</p>
          <button
            onClick={onOpenRegistration}
            className="inline-block bg-foreground text-background px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Zapisz się na kurs
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground mt-8">
          <span>Zero teorii — same konkrety</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground" />
          <span>Nagrane specjalnie dla Ciebie</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground" />
          <span>100% za darmo</span>
        </div>
      </div>
    </section>
  );
};
