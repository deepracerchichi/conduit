import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";

export function CtaButton({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...props} className="group inline-flex h-12 items-stretch">
      <span className="relative mr-4 inline-flex items-center rounded-l-xl bg-ink py-2 pl-5 pr-2 font-mono text-sm uppercase text-white transition-[background-color,color,margin,padding] duration-600 ease-snap group-hover:mr-3 group-hover:bg-accent group-hover:pr-3.5 group-hover:text-ink">
        {children}
        <svg className="absolute top-0 -right-4 h-full w-4.5" viewBox="0 0 18 48" aria-hidden="true">
          <path d="M0 0H5.91A11 11 0 0 1 16.58 13.67L9.94 40.24A10.25 10.25 0 0 1 0 48Z"
 className="fill-ink transition-[fill] duration-600 ease-snap group-hover:fill-accent" />

        </svg>
      </span>

      <span className="relative w-12.75 origin-right overflow-hidden transition-transform duration-600 ease-snap group-hover:scale-[0.875]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 51 48" aria-hidden="true">
          <path d="M17.59 0H39A12 12 0 0 1 51 12V36A12 12 0 0 1 39 48H11.09A11 11 0 0 1 0.42 34.33L6.92 8.33A11 11 0 0 1 17.59 0Z"
 className="fill-accent transition-[fill] duration-600 ease-snap group-hover:fill-ink" />

        </svg>

        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-600 ease-snap group-hover:translate-x-full">
          <ArrowRight className="h-3.5 w-3.5 text-ink" />
        </span>
        <span className="absolute inset-0 flex -translate-x-full items-center justify-center transition-transform duration-600 ease-snap group-hover:translate-x-0">
          <ArrowRight className="h-3.5 w-3.5 text-white" />
        </span>
      </span>
    </a>
  );
}

