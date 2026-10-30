"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Matter from "matter-js";
import styles from "./ServicesDrop.module.css";

interface BrickData {
  id: string;
  label: string;
  color: string;
  isVertical?: boolean;
}

// 10 Marketing Bricks with real clay brick colors
// Verified contrast >= 4.5:1 with white text #fff7ee
const allBricks: BrickData[] = [
  { id: "b1", label: "Brand Strategy", color: "#b8321e", isVertical: true },
  { id: "b2", label: "Performance Ads", color: "#c4411f" },
  { id: "b3", label: "SEO Growth", color: "#cf4b25" },
  { id: "b4", label: "Social Media", color: "#a63a24" },
  { id: "b5", label: "Content Marketing", color: "#d2562b" },
  { id: "b6", label: "Email Automation", color: "#9c3220" },
  { id: "b7", label: "Influencer Campaigns", color: "#c4411f" },
  { id: "b8", label: "Analytics & CRO", color: "#b8321e" },
  { id: "b9", label: "Paid Media", color: "#cf4b25" },
  { id: "b10", label: "Creative Direction", color: "#a63a24" },
];

export default function ServicesDrop() {
  const sectionRef = useRef<HTMLElement>(null);
  const playgroundRef = useRef<HTMLDivElement>(null);
  const brickElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const playground = playgroundRef.current;
    if (!playground) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      brickElementsRef.current.forEach((el, idx) => {
        if (!el) return;
        el.style.opacity = "1";
        el.style.transform = `translate3d(${10 + (idx % 4) * 23}%, ${
          240 + Math.floor(idx / 4) * 58
        }px, 0) rotate(${((idx % 3) - 1) * 3}deg)`;
      });
      return;
    }

    let engine: Matter.Engine | null = null;
    let animId: number | null = null;
    let bodies: { body: Matter.Body; el: HTMLDivElement; w: number; h: number }[] = [];
    let isSimulationActive = false;

    // Trigger on scroll as soon as playground enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          initPhysics();
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "40px 0px 0px 0px" }
    );

    observer.observe(playground);

    function initPhysics() {
      if (!playground) return;

      const pWidth = playground.clientWidth || 1000;
      const pHeight = playground.clientHeight || 450;

      // 1. Create Engine with sleeping enabled
      engine = Matter.Engine.create({
        enableSleeping: true,
      });
      engine.gravity.y = 1.35; // brisk, natural gravity

      // 2. Static Floor & Walls (floor positioned exactly at bottom edge of playground)
      const wallThickness = 200;
      const floor = Matter.Bodies.rectangle(
        pWidth / 2,
        pHeight + wallThickness / 2,
        pWidth * 3,
        wallThickness,
        { isStatic: true, friction: 0.75, restitution: 0.25 }
      );

      const leftWall = Matter.Bodies.rectangle(
        -wallThickness / 2,
        pHeight / 2,
        wallThickness,
        pHeight * 4,
        { isStatic: true, friction: 0.2 }
      );

      const rightWall = Matter.Bodies.rectangle(
        pWidth + wallThickness / 2,
        pHeight / 2,
        wallThickness,
        pHeight * 4,
        { isStatic: true, friction: 0.2 }
      );

      Matter.Composite.add(engine.world, [floor, leftWall, rightWall]);

      // 3. Desktop MouseConstraint (wheel/touch stripped so scrolling is never locked)
      let mouseConstraint: Matter.MouseConstraint | null = null;
      if (window.innerWidth >= 768) {
        const mouse = Matter.Mouse.create(playground);
        // Completely remove wheel & touch listeners from Matter.Mouse so native scroll works 100%
        mouse.element.removeEventListener("wheel", (mouse as any).mousewheel);
        mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);
        mouse.element.removeEventListener("touchmove", (mouse as any).mousemove);
        mouse.element.removeEventListener("touchstart", (mouse as any).mousedown);
        mouse.element.removeEventListener("touchend", (mouse as any).mouseup);

        mouseConstraint = Matter.MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: { visible: false },
          },
        });
        Matter.Composite.add(engine.world, mouseConstraint);
      }

      // 4. Measure DOM brick elements
      const elements = brickElementsRef.current.filter(Boolean) as HTMLDivElement[];
      if (elements.length === 0) return;

      const brickDims = elements.map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          el,
          w: Math.max(rect.width || 0, 110),
          h: Math.max(rect.height || 0, 48),
        };
      });

      // 5. Staggered Brick Spawn Sequence
      const spawnInterval = 85; // ms
      brickDims.forEach((item, index) => {
        setTimeout(() => {
          if (!engine || !playground) return;

          const pW = playground.clientWidth || 1000;
          const minX = item.w / 2 + 15;
          const maxX = pW - item.w / 2 - 15;
          const spawnX = Math.max(
            minX,
            Math.min(maxX, pW * 0.12 + Math.random() * (pW * 0.76))
          );
          const spawnY = -item.h - Math.random() * 160 - 20;
          const startAngle = ((Math.random() - 0.5) * 50 * Math.PI) / 180;

          const body = Matter.Bodies.rectangle(spawnX, spawnY, item.w, item.h, {
            chamfer: { radius: 10 },
            restitution: 0.32,
            friction: 0.6,
            frictionAir: 0.012,
            density: 0.002,
            angle: startAngle,
          });

          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.12);
          Matter.Composite.add(engine.world, body);
          bodies.push({ body, el: item.el, w: item.w, h: item.h });

          // Reveal DOM brick
          item.el.style.opacity = "1";

          if (!isSimulationActive) {
            isSimulationActive = true;
            runLoop();
          }
        }, index * spawnInterval);
      });

      // 6. Physics Render & Sync Loop
      function runLoop() {
        if (!engine) return;

        // Fixed timestep 1/60s
        Matter.Engine.update(engine, 1000 / 60);

        let anyMoving = false;

        bodies.forEach(({ body, el, w, h }) => {
          const { x, y } = body.position;
          const angle = body.angle;

          el.style.transform = `translate3d(${x - w / 2}px, ${
            y - h / 2
          }px, 0) rotate(${angle}rad)`;

          if (!body.isSleeping && body.speed > 0.06) {
            anyMoving = true;
          }
        });

        const isDragging =
          mouseConstraint && mouseConstraint.body ? true : false;

        if (anyMoving || isDragging || bodies.length < elements.length) {
          animId = requestAnimationFrame(runLoop);
        } else {
          isSimulationActive = false;
        }
      }

      // Wake up loop on user interaction
      if (mouseConstraint) {
        Matter.Events.on(mouseConstraint, "startdrag", () => {
          if (!isSimulationActive) {
            isSimulationActive = true;
            runLoop();
          }
        });
      }

      // 7. Debounced Resize Handler
      let resizeTimeout: NodeJS.Timeout;
      const onResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (!playground || !engine) return;
          const newW = playground.clientWidth;
          const newH = playground.clientHeight;

          Matter.Body.setPosition(floor, {
            x: newW / 2,
            y: newH + wallThickness / 2,
          });
          Matter.Body.setPosition(rightWall, {
            x: newW + wallThickness / 2,
            y: newH / 2,
          });

          // Wake up bodies
          bodies.forEach(({ body }) => Matter.Sleeping.set(body, false));
          if (!isSimulationActive) {
            isSimulationActive = true;
            runLoop();
          }
        }, 200);
      };

      window.addEventListener("resize", onResize);
    }

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      if (engine) {
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.servicesDropSection} id="services-drop">
      <div className={styles.container}>
        {/* Physics Playground (floor is at bottom edge of this container) */}
        <div ref={playgroundRef} className={styles.playground} aria-hidden="true">
          {allBricks.map((b, idx) => (
            <div
              key={b.id}
              ref={(el) => {
                brickElementsRef.current[idx] = el;
              }}
              className={`${styles.brick} ${
                b.isVertical ? styles.brickVertical : ""
              }`}
              style={{
                backgroundColor: b.color,
                opacity: 0, // Hidden until drop starts
              }}
            >
              <span>{b.label}</span>
            </div>
          ))}
        </div>

        {/* Content Row: Paragraph & CTA on left, Stat counters on right */}
        <div className={styles.contentRow}>
          <div className={styles.introBlock}>
            <span className={styles.sectionTag}>Core Capabilities</span>
            <h2 className={styles.introTitle}>
              Full-Stack Growth Architecture.
            </h2>
            <p className={styles.introDesc}>
              We engineer specialized marketing capabilities into high-yield systems.
              From bold creative direction to ruthless conversion optimization, every brick
              is built to scale revenue.
            </p>
            <Link href="#contact" className={styles.ctaBtn}>
              Start a Project <span>↗</span>
            </Link>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>120+</span>
              <span className={styles.statLabel}>Campaigns Launched</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>3.4x</span>
              <span className={styles.statLabel}>Avg. Return On Ad Spend</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>40+</span>
              <span className={styles.statLabel}>Iconic Brands Scaled</span>
            </div>
          </div>
        </div>

        {/* Visually Hidden Services List for Screen Readers */}
        <ul className={styles.srOnly}>
          {allBricks.map((b) => (
            <li key={b.id}>{b.label}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
