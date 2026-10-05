import { ArrowRight } from "lucide-react";

export function CtaButton({ children }: { children: string }) {
  return (
    <a href="#" className="group relative inline-block h-13 w-80.5">
      <img
        src="/btn.svg"
        alt=""
        className="absolute inset-0 h-full w-full transition-opacity duration-300 ease-out group-hover:opacity-0"
      />
      <img
        src="/btn-hover.svg"
        alt=""
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
      />

      <span className="relative z-10 flex h-full items-center">
        <span className="flex-1 pl-11 font-mono text-md tracking-wide text-white transition-all duration-300 ease-out group-hover:text-ink">
          {children}
        </span>
        <span className="flex w-2/5 items-center justify-center">
          <ArrowRight className="h-4 w-10 text-ink transition-colors group-hover:text-white" />
        </span>
      </span>
    </a>
  );
}
