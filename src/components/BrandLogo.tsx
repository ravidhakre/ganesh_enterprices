import { Link } from "react-router-dom";

export default function BrandLogo({ variant = "header" }: { variant?: "header" | "footer" }) {
  return (
    <Link to="/" className="group flex items-center gap-3" data-testid={`brand-logo-${variant}-link`}>
      <span className="relative flex size-11 items-center justify-center overflow-hidden rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/20 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105" data-testid={`brand-logo-${variant}-mark`}>
        <svg viewBox="0 0 48 48" className="size-8" aria-hidden="true">
          <path d="M24 7c-8.6 0-14.5 5-14.5 12.1 0 4.9 2.5 8.2 6.4 10.2-2.4 3.1-2.5 7.2.2 9.3 2.3 1.8 5.1.5 6-2.1.7-2.1-.4-4.2-1.7-5.9 1.2.2 2.4.2 3.6 0 1.4 1.7 2.6 3.7 2.1 5.6-.7 2.6 1.8 4.2 4.1 2.6 3.2-2.1 3.3-6.5 1-9.8 4.5-2 7.4-5.8 7.4-10.8C38.6 12 32.7 7 24 7Z" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
          <path d="M18 18.5c2.1 1.5 4.1 1.5 6.1 0M23.8 22.5c3.2 3.5 4.2 7.1 2.4 10.8" fill="none" stroke="#fbbf24" strokeWidth="2.3" strokeLinecap="round" />
          <circle cx="19" cy="14.5" r="1.4" fill="#fbbf24" />
        </svg>
      </span>
      <span className="leading-none" data-testid={`brand-logo-${variant}-copy`}>
        <span className="block font-heading text-[1.06rem] font-extrabold tracking-tight text-slate-900">Ganesh <span className="text-sky-600">Enterprises</span></span>
        <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-500">20 years of trust</span>
      </span>
    </Link>
  );
}