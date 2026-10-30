# Floating Testimonials Component — Tweaking Guide

The `<FloatingTestimonials />` component is a high-performance, scroll-driven 3D floating cards section built with GSAP, ScrollTrigger, Lenis smooth scrolling, and CSS 3D transforms.

---

## 1. How to Tweak Scroll Speed & Parallax

In `src/components/FloatingTestimonials.tsx`:

- **Runway Length (How long the section stays pinned)**:
  In `FloatingTestimonials.module.css`:
  ```css
  .testimonialsRunway {
    height: 480vh; /* Increase to 550vh for slower scrolling, decrease to 400vh for faster scrolling */
  }
  ```

- **Per-Card Parallax Speeds**:
  In `cardConfigs` in `FloatingTestimonials.tsx`, edit the `speed` property on each card:
  ```ts
  {
    id: "card-1",
    speed: 1.15, // Change between 0.8 (slower drift) and 1.6 (faster drift)
  }
  ```

- **Scroll Scrub Responsiveness**:
  In `gsap.timeline({ scrollTrigger: { scrub: 1.2 } })`:
  - `scrub: 1.2` provides smooth momentum.
  - Lower (e.g. `0.6`) makes the scrub follow the finger/wheel more tightly.

---

## 2. How to Tweak Card Size & Aspect Ratio

In `src/components/FloatingTestimonials.module.css`:

```css
.cardOuter {
  /* Change width: clamp(min, preferred, max) */
  width: clamp(240px, 19.5vw, 295px);

  /* Height is roughly 1.6x of width for tall portrait feel */
  height: clamp(380px, 31vw, 465px);
}
```

To make cards narrower/taller or broader, adjust the clamp values above.

---

## 3. How to Tweak 3D Tilt Intensity

In `FloatingTestimonials.tsx`:

Inside `onPointerMove`:
```ts
// Desktop mouse tilt angles:
const rotY = mouseX * 22 * depthFactor;  // Change 22 to 30 for more horizontal tilt, or 14 for subtle
const rotX = -mouseY * 14 * depthFactor; // Change 14 to 20 for more vertical tilt, or 8 for subtle
```

Inside individual card hover:
```ts
onMouseEnter={(e) => {
  gsap.to(e.currentTarget, {
    scale: 1.04, // Hover scale
    duration: 0.35,
    ease: "power2.out",
  });
}}
```

---

## 4. How to Update or Add Cards

Edit the `cardConfigs` array in `FloatingTestimonials.tsx`. You can add, remove, or modify cards:
- `type: "text"` requires: `quote`, `highlight`, `name`, `city`, `avatar`.
- `type: "photo"` requires: `photoUrl`, `photoAlt`.
- Adjust `xPercent` (0% to 80%) to control where across the horizontal stage the card appears.
- Adjust `startYVh` to control when in the scroll journey the card enters from the bottom.

