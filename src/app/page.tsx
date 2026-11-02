"use client";

import ProjectsObsession from "@/components/ProjectsObsession";
import ViewProjectsBanner from "@/components/ViewProjectsBanner";
import CaspriaAbout from "@/components/CaspriaAbout";
import ServicesDrop from "@/components/ServicesDrop";
import BlogSection from "@/components/BlogSection";
import JournalAndFooter from "@/components/JournalAndFooter";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./works/works.module.css";

interface WorkProject {
  id: string;
  src: string;
  title: string;
  category: string;
  filterCategory: "Visual Identity" | "Art Direction" | "Luxury & Packaging" | "Campaign & Editorial";
  year: string;
  tags: string[];
  description: string;
}

const workProjects: WorkProject[] = [
  {
    id: "coffee",
    src: "/media_coffee.png",
    title: "Nora Coffee",
    category: "Visual Identity",
    filterCategory: "Visual Identity",
    year: "2026",
    tags: ["Branding", "Packaging", "Art Direction"],
    description:
      "A bold, tactile brand identity and packaging system for an artisan coffee house — balancing organic warmth with editorial precision.",
  },
  {
    id: "bakery",
    src: "/media_bakery.png",
    title: "Ovenbird Bakery",
    category: "Art Direction",
    filterCategory: "Art Direction",
    year: "2026",
    tags: ["Visual Identity", "Packaging", "Print"],
    description:
      "Retro-modern brand world for an artisan neighbourhood bakery rooted in European pastry craft and bespoke typography.",
  },
  {
    id: "perfume",
    src: "/media_perfume.png",
    title: "Aurel Scent",
    category: "Luxury & Packaging",
    filterCategory: "Luxury & Packaging",
    year: "2026",
    tags: ["Luxury", "Product Design", "Editorial"],
    description:
      "Minimalist luxury fragrance brand system — amber light, custom glass flacons, marble surfaces, and restrained elegance.",
  },
  {
    id: "floral",
    src: "/media_floral.png",
    title: "Bloom Studio",
    category: "Campaign & Editorial",
    filterCategory: "Campaign & Editorial",
    year: "2025",
    tags: ["Lifestyle", "Editorial", "Art Direction"],
    description:
      "Seasonal high-fashion brand campaign for an artisan floral studio — soft atmospheric light and gentle botanical storytelling.",
  },
  {
    id: "stationery",
    src: "/media_stationery.png",
    title: "Goldleaf Press",
    category: "Visual Identity",
    filterCategory: "Visual Identity",
    year: "2025",
    tags: ["Branding", "Print Craft", "Packaging"],
    description:
      "Premium stationery brand identity with gold foil finishes, custom wax seals, heavy cotton stocks, and tactile luxury.",
  },
  {
    id: "wine",
    src: "/media_wine.png",
    title: "Marquis & Co.",
    category: "Campaign & Editorial",
    filterCategory: "Campaign & Editorial",
    year: "2025",
    tags: ["Beverage", "Luxury", "Editorial"],
    description:
      "Dark, moody campaign for a heritage champagne house — deep velvet, crystal reflections, and timeless European sophistication.",
  },
  {
    id: "interior",
    src: "/media_interior.png",
    title: "Terra Studio",
    category: "Art Direction",
    filterCategory: "Art Direction",
    year: "2025",
    tags: ["Spatial", "Interior", "Identity"],
    description:
      "Brand world and architectural visual language for a plant-filled studio space rooted in earthy tones and natural stone.",
  },
  {
    id: "fashion",
    src: "/media_fashion.png",
    title: "Sable Edit",
    category: "Luxury & Packaging",
    filterCategory: "Luxury & Packaging",
    year: "2024",
    tags: ["Fashion", "Luxury", "Packaging"],
    description:
      "Editorial identity and bespoke packaging suite for a curated luxury accessories house — marble, pure silk, and quiet opulence.",
  },
  {
    id: "ceramic",
    src: "/media_ceramic.png",
    title: "Clay & Form",
    category: "Visual Identity",
    filterCategory: "Visual Identity",
    year: "2024",
    tags: ["Craft", "Artisan", "E-Commerce"],
    description:
      "Handmade ceramics brand identity rooted in honest craft, natural terracotta pigments, and the beauty of wabi-sabi imperfection.",
  },
  {
    id: "candle",
    src: "/media_candle.png",
    title: "Vela Noir",
    category: "Luxury & Packaging",
    filterCategory: "Luxury & Packaging",
    year: "2024",
    tags: ["Product", "Packaging", "Art Direction"],
    description:
      "Moody, amber-lit brand identity and frosted glass vessel design for a botanical luxury candle house — darkness made beautiful.",
  },
];

