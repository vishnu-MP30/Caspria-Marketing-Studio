"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./MediaSection.module.css";

// ─── Types & Configuration ────────────────────────────────────────────────────
export interface MediaItem {
  id: string;
  src: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  stream: "upper" | "lower";
  width: number;
  height: number;
  yOffset: number;
  tilt: number;
}

const mediaItems: MediaItem[] = [
  // ── Upper Hump Stream (Entering mid-left, rising up over CASPRIA, descending right)
  {
    id: "coffee",
    src: "/media_coffee.png",
    title: "Nora Coffee",
    category: "Visual Identity",
    tags: ["Branding", "Packaging"],
    description:
      "A bold, tactile brand identity for an artisan coffee house — balancing warmth with editorial precision.",
    stream: "upper",
    width: 310,
    height: 220,
    yOffset: -10,
    tilt: -1.2,
  },
  // ── Lower Stream (Lower left, dipping under subtitle, curving right)
  {
    id: "candle",
    src: "/media_candle.png",
    title: "Vela Noir",
    category: "Product Brand",
    tags: ["Luxury", "Lifestyle"],
    description:
      "Moody, amber-lit brand identity for a botanical luxury candle house — darkness made beautiful.",
    stream: "lower",
    width: 250,
    height: 310,
    yOffset: 14,
    tilt: 1.4,
  },
  // ── Upper Hump Stream (Rising towards the top peak)
  {
    id: "bakery",
    src: "/media_bakery.png",
    title: "Ovenbird Bakery",
    category: "Art Direction",
    tags: ["Visual Identity", "Packaging"],
    description:
      "Retro-modern brand world for a neighbourhood bakery with deep roots in European pastry craft.",
    stream: "upper",
    width: 270,
    height: 250,
    yOffset: -22,
    tilt: 0.8,
  },
  // ── Lower Stream (Dipping beneath the central text like the reference book)
  {
    id: "interior",
    src: "/media_interior.png",
    title: "Terra Studio",
    category: "Interior Brand",
    tags: ["Lifestyle", "Space"],
    description:
      "Brand world for a warm, plant-filled studio space rooted in earthy tones and natural materials.",
    stream: "lower",
    width: 340,
    height: 230,
    yOffset: 12,
    tilt: -1.0,
  },
  // ── Upper Hump Stream (Peak of upper hump, floating over CASPRIA)
  {
    id: "perfume",
    src: "/media_perfume.png",
    title: "Aurel Scent",
    category: "Brand Identity",
    tags: ["Luxury", "Product"],
    description:
      "Minimalist luxury fragrance brand — amber light, marble surfaces, and restrained elegance.",
    stream: "upper",
    width: 240,
    height: 320,
    yOffset: -18,
    tilt: -0.6,
  },
  // ── Lower Stream (Bottom center, anchored like the reference newspaper photo)
  {
    id: "ceramic",
    src: "/media_ceramic.png",
    title: "Clay & Form",
    category: "Craft Brand",
    tags: ["Artisan", "Lifestyle"],
    description:
      "Handmade ceramics brand rooted in honest craft, earth tones, and the beauty of imperfection.",
    stream: "lower",
    width: 270,
    height: 270,
    yOffset: 24,
    tilt: 1.1,
  },
  // ── Upper Hump Stream (Upper right descending)
  {
    id: "floral",
    src: "/media_floral.png",
    title: "Bloom Studio",
    category: "Campaign",
    tags: ["Lifestyle", "Editorial"],
    description:
      "Seasonal brand campaign for an artisan floral studio — soft light, lush botanicals, gentle storytelling.",
    stream: "upper",
    width: 320,
    height: 230,
    yOffset: -8,
    tilt: 1.3,
  },
  // ── Lower Stream (Lower right)
  {
    id: "fashion",
    src: "/media_fashion.png",
    title: "Sable Edit",
    category: "Fashion Brand",
    tags: ["Luxury", "Editorial"],
    description:
      "Editorial identity for a curated luxury accessories brand — marble, silk, and quiet opulence.",
    stream: "lower",
    width: 240,
    height: 320,
    yOffset: 6,
    tilt: -1.4,
  },
  // ── Upper Hump Stream (Ending right side at mid-height)
  {
    id: "stationery",
    src: "/media_stationery.png",
    title: "Goldleaf Press",
    category: "Print & Identity",
    tags: ["Branding", "Print"],
    description:
      "Premium stationery brand identity with gold foil finishes, wax seals, and tactile luxury.",
    stream: "upper",
    width: 260,
    height: 310,
    yOffset: -15,
    tilt: -0.8,
  },
  // ── Lower Stream (Exiting right side)
  {
    id: "wine",
    src: "/media_wine.png",
    title: "Marquis & Co.",
    category: "Lifestyle Campaign",
    tags: ["Beverage", "Editorial"],
    description:
      "Dark, moody campaign for a heritage champagne house — velvet, crystal, and timeless sophistication.",
    stream: "lower",
    width: 240,
    height: 320,
    yOffset: 12,
    tilt: 0.9,
  },
];

