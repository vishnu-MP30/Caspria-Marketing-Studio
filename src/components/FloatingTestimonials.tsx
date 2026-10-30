"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import styles from "./FloatingTestimonials.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TestimonialCardConfig {
  id: string;
  type: "text" | "photo";
  column: "left" | "center" | "right";
  xPercent: number; // percentage of viewport width
  startYVh: number; // initial vertical start in vh
  speed: number;    // column parallax speed multiplier
  quote?: string;
  highlight?: string;
  name?: string;
  city?: string;
  avatar?: string;
  photoUrl?: string;
  photoAlt?: string;
}

// 14 Hand-Tuned Cards: Continuous stream across 3 columns (Left 7%, Centre 36.5%, Right 66%)
// Staggered tightly so cards flow continuously without ANY blank frame or empty black void.
// As Card 14 completes its exit, the runway ends and goes DIRECTLY to the footer with ZERO middle gap!
const cardConfigs: TestimonialCardConfig[] = [
  // Screen 1: Card 1 (Left), Card 3 (Right), and Card 2 (Centre) are visible immediately with the heading
  {
    id: "card-1",
    type: "text",
    column: "left",
    xPercent: 7,
    startYVh: 12, // Visible at rest
    speed: 1.0,
    quote:
      "We spent months guessing what our customers wanted. Within three weeks of working together we had a clear plan and our first real market traction.",
    highlight: "They turned confusion into a clear roadmap.",
    name: "Aarav Nair",
    city: "Kochi, IN",
    avatar: "/testimonials/avatar_1.webp",
  },
  {
    id: "card-2",
    type: "photo",
    column: "center",
    xPercent: 36.5,
    startYVh: 42, // Visible at rest in centre
    speed: 1.08,
    photoUrl: "/testimonials/photo_1.webp",
    photoAlt: "Young woman sitting by sunlit window",
  },
  {
    id: "card-3",
    type: "text",
    column: "right",
    xPercent: 66,
    startYVh: 20, // Visible at rest in right column
    speed: 0.95,
    quote:
      "I was terrified to start our rebrand — the market felt crowded. But Caspria walked us through every step with patience and creative clarity.",
    highlight: "Calm, honest and always available.",
    name: "Elena Rostova",
    city: "Prague, CZ",
    avatar: "/testimonials/avatar_2.webp",
  },
  {
    id: "card-4",
    type: "text",
    column: "left",
    xPercent: 7,
    startYVh: 68,
    speed: 1.0,
    quote:
      "Our campaign went live ahead of schedule and our inbound enquiries doubled in the first month alone. The return on investment has been remarkable.",
    highlight: "Fast, organised and genuinely creative.",
    name: "Marcus Vance",
    city: "Austin, TX",
    avatar: "/testimonials/avatar_3.webp",
  },
  {
    id: "card-5",
    type: "photo",
    column: "center",
    xPercent: 36.5,
    startYVh: 95,
    speed: 1.08,
    photoUrl: "/testimonials/photo_2.webp",
    photoAlt: "Creative director working at modern desk",
  },
  {
    id: "card-6",
    type: "text",
    column: "right",
    xPercent: 66,
    startYVh: 78,
    speed: 0.95,
    quote:
      "The brand identity they crafted made an immediate impression on wholesale luxury buyers across Milan and Paris. Our presence is elevated.",
    highlight: "Elevated our presence onto the global stage.",
    name: "Chloé Mercier",
    city: "Lyon, FR",
    avatar: "/testimonials/avatar_4.webp",
  },
  {
    id: "card-7",
    type: "photo",
    column: "left",
    xPercent: 7,
    startYVh: 128,
    speed: 1.0,
    photoUrl: "/testimonials/photo_3.webp",
    photoAlt: "Founder on city street during golden hour",
  },
  {
    id: "card-8",
    type: "text",
    column: "center",
    xPercent: 36.5,
    startYVh: 155,
    speed: 1.08,
    quote:
      "Every visual asset was thought through down to the millimeter. Their tactile packaging standards and attention to typography are extraordinary.",
    highlight: "Uncompromising standards in every deliverable.",
    name: "Kenji Takahashi",
    city: "Kyoto, JP",
    avatar: "/testimonials/avatar_5.webp",
  },
  {
    id: "card-9",
    type: "photo",
    column: "right",
    xPercent: 66,
    startYVh: 138,
    speed: 0.95,
    photoUrl: "/testimonials/photo_4.webp",
    photoAlt: "Designer working on sunny outdoor terrace",
  },
  {
    id: "card-10",
    type: "text",
    column: "left",
    xPercent: 7,
    startYVh: 188,
    speed: 1.0,
    quote:
      "We had three previous agencies fail to capture our true market voice. Caspria nailed our positioning and visual language on the first iteration.",
    highlight: "Understood our essence from day one.",
    name: "Sofia Lindqvist",
    city: "Stockholm, SE",
    avatar: "/testimonials/avatar_6.webp",
  },
  {
    id: "card-11",
    type: "photo",
    column: "center",
    xPercent: 36.5,
    startYVh: 215,
    speed: 1.08,
    photoUrl: "/testimonials/photo_5.webp",
    photoAlt: "Woman reading thoughtfully in cafe",
  },
  {
    id: "card-12",
    type: "text",
    column: "right",
    xPercent: 66,
    startYVh: 198,
    speed: 0.95,
    quote:
      "The conversion rate on our digital platform grew by 64% within forty-five days of rollout. The commercial impact exceeded all our forecasts.",
    highlight: "Direct, measurable impact on our revenue.",
    name: "Darius Miller",
    city: "Toronto, CA",
    avatar: "/testimonials/avatar_7.webp",
  },
  {
    id: "card-13",
    type: "photo",
    column: "left",
    xPercent: 7,
    startYVh: 248,
    speed: 1.0,
    photoUrl: "/testimonials/photo_6.webp",
    photoAlt: "Founder reviewing project work in creative studio",
  },
  {
    id: "card-14",
    type: "text",
    column: "center",
    xPercent: 36.5,
    startYVh: 275,
    speed: 1.05,
    quote:
      "Working alongside their strategy team gave our founders unwavering confidence during our Series A presentations. They deliver pure market authority.",
    highlight: "Gave our vision true market authority.",
    name: "Amara Okonjo",
    city: "London, UK",
    avatar: "/testimonials/avatar_8.webp",
  },
];