const categories = [
  "All Works",
  "Visual Identity",
  "Art Direction",
  "Luxury & Packaging",
  "Campaign & Editorial",
] as const;

const marqueeItems = [
  "IDENTITY",
  "VISUAL IDENTITY",
  "PERFORMANCE ADS",
  "SOCIAL MEDIA",
  "SEO & GROWTH",
  "BRAND STRATEGY",
  "DIGITAL MARKETING",
];

const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We go deep into your brand, market, audience, and competitors to uncover what others miss.",
    img: "/process_1.png",
    overlay:
      "linear-gradient(180deg, rgba(255, 90, 10, 0.28) 0%, rgba(200, 30, 0, 0.12) 40%, rgba(8, 2, 0, 0.88) 100%)",
  },
  {
    step: "02",
    title: "Strategize",
    description:
      "We build a precise roadmap, channels, budget, messaging, and milestones before a single dollar is spent.",
    img: "/process_2.png",
    overlay:
      "linear-gradient(180deg, rgba(235, 30, 10, 0.32) 0%, rgba(170, 15, 0, 0.12) 40%, rgba(8, 0, 0, 0.88) 100%)",
  },
  {
    step: "03",
    title: "Execute",
    description:
      "Our team of designers, strategists, and media buyers launches every campaign with obsessively crafted creative.",
    img: "/process_3.png",
    overlay:
      "linear-gradient(180deg, rgba(255, 60, 30, 0.28) 0%, rgba(190, 20, 20, 0.12) 40%, rgba(10, 0, 2, 0.88) 100%)",
  },
  {
    step: "04",
    title: "Optimize",
    description:
      "We track every metric, kill what doesn't work, scale what does, and report everything transparently.",
    img: "/process_4.png",
    overlay:
      "linear-gradient(180deg, rgba(255, 120, 0, 0.28) 0%, rgba(210, 45, 0, 0.12) 40%, rgba(12, 3, 0, 0.88) 100%)",
  },
];

interface ServiceItem {
  id: string;
  step: string;
  category: string;
  title: string;
  image: string;
  statNum: string;
  statLabel: string;
  description: string;
  pills: string[];
}

