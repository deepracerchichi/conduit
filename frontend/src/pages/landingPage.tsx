import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/Hero";

gsap.registerPlugin(ScrollTrigger);


export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    const tl = gsap.timeline();

tl.fromTo(".js-hero-bg",
  { opacity: 0, top: "45%", bottom: "45%", left: "45%", right: "45%" },
  { opacity: 1, top: 20, bottom: 20, left: 20, right: 20, ease: "power2.out" }
)
  .from(".js-nav", { opacity: 0, y: -20, duration: 0.6 })
  .from(".js-headline > span", { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 }, "<")
  .from(".js-subtext-row > *", { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 }, "<");

gsap.fromTo(".js-hero-bg",
  { top: 20, bottom: 20, left: 20, right: 20, borderRadius: 24 },
  {
    top: 0, bottom: 0, left: 0, right: 0, borderRadius: 0,
    ease: "none",
    immediateRender: false,
    scrollTrigger: {
      trigger: ".js-hero",
      start: "top top",
      end: "+=150",
      scrub: true,
    },
  }
);


    
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <Hero />
    </div>
  );
}

