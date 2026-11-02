"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./JournalAndFooter.module.css";

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  link: string;
}

const journalEntries: JournalEntry[] = [
  {
    id: "j1",
    date: "May 27",
    title: "ONE COLOUR, ONE GESTURE",
    excerpt:
      "Red Room was built on a single rule: one colour, one dancer, and no second idea allowed on set.",
    image: "/journal/journal_1.jpg",
    alt: "Model posing in minimal studio setting with bold red backdrop",
    link: "#journal",
  },
  {
    id: "j2",
    date: "May 12",
    title: "TAILORING IN TALL GRASS",
    excerpt:
      "Whitlock's tailoring, three models and a field outside Marfa, under a sky that would not clear.",
    image: "/journal/journal_2_red.jpg",
    alt: "Outdoor editorial fashion shoot under natural desert light in signature red theme",
    link: "#journal",
  },
  {
    id: "j3",
    date: "Apr 30",
    title: "PACKING LIGHT FOR THE ROAD",
    excerpt:
      "What fits in one bag when a job starts in Marfa and ends six hundred miles away.",
    image: "/journal/journal_3_red.jpg",
    alt: "Minimal travel and production gear on location in signature red theme",
    link: "#journal",
  },
  {
    id: "j4",
    date: "Mar 18",
    title: "WHAT A FACE HOLDS",
    excerpt:
      "Close portraits in available light, and why I stopped asking people to relax.",
    image: "/journal/journal_4.jpg",
    alt: "Intimate natural light portrait photography study",
    link: "#journal",
  },
  {
    id: "j5",
    date: "Feb 11",
    title: "COLOUR AT HIGH NOON",
    excerpt:
      "Everybody avoids the midday sun. For North Current's swimwear, it was the whole point.",
    image: "/journal/journal_5.jpg",
    alt: "High contrast bright sunlight swimwear campaign",
    link: "#journal",
  },
];

export default function JournalAndFooter() {
  const footerRef = useRef<HTMLElement>(null);

  // ── Scroll-driven dynamic slant: slides down to right on scroll, flattens to 100% black at bottom ──
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const handleScroll = () => {
      const rect = footer.getBoundingClientRect();
      const vh = window.innerHeight;

      // When document reaches the bottom, ensure 100% flat black coverage
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const isAtBottom = scrollBottom >= docHeight - 10;

      // Progress: 0 when footer top is at viewport bottom -> 1 when footer top reaches top of viewport
      const progress = isAtBottom
        ? 1
        : Math.max(0, Math.min(1, (vh - rect.top) / vh));

      // Right-side slant: starts lower down (~120px) and smoothly straightens to 0px
      const maxSlant = Math.round(Math.min(130, vh * 0.14));
      const currentRightSlant = Math.round(maxSlant * (1 - progress));

      if (currentRightSlant <= 2 || progress >= 0.98) {
        footer.style.clipPath = "none";
      } else {
        footer.style.clipPath = `polygon(0 0, 100% ${currentRightSlant}px, 100% 100%, 0 100%)`;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.flowContainer} id="journal-footer-flow">
      {/* ── 1. FROM THE JOURNAL SECTION ── */}
      <section className={styles.journalSection} id="journal" aria-label="From The Journal">
        <div className={styles.journalInner}>
          {/* Section Header */}
          <div className={styles.journalHeader}>
            <h2 className={styles.journalTitle}>FROM THE JOURNAL</h2>
            <div className={styles.journalHeaderMeta}>
              <p className={styles.journalSubtitle}>
                What the pictures leave out: notes from the road, the gear that
                earned its place in the bag, and the occasional argument about
                exposure.
              </p>
            </div>
          </div>

          {/* List of 5 Journal Rows with Hover Image Reveal */}
          <div className={styles.cardsList}>
            {journalEntries.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className={styles.cardRow}
                aria-label={`${item.title} — ${item.date}`}
              >
                {/* Horizontal photographic reveal on hover */}
                <div className={styles.bgImageWrapper} aria-hidden="true">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1400px) 100vw, 1400px"
                    className={styles.bgImage}
                  />
                  <div className={styles.bgOverlay} />
                </div>

                {/* Left: Date */}
                <span className={styles.cardDate}>{item.date}</span>

                {/* Center: Title */}
                <span className={styles.cardTitle}>{item.title}</span>

                {/* Right: Excerpt */}
                <span className={styles.cardExcerpt}>{item.excerpt}</span>

                {/* Far Right: Circular Action Button */}
                <span className={styles.circleBtn} aria-hidden="true">
                  <span className={styles.arrowIcon}>↗</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. SLANTED "LET'S TALK" EDITORIAL FOOTER ── */}
      <footer
        ref={footerRef}
        className={styles.footerContainer}
        id="contact"
        aria-label="Contact and Footer"
      >
        <div className={styles.footerInner}>
          {/* Giant LET'S TALK Wordmark */}
          <div className={styles.talkHeadingWrap}>
            <h2 className={styles.talkHeading}>LET’S TALK</h2>
          </div>

          {/* Middle Action Block */}
          <div className={styles.footerMiddle}>
            <Link href="mailto:hello@caspria.studio" className={styles.bookBtn}>
              <span>Start a Project</span>
              <span className={styles.bookArrow}>↗</span>
            </Link>
            <p className={styles.locationTag}>New York, NY ▪ Worldwide</p>
          </div>

          {/* Bottom Grid Line */}
          <div className={styles.footerBottomGrid}>
            <div className={styles.brandLeft}>
              <p className={styles.copyText}>
                © 2026 Caspria Marketing Team LLC ▪ All rights reserved
              </p>
            </div>

            <div className={styles.poweredCenter}>
              <a
                href="https://airizz.co/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.poweredLink}
              >
                <span className={styles.poweredText}>Powered by&nbsp;</span>
                <span className={styles.poweredBrand}>AIRIZZ</span>
              </a>
            </div>

            <div className={styles.linksRight}>
              <a
                href="mailto:hello@caspria.studio"
                className={styles.gridLink}
              >
                hello@caspria.studio
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.gridLink}
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.gridLink}
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.gridLink}
              >
                Twitter / X
              </a>
              <button
                type="button"
                onClick={scrollToTop}
                className={styles.toTopBtn}
                aria-label="Scroll to top"
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