export default function FloatingTestimonials() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // 1. Lenis Smooth Scrolling Sync with GSAP
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // 2. Exact ScrollTrigger Runway Sync:
    // Runway height = 430vh. Pinning distance = 330vh.
    // Card 14 starts at 275vh and travels 330 * 1.05 = 346.5vh -> finishes at -71.5vh (cleanly off top).
    // The very moment Card 14 exits, the runway finishes and releases into the footer with ZERO gap!
    const totalScrollDist = 330; // in vh

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: runwayRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.0,
          invalidateOnRefresh: true,
        },
      });

      // Subtle dynamic parallax on the background image across the scroll
      if (bgImgRef.current) {
        tl.to(
          bgImgRef.current,
          {
            yPercent: 8,
            ease: "none",
          },
          0
        );
      }

      cardConfigs.forEach((cfg, idx) => {
        const el = outerRefs.current[idx];
        if (!el) return;

        const travelDistance = totalScrollDist * cfg.speed;

        // Set initial flat upright position
        gsap.set(el, {
          y: `${cfg.startYVh}vh`,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
        });

        // Scrub translation upward through the viewport
        tl.to(
          el,
          {
            y: `${cfg.startYVh - travelDistance}vh`,
            ease: "none",
          },
          0
        );
      });
    }, runwayRef);

    // 3. 3D Interaction: QuickTo setters for each card
    const quickToSetters = innerRefs.current.map((inner) => {
      if (!inner) return null;
      gsap.set(inner, { rotateX: 0, rotateY: 0, rotateZ: 0 });
      return {
        rotX: gsap.quickTo(inner, "rotateX", { duration: 0.5, ease: "power3.out" }),
        rotY: gsap.quickTo(inner, "rotateY", { duration: 0.5, ease: "power3.out" }),
      };
    });

    // 4. Cursor Proximity Tilt (< 350px distance)
    let pointerX = -9999;
    let pointerY = -9999;
    let currentTwist = 0;

    const updateTilt = () => {
      const isMobile = window.innerWidth < 768;

      innerRefs.current.forEach((inner, idx) => {
        const setters = quickToSetters[idx];
        if (!inner || !setters) return;

        let targetRotX = 0;
        let targetRotY = currentTwist; // Fast scroll twist component

        if (!isMobile && pointerX > -5000) {
          const rect = inner.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = pointerX - cx;
          const dy = pointerY - cy;
          const dist = Math.hypot(dx, dy);

          if (dist < 350) {
            const factor = 1 - dist / 350;
            targetRotY += (dx / 350) * 35 * factor;
            targetRotX -= (dy / 350) * 20 * factor;
          }
        }

        setters.rotX(targetRotX);
        setters.rotY(targetRotY);
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      updateTilt();
    };

    const onPointerLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
      updateTilt();
    };

    // 5. Fast Scroll Twist
    let twistDecayTween: gsap.core.Tween | null = null;

    const onLenisScroll = ({ velocity }: { velocity: number }) => {
      const isMobile = window.innerWidth < 768;
      const maxTwist = isMobile ? 10 : 60;
      const targetTwist = gsap.utils.clamp(-maxTwist, maxTwist, velocity * 0.02);

      if (twistDecayTween) twistDecayTween.kill();

      currentTwist = targetTwist;
      updateTilt();

      twistDecayTween = gsap.to(
        { val: targetTwist },
        {
          val: 0,
          duration: 0.65,
          ease: "power2.out",
          onUpdate: function () {
            currentTwist = this.targets()[0].val;
            updateTilt();
          },
        }
      );
    };

    lenis.on("scroll", onLenisScroll);

    const stageEl = stageRef.current;
    if (stageEl) {
      stageEl.addEventListener("pointermove", onPointerMove);
      stageEl.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      if (stageEl) {
        stageEl.removeEventListener("pointermove", onPointerMove);
        stageEl.removeEventListener("pointerleave", onPointerLeave);
      }
      if (twistDecayTween) twistDecayTween.kill();
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={runwayRef} className={styles.testimonialsRunway} id="testimonials">
      <div ref={stageRef} className={styles.stage}>
        {/* Full-bleed background image with expansive cosmic light trails */}
        <div className={styles.bgWrapper}>
          <Image
            ref={bgImgRef}
            src="/caspria_bg.png"
            alt="Futuristic luminous light energy streaks on dark cosmic background"
            fill
            priority
            sizes="100vw"
            className={styles.bgImage}
          />
          {/* Luminous atmospheric glowing trails spanning the whole background */}
          <div className={styles.bgGlowLayer} />
        </div>

        {/* Centred 2-Line Heading (z-index below the cards) */}
        <div className={styles.headingBox}>
          <h2 className={styles.headingTitle}>
            Trusted by
            <br />
            Happy Clients.
          </h2>
          <p className={styles.headingSubtitle}>
            Discover how our design and strategic solutions deliver real measurable growth for
            brands like yours.
          </p>
        </div>

        {/* 3D Perspective Cards Viewport (z-index ABOVE heading) */}
        <div className={styles.cardsViewport}>
          {cardConfigs.map((cfg, idx) => (
            <div
              key={cfg.id}
              ref={(el) => {
                outerRefs.current[idx] = el;
              }}
              className={styles.cardOuter}
              style={{
                left: `${cfg.xPercent}%`,
              }}
            >
              <div
                ref={(el) => {
                  innerRefs.current[idx] = el;
                }}
                className={styles.cardInner}
              >
                {cfg.type === "text" ? (
                  <blockquote className={styles.textCardBody}>
                    {/* Zone 1: 5 coral stars */}
                    <div className={styles.starRow} aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={styles.starIcon}>
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Zone 2: Quote */}
                    <p className={styles.quoteText}>&ldquo;{cfg.quote}&rdquo;</p>

                    {/* Zone 3: Bold Highlight */}
                    <p className={styles.highlightText}>{cfg.highlight}</p>

                    {/* Zone 4: 36px rounded-square avatar (8px radius) + author info */}
                    <div className={styles.footerRow}>
                      {cfg.avatar && (
                        <Image
                          src={cfg.avatar}
                          alt={cfg.name || "Avatar"}
                          width={36}
                          height={36}
                          className={styles.avatarImg}
                        />
                      )}
                      <div className={styles.authorMeta}>
                        <p className={styles.authorName}>{cfg.name}</p>
                        <p className={styles.authorCity}>{cfg.city}</p>
                      </div>
                    </div>
                  </blockquote>
                ) : (
                  <figure className={styles.photoCardWrapper}>
                    {cfg.photoUrl && (
                      <Image
                        src={cfg.photoUrl}
                        alt={cfg.photoAlt || "Natural portrait photo"}
                        fill
                        sizes="(max-width: 768px) 76vw, 440px"
                        className={styles.photoCardImg}
                      />
                    )}
                  </figure>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
