"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CaspriaAbout.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type HighlightKey = "growth" | "brands" | "campaigns" | "results";

interface ImageConfig {
  src: string;
  alt: string;
}

const highlightImages: Record<HighlightKey, ImageConfig[]> = {
  growth: [
    { src: "/caspria-about/growth_1.webp", alt: "Analytics dashboard mockup showing rising performance metrics" },
    { src: "/caspria-about/growth_2.webp", alt: "Growth marketing funnel visual and ad performance screen" },
    { src: "/caspria-about/growth_3.webp", alt: "Conversion rate KPI tiles and performance matrix" },
    { src: "/caspria-about/growth_4.webp", alt: "Exponential marketing campaign trajectory curve" },
  ],
  brands: [
    { src: "/caspria-about/brands_1.webp", alt: "Luxury brand packaging mockup and monogram" },
    { src: "/caspria-about/brands_2.webp", alt: "Premium business cards and brand stationery layout" },
    { src: "/caspria-about/brands_3.webp", alt: "Curated brand color palette and typography poster" },
    { src: "/caspria-about/brands_4.webp", alt: "Minimalist brand identity shopping bag mockup" },
  ],
  campaigns: [
    { src: "/caspria-about/campaigns_1.webp", alt: "Multi-channel social media creative campaign story" },
    { src: "/caspria-about/campaigns_2.webp", alt: "Digital billboard advertising campaign creative" },
    { src: "/caspria-about/campaigns_3.webp", alt: "Short-form video advertisement frame showcase" },
    { src: "/caspria-about/campaigns_4.webp", alt: "High-conversion email campaign visual design" },
  ],
  results: [
    { src: "/caspria-about/results_1.webp", alt: "Revenue analytics dashboard with verified ROI benchmarks" },
    { src: "/caspria-about/results_2.webp", alt: "Abstract velocity arrow illustrating market acceleration" },
    { src: "/caspria-about/results_3.webp", alt: "Conversion rate optimization metrics and customer value tiles" },
    { src: "/caspria-about/results_4.webp", alt: "Quarterly revenue growth and scale milestone graph" },
  ],
};

const slotRotations: Record<HighlightKey, number[]> = {
  growth: [-18, 14, 20, -12],
  brands: [-14, 18, 16, -16],
  campaigns: [-20, 12, 22, -10],
  results: [-16, 16, 18, -14],
};

