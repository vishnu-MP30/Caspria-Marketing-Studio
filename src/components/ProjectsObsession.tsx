"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ProjectsObsession.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProjectItem {
  id: string;
  category: string;
  year: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

// 4 Case Study Projects matching Reference Layout
export const portfolioProjects: ProjectItem[] = [
  {
    id: "aurelia",
    category: "Branding",
    year: "@2025",
    title: "Aurelia",
    description:
      "A full identity system — logo, type, color, and voice — built to make the brand feel timeless and unmistakable.",
    image: "/portfolio/aurelia.png",
    link: "/works",
  },
  {
    id: "northwind",
    category: "UX/UI Design",
    year: "@2025",
    title: "Northwind",
    description:
      "An end-to-end product experience that turns complex flows into something clear, fast, and human.",
    image: "/portfolio/northwind.png",
    link: "/works",
  },
  {
    id: "lumen-studio",
    category: "Web Design",
    year: "@2025",
    title: "Lumen Studio",
    description:
      "A responsive marketing site designed to build trust, tell the story, and drive conversions.",
    image: "/portfolio/lumen-studio.png",
    link: "/works",
  },
  {
    id: "flowframe",
    category: "Webflow & Framer",
    year: "@2025",
    title: "Flowframe",
    description:
      "A fully interactive Framer build with CMS-driven pages, scroll animations, and a scalable component system.",
    image: "/portfolio/flowframe.png",
    link: "/works",
  },
];

export default function ProjectsObsession() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Split into left and right columns for staggered 2-column layout
  const leftProjects = [portfolioProjects[0], portfolioProjects[2]]; // Aurelia, Lumen Studio
  const rightProjects = [portfolioProjects[1], portfolioProjects[3]]; // Northwind, Flowframe

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(`.${styles.projectCard}`);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion && cards.length > 0) {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (section.contains(t.trigger as Node)) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.obsessionSection} id="case-studies">
      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <span className={styles.categoryTag}>(Portfolio)</span>
            <h2 className={styles.heading}>
              Projects Built with <br />
              <span className={styles.italicSerif}>Obsession.</span>
            </h2>
          </div>

          {/* Plus markers accent (desktop) */}
          <div className={styles.decorPluses} aria-hidden="true">
            <span>+</span>
            <span>+</span>
          </div>

          {/* Top Right CTA Pill Button */}
          <div className={styles.headerCtaWrap}>
            <Link href="/works" className={styles.headerPillBtn}>
              <span className={styles.headerPillIcon}>→</span>
              <span>View All Work</span>
            </Link>
          </div>
        </div>

        {/* 2-Column Staggered Grid */}
        <div className={styles.staggeredGrid}>
          {/* Left Column */}
          <div ref={leftColRef} className={styles.leftColumn}>
            {leftProjects.map((project) => (
              <article key={project.id} className={styles.projectCard}>
                <Link href={project.link} className={styles.imageWrap}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.projectImage}
                    priority
                    unoptimized
                  />
                </Link>

                <div className={styles.cardContent}>
                  <div className={styles.cardMetaRow}>
                    <span className={styles.cardCategory}>{project.category}</span>
                    <span className={styles.cardYear}>{project.year}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.description}</p>

                  <div className={styles.cardBtnWrap}>
                    <Link href={project.link} className={styles.cardPillBtn}>
                      <span className={styles.cardPillIcon}>→</span>
                      <span>View All Work</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right Column (Staggered offset) */}
          <div ref={rightColRef} className={styles.rightColumn}>
            {rightProjects.map((project) => (
              <article key={project.id} className={styles.projectCard}>
                <Link href={project.link} className={styles.imageWrap}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.projectImage}
                    priority
                    unoptimized
                  />
                </Link>

                <div className={styles.cardContent}>
                  <div className={styles.cardMetaRow}>
                    <span className={styles.cardCategory}>{project.category}</span>
                    <span className={styles.cardYear}>{project.year}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.description}</p>

                  <div className={styles.cardBtnWrap}>
                    <Link href={project.link} className={styles.cardPillBtn}>
                      <span className={styles.cardPillIcon}>→</span>
                      <span>View All Work</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

