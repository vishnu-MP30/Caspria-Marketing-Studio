"use client";

import { useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import styles from "./ViewProjectsBanner.module.css";

export default function ViewProjectsBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Automatically start playing on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  // When cursor hovers over the banner, pause/stop the video wherever it is
  const handleMouseEnter = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  }, []);

  // When cursor leaves the banner, continue playing from the current position
  const handleMouseLeave = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
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
      {/* Background Video: automatically plays, pauses on cursor hover, resumes when cursor leaves */}
      <video
        ref={videoRef}
        src="/view_project.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={styles.videoBg}
        aria-hidden="true"
      />

      {/* Dim overlay to keep text crisp & high-contrast */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Centered Title */}
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>VIEW ALL PROJECTS</h2>
      </div>
    </Link>
  );
}
