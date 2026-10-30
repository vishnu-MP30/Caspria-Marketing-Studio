"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import styles from "./BlogSection.module.css";

export default function BlogSection() {
  const torusRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = torusRef.current;
    if (!el) return;

    // Interactive 3D tilt reaction on mouse move
    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / 25;
      const dy = (e.clientY - cy) / 25;

      gsap.to(el, {
        rotateY: gsap.utils.clamp(-25, 25, dx),
        rotateX: gsap.utils.clamp(-20, 20, -dy),
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.blogSection} id="blog">
      <div className={styles.container}>
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>
              Blog &amp; Insights
              <br />
              That Drive Growth
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.subtitle}>
              Explore marketing trends, strategies, and expert tips to help your brand grow
              faster and smarter in the digital world.
            </p>
            <Link href="#blog" className={styles.seeAllBtn}>
              See all Articles <span>↗</span>
            </Link>
          </div>
        </div>

        {/* Row 1: Large Featured Card */}
        <article className={styles.featuredCard}>
          <div className={styles.featuredImageWrapper}>
            <Image
              src="/blog/blog_1.webp"
              alt="Editorial portrait representing strategic marketing"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              className={styles.featuredImage}
            />
          </div>

          <div className={styles.featuredContent}>
            <div>
              <span className={styles.badge}>
                <span className={styles.badgeDot}>•</span> Marketing Strategy
              </span>
              <h3 className={styles.featuredTitle}>
                Why Most Digital Marketing Campaigns Fail
              </h3>
              <p className={styles.featuredDesc}>
                It&apos;s not the budget—it&apos;s the strategy. Learn the common mistakes brands
                make and how to fix them.
              </p>
            </div>

            <Link href="#blog" className={styles.viewBlogBtn}>
              View Blog
            </Link>
          </div>
        </article>

        {/* Row 2: 2-Column Grid */}
        <div className={styles.duoGrid}>
          {/* Card 2: Brand Strategy */}
          <article className={styles.gridCard}>
            <div className={styles.gridImageWrapper}>
              <Image
                src="/blog/blog_2.webp"
                alt="Tactile brand identity and packaging architecture"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                className={styles.gridImage}
              />
              <span className={styles.overlayBadge}>
                <span className={styles.badgeDot}>•</span> Brand Strategy
              </span>
            </div>

            <div className={styles.gridContent}>
              <h3 className={styles.gridTitle}>
                Design That Sells: The Psychology Behind Branding
              </h3>
              <p className={styles.gridDesc}>
                Design isn&apos;t just visual—it&apos;s behavioral. Understand what actually
                influences user decisions.
              </p>
            </div>
          </article>

          {/* Card 3: Media Planning */}
          <article className={styles.gridCard}>
            <div className={styles.gridImageWrapper}>
              <Image
                src="/blog/blog_3.webp"
                alt="Media planning and performance optimization showcase"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                className={styles.gridImage}
              />
              <span className={styles.overlayBadge}>
                <span className={styles.badgeDot}>•</span> Media Planning
              </span>
            </div>

            <div className={styles.gridContent}>
              <h3 className={styles.gridTitle}>
                Media Planning 101: Spend Smarter, Not More
              </h3>
              <p className={styles.gridDesc}>
                Smarter allocation beats bigger budgets. Here&apos;s how to maximize ROI with
                better planning.
              </p>
            </div>
          </article>
        </div>

        {/* Bottom: 3D Rotating Chrome Torus */}
        <div className={styles.rotatingWrapper}>
          <div ref={torusRef} className={styles.rotatingObject}>
            <Image
              src="/blog/rotating_torus.png"
              alt="Rotating red chrome aerodynamic sculpture"
              width={260}
              height={260}
              className={styles.torusImg}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

