"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import styles from "./ViewProjectsBanner.module.css";

export default function ViewProjectsBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.currentTime = 0; // restart video smoothly from the beginning
      video.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  }, []);

  return (
    <Link
      href="#case-studies"
      className={styles.bannerWrap}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="View All Projects"
    >
      {/* Background Video (plays on hover, paused & hidden on idle) */}
      <video
        ref={videoRef}
        src="/view_project.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        className={styles.videoBg}
        aria-hidden="true"
      />

      {/* Dim overlay on hover */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Centered Title */}
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>VIEW ALL PROJECTS</h2>
      </div>
    </Link>
  );
}

