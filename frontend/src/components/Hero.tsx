import type { Ref } from "react";
import { Button } from "./Button";
import { CtaButton } from "./CtaButton";

export default function Hero({ ref }: { ref?: Ref<HTMLDivElement> }) {
  return (
    <>
    <div 
      className="js-hero-bg fixed inset-5 z-0 overflow-hidden rounded-3xl bg-black"
    >
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
        <source src="/herobg2.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" />

    </div>

    <section ref={ref} className="js-hero relative z-10 h-screen p-5">
      <nav className="js-nav relative z-10 flex justify-between items-center p-6">
        <div>
          <img src="/Logo.svg" alt="Conduit" className="h-8 w-auto" />
        </div>
        

        <div className="px-2 py-1 bg-white/60 font-mono flex justify-between gap-4 items-center rounded-md">
          <Button variant="secondary">
            Company
          </Button>

          <Button variant="secondary">
            Newsroom
          </Button>

          <Button variant="primary">
            Work With Us
          </Button>

        </div>
      </nav>

      <div className="js-headline relative z-20 p-10 text-8xl tracking-tight font-sans text-white">
        <span className="block">Teach your workflows to</span>
        <span className="block">make decisions.</span>
      </div>

      <div className="js-subtext-row mt-40 mb-20 relative z-20 flex justify-between items-center p-10">
        <div>
          <p className="text-white text-2xl text-wrap">
            Connect any API, trigger on your schedule, and let AI handle the judgment calls.
          </p>
        </div>

        <div>
          <CtaButton>DISCOVER US</CtaButton>
        </div>
      </div>
    </section>

    <section className="relative z-10 flex min-h-screen items-center justify-center p-10">
      <div className="bg-white/60 px-4 py-2 rounded-md text-white">
        What We Do
      </div>
    </section>


   
    </>
  );
}