export default function CaspriaAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeKey, setActiveKey] = useState<HighlightKey | null>(null);
  const currentKeyRef = useRef<HighlightKey | null>(null);
  const currentTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const currentWordElRef = useRef<HTMLElement | null>(null);

  // Parallax quickTo setters
  const quickXRefs = useRef<((val: number) => void)[]>([]);
  const quickYRefs = useRef<((val: number) => void)[]>([]);

  // 1. Entrance on Scroll (ScrollTrigger once)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      linesRef.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 1, y: 0 });
      });
      return;
    }

    const validLines = linesRef.current.filter(Boolean) as HTMLElement[];
    if (validLines.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.to(validLines, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Setup GSAP quickTo parallax
  useEffect(() => {
    quickXRefs.current = slotRefs.current.map((el) => {
      if (!el) return () => {};
      return gsap.quickTo(el, "x", { duration: 0.45, ease: "power2.out" });
    });

    quickYRefs.current = slotRefs.current.map((el) => {
      if (!el) return () => {};
      return gsap.quickTo(el, "y", { duration: 0.45, ease: "power2.out" });
    });
  }, []);

  // 3. Hover Interaction Handler
  const showImages = useCallback((key: HighlightKey, wordEl: HTMLElement) => {
    if (currentTimelineRef.current) {
      currentTimelineRef.current.kill();
    }

    currentKeyRef.current = key;
    currentWordElRef.current = wordEl;
    setActiveKey(key);

    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const wordRect = wordEl.getBoundingClientRect();
    // Compute line center Y relative to statement container
    const relativeLineY = wordRect.top + wordRect.height / 2 - containerRect.top;

    const rotations = slotRotations[key];
    const slots = slotRefs.current.filter(Boolean) as HTMLElement[];

    // Position the 4 slots relative to the hovered word's line
    // Slot 0: Top-Left, Slot 1: Bottom-Left, Slot 2: Top-Right, Slot 3: Bottom-Right
    const slotOffsets = [
      { top: relativeLineY - 150 }, // Top-Left
      { top: relativeLineY + 35 },  // Bottom-Left
      { top: relativeLineY - 145 }, // Top-Right
      { top: relativeLineY + 40 },  // Bottom-Right
    ];

    const tl = gsap.timeline();
    currentTimelineRef.current = tl;

    slots.forEach((slot, idx) => {
      const rot = rotations[idx];
      const offset = slotOffsets[idx];

      gsap.set(slot, {
        top: offset.top,
      });

      tl.fromTo(
        slot,
        {
          scale: 0.4,
          rotation: rot - 35,
          opacity: 0,
          y: 30,
        },
        {
          scale: 1,
          rotation: rot,
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "back.out(1.7)",
        },
        idx * 0.05
      );
    });
  }, []);

  const hideImages = useCallback(() => {
    if (currentTimelineRef.current) {
      currentTimelineRef.current.kill();
    }

    const slots = slotRefs.current.filter(Boolean) as HTMLElement[];
    if (slots.length === 0) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveKey(null);
        currentKeyRef.current = null;
        currentWordElRef.current = null;
      },
    });
    currentTimelineRef.current = tl;

    slots.forEach((slot) => {
      tl.to(
        slot,
        {
          scale: 0.6,
          y: "+=24",
          rotation: "+=10",
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        },
        0
      );
    });
  }, []);

  // 4. Cursor Parallax
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!currentKeyRef.current || window.innerWidth < 768) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const offsetX = ((e.clientX - w / 2) / (w / 2)) * 12; // ±12px parallax
    const offsetY = ((e.clientY - h / 2) / (h / 2)) * 12;

    quickXRefs.current.forEach((fn) => fn(offsetX));
    quickYRefs.current.forEach((fn) => fn(offsetY));
  }, []);

  // 5. Touch / Click Outside to close
  useEffect(() => {
    const handleTouchOutside = (e: TouchEvent) => {
      if (!currentKeyRef.current) return;
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.hl}`)) {
        hideImages();
      }
    };

    window.addEventListener("touchstart", handleTouchOutside);
    return () => window.removeEventListener("touchstart", handleTouchOutside);
  }, [hideImages]);

  // Current active 4 images (or fallback to growth)
  const currentImages = highlightImages[activeKey || "growth"];

  return (
    <section
      ref={sectionRef}
      className={styles.aboutSection}
      id="about"
      onMouseMove={onMouseMove}
      aria-label="About Caspria"
    >
      {/* Centred Label */}
      <span className={styles.label}>(About Us)</span>

      {/* Statement Container */}
      <div ref={containerRef} className={styles.statementWrapper}>
        <p className={styles.statement}>
          {/* Line 1 */}
          <span
            ref={(el) => {
              linesRef.current[0] = el;
            }}
            className={styles.line}
          >
            <span>Caspria is a&nbsp;</span>
            <span
              className={`${styles.hl} ${activeKey === "growth" ? styles.active : ""}`}
              data-key="growth"
              tabIndex={0}
              role="button"
              aria-label="Highlight: growth marketing"
              onMouseEnter={(e) => showImages("growth", e.currentTarget)}
              onMouseLeave={hideImages}
              onFocus={(e) => showImages("growth", e.currentTarget)}
              onBlur={hideImages}
              onClick={(e) => {
                if (activeKey === "growth") hideImages();
                else showImages("growth", e.currentTarget);
              }}
            >
              growth marketing
            </span>
            <span>&nbsp;studio that</span>
          </span>

          {/* Line 2 */}
          <span
            ref={(el) => {
              linesRef.current[1] = el;
            }}
            className={styles.line}
          >
            <span>shapes&nbsp;</span>
            <span
              className={`${styles.hl} ${activeKey === "brands" ? styles.active : ""}`}
              data-key="brands"
              tabIndex={0}
              role="button"
              aria-label="Highlight: brands"
              onMouseEnter={(e) => showImages("brands", e.currentTarget)}
              onMouseLeave={hideImages}
              onFocus={(e) => showImages("brands", e.currentTarget)}
              onBlur={hideImages}
              onClick={(e) => {
                if (activeKey === "brands") hideImages();
                else showImages("brands", e.currentTarget);
              }}
            >
              brands
            </span>
            <span>,&nbsp;launches&nbsp;</span>
            <span
              className={`${styles.hl} ${activeKey === "campaigns" ? styles.active : ""}`}
              data-key="campaigns"
              tabIndex={0}
              role="button"
              aria-label="Highlight: campaigns"
              onMouseEnter={(e) => showImages("campaigns", e.currentTarget)}
              onMouseLeave={hideImages}
              onFocus={(e) => showImages("campaigns", e.currentTarget)}
              onBlur={hideImages}
              onClick={(e) => {
                if (activeKey === "campaigns") hideImages();
                else showImages("campaigns", e.currentTarget);
              }}
            >
              campaigns
            </span>
            <span>,</span>
          </span>

          {/* Line 3 */}
          <span
            ref={(el) => {
              linesRef.current[2] = el;
            }}
            className={styles.line}
          >
            <span>and engineers&nbsp;</span>
            <span
              className={`${styles.hl} ${activeKey === "results" ? styles.active : ""}`}
              data-key="results"
              tabIndex={0}
              role="button"
              aria-label="Highlight: measurable growth"
              onMouseEnter={(e) => showImages("results", e.currentTarget)}
              onMouseLeave={hideImages}
              onFocus={(e) => showImages("results", e.currentTarget)}
              onBlur={hideImages}
              onClick={(e) => {
                if (activeKey === "results") hideImages();
                else showImages("results", e.currentTarget);
              }}
            >
              measurable growth
            </span>
            <span>.</span>
          </span>
        </p>

        {/* 4 Floating Image Slots (Top-Left, Bottom-Left, Top-Right, Bottom-Right) */}
        <div className={styles.floatingLayer} aria-hidden="true">
          {/* Slot 0: Top-Left */}
          <div
            ref={(el) => {
              slotRefs.current[0] = el;
            }}
            className={`${styles.slot} ${styles.slotTopLeft}`}
          >
            <Image
              src={currentImages[0].src}
              alt={currentImages[0].alt}
              fill
              sizes="(max-width: 768px) 28vw, 210px"
              className={styles.slotImg}
            />
          </div>

          {/* Slot 1: Bottom-Left */}
          <div
            ref={(el) => {
              slotRefs.current[1] = el;
            }}
            className={`${styles.slot} ${styles.slotBottomLeft}`}
          >
            <Image
              src={currentImages[1].src}
              alt={currentImages[1].alt}
              fill
              sizes="(max-width: 768px) 28vw, 210px"
              className={styles.slotImg}
            />
          </div>

          {/* Slot 2: Top-Right */}
          <div
            ref={(el) => {
              slotRefs.current[2] = el;
            }}
            className={`${styles.slot} ${styles.slotTopRight}`}
          >
            <Image
              src={currentImages[2].src}
              alt={currentImages[2].alt}
              fill
              sizes="(max-width: 768px) 28vw, 210px"
              className={styles.slotImg}
            />
          </div>

          {/* Slot 3: Bottom-Right */}
          <div
            ref={(el) => {
              slotRefs.current[3] = el;
            }}
            className={`${styles.slot} ${styles.slotBottomRight}`}
          >
            <Image
              src={currentImages[3].src}
              alt={currentImages[3].alt}
              fill
              sizes="(max-width: 768px) 28vw, 210px"
              className={styles.slotImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

