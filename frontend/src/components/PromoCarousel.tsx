import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Banner {
  title: string;
  subtitle: string;
  emoji: string;
  from: string;
  to: string;
}

const BANNERS: Banner[] = [
  {
    title: "MINI TRUFAS IRRESISTÍVEIS!",
    subtitle: "Feitas com amor e o verdadeiro sabor do Brasil",
    emoji: "🍫",
    from: "#FACC15",
    to: "#00A859",
  },
  {
    title: "BRIGADEIROS IRRESISTÍVEIS!",
    subtitle: "Feito no Brasil, produto premium, sabor irresistível",
    emoji: "🍬",
    from: "#00A859",
    to: "#005C2E",
  },
  {
    title: "CONES TRUFADOS IRRESISTÍVEIS!",
    subtitle: "Peça pelo WhatsApp! @brasildocesdovale",
    emoji: "🍦",
    from: "#FACC15",
    to: "#005C2E",
  },
  {
    title: "VAREJO E ATACADO",
    subtitle: "Ideal para revenda — combos especiais para o seu negócio",
    emoji: "🎁",
    from: "#005C2E",
    to: "#00A859",
  },
];

export function PromoCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop
      className="rounded-2xl"
    >
      {BANNERS.map((banner) => (
        <SwiperSlide key={banner.title}>
          <div
            className="flex h-40 flex-col items-center justify-center gap-1 rounded-2xl px-6 text-center shadow-glow sm:h-48"
            style={{ background: `linear-gradient(135deg, ${banner.from}, ${banner.to})` }}
          >
            <span className="text-4xl sm:text-5xl">{banner.emoji}</span>
            <h2 className="font-display text-lg font-extrabold text-white drop-shadow sm:text-2xl">
              {banner.title}
            </h2>
            <p className="text-xs font-medium text-white/90 sm:text-sm">{banner.subtitle}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
