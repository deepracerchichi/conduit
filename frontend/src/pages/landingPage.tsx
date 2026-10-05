import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Hero from "../components/Hero";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    const tl = gsap.timeline();

     tl.fromTo(".js-hero",
    { opacity: 0, scale: 0.1 },
    { opacity: 1, scale: 0.9, ease: "power2.out" }
  )
  .from(".js-nav", { opacity: 0, y: -20, duration: 0.6 })
  .from(".js-headline > span", { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 }, "<")
  .from(".js-subtext-row > *", { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 }, "<");
    
    // 2. Scroll-driven — resting size → full screen, tied to scroll position
    gsap.to(".js-hero", {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".js-hero",
        start: "top top",
        end: "+=150",
        scrub: true,
      },
    });

    
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <Hero />
    </div>
  );
}

