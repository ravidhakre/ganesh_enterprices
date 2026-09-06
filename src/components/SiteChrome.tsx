import { useState, type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

const navItems = [
  { label: "Home", to: "/", testId: "header-home-link" },
  { label: "Loans", to: "/loans", testId: "header-loans-link" },
  { label: "About Us", to: "/about", testId: "header-about-link" },
  { label: "Contact", to: "/contact", testId: "header-contact-link" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="hidden bg-slate-950 text-slate-300 sm:block" data-testid="top-contact-bar">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs font-medium tracking-wide lg:px-8">
          <span data-testid="top-contact-message">Trusted finance guidance from Ferozepur to all of India</span>
          <a href="tel:+918558900022" className="flex items-center gap-2 text-sky-200 transition-colors hover:text-white" data-testid="top-phone-link"><Phone className="size-3.5" /> +91 85589 00022</a>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl" data-testid="site-header">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
      <BrandLogo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation" data-testid="desktop-navigation">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${isActive ? "bg-sky-50 text-sky-700" : "text-slate-600 hover:bg-slate-50 hover:text-sky-700"}`} data-testid={item.testId}>{item.label}</NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:+918558900022" className="flex items-center gap-2 text-sm font-semibold text-slate-600" data-testid="header-phone-link"><Phone className="size-4 text-sky-600" /> Call us</a>
            <Link to="/apply" className="inline-flex h-10 items-center gap-2 rounded-full bg-sky-600 px-5 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-700" data-testid="apply-now-header-button">Apply Now <ArrowUpRight className="size-4" /></Link>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" data-testid="mobile-menu-toggle-button">{open ? <X /> : <Menu />}</Button>
        </div>
        {open && <div className="border-t border-slate-100 bg-white px-5 pb-5 pt-2 lg:hidden" data-testid="mobile-navigation">
          {navItems.map((item) => <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-sky-50 text-sky-700" : "text-slate-600"}`} data-testid={`mobile-${item.testId}`}>{item.label}</NavLink>)}
          <Link to="/apply" onClick={() => setOpen(false)} className="mt-2 block rounded-xl bg-sky-600 px-4 py-3 text-center text-sm font-bold text-white" data-testid="apply-now-mobile-button">Apply Now</Link>
        </div>}
      </header>
    </>
  );
}

function Footer() {
  return <footer className="border-t-4 border-sky-500 bg-slate-950 text-slate-300" data-testid="site-footer">
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr_1.25fr] lg:px-8">
      <div><BrandLogo variant="footer" /><p className="mt-5 max-w-xs text-sm leading-7 text-slate-400" data-testid="footer-intro">Your trusted partner for transparent loans, business funding and practical financial guidance. Built on relationships, not paperwork.</p><div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-bold text-amber-300" data-testid="footer-trust-badge">✦ 20+ years of trust</div></div>
      <div><h3 className="font-heading text-sm font-bold text-white" data-testid="footer-links-heading">Explore</h3><div className="mt-4 space-y-3 text-sm">{navItems.map((item) => <Link key={item.to} to={item.to} className="block transition-colors hover:text-sky-300" data-testid={`footer-${item.label.toLowerCase().replace(" ", "-")}-link`}>{item.label}</Link>)}<Link to="/apply" className="block font-semibold text-sky-300" data-testid="footer-apply-link">Apply Now <ArrowUpRight className="ml-1 inline size-3" /></Link></div></div>
      <div><h3 className="font-heading text-sm font-bold text-white" data-testid="footer-products-heading">Loan solutions</h3><div className="mt-4 grid grid-cols-2 gap-y-3 text-sm text-slate-400">{["Personal Loan", "Business Loan", "Instant Loan", "Home Loan", "LAP Funding", "Credit Cards", "FD Card", "Private Funding"].map((item, index) => <span key={item} data-testid={`footer-product-${index + 1}`}>{item}</span>)}</div></div>
      <div><h3 className="font-heading text-sm font-bold text-white" data-testid="footer-contact-heading">Visit our office</h3><p className="mt-4 text-sm leading-6 text-slate-400" data-testid="footer-address">Ganesh Enterprises<br />Mall Road Ferozepur City,<br />Punjab - 152002</p><a href="tel:+918558900022" className="mt-4 block text-sm font-semibold text-sky-300" data-testid="footer-phone-link">+91 8558900022</a><a href="mailto:fzrganeshenterprises@gmail.com" className="mt-2 block break-all text-sm text-slate-400 hover:text-white" data-testid="footer-email-link">fzrganeshenterprises@gmail.com</a></div>
    </div>
    <div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8"><span data-testid="footer-copyright">© 2026 Ganesh Enterprises. All rights reserved.</span><span data-testid="footer-disclaimer">Loan approval is subject to eligibility, documentation and partner policies.</span></div></div>
  </footer>;
}

export default function SiteChrome({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-white text-slate-900"><Header /><main>{children}</main><Footer /><Toaster /></div>;
}