const serviceItems: ServiceItem[] = [
  {
    id: "digital-marketing",
    step: "01",
    category: "Marketing Service",
    title: "Digital Marketing",
    image: "/media_perfume.png",
    statNum: "34+",
    statLabel: "projects done",
    description:
      "Streamline your workflows and nurture leads around the clock with intelligent, personalized communication systems.",
    pills: ["Content Marketing", "Email Marketing Campaigns", "Analytics & Reporting"],
  },
  {
    id: "visual-identity",
    step: "02",
    category: "Design Service",
    title: "Visual Identity",
    image: "/media_stationery.png",
    statNum: "120+",
    statLabel: "systems created",
    description:
      "Bespoke typographic marks, tactile print systems, and brand universes that command instant recognition and enduring loyalty.",
    pills: ["Logo Design", "Brand Identity System", "Typography & Color System"],
  },
  {
    id: "brand-strategy",
    step: "03",
    category: "Design Service",
    title: "Brand Strategy",
    image: "/media_interior.png",
    statNum: "34+",
    statLabel: "projects done",
    description:
      "Streamline your workflows and nurture leads around the clock with intelligent, personalized communication systems.",
    pills: ["Logo Design", "Brand Identity System", "Typography & Color System"],
  },
  {
    id: "media-planning",
    step: "04",
    category: "Media Service",
    title: "Media Planning",
    image: "/media_wine.png",
    statNum: "500M+",
    statLabel: "impressions delivered",
    description:
      "High-velocity creative testing, cross-channel media buying, and real-time algorithmic budget allocation engineered for maximum ROI.",
    pills: ["Paid Social Ads", "Omnichannel Funnels", "Growth Engineering"],
  },
];

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  

  const processSectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Gallery section refs & scroll-driven states
  const galleryHeroRef = useRef<HTMLDivElement>(null);
  const duoGridRef = useRef<HTMLDivElement>(null);
  const [heroScale, setHeroScale] = useState(1);
  const [duoFallPx, setDuoFallPx] = useState(0);

  // Services Accordion section refs & state
  const servicesSectionRef = useRef<HTMLElement>(null);
  const serviceRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeService, setActiveService] = useState<number>(0);
  const activeServiceRef = useRef<number>(0);
  const lastSwitchTimeRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      const windowH = window.innerHeight;

      // ── Process section scroll ──
      const el = processSectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        // Generous scroll span so each card has plenty of time to ascend like a staircase
        const totalScrollable = rect.height + windowH * 0.95;
        const currentScroll = windowH - rect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
        setScrollProgress(progress);
      }

      // ── Hero "comes large" scroll effect ──
      const heroEl = galleryHeroRef.current;
      if (heroEl) {
        const r = heroEl.getBoundingClientRect();
        // progress as hero moves through viewport
        const prog = Math.max(0, Math.min(1, (windowH - r.top) / (windowH + r.height * 0.5)));
        // subtly expands into view
        setHeroScale(1 + (1 - prog) * 0.06);
      }

      // ── Duo grid text-fall animation ──
      // Top text falls to bottom as the full picture comes into view
      const duoEl = duoGridRef.current;
      if (duoEl) {
        const r = duoEl.getBoundingClientRect();
        const cellH = duoEl.clientHeight || 750;
        
        // Start falling when the top of the cards reaches 70% of viewport
        // Finish falling when the full picture is revealed (top reaches 10% of viewport)
        const startScroll = windowH * 0.72;
        const endScroll = windowH * 0.12;
        const rawProgress = (startScroll - r.top) / (startScroll - endScroll);
        const progress = Math.max(0, Math.min(1, rawProgress));

        // Smooth natural ease (gravity feel with gentle landing)
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        // Max fall: leaves ~36px padding at bottom of cell
        const maxFall = Math.max(0, cellH - 170);
        setDuoFallPx(Math.round(ease * maxFall));
      }

      // ── Services Accordion scroll tracking: paced progressive expansion ──
      const sEl = servicesSectionRef.current;
      if (sEl) {
        const sRect = sEl.getBoundingClientRect();
        // Active when the services section is in the viewport
        if (sRect.top < windowH * 0.75 && sRect.bottom > windowH * 0.25) {
          const now = Date.now();
          if (now - lastSwitchTimeRef.current >= 300) {
            const currentIdx = activeServiceRef.current;
            const total = serviceItems.length;

            // Check if we should advance to the NEXT card (scrolling down):
            // User must scroll through the current card until the next service row reaches upper view (<= 40vh)
            if (currentIdx < total - 1) {
              const nextEl = serviceRowRefs.current[currentIdx + 1];
              if (nextEl) {
                const nextRect = nextEl.getBoundingClientRect();
                if (nextRect.top <= windowH * 0.40) {
                  activeServiceRef.current = currentIdx + 1;
                  setActiveService(currentIdx + 1);
                  lastSwitchTimeRef.current = now;
                  return;
                }
              }
            }

            // Check if we should revert to the PREVIOUS card (scrolling up):
            // Only switch back when the current card has dropped back down (>= 62vh)
            if (currentIdx > 0) {
              const curEl = serviceRowRefs.current[currentIdx];
              if (curEl) {
                const curRect = curEl.getBoundingClientRect();
                if (curRect.top >= windowH * 0.62) {
                  activeServiceRef.current = currentIdx - 1;
                  setActiveService(currentIdx - 1);
                  lastSwitchTimeRef.current = now;
                  return;
                }
              }
            }
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getCardStyle = (index: number) => {
    // Staircase step thresholds with time to view each card progressively:
    // Card 01: starts at 0.04, lands by 0.42 (leads first, revealing upper/medium portion)
    // Card 02: starts at 0.20, lands by 0.58 (second step)
    // Card 03: starts at 0.38, lands by 0.76 (third step)
    // Card 04: starts at 0.56, lands by 0.94 (fourth step)
    const start = 0.04 + index * 0.18;
    const end = start + 0.38;
    const t = Math.max(0, Math.min(1, (scrollProgress - start) / (end - start)));

    // Smooth cubic ease out
    const ease = 1 - Math.pow(1 - t, 3);

    // Deep 320px vertical travel distance creates the distinct staircase stepping
    const maxTravel = 320;
    const translateY = (1 - ease) * maxTravel;
    const opacity = 0.35 + ease * 0.65;

    return {
      transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
      opacity,
      transition: "transform 0.08s ease-out, opacity 0.08s ease-out",
    };
  };



  return (
    <div className={styles.page}>
      {/* ── Top Navigation Bar ──────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.navLeft}>
          <Link href="/" className={styles.brandLogo}>
            Caspria
          </Link>
        </div>

        <nav className={styles.navCenter}>
          <Link href="/" className={`${styles.navLink} ${styles.navLinkActive}`}>
            Home
          </Link>
          <a href="#services" className={styles.navLink}>
            Services
          </a>
          <Link href="/works" className={styles.navLink}>
            Work
          </Link>
          <a href="#about" className={styles.navLink}>
            About
          </a>
        </nav>

        <div className={styles.navRight}>
          <a href="#contact" className={styles.contactBtn}>
            Contact Us <span>↗</span>
          </a>
          <button
            className={styles.mobileMenuToggle}
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileOpen && (
          <>
            <div
              className={styles.mobileBackdrop}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className={styles.mobileDrawer}>
              <Link
                href="/"
                className={`${styles.mobileNavLink} ${styles.mobileNavLinkActive}`}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <a
                href="#services"
                className={styles.mobileNavLink}
                onClick={() => setMobileOpen(false)}
              >
                Services
              </a>
              <Link
                href="/works"
                className={styles.mobileNavLink}
                onClick={() => setMobileOpen(false)}
              >
                Work
              </Link>
              <a
                href="#about"
                className={styles.mobileNavLink}
                onClick={() => setMobileOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className={styles.mobileContactBtn}
                onClick={() => setMobileOpen(false)}
              >
                Contact Us <span>↗</span>
              </a>
            </div>
          </>
        )}
      </header>

      {/* ── 1. Hero Section: Well-Expanded MARKETING Title ─────────────────── */}
      <section className={styles.heroSection}>
        {/* Top Metadata Row: ©2026 ... AGENCY */}
        <div className={styles.heroMetaRow}>
          <p className={styles.heroCopyright}>©2026</p>
          <p className={styles.heroAgency}>STUDIO</p>
        </div>

        {/* Well-Expanded MARKETING Title stretching 100% edge-to-edge */}
        <div className={styles.heroTitleSvgContainer} role="heading" aria-level={1}>
          <svg
            viewBox="0 0 1440 220"
            className={styles.heroTitleSvg}
            preserveAspectRatio="none"
            aria-label="MARKETING"
          >
            <defs>
              <linearGradient id="fireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#380400" />
                <stop offset="5%" stopColor="#7a0d00" />
                <stop offset="12%" stopColor="#cf1f00" />
                <stop offset="25%" stopColor="#ff4d00" />
                <stop offset="38%" stopColor="#ff7800" />
                <stop offset="48%" stopColor="#9e1300" />
                <stop offset="51%" stopColor="#150200" />
                <stop offset="55%" stopColor="#b81b00" />
                <stop offset="65%" stopColor="#ff5200" />
                <stop offset="78%" stopColor="#ff7f00" />
                <stop offset="88%" stopColor="#c51900" />
                <stop offset="100%" stopColor="#450600" />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="195"
              textLength="1440"
              lengthAdjust="spacingAndGlyphs"
              fontFamily="var(--font-anton), Impact, sans-serif"
              fontSize="235"
              fontWeight="400"
              fill="url(#fireGrad)"
            >
              MARKETING
            </text>
          </svg>
        </div>
      </section>
{/* ── 2. Full-Width Edge-To-Edge Banner (NO Rounded Corners) ──────────── */}
      <section className={styles.visualBannerWrap}>
        {/* Desktop Background: constant */}
        <Image
          src="/growthlab_hero.png"
          alt="Caspria Marketing Team"
          fill
          priority
          sizes="100vw"
          className={styles.bannerBgImageDesktop}
        />
        {/* Mobile Background: marketing_bg.png */}
        <Image
          src="/marketing_bg.png"
          alt="Caspria Marketing Team"
          fill
          priority
          sizes="100vw"
          className={styles.bannerBgImageMobile}
        />
        <div className={styles.bannerOverlay} />

        <div className={styles.bannerInner}>
          {/* Top Row: 10+ / 500M+ / 220+ */}
          <div className={styles.bannerTopRow}>
            <div className={styles.bannerStat}>
              <span className={styles.bannerStatNum}>10+</span>
              <span className={styles.bannerStatLabel}>Years of Experience</span>
            </div>
            <div className={`${styles.bannerStat} ${styles.bannerStatCenter}`}>
              <span className={styles.bannerStatNum}>500M+</span>
              <span className={styles.bannerStatLabel}>Impressions Delivered</span>
            </div>
            <div className={`${styles.bannerStat} ${styles.bannerStatRight}`}>
              <span className={styles.bannerStatNum}>220+</span>
              <span className={styles.bannerStatLabel}>Successful Projects</span>
            </div>
          </div>

          {/* Bottom Row: Copy, Buttons & Floating Badges */}
          <div className={styles.bannerBottomRow}>
            {/* Left Content */}
            <div className={styles.bannerLeftContent}>
              <p className={styles.bannerCopy}>
                Brand strategy, visual identity, digital campaigns, and media planning — crafted to
                grow your market share
              </p>
              <div className={styles.bannerBtnGroup}>
                <a href="#contact" className={styles.bannerBtnSolid}>
                  Start your project <span>↗</span>
                </a>
                <a href="#portfolio" className={styles.bannerBtnOutline}>
                  Start your project <span>↗</span>
                </a>
              </div>
            </div>

            {/* Right Badges */}
            <div className={styles.bannerBadgesCol}>
              <span className={styles.bannerBadgePill}>Clarity in positioning</span>
              <span className={styles.bannerBadgePill}>Performance-Driven Marketing</span>
              <div className={styles.bannerBadgesRow}>
                <span className={styles.bannerBadgePill}>Media Planning</span>
                <span className={styles.bannerBadgePill}>Growth Systems</span>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* ── 3. Marquee Scrolling Ticker Bar (Exact Same BG Style & Dividers) ── */}
      <div className={styles.marqueeSection} aria-label="Capabilities ticker">
        <div className={styles.marqueeTrack}>
          {marqueeItems
            .concat(marqueeItems)
            .concat(marqueeItems)
            .map((item, index) => (
              <div key={`${item}-${index}`} className={styles.marqueeItemWrap}>
                <div className={styles.marqueeItem}>
                  <span className={styles.marqueeSlash}>/</span>
                  <span>{item}</span>
                </div>
                <div className={styles.marqueeDivider} />
              </div>
            ))}
        </div>
      </div>

      {/* ── 4. Our Process Section (Staggered Scroll Cards: 01, 02, 03, 04) ── */}
      <section ref={processSectionRef} className={styles.processSection} id="process">
        <div className={styles.processHeader}>
          <h2 className={styles.processTitle}>
            Our
            <br />
            Process
          </h2>
          <p className={styles.processSubtitle}>
            A disciplined four step framework that eliminates guesswork and delivers predictable
            growth.
          </p>
        </div>

        <div className={styles.processCardsGrid}>
          {processSteps.map((step, index) => {
            const cardStyle = getCardStyle(index);
            return (
              <div
                key={step.step}
                className={styles.processCard}
                style={cardStyle}
              >
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  className={styles.processCardImg}
                  draggable={false}
                />
                <div
                  className={styles.processCardOverlay}
                  style={{ background: step.overlay }}
                />

                <div className={styles.processCardContent}>
                  <p className={styles.processCardNum}>{step.step}</p>
                  <div className={styles.processCardBottom}>
                    <h3 className={styles.processCardStepTitle}>{step.title}</h3>
                    <p className={styles.processCardStepDesc}>{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
{/* ── 5. About / Intro Section ─────────────────────────────────────── */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutLayout}>
          {/* Top-left: [Intro] label + paragraph */}
          <div className={styles.aboutTopLeft}>
            <span className={styles.aboutIntroTag}>[ Intro ]</span>
            <p className={styles.aboutIntroPara}>
              We are Caspria, a strategic brand and marketing agency rooted in
              New York. We work wherever the story demands — editorial campaigns,
              global launches, quiet rebrands, and everything in between.
            </p>
          </div>

          {/* Centre: tall portrait image */}
          <div className={styles.aboutImageWrap}>
            <Image
              src="/media_fashion.png"
              alt="Caspria creative direction"
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className={styles.aboutImage}
              priority={false}
            />
          </div>

          {/* Bottom-right: credentials + button */}
          <div className={styles.aboutBottomRight}>
            <p className={styles.aboutCredPara}>
              For over a decade, Caspria has shaped the visual and strategic
              identities of founders, luxury labels, and global enterprises.
              Brand strategy, creative production, and performance marketing —
              all under one roof, one vision.
            </p>
            <a href="#contact" className={styles.aboutUsBtn}>
              ABOUT US <span>↗</span>
            </a>
          </div>
        </div>
      </section>
{/* ── 5b. SELECTED WORK Giant Full-Width Title ─────────────────────── */}
      <section className={styles.selectedWorkSection}>
        <svg
          viewBox="0 0 1440 180"
          className={styles.selectedWorkSvg}
          preserveAspectRatio="none"
          aria-label="SELECTED WORK"
        >
          <text
            x="0"
            y="162"
            textLength="1440"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="var(--font-anton), Impact, sans-serif"
            fontSize="195"
            fontWeight="400"
            fill="#f0ebe0"
          >
            SELECTED WORK
          </text>
        </svg>
      </section>

      {/* ── 5c. Visual Gallery: Large Red Hero + Continuous Duo Grid with Text-Fall ── */}
      <section className={styles.gallerySection}>
        {/* Row 1 — Large Desktop Red Room Image with Bold Bottom-Left Text */}
        <div className={styles.galleryHeroWrap} ref={galleryHeroRef}>
          <Image
            src="/gallery_red_room.jpg"
            alt="Caspria — Red Room campaign"
            fill
            sizes="100vw"
            className={styles.galleryHeroImg}
            style={{
              transform: `scale(${heroScale.toFixed(3)})`,
            }}
          />
          <div className={styles.galleryHeroOverlay} />
          <div className={styles.galleryHeroLabel}>
            <span className={styles.galleryHeroLabelSub}>Campaign — 2026</span>
            <h3 className={styles.galleryHeroLabelTitle}>RED ROOM</h3>
          </div>
        </div>

        {/* Row 2 — Continuous 2-Column Grid (text starts top, falls to bottom as full picture appears) */}
        <div className={styles.galleryDuoGrid} ref={duoGridRef}>
          {/* Left cell: NEUTRAL GROUND */}
          <div className={styles.galleryDuoCell}>
            <Image
              src="/gallery_neutral_ground.jpg"
              alt="Caspria — Neutral Ground editorial"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.galleryDuoImg}
            />
            <div className={styles.galleryDuoOverlay} />
            <div
              className={styles.galleryDuoLabel}
              style={{
                transform: `translate3d(0, ${duoFallPx}px, 0)`,
              }}
            >
              <span className={styles.galleryDuoLabelSub}>Campaign — 2025</span>
              <h3 className={styles.galleryDuoLabelTitle}>NEUTRAL GROUND</h3>
            </div>
          </div>

          {/* Right cell: BARE SKIN */}
          <div className={styles.galleryDuoCell}>
            <Image
              src="/gallery_bare_skin.jpg"
              alt="Caspria — Bare Skin portrait series"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.galleryDuoImg}
            />
            <div className={styles.galleryDuoOverlay} />
            <div
              className={styles.galleryDuoLabel}
              style={{
                transform: `translate3d(0, ${duoFallPx}px, 0)`,
              }}
            >
              <span className={styles.galleryDuoLabelSub}>Portrait Series — 2024</span>
              <h3 className={styles.galleryDuoLabelTitle}>BARE SKIN</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5c-2. View All Projects Video Banner (Hover-to-Play Montage) ── */}
      <ViewProjectsBanner />

      {/* ── 5d. What we offer / Service (Interactive & Scroll-Expanding 4 Cards) ── */}
      <section ref={servicesSectionRef} className={styles.servicesSection} id="services">
        <div className={styles.servicesHeader}>
          <h2 className={styles.servicesTitle}>What we offer / Service</h2>
          <p className={styles.servicesSubtitle}>
            End to end solutions to build, grow, and scale your brand.
          </p>
        </div>

        <div className={styles.servicesList}>
          {serviceItems.map((item, index) => {
            const isActive = activeService === index;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  serviceRowRefs.current[index] = el;
                }}
                className={`${styles.serviceRow} ${
                  isActive ? styles.serviceRowActive : ""
                }`}
                onClick={() => {
                  setActiveService(index);
                  activeServiceRef.current = index;
                  lastSwitchTimeRef.current = Date.now() + 600;
                }}
              >
                {/* ── Collapsed Line View (Clean horizontal line, number, title, button) ── */}
                {!isActive && (
                  <div className={styles.serviceCollapsedBar}>
                    <span className={styles.serviceStepNum}>{item.step}</span>
                    <div className={styles.serviceMeta}>
                      <span className={styles.serviceCategoryLabel}>
                        {item.category}
                      </span>
                      <h3 className={styles.serviceTitle}>{item.title}</h3>
                    </div>
                    <a
                      href="#contact"
                      className={styles.serviceActionBtn}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Start your project <span>↗</span>
                    </a>
                  </div>
                )}

                {/* ── Expanded Full Card View (Large image, full content, pills) ── */}
                {isActive && (
                  <div className={styles.serviceExpandedCard}>
                    <div className={styles.serviceExpandedInner}>
                      {/* Left: Step number + Large rounded picture */}
                      <div className={styles.serviceLeftCol}>
                        <span className={styles.serviceExpandedNum}>
                          {item.step}
                        </span>
                        <div className={styles.serviceImageWrap}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 900px) 90vw, 380px"
                            className={styles.serviceImage}
                          />
                        </div>
                      </div>

                      {/* Right: Category, Title, Button, Stat, Copy & 3 Pill Cards */}
                      <div className={styles.serviceRightCol}>
                        <div className={styles.serviceExpandedHeaderRow}>
                          <div className={styles.serviceHeaderTexts}>
                            <span className={styles.serviceExpandedCategory}>
                              {item.category}
                            </span>
                            <h3 className={styles.serviceExpandedTitle}>
                              {item.title}
                            </h3>
                          </div>
                          <a
                            href="#contact"
                            className={styles.serviceActionBtn}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Start your project <span>↗</span>
                          </a>
                        </div>

                        <div className={styles.serviceStatBlock}>
                          <span className={styles.serviceStatNum}>
                            {item.statNum}
                          </span>
                          <span className={styles.serviceStatLabel}>
                            {item.statLabel}
                          </span>
                        </div>

                        <p className={styles.serviceDescription}>
                          {item.description}
                        </p>

                        <div className={styles.servicePillsGrid}>
                          {item.pills.map((pill, pIdx) => (
                            <div
                              key={pIdx}
                              className={styles.servicePillCard}
                            >
                              <span>{pill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 5e. Projects Built with Obsession (Reference 2-Column Staggered Grid) ── */}
      <ProjectsObsession />

      {/* ── 5f. Caspria Interactive About Section ── */}
      <CaspriaAbout />

      {/* ── 5g. Falling Bricks Physics Section ── */}
      <ServicesDrop />

      {/* ── 6. Blog & Insights Section ── */}
      <BlogSection />

      {/* ── 7. From The Journal & Slanted Editorial Footer ── */}
      <JournalAndFooter />
    </div>
  );
}