// Triplicate the array for an infinite seamless circular stream
const ALL_ITEMS: (MediaItem & { uniqueKey: string })[] = [
  ...mediaItems.map((item, i) => ({ ...item, uniqueKey: `${item.id}-0-${i}` })),
  ...mediaItems.map((item, i) => ({ ...item, uniqueKey: `${item.id}-1-${i}` })),
  ...mediaItems.map((item, i) => ({ ...item, uniqueKey: `${item.id}-2-${i}` })),
];

// ─── Lightbox Component ───────────────────────────────────────────────────────
function Lightbox({
  item,
  onClose,
}: {
  item: MediaItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className={styles.lightboxOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className={styles.lightboxCard} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.lightboxClose}
          onClick={onClose}
          aria-label="Close dialog"
        >
          ✕
        </button>
        <div className={styles.lightboxImage}>
          <Image
            src={item.src}
            alt={item.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </div>
        <div className={styles.lightboxInfo}>
          <span className={styles.lightboxCategory}>{item.category}</span>
          <h2 className={styles.lightboxTitle}>{item.title}</h2>
          <p className={styles.lightboxDesc}>{item.description}</p>
          <div className={styles.lightboxTags}>
            {item.tags.map((tag) => (
              <span key={tag} className={styles.lightboxTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MediaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

  // Animation & Drag state refs (zero React re-render overhead during animation)
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const velocityRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const lastDragXRef = useRef(0);
  const progressRef = useRef(0);
  const currentSpeedRef = useRef(32);

  // ── Drifting Animation Loop with Hump Curve ────────────────────────────────
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const BASE_SPEED = 32; // pixels / second to the right

    const updateFrame = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const container = containerRef.current;
      if (!container) {
        animId = requestAnimationFrame(updateFrame);
        return;
      }

      const W = container.clientWidth || window.innerWidth;
      const H = container.clientHeight || window.innerHeight;

      // Card scale factor based on screen size
      const scale = W < 640 ? 0.65 : W < 1024 ? 0.85 : 1.0;

      // Spacing between consecutive items
      const spacing = Math.max(220, Math.min(320, W / 5.2)) * scale;
      const totalTrackLength = ALL_ITEMS.length * spacing;

      if (!isDraggingRef.current) {
        // Inertia momentum deceleration
        if (Math.abs(velocityRef.current) > 1) {
          progressRef.current += velocityRef.current * dt;
          velocityRef.current *= Math.pow(0.88, dt * 60);
        }

        // Auto-drift with smooth hover slowdown
        const targetSpeed = isHoveredRef.current ? 4 : BASE_SPEED;
        currentSpeedRef.current +=
          (targetSpeed - currentSpeedRef.current) * Math.min(1, dt * 4);
        progressRef.current += currentSpeedRef.current * dt;
      }

      // Ensure progress stays positive and cyclic
      const loopedProgress =
        ((progressRef.current % totalTrackLength) + totalTrackLength) %
        totalTrackLength;

      const screenCenter = W / 2;

      // Position each card along the flow
      ALL_ITEMS.forEach((item, index) => {
        const el = cardRefs.current[index];
        if (!el) return;

        const cardW = item.width * scale;
        const cardH = item.height * scale;

        // Raw coordinate along track
        const rawX = (index * spacing + loopedProgress) % totalTrackLength;

        // Find shortest signed offset from center in cyclic ring
        let dx = ((rawX - screenCenter) % totalTrackLength + totalTrackLength) % totalTrackLength;
        if (dx > totalTrackLength / 2) dx -= totalTrackLength;

        const cardCenterX = screenCenter + dx;
        const cardLeft = cardCenterX - cardW / 2;

        // Visibility culling for performance
        if (cardLeft < -cardW - 100 || cardLeft > W + 100) {
          el.style.visibility = "hidden";
          return;
        }
        el.style.visibility = "visible";

        // Normalized horizontal coordinate across viewport [0 = left, 1 = right]
        const u = cardCenterX / W;
        const clampedU = Math.max(0, Math.min(1, u));

        let cardY: number;

        if (item.stream === "upper") {
          // Upper hump: starts ~41% mid-height, peaks up to ~8-12% over CASPRIA, descends to ~41%
          const t = Math.pow(clampedU, 0.9);
          const hump = Math.sin(Math.PI * t);
          const humpAmplitude = H * 0.32;
          cardY = H * 0.41 - humpAmplitude * hump + item.yOffset * scale;

          // Safe boundaries so it doesn't collide with top header or central text
          const minY = Math.max(68, H * 0.07);
          const maxY = H * 0.5;
          cardY = Math.max(minY, Math.min(maxY, cardY));
        } else {
          // Lower curve: starts ~58%, dips to ~75% below subtitle, ascends to ~58%
          const dip = Math.sin(Math.PI * clampedU);
          const dipAmplitude = H * 0.16;
          cardY = H * 0.58 + dipAmplitude * dip + item.yOffset * scale;

          // Safe boundaries so it doesn't collide with bottom footer
          const minLowerY = H * 0.52;
          const maxLowerY = H - cardH - Math.max(54, H * 0.06);
          cardY = Math.max(minLowerY, Math.min(maxLowerY, cardY));
        }

        el.style.width = `${cardW.toFixed(0)}px`;
        el.style.height = `${cardH.toFixed(0)}px`;
        el.style.transform = `translate3d(${cardLeft.toFixed(1)}px, ${cardY.toFixed(1)}px, 0) rotate(${item.tilt}deg)`;
      });

      animId = requestAnimationFrame(updateFrame);
    };

    updateFrame(performance.now());
    animId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ── Drag & Touch Handlers ───────────────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    // Prevent dragging / pointer capture when clicking navigation links, buttons, or header
    const target = e.target as HTMLElement;
    if (target.closest("a, button, header, nav")) {
      return;
    }
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartProgressRef.current = progressRef.current;
    dragDistanceRef.current = 0;
    lastDragTimeRef.current = performance.now();
    lastDragXRef.current = e.clientX;
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = (now - lastDragTimeRef.current) / 1000;
    const dx = e.clientX - dragStartXRef.current;
    dragDistanceRef.current = Math.abs(dx);

    progressRef.current = dragStartProgressRef.current + dx * 1.15;

    if (dt > 0.008) {
      velocityRef.current = ((e.clientX - lastDragXRef.current) / dt) * 0.75;
      lastDragTimeRef.current = now;
      lastDragXRef.current = e.clientX;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handleCardClick = useCallback((item: MediaItem) => {
    if (dragDistanceRef.current > 7) {
      // Considered a drag, do not trigger click
      return;
    }
    setActiveItem(item);
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className={styles.section}
        id="media"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => (isHoveredRef.current = true)}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          isDraggingRef.current = false;
        }}
      >
        {/* 3-Color Combo Theme Background (Lemon #FFF21A, Charcoal Black #171717, Electric Lavender #A66BFF) */}
        <div className={styles.bgTheme} aria-hidden="true">
          <div className={styles.glowLavender} />
          <div className={styles.glowLemon} />
          <div className={styles.glowCenter} />
          <div className={styles.glowVignette} />
        </div>

        {/* Film grain texture */}
        <div className={styles.grain} aria-hidden="true" />

        {/* Top Navigation */}
        <header
          className={styles.header}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className={styles.navLeft}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              CASPRIA
            </Link>
          </div>
          <nav className={styles.navCenter}>
            <Link href="/" className={styles.navLink}>
              HOME
            </Link>
            <Link href="/#services" className={styles.navLink}>
              SERVICES
            </Link>
            <Link href="/works" className={`${styles.navLink} ${styles.navLinkActive}`}>
              WORK
            </Link>
            <Link href="/#about" className={styles.navLink}>
              ABOUT
            </Link>
          </nav>
          <div className={styles.navRight}>
            <Link href="/#contact" className={styles.contactLink}>
              CONTACT <span>→</span>
            </Link>
          </div>
        </header>

        {/* Central Hero Branding & Manifesto */}
        <div className={styles.heroCenter}>
          <h1 className={styles.heroTitle}>CASPRIA</h1>
          <p className={styles.heroSubtitle}>
            We craft visual identities for brands that dare to be remembered.
            <br />
            Clear thinking first, nice things second.
          </p>
        </div>

        {/* Continuous Drifting Showcase */}
        <div className={styles.showcaseCanvas}>
          {ALL_ITEMS.map((item, index) => (
            <div
              key={item.uniqueKey}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={styles.cardWrapper}
              onClick={() => handleCardClick(item)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title}`}
            >
              <div className={styles.cardInner}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 220px, 350px"
                  className={styles.cardImage}
                  draggable={false}
                  priority={index < 8}
                />
                <div className={styles.cardPill}>
                  <span className={styles.pillTitle}>{item.title}</span>
                  <span className={styles.pillCategory}>{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Status Bar */}
        <footer className={styles.footer}>
          <div className={styles.footerLeft}>BRAND STRATEGIST</div>
          <div className={styles.footerCenter}>BASED IN NEW YORK</div>
          <div className={styles.footerRight}>AVAILABLE FOR WORK</div>
        </footer>
      </section>

      {/* Lightbox Modal */}
      {activeItem && (
        <Lightbox item={activeItem} onClose={() => setActiveItem(null)} />
      )}
    </>
  );
}
